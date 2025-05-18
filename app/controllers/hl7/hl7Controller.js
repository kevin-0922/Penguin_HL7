const handleOmlO33 = require('../../services/hl7/handleOmlO33.js');
const handleQbpQ11 = require('../../services/hl7/handleQbpQ11.js');

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
    
    console.log('收到HTTP HL7訊息請求:', hl7Message);
    
    // 處理HL7訊息並產生回應
    const response = await processHl7Message(hl7Message);
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
};

// 處理HL7訊息
const processHl7Message = async (message) => {
  try {
    // 提取訊息類型
    const messageType = extractMessageType(message);
    console.log(`處理 ${messageType} 類型的訊息`);
    
    // 獲取對應的訊息處理器
    const handler = messageHandlers[messageType];
    console.log('handler:', handler);
    if (!handler) {
      console.warn(`沒有找到 ${messageType} 類型的處理器`);
      return buildAckResponse(message, 'AR', `Unsupported message type: ${messageType}`);
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