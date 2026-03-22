# Evaluation: WebSocket / real-time latency

## Purpose

Quantify **round-trip time (RTT)** or **request–response delay** relevant to Socket.IO used by the quiz WebSocket server. Use this to support claims such as **latency below ~150 ms** on your LAN (actual values depend on network, Docker, and client hardware).

## What this script measures

- **HTTP `/health`** on the WebSocket server (baseline server reachability).
- **Socket.IO connection time** + **emit/ack RTT** using a **`ping`** / **`pong`** pattern.

> If your deployed server does not implement `ping`/`pong` yet, the script falls back to **connection time only** — extend `websocket-server/server.js` to add a simple `eval:ping` handler (see script comments) for full RTT.

## Prerequisites

- Node.js 18+
- Install dependencies **once** in this folder:

```bash
cd evaluate/websocket-latency
npm install
```

- WebSocket server running (e.g. `docker compose up -d websocket-server`), default `http://localhost:3001`.

## Usage

```bash
cd evaluate/websocket-latency
export WS_URL=http://localhost:3001
# Optional: JWT from Moodle teacher view (same as plugin uses) for authenticated tests
# export GAMIFIED_JWT=eyJ...
npm run measure -- --runs 50
```

## Output

- **health_ms**: HTTP GET `/health` latency.
- **connect_ms**: Socket.IO connection establishment.
- **rtt_ms** (if ping/pong supported): round-trip emit with ack.

Report **mean, p95, max** for the paper.

## Paper notes

- Run tests from **same machine**, **same subnet**, and **WAN** separately if you compare scenarios.
- State **OS**, **browser** (for in-browser tests), and **Docker** vs bare-metal.

## Files

- `measure_websocket_latency.js` — measurement script
- `package.json` — minimal dependencies (`socket.io-client`)
