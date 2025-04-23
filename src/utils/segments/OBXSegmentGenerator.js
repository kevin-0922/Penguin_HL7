import { BaseSegmentGenerator } from '../base/BaseSegmentGenerator';

/**
 * OBX 段落生成器
 * 生成 HL7 訊息的 OBX 段落
 */
export class OBXSegmentGenerator extends BaseSegmentGenerator {
  /**
   * 生成 OBX 段落
   * @param {Object} formData - 表單數據
   * @returns {string} - 生成的 OBX 段落
   */
  generate(formData) {
    const obxData = formData.obx || {};
    
    const segments = [
      'OBX',                                    // 段落標識符
      obxData.setID || '',                      // OBX-1: 設置 ID
      obxData.valueType || '',                  // OBX-2: 值類型
      obxData.observationIdentifier || '',      // OBX-3: 觀察標識符
      obxData.observationSubID || '',           // OBX-4: 觀察子 ID
      obxData.observationValue || '',           // OBX-5: 觀察值
      obxData.units || '',                      // OBX-6: 單位
      obxData.referencesRange || '',            // OBX-7: 參考範圍
      obxData.abnormalFlags || '',              // OBX-8: 異常標誌
      obxData.probability || '',                // OBX-9: 概率
      obxData.natureOfAbnormalTest || '',       // OBX-10: 異常測試性質
      obxData.observationResultStatus || '',    // OBX-11: 觀察結果狀態
      obxData.dateLastObservationNormal || '',  // OBX-12: 最後正常觀察日期
      obxData.userDefinedAccessChecks || '',    // OBX-13: 用戶定義訪問檢查
      obxData.dateTimeOfTheObservation || '',   // OBX-14: 觀察日期時間
      obxData.productionID || '',               // OBX-15: 生產 ID
      obxData.responsibleObserver || '',        // OBX-16: 負責觀察者
      obxData.observationMethod || '',          // OBX-17: 觀察方法
      obxData.equipmentInstanceIdentifier || '', // OBX-18: 設備實例標識符
      obxData.dateTimeOfTheAnalysis || ''       // OBX-19: 分析日期時間
    ];

    return segments.join('|');
  }
} 