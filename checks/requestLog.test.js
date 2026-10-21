const { test } = require('node:test');
const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const log = require('../app/observability/requestLog');
function snapshot() {
  let result;
  log.list({}, { set() {}, json(value) { result = value; } });
  return result;
}
test('HTTP status, IP and duration; no query, headers or body; record once', () => {
  const req = { path: '/hl7', method: 'POST', ip: '192.168.1.50', socket: { remoteAddress: '192.168.1.50' }, body: 'private', headers: { authorization: 'secret' }, originalUrl: '/hl7?token=secret' };
  const res = new EventEmitter();
  res.statusCode = 400;
  res.writableFinished = true;
  log.middleware(req, res, () => {});
  req.path = '/'; // Express may change the path while traversing mounted routes.
  res.emit('finish'); res.emit('close');
  const rows = snapshot().data;
  assert.equal(rows.length, 1);
  assert.equal(rows[0].status, 400);
  assert.equal(rows[0].ip, req.ip);
  assert.equal(rows[0].path, '/hl7');
  assert.ok(rows[0].durationMs >= 0);
  assert.ok(!JSON.stringify(rows).includes('secret'));
  assert.ok(!JSON.stringify(rows).includes('private'));
});
test('viewer and local health probes do not consume history', () => {
  for (const path of ['/api/request-logs', '/api/db-test']) {
    log.middleware({ path, socket: { remoteAddress: '127.0.0.1' } }, {}, () => {});
  }
  assert.equal(snapshot().data.length, 1);
});
test('history stays bounded and newest events come first', () => {
  for (let n = 0; n < 1100; n++) log.record({ protocol: 'MLLP', status: String(n) });
  const result = snapshot();
  assert.equal(result.data.length, result.capacity);
  assert.equal(result.data[0].status, '1099');
});
