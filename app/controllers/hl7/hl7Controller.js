const handleOmlO33 = require('../../services/hl7/handleOmlO33.js');
const handleQbpQ11 = require('../../services/hl7/handleQbpQ11.js');
const handleOrmO19 = require('../../services/hl7/handleOrmO19.js');
const handleOmiO23 = require('../../services/hl7/handleOmiO23.js');
const util = require('util');
const parseMSH = require('../../utils/parsers/parseMSH');
const { buildAckResponse } = require('../../utils/formatters/ackMessage');

// 定義訊息處理器映射
const messageHandlers = {
  'OML^O33^OML_O33': handleOmlO33,
  'QBP^Q11^QBP_Q11': handleQbpQ11,
  'OMG^O19^OMG_O19': handleOrmO19,
  'OMI^O23^OMI_O23': handleOmiO23
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
    // 解析字串消息
    const mshSegment = message.split('\r').find(seg => seg.startsWith('MSH'));
    if (!mshSegment) {
      throw new Error('找不到 MSH 段落');
    }
    
    // 從MSH段落提取訊息類型
    const fields = mshSegment.split('|');
    if (fields.length < 10) {
      throw new Error('MSH 段落缺少必要欄位');
    }
    
    const messageType = fields[8];
    console.log('訊息類型:', messageType);
    
    const handler = messageHandlers[messageType];
    if (!handler) {
      console.warn(`沒有找到 ${messageType} 類型的處理器`);
      return buildAckResponse(message, 'AR', `不支援的訊息類型: ${messageType}`);
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
  



