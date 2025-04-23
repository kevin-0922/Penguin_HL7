import { BaseSegmentGenerator } from '../base/BaseSegmentGenerator';

/**
 * SAC 段落生成器
 * 生成 HL7 訊息的 SAC 段落
 */
export class SACSegmentGenerator extends BaseSegmentGenerator {
  /**
   * 生成 SAC 段落
   * @param {Object} formData - 表單數據
   * @returns {string} - 生成的 SAC 段落
   */
  generate(formData) {
    const sacData = formData.sac || {};
    
    const segments = [
      'SAC',                                    // 段落標識符
      sacData.externalAccessionIdentifier || '', // SAC-1: 外部訪問標識符
      sacData.containerIdentifier || '',        // SAC-2: 容器標識符
      sacData.primaryParentContainerIdentifier || '', // SAC-3: 主要父容器標識符
      sacData.containerType || '',              // SAC-4: 容器類型
      sacData.containerStatus || '',            // SAC-5: 容器狀態
      sacData.carrierType || '',                // SAC-6: 載體類型
      sacData.positionInCarrier || '',          // SAC-7: 載體中的位置
      sacData.trayIdentifier || '',             // SAC-8: 托盤標識符
      sacData.positionInTray || '',             // SAC-9: 托盤中的位置
      sacData.location || '',                   // SAC-10: 位置
      sacData.containerHeight || '',            // SAC-11: 容器高度
      sacData.containerDiameter || '',          // SAC-12: 容器直徑
      sacData.barrierDelta || '',               // SAC-13: 屏障增量
      sacData.bottomDelta || '',                // SAC-14: 底部增量
      sacData.containerHeightDiameterDeltaUnit || '', // SAC-15: 容器高度直徑增量單位
      sacData.containerVolume || '',            // SAC-16: 容器體積
      sacData.availableSpecimenVolume || '',    // SAC-17: 可用標本體積
      sacData.initialSpecimenVolume || '',      // SAC-18: 初始標本體積
      sacData.volumeUnit || '',                 // SAC-19: 體積單位
      sacData.separatorType || '',              // SAC-20: 分離器類型
      sacData.capType || '',                    // SAC-21: 蓋類型
      sacData.additive || '',                   // SAC-22: 添加劑
      sacData.specimenComponent || '',          // SAC-23: 標本組件
      sacData.dilutionFactor || '',             // SAC-24: 稀釋因子
      sacData.treatment || '',                  // SAC-25: 處理
      sacData.temperature || '',                // SAC-26: 溫度
      sacData.hemolysisIndex || '',             // SAC-27: 溶血指數
      sacData.hemolysisIndexUnit || '',         // SAC-28: 溶血指數單位
      sacData.lipemiaIndex || '',               // SAC-29: 脂血指數
      sacData.lipemiaIndexUnit || '',           // SAC-30: 脂血指數單位
      sacData.icterusIndex || '',               // SAC-31: 黃疸指數
      sacData.icterusIndexUnit || '',           // SAC-32: 黃疸指數單位
      sacData.fibrosisIndex || '',              // SAC-33: 纖維化指數
      sacData.fibrosisIndexUnit || '',          // SAC-34: 纖維化指數單位
      sacData.serumPlasmaIndex || ''            // SAC-35: 血清血漿指數
    ];

    return segments.join('|');
  }
} 