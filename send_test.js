const net = require('net');
const fs = require('fs');

const content = fs.readFileSync('test_o33.hl7', 'utf-8');
const hl7Msg = content.replace(/\n/g, '\r').replace(/\r$/, '');

const mllpMsg = Buffer.concat([
  Buffer.from([0x0b]),
  Buffer.from(hl7Msg, 'utf-8'),
  Buffer.from([0x1c, 0x0d])
]);

const client = new net.Socket();
client.setTimeout(5000);

client.connect(4321, 'localhost', () => {
  console.log('已連線，送出訊息...');
  client.write(mllpMsg);
});

client.on('data', (data) => {
  console.log('收到回應:', data.toString('utf-8'));
  client.end();
});

client.on('timeout', () => {
  console.log('連線逾時');
  client.end();
});

client.on('error', (err) => {
  console.error('連線錯誤:', err.message);
});

client.on('close', () => {
  console.log('連線關閉');
});
