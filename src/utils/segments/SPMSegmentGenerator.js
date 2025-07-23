import { convertToHL7Date } from '../hl7Utils';

/**
 * SPM 段落生成器
 * 生成 HL7 訊息的 SPM 段落
 */
export const generateSPMSegment = (formData) => {
  const spmData = formData.spm || {};
  
  // 轉換日期時間欄位為 HL7 格式
  const collectionDateTime = convertToHL7Date(spmData.collectionDateTime, true);
  const receivedDateTime = convertToHL7Date(spmData.receivedDateTime, true);
  const expirationDateTime = convertToHL7Date(spmData.expirationDateTime, true);
  
  const segments = [
    'SPM',                                    // 段落標識符
    '1',                                      // SPM-1: 設置ID - SPM
    spmData.specimenId || '',                 // SPM-2: 標本編號
    spmData.specimenParentIds || '',          // SPM-3: 父標本編號
    spmData.specimenType || '',               // SPM-4: 標本類型
    spmData.specimenTypeModifier || '',       // SPM-5: 標本類型修飾符
    spmData.specimenAdditives || '',          // SPM-6: 標本添加劑
    spmData.collectionMethod || '',           // SPM-7: 標本採集方法
    spmData.sourceSite || '',                 // SPM-8: 標本來源部位
    spmData.sourceSiteModifier || '',         // SPM-9: 標本來源部位修飾符
    spmData.collectionSite || '',             // SPM-10: 標本採集地點
    spmData.specimenRole || '',               // SPM-11: 標本角色
    spmData.collectionAmount || '',           // SPM-12: 標本採集量
    spmData.groupedSpecimenCount || '',       // SPM-13: 分組標本數量
    spmData.specimenDescription || '',        // SPM-14: 標本描述
    spmData.handlingCode || '',               // SPM-15: 標本處理代碼
    spmData.riskCode || '',                   // SPM-16: 標本風險代碼
    collectionDateTime || '',                 // SPM-17: 標本採集日期時間
    receivedDateTime || '',                   // SPM-18: 標本接收日期時間
    expirationDateTime || '',                 // SPM-19: 標本到期日期時間
    spmData.availability || '',               // SPM-20: 標本可用性
    spmData.rejectionReason || '',            // SPM-21: 標本拒收原因
    spmData.specimenQuality || '',            // SPM-22: 標本質量
    spmData.specimenAppropriateness || '',    // SPM-23: 標本適當性
    spmData.specimenCondition || '',          // SPM-24: 標本狀態
    spmData.specimenCurrentQuantity || '',    // SPM-25: 標本當前數量
    spmData.numberOfContainers || '',         // SPM-26: 標本容器數量
    spmData.containerType || '',              // SPM-27: 容器類型
    spmData.containerCondition || '',         // SPM-28: 容器狀態
    spmData.specimenChildRole || '',          // SPM-29: 子標本角色
    spmData.accessionId || '',                // SPM-30: 驗收編號
    spmData.otherSpecimenId || '',            // SPM-31: 其他標本編號
    spmData.shipmentId || ''                  // SPM-32: 運送編號
  ];

  return segments.join('|');
}; 