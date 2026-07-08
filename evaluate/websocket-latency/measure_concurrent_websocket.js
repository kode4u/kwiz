#!/usr/bin/env node
/**
 * Concurrent Socket.IO load test for gamified quiz WebSocket server.
 *
 * Simulates N students connecting to the same session, measures connect + eval:ping RTT.
 * Requires JWT_SECRET (same as docker-compose / Moodle plugin).
 *
 * Usage:
 *   export WS_URL=http://localhost:3001
 *   export JWT_SECRET=your-secret
 *   node measure_concurrent_websocket.js --clients 50 --ramp-sec 10
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { io } = require('socket.io-client');

function base64url(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function signJwt(payload, secret) {
  const header = base64url(Buffer.from(JSON.stringify({ typ: 'JWT', alg: 'HS256' })));
  const body = base64url(Buffer.from(JSON.stringify(payload)));
  const data = `${header}.${body}`;
  const sig = base64url(crypto.createHmac('sha256', secret).update(data).digest());
  return `${data}.${sig}`;
}

function parseArgs() {
  const out = {
    clients: 50,
    rampSec: 10,
    holdSec: 5,
    wsUrl: process.env.WS_URL || 'http://localhost:3001',
    secret: process.env.JWT_SECRET || process.env.GENERATION_WORKER_SECRET || '',
    sessionId: process.env.EVAL_SESSION_ID || 'eval_load_session_1',
    out: '',
  };
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--clients' && args[i + 1]) out.clients = parseInt(args[++i], 10);
    else if (args[i] === '--ramp-sec' && args[i + 1]) out.rampSec = parseFloat(args[++i]);
    else if (args[i] === '--hold-sec' && args[i + 1]) out.holdSec = parseFloat(args[++i]);
    else if (args[i] === '--url' && args[i + 1]) out.wsUrl = args[++i];
    else if (args[i] === '--session' && args[i + 1]) out.sessionId = args[++i];
    else if (args[i] === '--out' && args[i + 1]) out.out = args[++i];
  }
  return out;
}

function percentile(sorted, p) {
  if (!sorted.length) return NaN;
  const idx = (sorted.length - 1) * (p / 100);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

function stats(arr) {
  if (!arr.length) return null;
  const s = [...arr].sort((a, b) => a - b);
  return {
    n: s.length,
    mean: Math.round((s.reduce((a, b) => a + b, 0) / s.length) * 100) / 100,
    p50: Math.round(percentile(s, 50) * 100) / 100,
    p95: Math.round(percentile(s, 95) * 100) / 100,
    max: Math.round(s[s.length - 1] * 100) / 100,
  };
}

function connectClient(wsUrl, token, holdSec) {
  return new Promise((resolve) => {
    const result = {
      ok: false,
      connect_ms: null,
      rtt_ms: null,
      error: null,
    };
    const t0 = Date.now();
    const socket = io(wsUrl, {
      transports: ['websocket', 'polling'],
      reconnection: false,
      timeout: 20000,
      auth: { token },
    });

    const fail = (msg) => {
      result.error = msg;
      try {
        socket.close();
      } catch (_) {}
      resolve(result);
    };

    const timer = setTimeout(() => fail('connect timeout'), 20000);

    socket.once('connect', () => {
      clearTimeout(timer);
      result.connect_ms = Date.now() - t0;
      const t1 = Date.now();
      socket.emit('eval:ping', (ack) => {
        result.rtt_ms = Date.now() - t1;
        result.ok = true;
        setTimeout(() => {
          try {
            socket.close();
          } catch (_) {}
          resolve(result);
        }, holdSec * 1000);
      });
      setTimeout(() => {
        if (!result.ok) {
          result.rtt_ms = null;
          result.ok = true;
          result.error = 'ping ack timeout (connect ok)';
          try {
            socket.close();
          } catch (_) {}
          resolve(result);
        }
      }, 5000);
    });

    socket.once('connect_error', (err) => {
      clearTimeout(timer);
      fail(err.message || String(err));
    });
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const cfg = parseArgs();
  if (!cfg.secret) {
    console.error('Set JWT_SECRET (same as docker-compose / Moodle plugin).');
    process.exit(1);
  }

  const repoRoot = path.resolve(__dirname, '..', '..');
  const outPath =
    cfg.out ||
    path.join(repoRoot, 'logs', 'evaluation', `ws_concurrent_${Date.now()}.json`);

  console.log(`WebSocket URL: ${cfg.wsUrl}`);
  console.log(`Clients: ${cfg.clients}, ramp: ${cfg.rampSec}s, session: ${cfg.sessionId}`);
  console.log('');

  const delayMs = cfg.clients > 1 ? (cfg.rampSec * 1000) / (cfg.clients - 1) : 0;
  const results = [];

  for (let i = 0; i < cfg.clients; i++) {
    const userId = 10000 + i;
    const token = signJwt(
      {
        user_id: userId,
        role: 'student',
        session_id: cfg.sessionId,
        username: `Student${i + 1}`,
        exp: Math.floor(Date.now() / 1000) + 3600,
      },
      cfg.secret
    );
    if (i > 0 && delayMs > 0) await sleep(delayMs);
    process.stdout.write(`\rConnecting ${i + 1}/${cfg.clients}...`);
    const r = await connectClient(cfg.wsUrl, token, cfg.holdSec);
    results.push({ client_index: i + 1, user_id: userId, ...r });
  }
  console.log('\n');

  const ok = results.filter((r) => r.ok);
  const fail = results.filter((r) => !r.ok);
  const connectMs = ok.map((r) => r.connect_ms).filter((x) => x != null);
  const rttMs = ok.map((r) => r.rtt_ms).filter((x) => x != null);

  const summary = {
    timestamp: new Date().toISOString(),
    ws_url: cfg.wsUrl,
    session_id: cfg.sessionId,
    target_clients: cfg.clients,
    connected_ok: ok.length,
    failed: fail.length,
    error_rate_pct: Math.round((fail.length / cfg.clients) * 10000) / 100,
    connect_ms: stats(connectMs),
    rtt_ms: stats(rttMs),
    failures: fail.slice(0, 20),
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify({ summary, results }, null, 2));

  console.log('=== Concurrent WebSocket summary ===');
  console.log(JSON.stringify(summary, null, 2));
  console.log(`\nFull report: ${outPath}`);
  process.exit(fail.length > cfg.clients * 0.05 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
