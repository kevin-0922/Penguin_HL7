<<<<<<< HEAD
const { db, query, get, run } = require('../../database/db');
const path = require('path');
const fs = require('fs');
const parseQPD = require('../../utils/parsers/parseQPD');

// 導入解析器
const parseMSH = require('../../utils/parsers/parseMSH');
const parseOBR = require('../../utils/parsers/parseOBR');
const parseORC = require('../../utils/parsers/parseORC');
const parsePID = require('../../utils/parsers/parsePID');
const parseSPM = require('../../utils/parsers/parseSPM');

class Hl7Controller {
  constructor() {
    // 初始化訊息處理器映射
    this.messageHandlers = new Map([
      ['OML^O33^OML^O33', this.handleOmlO33.bind(this)],
      ['ORL^O34', this.handleOrlO34.bind(this)],
      ['QBP^Q11^QBP_Q11', this.handleQbpQ11.bind(this)] 
    ]);
  }

  // 處理HTTP請求中的HL7訊息
  async handleHttpRequest(req, res) {
    try {
      // 從請求體中獲取HL7訊息
      const hl7Message = req.body.message;
      
      console.log('收到HTTP HL7訊息請求:', hl7Message);
      
      // 處理HL7訊息並產生回應
      const response = await this.processHl7Message(hl7Message);
      //console.log('response:', response);
      // 輸出ACK回應到控制台
      console.log('返回ACK回應:', response);
      
      // 設置回應頭並發送回應
      res.set('Content-Type', 'application/hl7-v2');
      res.send(response);
    } catch (error) {
      console.error('處理HL7訊息時發生錯誤:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // 解析HL7訊息的路由處理器
  async parseHL7Message(req, res) {
    console.log('收到HL7訊息:', req.body);
    try {
      const { message } = req.body;
=======
const handleOmlO33 = require('../../services/hl7/handleOmlO33.js');
const handleQbpQ11 = require('../../services/hl7/handleQbpQ11.js');
const util = require('util');
// 定義訊息處理器映射
const messageHandlers = {
  'OML^O33^OML_O33': handleOmlO33,
  'QBP^Q11^QBP_Q11': handleQbpQ11
};

// 處理HTTP請求中的HL7訊息
const handleHttpRequest = async (req, res) => {
  try {
    // 從請求體中獲取HL7訊息
    const hl7Message = req.body.message;
    console.log('收到HTTP HL7訊息請求:');
    console.log(util.inspect(hl7Message, {
      depth: null,           // 無限制的物件深度
      maxArrayLength: null,  // 無限制的陣列長度
      maxStringLength: null, // 無限制的字串長度
      colors: true           // 如果你想在 terminal 顯示顏色
    }));
    // 處理HL7訊息並產生回應
    const response = await processHl7Message(hl7Message);
    //console.log('response:', response);
    // 輸出ACK回應到控制台
    console.log('返回ACK回應:', response);
>>>>>>> main
    
    // 設置回應頭並發送回應
    res.set('Content-Type', 'application/hl7-v2');
    res.send(response);
  } catch (error) {
    console.error('處理HL7訊息時發生錯誤:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// 處理HL7訊息
const processHl7Message = async (message) => {
  try {
    // 提取訊息類型
    const messageType = extractMessageType(message);
    console.log(`處理 ${messageType} 類型的訊息`);
    
<<<<<<< HEAD
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
  }
// 處理QBP^Q11訊息
async handleQbpQ11(message) {
  try {
    const msh = parseMSH(message);
    
    console.log('==== 處理 QBP^Q11 訊息 ====');
    console.log('MSH部分:', msh);

    // 這裡你可以擴充：解析QPD段、做查詢等
     const qpd = parseQPD(message); // 自行建立 parseQPD 工具
     console.log('qpd部分:', qpd);
     const responseData = await this.queryByQpd(qpd); // 自定義查詢函式
     
    // 構建RSP^K11回應（假設你要用RSP回覆）
    const response = this.buildRspK11Response(message, msh);
    console.log('生成RSP^K11回應:', response);

    return this.buildAckResponse(message, 'AA', 'QBP^Q11 message processed');
  } catch (error) {
    console.error('處理QBP^Q11訊息時發生錯誤:', error);
    return this.buildAckResponse(message, 'AE', error.message);
  }
}
buildRspK11Response(originalMessage, msh) {
  const currentTime = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  return [
    `MSH|^~\\&|${msh.receivingApplication}|${msh.receivingFacility}|${msh.sendingApplication}|${msh.sendingFacility}|${currentTime}||RSP^K11|${this.extractMsgControlId(originalMessage)}_RSP|P|2.5.1`,
    `MSA|AA|${this.extractMsgControlId(originalMessage)}`,
    `QAK|${this.extractMsgControlId(originalMessage)}|OK`,
    `QPD|${msh.messageType}|${this.extractMsgControlId(originalMessage)}`
    // 可以再加你要的查詢結果段（如 PID、OBX 等）
  ].join('\r');
}
async queryByQpd(qpd) {
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
}




  // 處理ORL^O34訊息
  async handleOrlO34(message) {
    try {
      // 解析訊息部分
      const msh = parseMSH(message);
      
      // 只在控制台輸出訊息
      console.log('==== 處理 ORL^O34 訊息 ====');
      console.log('MSH部分:', msh);
      
      // 構建ACK回應
      return this.buildAckResponse(message, 'AA', 'Message received and processed successfully');
    } catch (error) {
      console.error('處理ORL^O34訊息時發生錯誤:', error);
      return this.buildAckResponse(message, 'AE', error.message);
    }
  }handler

  // 處理HL7訊息
  async processHl7Message(message) {
    try {
      // 提取訊息類型
      const messageType = this.extractMessageType(message);
      console.log(`處理 ${messageType} 類型的訊息`);
      
      // 獲取對應的訊息處理器
      const handler = this.messageHandlers.get(messageType);
      console.log('handler:', handler);
      if (!handler) {
        console.warn(`沒有找到 ${messageType} 類型的處理器`);
        return this.buildAckResponse(message, 'AR', `Unsupported message type: ${messageType}`);
      }
      
      // 使用處理器處理訊息
      return await handler(message);
    } catch (error) {
      console.error('處理HL7訊息時發生錯誤:', error);
      return this.buildAckResponse(message, 'AE', error.message);
=======
    // 獲取對應的訊息處理器
    const handler = messageHandlers[messageType];
    console.log('handler:', handler);
    if (!handler) {
      console.warn(`沒有找到 ${messageType} 類型的處理器`);
      return buildAckResponse(message, 'AR', `Unsupported message type: ${messageType}`);
>>>>>>> main
    }
    
    // 使用處理器處理訊息
    return await handler(message);
  } catch (error) {
    console.error('處理HL7訊息時發生錯誤:', error);
    return buildAckResponse(message, 'AE', error.message);
  }
};


// 從HL7訊息中提取訊息類型
const extractMessageType = (message) => {
  try {
    // 分割訊息為段落
    const segments = message.split('\r\n');
    
    // 獲取MSH段落
    const msh = segments.find(segment => segment.startsWith('MSH'));
    
    if (!msh) {
      throw new Error('Invalid HL7 message: MSH segment not found');
    }
    
    // 分割MSH段落為欄位
    const fields = msh.split('|');
    
    // 獲取訊息類型 (通常在MSH-9欄位)
    if (fields.length < 10) {
      throw new Error('Invalid MSH segment: insufficient fields');
    }
    
    return fields[8].includes('^') ? fields[8] : fields[8] + '^' + fields[9];
  } catch (error) {
    console.error('提取訊息類型時發生錯誤:', error);
    throw new Error(`Failed to extract message type: ${error.message}`);
  }
};


// 導出函數
module.exports = {
  handleHttpRequest,
};
  




// // 解析HL7訊息的路由處理器
// const parseHL7Message = async (req, res) => {
//   console.log('收到HL7訊息:', req.body);
//   try {
//     const { message } = req.body;
  
//     if (!message) {
//       return res.status(400).json({
//         success: false,
//         error: '缺少HL7訊息'
//       });
//     }
    
//     // 解析訊息
//     const parsedMessage = await parseMessage(message);
    
//     res.json({
//       success: true,
//       data: parsedMessage
//     });
//   } catch (error) {
//     console.error('解析HL7訊息時發生錯誤:', error);
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// // 解析HL7訊息
// const parseMessage = async (message) => {
//   try {
//     // 分割訊息為段落
//     const segments = message.split('\r\n');
    
//     // 初始化結果對象
//     const result = {
//       MSH: null,
//       PID: null,
//       ORC: null,
//       OBR: null,
//       SPM: null
//     };
    
//     // 解析每個段落
//     for (const segment of segments) {
//       const segmentType = segment.substring(0, 3);
      
//       switch (segmentType) {
//         case 'MSH':
//           result.MSH = parseMSH(segment);
//           break;
//         case 'PID':
//           result.PID = parsePID(segment);
//           break;
//         case 'ORC':
//           result.ORC = parseORC(segment);
//           break;
//         case 'OBR':
//           result.OBR = parseOBR(segment);
//           break;
//         case 'SPM':
//           result.SPM = parseSPM(segment);
//           break;
//       }
//     }
    
//     return result;
//   } catch (error) {
//     console.error('解析HL7訊息時發生錯誤:', error);
//     throw new Error(`Failed to parse message: ${error.message}`);
//   }
// };