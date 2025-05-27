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
      'SAC',                                      // 段落標識符
      sacData.externalAccessionIdentifier || '',  // SAC-1: 外部訪問識別碼
      sacData.accessionIdentifier || '',          // SAC-2: 訪問識別碼
      sacData.containerIdentifier || '',          // SAC-3: 容器識別碼
      sacData.primaryContainerIdentifier || '',   // SAC-4: 主要(父)容器識別碼
      sacData.equipmentContainerIdentifier || '', // SAC-5: 設備容器識別碼
      sacData.specimenSource || '',               // SAC-6: 標本來源
      sacData.registrationDateTime || '',         // SAC-7: 登記日期/時間
      sacData.containerStatus || '',              // SAC-8: 容器狀態
      sacData.carrierType || '',                  // SAC-9: 載體類型
      sacData.carrierIdentifier || '',            // SAC-10: 載體識別碼
      sacData.positionInCarrier || '',            // SAC-11: 載體中的位置
      sacData.trayType || '',                     // SAC-12: 托盤類型
      sacData.trayIdentifier || '',               // SAC-13: 托盤識別碼
      sacData.positionInTray || '',               // SAC-14: 托盤中的位置
      sacData.location || '',                     // SAC-15: 位置
      sacData.containerHeight || '',              // SAC-16: 容器高度
      sacData.containerDiameter || '',            // SAC-17: 容器直徑
      sacData.barrierDelta || '',                 // SAC-18: 障礙增量
      sacData.bottomDelta || '',                  // SAC-19: 底部增量
      sacData.containerHeightDiameterDeltaUnits || '', // SAC-20: 容器高度/直徑/增量單位
      sacData.containerVolume || '',              // SAC-21: 容器體積
      sacData.availableSpecimenVolume || '',      // SAC-22: 可用標本體積
      sacData.initialSpecimenVolume || '',        // SAC-23: 初始標本體積
      sacData.volumeUnits || '',                  // SAC-24: 體積單位
      sacData.separatorType || '',                // SAC-25: 分離器類型
      sacData.capType || '',                      // SAC-26: 蓋類型
      sacData.additive || '',                     // SAC-27: 添加劑
      sacData.specimenComponent || '',            // SAC-28: 標本組件
      sacData.dilutionFactor || '',               // SAC-29: 稀釋因子
      sacData.treatment || '',                    // SAC-30: 處理
      sacData.temperature || '',                  // SAC-31: 溫度
      sacData.hemolysisIndex || '',               // SAC-32: 溶血指數
      sacData.hemolysisIndexUnits || '',          // SAC-33: 溶血指數單位
      sacData.lipemiaIndex || '',                 // SAC-34: 脂血指數
      sacData.lipemiaIndexUnits || '',            // SAC-35: 脂血指數單位
      sacData.icterusIndex || '',                 // SAC-36: 黃疸指數
      sacData.icterusIndexUnits || '',            // SAC-37: 黃疸指數單位
      sacData.fibrinIndex || '',                  // SAC-38: 纖維蛋白指數
      sacData.fibrinIndexUnits || '',             // SAC-39: 纖維蛋白指數單位
      sacData.systemInducedContaminants || '',    // SAC-40: 系統引起的污染物
      sacData.drugInterference || '',             // SAC-41: 藥物干擾
      sacData.artificialBlood || '',              // SAC-42: 人工血液
      sacData.specialHandlingCode || '',          // SAC-43: 特殊處理代碼
      sacData.otherEnvironmentalFactors || ''     // SAC-44: 其他環境因素
    ];

    return segments.join('|');
  }
} 