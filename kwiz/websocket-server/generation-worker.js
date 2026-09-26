/**
 * Background MCQ generation worker (Redis queue → LLM API → Moodle callback).
 */

const GENERATION_QUEUE = process.env.GENERATION_QUEUE_KEY || 'gamifiedquiz:generation:queue';
const WORKER_TOKEN = process.env.GENERATION_WORKER_SECRET || '';
// Use internal Docker hostname (not browser MOODLE_URL like http://localhost:8080).
const MOODLE_URL = (process.env.MOODLE_INTERNAL_URL || 'http://moodle').replace(/\/$/, '');
const LOCAL_BATCH_SIZE = parseInt(process.env.LOCAL_GENERATION_BATCH_SIZE || '3', 10);
// Node fetch (undici) defaults headersTimeout ~300s; local LLM often needs longer.
const LLM_FETCH_TIMEOUT_MS = parseInt(process.env.LLM_FETCH_TIMEOUT_MS || '1200000', 10);

const { Agent } = require('undici');
const llmFetchDispatcher = new Agent({
  connectTimeout: 30_000,
  headersTimeout: LLM_FETCH_TIMEOUT_MS,
  bodyTimeout: LLM_FETCH_TIMEOUT_MS,
});

function formatLogTime(date = new Date()) {
  return date.toISOString();
}

function formatDuration(ms) {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  const sec = (ms / 1000).toFixed(1);
  if (ms < 60000) {
    return `${sec}s (${ms}ms)`;
  }
  const min = Math.floor(ms / 60000);
  const remSec = ((ms % 60000) / 1000).toFixed(1);
  return `${min}m ${remSec}s (${ms}ms)`;
}

function jobLabel(job) {
  const category = job.category_name || job.topic || 'unknown';
  return `${job.request_uuid} [${category}]`;
}

function formatFetchError(err) {
  if (!err) {
    return 'unknown error';
  }
  const cause = err.cause;
  if (cause) {
    return `${err.message} (${cause.code || 'error'}: ${cause.message || cause})`;
  }
  return err.message || String(err);
}

async function moodleCallback(path, body) {
  const url = `${MOODLE_URL}/mod/gamifiedquiz/ajax/${path}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Worker-Token': WORKER_TOKEN,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Moodle callback invalid JSON (${res.status}): ${text.substring(0, 200)}`);
  }
  if (!res.ok) {
    throw new Error(`Moodle HTTP ${res.status}: ${text.substring(0, 300)}`);
  }
  if (data.success === false || data.error) {
    throw new Error(data.error || data.message || 'Moodle callback reported failure');
  }
  return data;
}

