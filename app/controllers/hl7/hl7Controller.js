const handleOmlO33 = require('../../services/hl7/handleOmlO33.js');
const handleQbpQ11 = require('../../services/hl7/handleQbpQ11.js');
const handleOrmO01 = require('../../services/hl7/handleOrmO01.js');
const util = require('util');
const parseMSH = require('../../utils/parsers/parseMSH');
// 定義訊息處理器映射
const messageHandlers = {
  'OML^O33^OML_O33': handleOmlO33,
  'QBP^Q11^QBP_Q11': handleQbpQ11,
  'ORM^O01^ORM_O01': handleOrmO01
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
    const mshData = parseMSH(message);
    const messageType = mshData.messageType;
    console.log('messageType:', messageType);
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



// 導出函數
module.exports = {
  handleHttpRequest,
};
  



