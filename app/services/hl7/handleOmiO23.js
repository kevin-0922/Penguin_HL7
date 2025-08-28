const util = require('util');
// 導入資料庫中的 run 函數
const { run, get } = require('../../database/db');
// 統一導入所有解析器
const {
  parseMSH,
  parseOBR,
  parseORC,
  parsePID,
  parsePV1,
  parseTQ1,
  parseIPC,
  parseDG1
} = require('../../utils/parsers');


const {
  extractMsgControlId,
  extractSender,
  extractReceiver,
} = require('../../utils/formatters/extractors');


const { buildAckResponse } = require('../../utils/formatters/ackMessage');
const { convertHl7ToJson } = require('../../utils/formatters/hl7Converter');
const { convertO23ToDicom } = require('../dicom/hl7ToDicomConverter');


// 生成唯一的訂單 ID
const generateOrderId = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 10000);
  return `ORD${timestamp}${random}`;
};


// 處理ORM^O23訊息
async function handleOmiO23(message) {
  console.log('收到 OMI^O23 訊息:');
  console.log(util.inspect(message, {
    depth: null,
    maxArrayLength: null,
    maxStringLength: null,
    colors: true
  }));
  
  try {
    // 生成唯一的訂單 ID
    const orderId = generateOrderId();
    
    // 創建 HL7 適配器
    let hl7Msg;
    try {
      hl7Msg = createHL7Adapter(message);
      console.log('成功將消息解析為 HL7 對象');
    } catch (parseError) {
      console.error('解析 HL7 消息時出錯:', parseError);
      throw parseError;
    }
    
    // 解析所有訊息段落
    const msh = parseMSH(hl7Msg);
    const pid = parsePID(hl7Msg);
    const pv1 = parsePV1(hl7Msg);
    const dg1 = parseDG1(hl7Msg);
    const orc = parseORC(hl7Msg);
    const tq1 = parseTQ1(hl7Msg);
    const obr = parseOBR(hl7Msg);
    const ipc = parseIPC(hl7Msg);
    
    // console.log('解析結果:');
    // console.log('MSH:', msh);
    // console.log('PID:', pid);
    // console.log('PV1:', pv1);
    // console.log('DG1:', dg1);
    // console.log('ORC:', orc);
    // console.log('TQ1:', tq1);
    // console.log('OBR:', obr);
    // console.log('IPC:', ipc);
    
    // 構建完整的 HL7 JSON 物件用於 DICOM 轉換
    const hl7JsonForDicom = {
      MSH: msh,
      PID: pid,
      PV1: pv1,
      DG1: dg1,
      ORC: orc,
      TQ1: tq1,
      OBR: obr,
      IPC: ipc
    };
    
    // 將 HL7 訊息轉換為 JSON 格式 (用於資料庫存儲)
    const jsonMessage = convertHl7ToJson(message);
    //console.log('轉換後的 JSON 格式:', jsonMessage);
    
    // 獲取消息控制 ID 和訂單控制代碼
    const messageControlId = msh.messageControlId || extractMsgControlId(message);
    const orderControl = orc?.orderControl || 'NW';
    
    try {
      const messageType = 'OMI^O23^OMI_O23';
      const sender = extractSender(message);
      const receiver = extractReceiver(message);
      
      // 儲存接收的訊息到資料庫
      await run(
        `INSERT INTO received_messages 
        (message_type, message_control_id, sender, receiver, message_content, status)
        VALUES (?, ?, ?, ?, ?, ?) `,
        [messageType, messageControlId, sender, receiver, JSON.stringify(jsonMessage), 'received']
      );
      console.log('OMI^O23 訊息已儲存到資料庫');
      
      // 轉換為 DICOM 並存儲到 raccon 
      console.log('🔄 開始轉換為 DICOM 格式...');
      const dicomResult = await convertO23ToDicom(hl7JsonForDicom, orderId);
      if (dicomResult) {
        console.log('✅ DICOM 轉換成功並已存儲到 raccon ');
      } else {
        console.log('❌ DICOM 轉換失敗');
      }
      
      let result;
      const patientId = pid?.patientId || '';
      const patientName = pid?.patientName || '';
      const orderDateTime = orc?.dateTimeOfTransaction || new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);



      switch (orderControl) {
        case 'NW': // New Order - 新增訂單
          console.log('ORC Order Control: NW (新增訂單)');
          const newOrderId = generateOrderId();
          const newOrderData = {
            order_id: newOrderId,
            patient_id: patientId,
            patient_name: patientName,
            order_status: orderControl,
            order_datetime: orderDateTime,
            order_details: jsonMessage,
            message_control_id: messageControlId,
          };
          result = await insertOmiO23Order(newOrderData);
          console.log(`ORM^O23 訊息已 ${result.action} 到醫療訂單表，訂單 ID:`, result.order_id);
          break;


        case 'XO': // 修改訂單
          console.log('ORC Order Control: XO (修改訂單)');
          const existingOrderData = {
            patient_id: patientId, 
            patient_name: patientName,
            order_status: orderControl,
            order_datetime: orderDateTime,
            order_details: jsonMessage,
            message_control_id: messageControlId,
          };
          result = await updateOmiO23Order(existingOrderData);
          console.log(`ORM^O23 訊息已 ${result.action} 到醫療訂單表`, );
          break;
          
        case 'CA': // 取消訂單
          console.log('ORC Order Control: CA (取消訂單)');
          result = await deleteOmiO23Order(patientId, patientName);
          console.log(`OMI^O23 訊息已 ${result.action} 到醫療訂單表，針對病人 ID: ${patientId}, 姓名: ${patientName}`);
          break;
        default:
          // 如果 orderControl 不是 NW, XO, CA預設當作 NW 處理 (新增)
          const defaultNewOrderId = generateOrderId();
          const defaultNewOrderData = {
            order_id: defaultNewOrderId,
            patient_id: patientId,
            patient_name: patientName,
            order_status: orderControl, // 使用原始的 orderControl
            order_datetime: orderDateTime,
            order_details: jsonMessage,
            message_control_id: messageControlId,
          };
          result = await insertOmiO23Order(defaultNewOrderData); // 預設新增
          console.log(`OMI^O23 訊息已 ${result.action} 到醫療訂單表 (預設處理)，訂單 ID:`, result.order_id);
          break;
      }       
    } catch (dbError) {
      console.error('儲存 OMI^O23 訊息時發生錯誤:', dbError);
      // 儲存失敗不影響後續處理
    }
    
    // 構建 ACK 回應
    const ackResponse = buildAckResponse(message, 'AA', 'Message received and processed successfully');
    
    return ackResponse;
  } catch (error) {
    console.error('處理 OMI^O23 訊息時發生錯誤:', error);
    return buildAckResponse(message, 'AE', error.message);
  }
}


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



