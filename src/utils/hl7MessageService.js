import { O33MessageGenerator } from './messages/O33MessageGenerator';
import { Q11MessageGenerator } from './messages/Q11MessageGenerator';

// 直接將消息類型映射到對應的生成器類
const MESSAGE_GENERATORS = {
  'O33': O33MessageGenerator,
  'Q11': Q11MessageGenerator
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

  // 獲取對應的生成器類
  const GeneratorClass = MESSAGE_GENERATORS[messageType];
  if (!GeneratorClass) {
    throw new Error(`未找到消息生成器: ${messageType}`);
  }
  
  // 實例化生成器並調用生成方法
  const generator = new GeneratorClass();
  return generator.generateMessage(formData);
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


