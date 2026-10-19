const handleOrmO19 = require('./handleOrmO19');
const handleOmiO23 = require('./handleOmiO23');
const handleOmlO33 = require('./handleOmlO33');
const handleQbpQ11 = require('./handleQbpQ11');
const handleOulR22 = require('./handleOulR22');  // ← 新增這行

async function processHL7Message(message) {
  let ack;

  try {
    console.log('收到的 HL7 訊息:', message);

    if (message.includes('OMI^O23')) {
      ack = await handleOmiO23(message);
    } else if (message.includes('ORM^O19')) {
      ack = await handleOrmO19(message);
    } else if (message.includes('OML^O33')) {
      ack = await handleOmlO33(message);
    } else if (message.includes('QBP^Q11')) {
      ack = await handleQbpQ11(message);
    } else if (message.includes('OUL^R22')) {
      ack = await handleOulR22(message);  // ← 改用真正的 handler
    } else {
      console.warn('未知 HL7 訊息類型');
      ack = 'MSA|AE|Unknown message type';
    }
  } catch (err) {
    console.error('處理 HL7 訊息錯誤:', err);
    ack = 'MSA|AE|Processing error';
  }

  return ack;
}

module.exports = { processHL7Message };