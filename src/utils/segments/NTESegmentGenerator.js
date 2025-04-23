import { BaseSegmentGenerator } from '../base/BaseSegmentGenerator';

/**
 * NTE 段落生成器
 * 生成 HL7 訊息的 NTE 段落
 */
export class NTESegmentGenerator extends BaseSegmentGenerator {
  /**
   * 生成 NTE 段落
   * @param {Object} formData - 表單數據
   * @returns {string} - 生成的 NTE 段落
   */
  generate(formData) {
    const nteData = formData.nte || {};
    
    const segments = [
      'NTE',                    // 段落標識符
      nteData.setID || '',      // NTE-1: 設置 ID
      nteData.sourceOfComment || '', // NTE-2: 註釋來源
      nteData.comment || '',    // NTE-3: 註釋
      nteData.commentType || '' // NTE-4: 註釋類型
    ];

    return segments.join('|');
  }
} 