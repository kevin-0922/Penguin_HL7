// 統一導入所有解析器
const {
  parseMSH,
  parseOBR,
  parseORC,
  parsePID,
  parseSPM,
  parseQPD
} = require('../../utils/parsers');

const {
  extractMsgControlId,
  extractSender,
  extractReceiver,
} = require('../../utils/formatters/extractors');

const { buildAckResponse } = require('../../utils/formatters/ackMessage');

const { get } = require('../../database/db');


// 處理QBP^Q11訊息
async function handleQbpQ11(message) {
  try {
    const msh = parseMSH(message);
    
    console.log('==== 處理 QBP^Q11 訊息 ====');
    console.log('MSH部分:', msh);

    // 這裡你可以擴充：解析QPD段、做查詢等
     const qpd = parseQPD(message); // 自行建立 parseQPD 工具
     console.log('qpd部分:', qpd);
     const responseData = await queryByQpd(qpd); // 自定義查詢函式
     
    // 構建RSP^K11回應（假設你要用RSP回覆）
    const response = buildRspK11Response(message, msh);
    console.log('生成RSP^K11回應:', response);

    return buildAckResponse(message, 'AA', 'QBP^Q11 message processed');
  } catch (error) {
    console.error('處理QBP^Q11訊息時發生錯誤:', error);
    return buildAckResponse(message, 'AE', error.message);
  }
}

// 處理QPD段查詢
const queryByQpd = async (qpd) => {
  try {
    const patientId = qpd.queryTag; // 假設你把病人ID放在這

    if (!patientId) {
      throw new Error('QPD 中缺少查詢條件（預期病人 ID）');
    }

    const row = await get(
      `SELECT * FROM received_messages WHERE message_content LIKE ?`,
      [`%${patientId}%`]////
    );

    if (!row) {
      console.log(`查無資料，Patient ID: ${patientId}`);
      return null;
    }

    return row;
  } catch (err) {
    console.error('queryByQpd 發生錯誤:', err.message);
    throw err;
  }
};

// 構建RSP^K11回應
const buildRspK11Response = (originalMessage, msh) => {
  const currentTime = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  return [
    `MSH|^~\&|${msh.receivingApplication}|${msh.receivingFacility}|${msh.sendingApplication}|${msh.sendingFacility}|${currentTime}||RSP^K11|${extractMsgControlId(originalMessage)}_RSP|P|2.5.1`,
    `MSA|AA|${extractMsgControlId(originalMessage)}`,
    `QAK|${extractMsgControlId(originalMessage)}|OK`,
    `QPD|${msh.messageType}|${extractMsgControlId(originalMessage)}`
    // 可以再加你要的查詢結果段（如 PID、OBX 等）
  ].join('\r');
};

module.exports = handleQbpQ11;