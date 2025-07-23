/**
 * HL7訊息格式轉換工具
 * 提供HL7訊息與JSON格式之間的轉換功能
 */

/**
 * 將HL7訊息轉換為JSON格式
 * 特殊處理MSH段落，使其符合HL7標準中的欄位編號
 * @param {string} message - HL7訊息文本
 * @returns {Object} 轉換後的JSON對象
 */
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
      
      // 特殊處理MSH段落：MSH-1是分隔符本身，MSH-2是其他分隔符
      if (segmentType === 'MSH') {
        // MSH-1是分隔符 '|'
        result[segmentType][1] = '|';
        // MSH-2是編碼字元 (通常是 '^~\&')
        result[segmentType][2] = fields[1];
        
        // 從索引2開始，因為索引0是段落名稱，索引1已經特殊處理
        for (let i = 2; i < fields.length; i++) {
          // 欄位索引需要+1，因為MSH-1是在段落名後的第一個字元(|)
          result[segmentType][i+1] = fields[i];
        }
      } else {
        // 處理其他段落，從索引1開始，因為索引0是段落名稱
        for (let i = 1; i < fields.length; i++) {
          result[segmentType][i] = fields[i];
        }
      }
    });
    
    return result;
  } catch (error) {
    console.error('將HL7訊息轉換為JSON時發生錯誤:', error);
    return { error: error.message };
  }
};

/**
 * 將JSON對象轉換回HL7訊息格式
 * 特殊處理MSH段落，確保欄位順序正確
 * @param {Object} jsonData - HL7 JSON格式數據
 * @returns {string} HL7訊息文本
 */
const convertJsonToHl7 = (jsonData) => {
  try {
    const segments = [];
    
    // 處理每個段落
    for (const segmentType in jsonData) {
      // 特殊處理MSH段落
      if (segmentType === 'MSH') {
        const fields = [];
        fields.push(segmentType); // 段落名稱
        
        // MSH-1已經是分隔符，不需要添加
        // 從MSH-2開始添加欄位
        for (let i = 2; i <= Object.keys(jsonData[segmentType]).length; i++) {
          fields.push(jsonData[segmentType][i] || '');
        }
        
        segments.push(fields.join('|'));
      } else {
        // 處理其他段落
        const fields = [];
        fields.push(segmentType); // 段落名稱
        
        // 添加其他欄位
        const maxField = Math.max(...Object.keys(jsonData[segmentType]).map(Number));
        for (let i = 1; i <= maxField; i++) {
          fields.push(jsonData[segmentType][i] || '');
        }
        
        segments.push(fields.join('|'));
      }
    }
    
    return segments.join('\r\n');
  } catch (error) {
    console.error('將JSON轉換為HL7訊息時發生錯誤:', error);
    return '';
  }
};

module.exports = {
  convertHl7ToJson,
  convertJsonToHl7
}; 