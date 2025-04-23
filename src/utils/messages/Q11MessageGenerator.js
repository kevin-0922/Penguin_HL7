import { BaseMessageGenerator } from '../base/BaseMessageGenerator';
import { MSHSegmentGenerator } from '../segments/MSHSegmentGenerator';
import { QPDSegmentGenerator } from '../segments/QPDSegmentGenerator';
import { RCPSegmentGenerator } from '../segments/RCPSegmentGenerator';

/**
 * Q11 訊息生成器
 * 生成 Q11 類型的 HL7 訊息
 */
export class Q11MessageGenerator extends BaseMessageGenerator {
  constructor() {
    super();
    
    // 註冊所需的段落生成器
    this.registerSegmentGenerator('MSH', new MSHSegmentGenerator());
    this.registerSegmentGenerator('QPD', new QPDSegmentGenerator());
    this.registerSegmentGenerator('RCP', new RCPSegmentGenerator());
  }

  /**
   * 生成 Q11 訊息
   * @param {Object} formData - 表單數據
   * @returns {string} - 生成的 HL7 訊息
   */
  generate(formData) {
    const segments = [];
    
    // 按照 HL7 訊息格式順序生成段落
    segments.push(this.getSegmentGenerator('MSH').generate(formData));
    segments.push(this.getSegmentGenerator('QPD').generate(formData));
    segments.push(this.getSegmentGenerator('RCP').generate(formData));
    
    // 返回完整的 Q11 消息
    return segments.join('\n');
  }
  
  /**
   * 生成消息的外部接口，符合 BaseMessageGenerator 的要求
   * @param {Object} formData - 表單數據
   * @returns {string} - 生成的 HL7 訊息
   */
  generateMessage(formData) {
    return this.generate(formData);
  }
} 