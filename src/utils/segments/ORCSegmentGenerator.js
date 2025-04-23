import { BaseSegmentGenerator } from '../base/BaseSegmentGenerator';

/**
 * ORC 段落生成器
 * 生成 HL7 訊息的 ORC 段落
 */
export class ORCSegmentGenerator extends BaseSegmentGenerator {
  /**
   * 生成 ORC 段落
   * @param {Object} formData - 表單數據
   * @returns {string} - 生成的 ORC 段落
   */
  generate(formData) {
    const orcData = formData.orc || {};
    
    const segments = [
      'ORC',                                    // 段落標識符
      orcData.orderControl || '',               // ORC-1: 訂單控制
      orcData.placerOrderNumber || '',          // ORC-2: 申請者訂單號
      orcData.fillerOrderNumber || '',          // ORC-3: 執行者訂單號
      orcData.placerGroupNumber || '',          // ORC-4: 申請者組號
      orcData.orderStatus || '',                // ORC-5: 訂單狀態
      orcData.responseFlag || '',               // ORC-6: 回應標誌
      orcData.quantityTiming || '',             // ORC-7: 數量時間
      orcData.parentOrder || '',                // ORC-8: 父訂單
      orcData.dateTimeOfTransaction || '',      // ORC-9: 交易日期時間
      orcData.enteredBy || '',                  // ORC-10: 輸入者
      orcData.verifiedBy || '',                 // ORC-11: 驗證者
      orcData.orderingProvider || '',           // ORC-12: 訂購醫師
      orcData.entererLocation || '',            // ORC-13: 輸入者位置
      orcData.callBackPhoneNumber || '',        // ORC-14: 回撥電話號碼
      orcData.orderEffectiveDateTime || '',     // ORC-15: 訂單生效日期時間
      orcData.orderControlCodeReason || '',     // ORC-16: 訂單控制代碼原因
      orcData.enteringOrganization || '',       // ORC-17: 輸入組織
      orcData.enteringDevice || '',             // ORC-18: 輸入設備
      orcData.actionBy || '',                   // ORC-19: 執行者
      orcData.advancedBeneficiaryNoticeCode || '', // ORC-20: 高級受益人通知代碼
      orcData.orderingFacilityName || '',       // ORC-21: 訂購設施名稱
      orcData.orderingFacilityAddress || '',    // ORC-22: 訂購設施地址
      orcData.orderingFacilityPhoneNumber || '', // ORC-23: 訂購設施電話號碼
      orcData.orderingProviderAddress || '',    // ORC-24: 訂購提供者地址
      orcData.orderStatusModifier || ''         // ORC-25: 訂單狀態修改者
    ];

    return segments.join('|');
  }
} 