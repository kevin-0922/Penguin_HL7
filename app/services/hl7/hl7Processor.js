
const  handleOrmO19  = require('./handleOrmO19');
const  handleOmiO23  = require('./handleOmiO23')
async function processHL7Message(message) {
  let ack;

  try {
    console.log('handleOmiO23:', handleOmiO23);
    if (message.includes('OMI^O23')) {
      ack = await handleOmiO23(message);
    } else if (message.includes('ORM^O19')) {
      ack = await handleOrmO19(message);
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
