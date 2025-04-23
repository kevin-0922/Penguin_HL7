import { BaseSegmentGenerator } from '../base/BaseSegmentGenerator';

/**
 * QPD 段落生成器
 * 生成 HL7 訊息的 QPD 段落
 */
export class QPDSegmentGenerator extends BaseSegmentGenerator {
  /**
   * 生成 QPD 段落
   * @param {Object} formData - 表單數據
   * @returns {string} - 生成的 QPD 段落
   */
  generate(formData) {
    const qpdData = formData.qpd || {};
    
    const segments = [
      'QPD',                                    // Segment Identifier
      qpdData.messageQueryName || '',           // QPD-1: Message Query Name
      qpdData.queryTag || '',                   // QPD-2: Query Tag
      qpdData.userParametersInSuccessiveFields || '' // QPD-3: User Parameters in Successive Fields
    ];

    return segments.join('|');
  }
} 