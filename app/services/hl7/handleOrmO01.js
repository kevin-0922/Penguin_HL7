const util = require('util');
// 導入資料庫中的 run 函數
const { run } = require('../../database/db');
// 統一導入所有解析器
const {
  parseMSH,
  parseOBR,
  parseORC,
  parsePID,
} = require('../../utils/parsers');

const {
  extractMsgControlId,
  extractSender,
  extractReceiver,
} = require('../../utils/formatters/extractors');

const { buildAckResponse } = require('../../utils/formatters/ackMessage');
const { convertHl7ToJson } = require('../../utils/formatters/hl7Converter');

// 生成唯一的訂單 ID
const generateOrderId = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 10000);
  return `ORD${timestamp}${random}`;
};

// 處理ORM^O01訊息
async function handleOrmO01(message) {
  console.log('收到 ORM^O01 訊息:');
  console.log(util.inspect(message, {
    depth: null,
    maxArrayLength: null,
    maxStringLength: null,
    colors: true
  }));
  
  try {
    // 生成唯一的訂單 ID
    const orderId = generateOrderId();
    // 生成唯一的回應 ID
    const responseId = `RESP${new Date().getTime()}${Math.floor(Math.random() * 10000)}`;
    
    // 創建 HL7 適配器
    let hl7Msg;
    try {
      hl7Msg = createHL7Adapter(message);
      console.log('成功將消息解析為 HL7 對象');
    } catch (parseError) {
      console.error('解析 HL7 消息時出錯:', parseError);
      throw parseError;
    }
    
    // 解析訊息部分
    const msh = parseMSH(hl7Msg);
    const pid = parsePID(hl7Msg);
    const orc = parseORC(hl7Msg);
    const obr = parseOBR(hl7Msg);
    
    console.log('解析結果:');
    console.log('MSH:', msh);
    console.log('PID:', pid);
    console.log('ORC:', orc);
    console.log('OBR:', obr);
    
    // 將 HL7 訊息轉換為 JSON 格式
    const jsonMessage = convertHl7ToJson(message);
    console.log('轉換後的 JSON 格式:', jsonMessage);
    
    // 獲取消息控制 ID 和訂單控制代碼
    const messageControlId = msh.messageControlId || extractMsgControlId(message);
    const orderControl = orc?.orderControl || 'NW';
    
    try {
      const messageType = 'ORM^O01^ORM_O01';
      const sender = extractSender(message);
      const receiver = extractReceiver(message);
      
      // 儲存接收的訊息到資料庫
      await run(
        `INSERT INTO received_messages 
        (message_type, message_control_id, sender, receiver, message_content, status)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [messageType, messageControlId, sender, receiver, JSON.stringify(jsonMessage), 'received']
      );
      console.log('ORM^O01 訊息已儲存到資料庫');
      
      // 處理醫療訂單 (包含放射科訂單，因為O01直接等同於RAD-01)
      await run(
        `INSERT INTO orm_o01_orders
        (order_id, patient_id, patient_name, order_status, ordering_provider, order_datetime, order_details, message_control_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          pid?.patientId || '',
          pid?.patientName || '',
          orc?.orderStatus || 'NW',
          orc?.orderingProvider || '',
          orc?.dateTimeOfTransaction || new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14),
          JSON.stringify(jsonMessage),
          messageControlId
        ]
      );
      console.log('ORM^O01 訊息已儲存到醫療訂單表，訂單 ID:', orderId);
      
    } catch (dbError) {
      console.error('儲存 ORM^O01 訊息時發生錯誤:', dbError);
      // 儲存失敗不影響後續處理
    }
    
    // 構建 O02 回應訊息
    const o02Response = buildO02Response(message, msh, pid, orc, orderId);
    console.log('生成 O02 回應:', o02Response);
    
    // 將 O02 回應訊息轉換為 JSON 格式
    const jsonO02Response = convertHl7ToJson(o02Response);
    console.log('轉換後的 O02 JSON 格式:', jsonO02Response);
    
    try {
      const messageControlId = extractMsgControlId(message) + '_O02';
      const sender = extractReceiver(message); // 角色互換
      const receiver = extractSender(message); // 角色互換
      
      // 儲存發送的回應訊息到資料庫
      const sentResult = await run(
        `INSERT INTO sent_messages 
        (message_type, message_control_id, sender, receiver, message_content, status)
        VALUES (?, ?, ?, ?, ?, ?)`,
        ['ORR^O02^ORR_O02', messageControlId, sender, receiver, JSON.stringify(jsonO02Response), 'sent']
      );
      console.log('O02 回應訊息已儲存到 sent_messages 表');
      
      // 儲存 O02 回應到專用表
      await run(
        `INSERT INTO orm_o02_responses
        (response_id, order_id, response_status, response_datetime, response_details, message_control_id)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          responseId,
          orderId,
          'AA', // 成功回應
          new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14),
          JSON.stringify(jsonO02Response),
          messageControlId
        ]
      );
      console.log('O02 回應訊息已儲存到 orm_o02_responses 表，回應 ID:', responseId);
      
    } catch (dbError) {
      console.error('儲存 O02 回應訊息時發生錯誤:', dbError);
      // 儲存失敗不影響後續處理
    }
    
    // 構建 ACK 回應
    const ackResponse = buildAckResponse(message, 'AA', 'Message received and processed successfully');
    
    return ackResponse;
  } catch (error) {
    console.error('處理 ORM^O01 訊息時發生錯誤:', error);
    return buildAckResponse(message, 'AE', error.message);
  }
}

// 構建 O02 回應訊息
const buildO02Response = (message, msh, pid, orc, orderId) => {
  try {
    const timestamp = new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);
    const messageControlId = msh.messageControlId || 'UNKNOWN';
    const sendingApp = msh.receivingApplication || '';
    const sendingFacility = msh.receivingFacility || '';
    const receivingApp = msh.sendingApplication || '';
    const receivingFacility = msh.sendingFacility || '';
    
    // 構建 O02 回應
    return [
      `MSH|^~\&|${sendingApp}|${sendingFacility}|${receivingApp}|${receivingFacility}|${timestamp}||ORR^O02^ORR_O02|${messageControlId}_O02|P|2.5.1`,
      `MSA|AA|${messageControlId}|Order processed successfully`,
      `PID|1||${pid?.patientId || ''}^^^MRN||${pid?.patientName || ''}||||||||||||||||`,
      `ORC|${orc?.orderControl || 'NW'}|${orderId}|${orc?.placerOrderNumber || ''}|${orc?.fillerOrderNumber || ''}|CM||^^^${timestamp}^^R|||||${orc?.orderingProvider || ''}|||||`
    ].join('\r');
  } catch (error) {
    console.error('構建 O02 回應時發生錯誤:', error);
    return `MSH|^~\&|ERROR|ERROR|ERROR|ERROR|${new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14)}||ORR^O02^ORR_O02|ERROR|P|2.5.1\rMSA|AE|ERROR|Error constructing O02 response: ${error.message}`;
  }
};

// 創建 HL7 適配器
const createHL7Adapter = (message) => {
  console.log('創建 HL7 適配器...');
  // 分割消息為段落
  const segments = message.split(/\r\n|\r|\n/);
  console.log(`找到 ${segments.length} 個段落`);
  
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

module.exports = handleOrmO01;
