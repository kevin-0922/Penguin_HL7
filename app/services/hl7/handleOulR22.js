const { get, run } = require('../../database/db');
const { buildAckResponse } = require('../../utils/formatters/ackMessage');
const { extractMsgControlId } = require('../../utils/formatters/extractors');

// 解析 OUL^R22 訊息，不假設 ORC/OBR 固定順序
function parseOulR22(message) {
  const lines = message.split(/\r\n|\r|\n/).filter(l => l.trim());
  
  const result = {
    pid: null,
    spm: null,
    orc: null,
    obr: null,
    obx: []
  };

  lines.forEach(line => {
    const fields = line.split('|');
    const segType = fields[0];

    if (segType === 'PID') {
      result.pid = { patientId: fields[3], patientName: fields[5] };
    } else if (segType === 'SPM') {
      result.spm = { specimenId: fields[2] };
    } else if (segType === 'ORC') {
      result.orc = { orderControl: fields[1], orderId: fields[2] };
    } else if (segType === 'OBR') {
      result.obr = { placerOrderNumber: fields[2], fillerOrderNumber: fields[3] };
    } else if (segType === 'OBX') {
      result.obx.push({ observationId: fields[3], value: fields[5], status: fields[11] });
    }
  });

  return result;
}

async function handleOulR22(message) {
  try {
    const parsed = parseOulR22(message);
    console.log('LAB-82 解析結果:', JSON.stringify(parsed, null, 2));

    // 取得 order id（ORC-2 或 OBR-2，兩者擇一，因為順序可能顛倒）
    const orderId = (parsed.orc && parsed.orc.orderId) || 
                     (parsed.obr && parsed.obr.placerOrderNumber) || 
                     (parsed.spm && parsed.spm.specimenId);

    if (!orderId) {
      console.warn('LAB-82：無法從訊息中找到訂單識別碼');
      return buildAckResponse(message, 'AA', 'Status received but no order ID found');
    }

    console.log(`LAB-82：更新訂單 ${orderId} 的狀態`);

    // 嘗試更新 slicing_schedule 的狀態（用 LIKE 模糊比對，因為 order_id 格式可能不完全一致）
    try {
      await run(
        `UPDATE slicing_schedule SET status = ? WHERE order_id::text LIKE ? OR message_content::text LIKE ?`,
        ['scan_completed', `%${orderId}%`, `%${orderId}%`]
      );
      console.log(`LAB-82：已更新訂單 ${orderId} 狀態為 scan_completed`);
    } catch (dbErr) {
      console.error('LAB-82：更新資料庫狀態失敗:', dbErr.message);
    }

    return buildAckResponse(message, 'AA', 'LAB-82 status update processed');

  } catch (error) {
    console.error('處理 LAB-82（OUL^R22）時發生錯誤:', error);
    return buildAckResponse(message, 'AE', error.message);
  }
}

module.exports = handleOulR22;
