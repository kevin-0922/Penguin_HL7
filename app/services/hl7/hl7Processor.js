const handleOrmO19 = require('./handleOrmO19');
const handleOmiO23 = require('./handleOmiO23');

async function processHL7Message(message) {
  let ack;

  try {
    // 先去掉 MLLP 封包 (0x0B 開頭，0x1C0D 結尾)
   //let cleanMsg = message.toString('utf-8').replace(/^\x0B|\x1C\x0D$/g, '');

    // 將 CR 或 CRLF 統一為單 CR 分段
   // cleanMsg = cleanMsg.replace(/\r\n/g, '\r');

    console.log('收到的 HL7 訊息:', message);

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