async function insertOmiO23Order(order) {
  try {
    await run(
      `INSERT INTO omi_o23_orders
        (order_id, patient_id, patient_name, order_status, order_datetime, order_details, message_control_id)
       VALUES (?, ?, ?, ?, ?, ?,?)`,
      [
        order.order_id,
        order.patient_id,
        order.patient_name,
        order.order_status,
        order.order_datetime,
        JSON.stringify(order.order_details),
        order.message_control_id,
      ]
    );

    // 注意：DICOM 轉換已經在 handleOmiO19 函數中完成，這裡不需要重複調用
    console.log('✅ 訂單已成功插入到 omi_o23_orders 表');

    return { action: 'inserted', order_id: order.order_id };
  } catch (err) {
    console.error('insertOmiO23Order 錯誤:', err);
    throw err;
  }
}
async function updateOmiO23Order(order) {
  try {
    const result = await run(
      `UPDATE omi_o23_orders SET
        order_status = ?,
        order_datetime = ?,
        order_details = ?,
        message_control_id = ?
      WHERE patient_id = ? AND patient_name = ?`,
      [
        order.order_status,
        order.order_datetime,
        JSON.stringify(order.order_details),
        order.message_control_id,
        order.patient_id,
        order.patient_name,
      ]
    );
    return { action: 'updated', rowsAffected: result.changes };
  } catch (err) {
    console.error('updateOmiO23Order 錯誤:', err);
    throw err;
  }
}
async function deleteOmiO19Order(patientId, patientName) {
  try {
    const result = await run(
      `DELETE FROM omi_o23_orders WHERE patient_id = ? AND patient_name = ?`,
      [patientId, patientName]
    );
    return { action: 'deleted', rowsAffected: result.changes };
  } catch (err) {
    console.error('deleteOmiO23Order 錯誤:', err);
    throw err;
  }
}
module.exports = handleOmiO23;