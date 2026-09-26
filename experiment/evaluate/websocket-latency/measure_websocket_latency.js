#!/usr/bin/env node
/**
 * Measure WebSocket server HTTP /health + Socket.IO connect + eval:ping RTT.
 * Socket.IO requires JWT (same as Moodle plugin). Set GAMIFIED_JWT or --token.
 */
const { io } = require('socket.io-client');
const http = require('http');
const https = require('https');
const fs = require('fs');
const { URL } = require('url');

function httpGetMs(urlString) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlString);
    const lib = u.protocol === 'https:' ? https : http;
    const t0 = process.hrtime.bigint();
    const req = lib.request(
      {
        hostname: u.hostname,
        port: u.port || (u.protocol === 'https:' ? 443 : 80),
        path: u.pathname + u.search,
        method: 'GET',
        timeout: 10000,
      },
      (res) => {
        res.resume();
        res.on('end', () => {
          const ms = Number(process.hrtime.bigint() - t0) / 1e6;
          resolve({ status: res.statusCode, ms });
        });
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('timeout'));
    });
    req.end();
  });
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {
    runs: 30,
    wsUrl: process.env.WS_URL || 'http://localhost:3001',
    token: process.env.GAMIFIED_JWT || '',
  };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--runs' && args[i + 1]) out.runs = parseInt(args[++i], 10);
    else if (args[i] === '--url' && args[i + 1]) out.wsUrl = args[++i];
    else if (args[i] === '--token' && args[i + 1]) out.token = args[++i];
    else if (args[i] === '--token-file' && args[i + 1]) {
      out.token = fs.readFileSync(args[++i], 'utf8').trim();
    }
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

function summarize(arr) {
  if (!arr.length) return null;
  const s = [...arr].sort((a, b) => a - b);
  const mean = s.reduce((a, b) => a + b, 0) / s.length;
  return {
    n: s.length,
    mean: Math.round(mean * 100) / 100,
    min: Math.round(s[0] * 100) / 100,
    max: Math.round(s[s.length - 1] * 100) / 100,
    p50: Math.round(percentile(s, 50) * 100) / 100,
    p95: Math.round(percentile(s, 95) * 100) / 100,
  };
}

async function measureOnce(base, token) {
  const t0 = Date.now();
  const socket = io(base, {
    transports: ['websocket', 'polling'],
    reconnection: false,
    timeout: 15000,
    auth: { token },
  });

  const connectMs = await new Promise((resolve, reject) => {
    const to = setTimeout(() => {
      socket.close();
      reject(new Error('connect timeout'));
    }, 15000);
    socket.once('connect', () => {
      clearTimeout(to);
      resolve(Date.now() - t0);
    });
    socket.once('connect_error', (err) => {
      clearTimeout(to);
      reject(err);
    });
  });

  const rttMs = await new Promise((resolve) => {
    const t1 = Date.now();
    let finished = false;
    const done = (val) => {
      if (finished) return;
      finished = true;
      try {
        socket.close();
      } catch (_) {}
      resolve(val);
    };
    socket.emit('eval:ping', () => {
      done(Date.now() - t1);
    });
    setTimeout(() => done(null), 6000);
  });

  return { connectMs, rttMs };
}

async function main() {
  const { runs, wsUrl, token } = parseArgs();
  const base = wsUrl.replace(/\/$/, '');
  const healthUrl = `${base}/health`;

  console.log('WebSocket / HTTP latency evaluation');
  console.log('WS_URL:', base);
  console.log('Runs:', runs);
  console.log('');

  const healthMs = [];
  for (let i = 0; i < runs; i++) {
    try {
      const { ms, status } = await httpGetMs(healthUrl);
      if (status !== 200) console.warn('Health non-200:', status);
      healthMs.push(ms);
    } catch (e) {
      console.warn('Health request failed:', e.message);
    }
  }
  console.log('GET /health (ms):', summarize(healthMs));

  if (!token) {
    console.log('');
    console.log(
      'Skipping Socket.IO (no JWT). Export GAMIFIED_JWT or use --token / --token-file.'
    );
    console.log(
      'Obtain a token from the Moodle Gamified Quiz teacher page (same JWT used for WebSocket).'
    );
    return;
  }

  const connectMs = [];
  const rttMs = [];
  for (let i = 0; i < runs; i++) {
    try {
      const m = await measureOnce(base, token);
      connectMs.push(m.connectMs);
      if (m.rttMs != null) rttMs.push(m.rttMs);
    } catch (e) {
      console.warn('Socket iteration failed:', e.message);
    }
  }

  console.log('Socket.IO connect (ms):', summarize(connectMs));
  if (rttMs.length) {
    console.log('eval:ping RTT ack (ms):', summarize(rttMs));
  } else {
    console.log('eval:ping RTT: no ack samples (check server has eval:ping handler)');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
