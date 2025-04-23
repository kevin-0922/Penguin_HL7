/**
 * 基礎訊息生成器類別
 * 所有訊息生成器都應該繼承這個類別
 */
export class BaseMessageGenerator {
  constructor() {
    if (this.constructor === BaseMessageGenerator) {
      throw new Error('BaseMessageGenerator 不能直接實例化');
    }
    this.segmentGenerators = new Map();
  }




  
  /**
   * 註冊段落生成器
   * @param {string} segmentId - 段落ID
   * @param {BaseSegmentGenerator} generator - 段落生成器實例
   */
  registerSegmentGenerator(segmentId, generator) {
    this.segmentGenerators.set(segmentId, generator);
  }





  /**
   * 獲取段落生成器
   * @param {string} segmentId - 段落ID
   * @returns {BaseSegmentGenerator} - 段落生成器實例
   */
  getSegmentGenerator(segmentId) {
    const generator = this.segmentGenerators.get(segmentId);
    if (!generator) {
      throw new Error(`未找到段落生成器: ${segmentId}`);
    }
    return generator;
  }





  /**
   * 生成段落
   * @param {string} segmentId - 段落ID
   * @param {Object} formData - 表單數據
   * @returns {string} - 生成的段落
   */
  generateSegment(segmentId, formData) {
    const generator = this.getSegmentGenerator(segmentId);
    return generator.generate(formData);
  }





  /**
   * 生成完整消息
   * @param {Object} formData - 表單數據
   * @returns {string} - 生成的完整消息
   */
  generateMessage(formData) {
    throw new Error('子類必須實現 generateMessage 方法');
  }




  /**
   * 連接段落
   * @param {string[]} segments - 段落數組
   * @returns {string} - 連接後的完整消息
   */
  joinSegments(segments) {
    return segments.join('\r');
  }
} 