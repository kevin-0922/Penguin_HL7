import { generateO33Message } from './messages/O33MessageGenerator';
import { generateQ11Message } from './messages/Q11MessageGenerator';

// 直接將消息類型映射到對應的生成器函數
const MESSAGE_GENERATORS = {
  'O33': generateO33Message,
  'Q11': generateQ11Message
  // 這裡可以直接添加其他消息類型
};

/**
 * 生成 HL7 消息
 * @param {Object} formData - 表單數據
 * @param {string} messageType - 消息類型
 * @returns {string} - 生成的 HL7 消息
 */
export const generateHL7Message = (formData, messageType = 'UNSELECTED') => {
  if (messageType === 'UNSELECTED') {
    throw new Error('請先選擇消息類型');
  }

  // 獲取對應的生成器函數
  const generateMessage = MESSAGE_GENERATORS[messageType];
  if (!generateMessage) {
    throw new Error(`未找到消息生成器: ${messageType}`);
  }
  
  // 處理數據結構：檢查是否是嵌套的表單數據格式
  let processedData = formData;
  
  // 如果數據中有 forms 屬性並且包含對應的消息類型數據，則提取該部分
  if (formData.forms && formData.forms[messageType]) {
    processedData = formData.forms[messageType];
  }
  
  // 直接調用生成函數，傳入處理後的數據
  return generateMessage(processedData);
};

/**
 * 生成完整 HL7 消息
 * @param {Object} formData - 表單數據
 * @param {string} messageType - 消息類型，例如 'O33' 或 'Q11'
 * @returns {string} - 生成的 HL7 消息
 */
export const generateCompleteHL7Message = (formData, messageType) => {
  return generateHL7Message(formData, messageType);
}; 


