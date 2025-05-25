const util = require('util');
// 導入資料庫中的 run 函數
const { run } = require('../../database/db');
// 統一導入所有解析器
const {
  parseMSH,
  parseOBR,
  parseORC,
  parsePID,
  parseSPM,
  parseOBX,
  parseSAC,
} = require('../../utils/parsers');

const {
  extractMsgControlId,
  extractSender,
  extractReceiver,
} = require('../../utils/formatters/extractors');

const { buildAckResponse } = require('../../utils/formatters/ackMessage');

// 處理OML^O33訊息
async function handleOmlO33(message) {
  console.log('message測試:');
  console.log(util.inspect(message, {
    depth: null,           // 無限制的物件深度
    maxArrayLength: null,  // 無限制的陣列長度
    maxStringLength: null, // 無限制的字串長度
    colors: true           // 如果你想在 terminal 顯示顏色
  }));
  try {
    let hl7Msg;
    try {
      // 規範化換行符
      hl7Msg = createHL7Adapter(message);
      console.log('成功將消息解析為HL7對象');
    } catch (parseError) {
      console.error('解析HL7消息時出錯:', parseError);
      // 如果解析失敗，創建模擬對象
      hl7Msg = createHL7Adapter(message);
    }
    // 解析訊息部分
    const msh = parseMSH(hl7Msg);
    const pid = parsePID(hl7Msg);
    const orc = parseORC(hl7Msg);
    const obr = parseOBR(hl7Msg);
    const spm = parseSPM(hl7Msg);
    const obx = parseOBX(hl7Msg);
    const sac = parseSAC(hl7Msg);
    
    // 只在控制台輸出訊息內容和解析結果
    console.log('==== 處理 OML^O33 訊息 ====');
    console.log('MSH部分:', msh);
    console.log('PID部分:', pid);
    console.log('ORC部分:', orc);
    console.log('OBR部分:', obr);
    console.log('SPM部分:', spm);
    console.log('OBX部分:', obx);
    console.log('SAC部分:', sac);
    

    try {
      const messageType = 'OML^O33^OML_O33';
      const messageControlId = extractMsgControlId(message);
      const sender = extractSender(message);
      const receiver = extractReceiver(message);
      
      await run(
        `INSERT INTO received_messages 
        (message_type, message_control_id, sender, receiver, message_content, status)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [messageType, messageControlId, sender, receiver, message, 'received']
      );
      console.log('O33訊息已儲存到資料庫');
    } catch (dbError) {
      console.error('儲存O33訊息時發生錯誤:', dbError);
      // 儲存失敗不影響後續處理
    }
    
    // 構建O34回應訊息(可選)
    const o34Response = buildO34Response(message, msh, pid);
    console.log('生成O34回應:', o34Response);

    try {
      const messageControlId = extractMsgControlId(message) + '_O34';
      const sender = extractReceiver(message); // 角色互換
      const receiver = extractSender(message); // 角色互換
      
      await run(
        `INSERT INTO sent_messages 
        (message_type, message_control_id, sender, receiver, message_content, status)
        VALUES (?, ?, ?, ?, ?, ?)`,
        ['ORL^O34', messageControlId, sender, receiver, o34Response, 'sent']
      );
      console.log('O34回應訊息已儲存到資料庫');
    } catch (dbError) {
      console.error('儲存O34回應訊息時發生錯誤:', dbError);
      // 儲存失敗不影響後續處理
    }
    
    // 構建ACK回應
    const ackResponse = buildAckResponse(message, 'AA', 'Message received and processed successfully');

    return ackResponse;
  } catch (error) {
    console.error('處理OML^O33訊息時發生錯誤:', error);
    return buildAckResponse(message, 'AE', error.message);
  }
}


// 構建O34回應訊息
const buildO34Response = (message, msh, pid) => {
  try {
    const timestamp = new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);
    const messageControlId = msh.messageControlId || 'UNKNOWN';
    const sendingApp = msh.receivingApplication || '';
    const sendingFacility = msh.receivingFacility || '';
    const receivingApp = msh.sendingApplication || '';
    const receivingFacility = msh.sendingFacility || '';
    
    // 構建O34回應
    return [
      `MSH|^~\\&|${sendingApp}|${sendingFacility}|${receivingApp}|${receivingFacility}|${timestamp}||ORL^O34|${messageControlId}_ACK|P|2.5.1`,
      `MSA|AA|${messageControlId}|Message processed successfully`,
      `PID|1||${pid?.patientId || ''}^^^MRN||${pid?.patientName || ''}||||||||||||||||`
    ].join('\r');
  } catch (error) {
    console.error('構建O34回應時發生錯誤:', error);
    return `MSH|^~\\&|ERROR|ERROR|ERROR|ERROR|${new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14)}||ORL^O34|ERROR|P|2.5.1\rMSA|AE|ERROR|Error constructing O34 response: ${error.message}`;
  }
};

// 創建HL7適配器
const createHL7Adapter = (message) => {
  console.log('創建HL7適配器...');
  // 分割消息為段落
  const segments = message.split(/\r\n|\r|\n/);
  console.log(`找到 ${segments.length} 個段落`);
  console.log(util.inspect(segments, {
    depth: null,           // 無限制的物件深度
    maxArrayLength: null,  // 無限制的陣列長度
    maxStringLength: null, // 無限制的字串長度
    colors: true           // 如果你想在 terminal 顯示顏色
  }));
  
  // 創建適配器對象
  return {
    getSegment: function(segmentType) {
      const segment = segments.find(s => s.startsWith(segmentType));
      if (!segment) {
        console.log(`找不到 ${segmentType} 段落`);
        return null;
      }
      console.log(`找到 ${segmentType} 段落:`, segment);
      const fields = segment.split('|');
      return {
        fields: fields.map((value, i) => ({ value })),
        get: function(index) {
          return fields[index] || '';
        }
      };
    }
  };
};




module.exports = handleOmlO33;