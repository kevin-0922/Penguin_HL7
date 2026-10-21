const entries = [];
const capacity = 1000;
let sequence = 0;
const startedAt = new Date().toISOString();

function record(entry) {
  entries.push({ ...entry, id: ++sequence, time: new Date().toISOString() });
  if (entries.length > capacity) entries.shift();
}

function middleware(req, res, next) {
  // Avoid generating noise from the viewer itself and local Docker health probes.
  if (req.path === '/api/request-logs' ||
      (req.path === '/api/db-test' && ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.socket.remoteAddress))) {
    return next();
  }
  const path = req.path.slice(0, 512);
  const start = process.hrtime.bigint();
  let recorded = false;
  const complete = (aborted) => {
    if (recorded) return;
    recorded = true;
    record({ protocol: 'HTTP', ip: req.ip, method: req.method,
      path, status: aborted ? 'ABORTED' : res.statusCode,
      durationMs: Math.round(Number(process.hrtime.bigint() - start) / 1e6) });
  };
  res.once('finish', () => complete(false));
  res.once('close', () => complete(!res.writableFinished));
  next();
}

function list(req, res) {
  res.set('Cache-Control', 'no-store');
  res.json({ success: true, capacity, startedAt, data: entries.slice().reverse() });
}

module.exports = { record, middleware, list };
