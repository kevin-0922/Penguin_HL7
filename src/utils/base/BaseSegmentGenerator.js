/**
 * 基礎段落生成器類別
 * 所有段落生成器都應該繼承這個類別
 */
import { convertToHL7Date, getHL7Timestamp } from '../hl7Utils';

export class BaseSegmentGenerator {
  constructor() {
    if (this.constructor === BaseSegmentGenerator) {
      throw new Error('BaseSegmentGenerator 不能直接實例化');
    }
    this.segmentId = '';
  }

  /**
   * 生成 HL7 段落
   * @param {Object} formData - 表單數據
   * @returns {string} - 生成的 HL7 段落
   */
  generate(formData) {
    throw new Error('generate 方法必須被子類別覆寫');
  }

  // 轉換日期時間為 HL7 格式
  convertDate(dateStr, includeTime = false) {
    return convertToHL7Date(dateStr, includeTime);
  }

  // 獲取當前時間戳
  getCurrentTimestamp() {
    return getHL7Timestamp();
  }

  // 將數組轉換為 HL7 格式的字符串
  joinSegments(segments) {
    return segments.join('|');
  }
} 