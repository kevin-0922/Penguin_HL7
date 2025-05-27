// 引入需要的模組
const { run, get } = require('../../database/db');
const { MLLPRequest } = require('../mllp');


/**
 * 處理訂單狀態更新並重新傳送
 * @param {String} orderId - 訂單ID
 * @param {Object} updateFields - 需要更新的欄位
 * @returns {Promise<Object>} 操作結果
 */
const processOrderUpdate = async (orderId, updateFields) => {
  try {
    // 查詢訂單
    const order = await get(
      `SELECT message_content FROM slicing_schedule WHERE order_id = ?`,
      [orderId]
    );
    
    if (!order) {
      return {
        success: false,
        code: 1003,
        message: 'NotFound',
        details: '找不到指定訂單編號'
      };
    }
    
    // 解析原始訊息內容
    let messageContent;
    try {
      messageContent = JSON.parse(order.message_content);
    } catch (error) {
      return {
        success: false,
        code: 1002,
        message: 'ParseError',
        details: '解析訂單訊息失敗'
      };
    }
    
    // 更新訊息內容
    for (const field in updateFields) {
      const [segment, fieldNumber] = field.split('-');
      
      if (!messageContent[segment]) {
        messageContent[segment] = {};
      }
      
      messageContent[segment][fieldNumber] = updateFields[field];
    }
    
    // 特別更新ORC-1為XO
    if (messageContent.ORC) {
      messageContent.ORC[1] = 'XO';
    }
    
    // 轉換為HL7格式
    let hl7Message = '';
    const segmentOrder = ['MSH', 'PID', 'ORC', 'OBR', 'SPM', 'SAC', 'OBX'];
    
    segmentOrder.forEach(segmentType => {
      if (messageContent[segmentType]) {
        // 開始組裝段落
        let segment = segmentType;
        
        // 獲取該段落的最大欄位索引
        const maxField = Math.max(...Object.keys(messageContent[segmentType]).map(Number));
        
        // 按順序添加欄位值
        for (let i = 1; i <= maxField; i++) {
          segment += '|' + (messageContent[segmentType][i] || '');
        }
        
        // 添加到完整訊息
        hl7Message += segment + '\r';
      }
    });
    
    // 使用MLLP傳送更新後的訊息
    const response = await MLLPRequest(
      hl7Message
    );
    
    // 更新資料庫中的訊息內容和狀態
    await run(
      `UPDATE slicing_schedule 
       SET message_content = ?, status = 'completed' 
       WHERE order_id = ?`,
      [JSON.stringify(messageContent), orderId]
    );
    
    return {
      success: true,
      message: '訂單狀態已更新並重新傳送',
      data: {
        orderId,
        updateTime: new Date().toISOString(),
        response
      }
    };
    
  } catch (error) {
    console.error('更新訂單狀態時發生錯誤:', error);
    return {
      success: false,
      code: 1004,
      message: 'ServerError',
      details: error.message
    };
  }
};

module.exports = {
  processOrderUpdate
};