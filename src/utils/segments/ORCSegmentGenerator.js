import { convertToHL7Date } from '../hl7Utils';

/**
 * ORC 段落生成器
 * 生成 HL7 訊息的 ORC 段落
 */
export const generateORCSegment = (formData) => {
  const orcData = formData.orc || {};
  
  const segments = [
    'ORC',                                    // 段落標識符
    orcData.orderControl || '',               // ORC-1: 訂單控制
    orcData.placerOrderNumber || '',          // ORC-2: 申請方訂單編號
    orcData.fillerOrderNumber || '',          // ORC-3: 執行方訂單編號
    orcData.placerGroupNumber || '',          // ORC-4: 申請方群組編號
    orcData.orderStatus || '',                // ORC-5: 訂單狀態
    orcData.responseFlag || '',               // ORC-6: 回應標記
    orcData.quantityTiming || '',             // ORC-7: 數量/時間
    orcData.parent || '',                     // ORC-8: 父項目
    orcData.dateTimeOfTransaction || '',      // ORC-9: 交易日期時間
    orcData.enteredBy || '',                  // ORC-10: 輸入者
    orcData.verifiedBy || '',                 // ORC-11: 確認者
    orcData.orderingProvider || '',           // ORC-12: 開單醫師
    orcData.enterersLocation || '',           // ORC-13: 輸入者位置
    orcData.callBackPhoneNumber || '',        // ORC-14: 回電電話號碼
    orcData.orderEffectiveDateTime || '',     // ORC-15: 訂單生效日期時間
    orcData.orderControlCodeReason || '',     // ORC-16: 訂單控制代碼原因
    orcData.enteringOrganization || '',       // ORC-17: 輸入組織
    orcData.enteringDevice || '',             // ORC-18: 輸入設備
    orcData.actionBy || '',                   // ORC-19: 執行者
    orcData.advancedBeneficiaryNoticeCode || '', // ORC-20: 預先受益人通知代碼
    orcData.orderingFacilityName || '',       // ORC-21: 開單設施名稱
    orcData.orderingFacilityAddress || '',    // ORC-22: 開單設施地址
    orcData.orderingFacilityPhoneNumber || '', // ORC-23: 開單設施電話號碼
    orcData.orderingProviderAddress || '',    // ORC-24: 開單醫師地址
    orcData.orderStatusModifier || '',        // ORC-25: 訂單狀態修飾符
    orcData.advancedBeneficiaryNoticeOverrideReason || '', // ORC-26: 預先受益人通知覆蓋原因
    orcData.fillersExpectedAvailabilityDateTime || '', // ORC-27: 填充者預期可用日期/時間
    orcData.confidentialityCode || '',        // ORC-28: 保密代碼
    orcData.orderType || '',                  // ORC-29: 訂單類型
    orcData.entererAuthorizationMode || '',   // ORC-30: 輸入者授權模式
    orcData.parentUniversalServiceIdentifier || '' // ORC-31: 父通用服務識別碼
  ];

  return segments.join('|');
}; 