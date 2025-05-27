const { MLLPRequest } = require('../../utils/mllp');
const { run } = require('../../database/db');

// 生成唯一的訂單 ID
const generateOrderId = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 10000);
  return `ORD-${timestamp}-${random}`;
};

// 檢測訊息類型
const detectMessageType = (message) => {
  try {
    // 分割訊息為段落
    const segments = message.split(/\r\n|\r|\n/).filter(s => s.trim());
    
    // 尋找 MSH 段落
    const mshSegment = segments.find(segment => segment.startsWith('MSH'));
    if (!mshSegment) return null;
    
    // 分割 MSH 段落
    const fields = mshSegment.split('|');
    
    // 檢查是否有足夠的欄位
    if (fields.length < 10) return null;
    
    // 獲取訊息類型 (通常在 MSH-9 欄位)
    const messageType = fields[8];
    return messageType;
  } catch (error) {
    console.error('檢測訊息類型時發生錯誤:', error);
    return null;
  }
};

// 將 HL7 訊息轉換為 JSON 格式
const convertHl7ToJson = (message) => {
  try {
    const result = {};
    // 分割訊息為段落
    const segments = message.split(/\r\n|\r|\n/).filter(s => s.trim());
    
    segments.forEach(segment => {
      const fields = segment.split('|');
      const segmentType = fields[0];
      
      if (!result[segmentType]) {
        result[segmentType] = {};
      }
      
      // 從索引1開始，因為索引0是段落名稱
      for (let i = 1; i < fields.length; i++) {
        result[segmentType][i] = fields[i];
      }
    });
    
    return result;
  } catch (error) {
    console.error('將 HL7 訊息轉換為 JSON 時發生錯誤:', error);
    return { error: error.message };
  }
};

exports.handleMLLPRequest = async (req, res) => {
  try {
    const message = req.body;
    
    // 檢測訊息類型
    const messageType = detectMessageType(message);
    console.log('訊息類型:', messageType);
    
    // 發送訊息到外部服務器
    const response = await MLLPRequest(message);
    
    // 如果是 O33 訊息且傳送成功，則存入切片排程表
    if (messageType && messageType.includes('O33')) {
      try {
        // 生成唯一的訂單 ID
        const orderId = generateOrderId();
        
        // 將 HL7 訊息轉換為 JSON 格式
        const jsonMessage = convertHl7ToJson(message);
        
        // 存入切片排程表
        await run(
          `INSERT INTO slicing_schedule 
          (order_id, message_content, status, created_at) 
          VALUES (?, ?, ?, datetime('now'))`,
          [orderId, JSON.stringify(jsonMessage), 'pending']
        );
        
        console.log('O33訊息已存入切片排程表，訂單ID:', orderId);
        
        // 添加訂單 ID 到響應中
        if (typeof response === 'object') {
          response.orderId = orderId;
        }
      } catch (error) {
        console.error('儲存 O33 訊息到切片排程表時發生錯誤:', error);
        // 繼續處理，不中斷響應
      }
    }
    
    // 返回響應
    res.status(200).send(response);
  } catch (error) {
    console.error('處理 MLLP 請求時發生錯誤:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
