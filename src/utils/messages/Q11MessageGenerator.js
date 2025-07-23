import { generateMSHSegment } from '../segments/MSHSegmentGenerator';
import { generateQPDSegment } from '../segments/QPDSegmentGenerator';
import { generateRCPSegment } from '../segments/RCPSegmentGenerator';

/**
 * 生成 Q11 訊息
 * @param {Object} formData - 表單數據
 * @returns {string} - 生成的 HL7 訊息
 */
export const generateQ11Message = (formData) => {
  const segments = [];
  
  // 按照 HL7 訊息格式順序生成段落
  segments.push(generateMSHSegment(formData));
  segments.push(generateQPDSegment(formData));
  segments.push(generateRCPSegment(formData));
  
  // 返回完整的 Q11 消息
  return segments.join('\r');
}; 