# Evaluation: WebSocket / gamified real-time service

Quantify **latency** and **concurrent usage** for the gamified quiz **Socket.IO** server (`jica-websocket`, port **3001**).

| What you claim | Tool | What it tests |
|----------------|------|----------------|
| Latency **&lt; ~150 ms** (LAN) | `measure_websocket_latency.js` | One client: connect + `eval:ping` RTT |
| **N concurrent users** on WebSocket | `measure_concurrent_websocket.js` | N students connect + ping (same session) |
| **200 concurrent** (HTTP scalability) | JMeter `gamified-quiz-200-concurrent-health.jmx` | **HTTP `/health` only** — not full quiz WS |

> **JMeter ≠ WebSocket gamification.** The 200-user JMeter plan hits a lightweight HTTP endpoint. For **real-time quiz** concurrency, use the concurrent script below (or classroom observation).

---

## Prerequisites

```bash
docker compose up -d websocket-server redis
cd evaluate/websocket-latency
npm install
```

`JWT_SECRET` in `.env` / `docker-compose.yml` must match Moodle plugin settings (same as teacher view token).

---

## 1. Single-client latency (paper: &lt; 150 ms)

### Option A — Script with signed JWT

```bash
export WS_URL=http://localhost:3001
export JWT_SECRET=your-secret-from-docker-env
npm run measure -- --runs 50
```

### Option B — Token from browser (exact production path)

1. Open gamified quiz as **teacher** → DevTools → Console:  
   `copy(window.GAMIFIED_QUIZ_CONFIG.jwtToken)`
2. Run:

```bash
export GAMIFIED_JWT="<paste>"
npm run measure -- --runs 50
```

**Report:** mean / p95 / max of `connect_ms` and `rtt_ms`.

---

## 2. Concurrent WebSocket usage (gamification service)

Simulates **many students** joining the **same session** (Socket.IO rooms + Redis leaderboard).

```bash
export WS_URL=http://localhost:3001
export JWT_SECRET=your-secret

# 50 students over 10 s ramp, hold 5 s each
node measure_concurrent_websocket.js --clients 50 --ramp-sec 10 --hold-sec 5

# Paper-style 200 (lab only — watch CPU/RAM)
node measure_concurrent_websocket.js --clients 200 --ramp-sec 60 --hold-sec 3
```

**Output:** `logs/evaluation/ws_concurrent_<timestamp>.json`

| Metric | Meaning |
|--------|---------|
| `connected_ok` / `failed` | How many sockets authenticated |
| `error_rate_pct` | Failed ÷ target clients × 100 |
| `connect_ms` | Time to establish Socket.IO (mean, p95, max) |
| `rtt_ms` | `eval:ping` round-trip after connect |

**Interpretation:**

- **Low error rate** at 50–200 clients → service accepts concurrent connections.
- **Rising p95 RTT** as clients increase → network/CPU/Redis saturation.
- Compare **same machine (LAN)** vs **Wi‑Fi** separately for the paper.

### What this does *not* simulate (yet)

Full live quiz load (teacher `push_question` + 200 `submit_answer` at once) is heavier. For that:

- Run a **pilot class session** and log participant count + issues ([classroom-deployment](../classroom-deployment/)), or
- Extend the script to emit `student:submit_answer` after teacher creates session (future work).

---

## 3. HTTP load (JMeter) — optional baseline

```bash
./evaluate/load-testing-jmeter/run_jmeter_example.sh
# or gamified-quiz-200-concurrent-health.jmx → LLM /health
```

Use for “infrastructure handles 200 HTTP requests,” **not** WebSocket quiz latency.

---

## 4. Monitor during concurrent test

```bash
docker stats jica-websocket jica-redis
docker logs -f jica-websocket
```

---

## 5. What to write in your paper

**Experimental setup**

- WebSocket server: Node.js + Socket.IO 4, Redis for session state  
- Network: [LAN / campus Wi‑Fi]  
- Hardware: [CPU, RAM]  

**Concurrent usage**

> We load-tested the real-time service with [N] concurrent Socket.IO client connections (student role) ramped over [T] seconds. [X]% connected successfully; mean round-trip latency was [Y] ms (p95 [Z] ms). HTTP JMeter with 200 threads against `/health` confirmed baseline HTTP scalability under separate measurement.

**Do not** cite JMeter `/health` ms as WebSocket quiz latency.

---

## Files

| File | Purpose |
|------|---------|
| `measure_websocket_latency.js` | Single-client RTT |
| `measure_concurrent_websocket.js` | Multi-client concurrent test |
| `package.json` | `socket.io-client` dependency |
