import { BaseMessageGenerator } from '../base/BaseMessageGenerator';
import { MSHSegmentGenerator } from '../segments/MSHSegmentGenerator';
import { PIDSegmentGenerator } from '../segments/PIDSegmentGenerator';
import { SPMSegmentGenerator } from '../segments/SPMSegmentGenerator';
import { SACSegmentGenerator } from '../segments/SACSegmentGenerator';
import { NTESegmentGenerator } from '../segments/NTESegmentGenerator';
import { ORCSegmentGenerator } from '../segments/ORCSegmentGenerator';
import { OBRSegmentGenerator } from '../segments/OBRSegmentGenerator';
import { OBXSegmentGenerator } from '../segments/OBXSegmentGenerator';

/**
 * O33 訊息生成器
 * 生成 O33 類型的 HL7 訊息
 */
export class O33MessageGenerator extends BaseMessageGenerator {
  constructor() {
    super();
    
    // 註冊所需的段落生成器
    this.registerSegmentGenerator('MSH', new MSHSegmentGenerator());
    this.registerSegmentGenerator('PID', new PIDSegmentGenerator());
    this.registerSegmentGenerator('SPM', new SPMSegmentGenerator());
    this.registerSegmentGenerator('SAC', new SACSegmentGenerator());
    this.registerSegmentGenerator('NTE', new NTESegmentGenerator());
    this.registerSegmentGenerator('ORC', new ORCSegmentGenerator());
    this.registerSegmentGenerator('OBR', new OBRSegmentGenerator());
    this.registerSegmentGenerator('OBX', new OBXSegmentGenerator());
  }

  /**
   * 生成 O33 訊息
   * @param {Object} formData - 表單數據
   * @returns {string} - 生成的 HL7 訊息
   */
  generate(formData) {
    const segments = [];
    
    // 按照 HL7 訊息格式順序生成段落
    segments.push(this.segmentGenerators['MSH'].generate(formData));
    segments.push(this.segmentGenerators['PID'].generate(formData));
    segments.push(this.segmentGenerators['SPM'].generate(formData));
    segments.push(this.segmentGenerators['SAC'].generate(formData));
    // 添加訂單和觀察段落
    segments.push(this.segmentGenerators['ORC'].generate(formData));
    segments.push(this.segmentGenerators['OBR'].generate(formData));
    segments.push(this.segmentGenerators['OBX'].generate(formData));
    
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