async function callLlmGenerate(job, nQuestions, meta = {}) {
  const { label = job.request_uuid, batchIndex = 1, batchTotal = 1 } = meta;
  const apiUrl = (job.api_url || 'http://llmapi:5001').replace(/\/$/, '');
  const modelHint = job.llm_model || (job.backend === 'local' ? process.env.OLLAMA_MODEL || 'ollama-default' : job.backend);

  console.log(
    `[generation] LLM RUN ${label} batch ${batchIndex}/${batchTotal} ` +
    `— calling ${apiUrl}/generate for ${nQuestions} question(s) ` +
    `(backend=${job.backend}, model=${modelHint}) at ${formatLogTime()}`
  );
  const llmStarted = Date.now();

  const payload = {
    topic: job.topic,
    level: job.level,
    n_questions: nQuestions,
    language: job.language,
    backend: job.backend,
  };
  if (job.learning_outcomes) {
    payload.learning_outcomes = job.learning_outcomes;
  }
  if (job.lesson_context) {
    payload.context = job.lesson_context;
  }
  if (job.backend === 'local' && job.llm_model) {
    payload.model = job.llm_model;
  }
  if (job.backend === 'openai' && job.user_api_key) {
    payload.openai_api_key = job.user_api_key;
  }
  if (job.backend === 'gemini' && job.user_api_key) {
    payload.gemini_api_key = job.user_api_key;
  }

  const timeoutMs = job.backend === 'local' ? LLM_FETCH_TIMEOUT_MS : 180000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${apiUrl}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
      dispatcher: llmFetchDispatcher,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `LLM API HTTP ${res.status}`);
    }
    if (!data.questions || !Array.isArray(data.questions)) {
      throw new Error(data.error || 'LLM API returned no questions');
    }
    console.log(
      `[generation] LLM DONE ${label} batch ${batchIndex}/${batchTotal} ` +
      `— received ${data.questions.length} question(s) in ${formatDuration(Date.now() - llmStarted)}`
    );
    return data.questions;
  } catch (err) {
    console.error(
      `[generation] LLM FAIL ${label} batch ${batchIndex}/${batchTotal} ` +
      `after ${formatDuration(Date.now() - llmStarted)}: ${formatFetchError(err)}`
    );
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function generateAllQuestions(job, label) {
  const total = job.count;
  const batchSize = job.backend === 'local' ? LOCAL_BATCH_SIZE : total;
  const batchTotal = Math.ceil(total / batchSize);
  const all = [];
  let remaining = total;
  let batchIndex = 0;

  console.log(
    `[generation] LLM plan ${label} — ${total} question(s) in ${batchTotal} batch(es) ` +
    `(batch size ${batchSize}, backend=${job.backend})`
  );

  while (remaining > 0) {
    batchIndex += 1;
    const n = Math.min(batchSize, remaining);
    const chunk = await callLlmGenerate(job, n, { label, batchIndex, batchTotal });
    all.push(...chunk);
    remaining -= n;
  }

  console.log(`[generation] LLM complete ${label} — ${all.length} question(s) total from API`);
  return all;
}

async function processJob(job, io) {
  const startTime = new Date();
  const started = startTime.getTime();
  const label = jobLabel(job);
  console.log(
    `[generation] START ${label} at ${formatLogTime(startTime)} ` +
    `(count=${job.count}, backend=${job.backend || 'default'})`
  );

  try {
    await moodleCallback('complete_generation_job.php', {
      request_uuid: job.request_uuid,
      status: 'running',
    });
  } catch (statusErr) {
    console.warn(`[generation] Could not mark job running in Moodle: ${formatFetchError(statusErr)}`);
  }

  try {
    console.log(`[generation] LLM starting ${label} at ${formatLogTime()}`);
    const questions = await generateAllQuestions(job, label);
    const durationMs = Date.now() - started;

    await moodleCallback('complete_generation_job.php', {
      request_uuid: job.request_uuid,
      status: 'success',
      questions,
      generated_count: questions.length,
      duration_ms: durationMs,
    });

    if (io && job.userid) {
      io.to(`user:${job.userid}`).emit('generation:complete', {
        job_id: job.request_uuid,
        batch_id: job.batch_id || null,
        category_name: job.category_name || '',
        success: true,
        count: questions.length,
      });
    }

    const endTime = new Date();
    console.log(
      `[generation] END ${label} at ${formatLogTime(endTime)} ` +
      `— ${questions.length} question(s), took ${formatDuration(durationMs)}`
    );
  } catch (err) {
    const durationMs = Date.now() - started;
    const endTime = new Date();
    const message = err.message || String(err);
    console.error(
      `[generation] END ${label} at ${formatLogTime(endTime)} — FAILED after ${formatDuration(durationMs)}: ${message}`
    );

    try {
      await moodleCallback('complete_generation_job.php', {
        request_uuid: job.request_uuid,
        status: 'error',
        error_message: message,
        duration_ms: durationMs,
      });
    } catch (callbackErr) {
      console.error(`[generation] Could not save error status to Moodle: ${formatFetchError(callbackErr)}`);
    }

    if (io && job.userid) {
      io.to(`user:${job.userid}`).emit('generation:complete', {
        job_id: job.request_uuid,
        batch_id: job.batch_id || null,
        category_name: job.category_name || '',
        success: false,
        error: message,
      });
    }
  }
}

function registerGenerationRoutes(app, redisClient, io) {
  app.post('/internal/generation/enqueue', async (req, res) => {
    const token = req.headers['x-worker-token'];
    if (!WORKER_TOKEN || token !== WORKER_TOKEN) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
    const job = req.body;
    if (!job || !job.request_uuid) {
      return res.status(400).json({ success: false, error: 'Invalid job payload' });
    }
    await redisClient.rPush(GENERATION_QUEUE, JSON.stringify(job));
    const category = job.category_name || job.topic || '';
    console.log(
      `[generation] Enqueued ${job.request_uuid}` +
      (category ? ` [${category}]` : '') +
      ` at ${formatLogTime()} (count=${job.count || '?'})`
    );
    return res.json({ success: true, queued: true });
  });
}

async function startGenerationWorker(redisBlockingClient, io) {
  if (!WORKER_TOKEN) {
    console.warn('[generation] GENERATION_WORKER_SECRET not set — background generation disabled');
    return;
  }

  console.log(`[generation] Worker listening on queue ${GENERATION_QUEUE} (dedicated Redis connection)`);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const result = await redisBlockingClient.blPop(GENERATION_QUEUE, 0);
      const raw = result?.element || result?.value;
      if (!raw) {
        continue;
      }
      const job = JSON.parse(raw);
      await processJob(job, io);
    } catch (err) {
      console.error('[generation] Worker loop error:', err);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

module.exports = {
  registerGenerationRoutes,
  startGenerationWorker,
};
