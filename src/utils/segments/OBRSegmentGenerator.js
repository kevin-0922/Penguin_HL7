import { BaseSegmentGenerator } from '../base/BaseSegmentGenerator';

/**
 * OBR 段落生成器
 * 生成 HL7 訊息的 OBR 段落
 */
export class OBRSegmentGenerator extends BaseSegmentGenerator {
  /**
   * 生成 OBR 段落
   * @param {Object} formData - 表單數據
   * @returns {string} - 生成的 OBR 段落
   */
  generate(formData) {
    const obrData = formData.obr || {};
    
    const segments = [
      'OBR',                                    // 段落標識符
      obrData.setId || '',                      // OBR-1: 序號
      obrData.placerOrderNumber || '',          // OBR-2: 申請方訂單編號
      obrData.fillerOrderNumber || '',          // OBR-3: 執行方訂單編號
      obrData.universalServiceIdentifier || '',         // OBR-4: 通用服務識別碼
      obrData.priority || '',                   // OBR-5: 優先順序
      obrData.requestedDateTime || '',          // OBR-6: 請求日期時間
      obrData.observationDateTime || '',        // OBR-7: 觀察日期時間
      obrData.observationEndDateTime || '',     // OBR-8: 觀察結束日期時間
      obrData.collectionVolume || '',           // OBR-9: 採集量
      obrData.collectorIdentifier || '',        // OBR-10: 採集者識別碼
      obrData.specimenActionCode || '',         // OBR-11: 標本操作代碼
      obrData.dangerCode || '',                 // OBR-12: 危險代碼
      obrData.relevantClinicalInfo || '',       // OBR-13: 相關臨床資訊
      obrData.specimenReceivedDateTime || '',   // OBR-14: 標本接收日期時間
      obrData.specimenSource || '',             // OBR-15: 標本來源
      obrData.orderingProvider || '',           // OBR-16: 開單醫師
      obrData.orderCallbackPhoneNumber || '',   // OBR-17: 訂單回撥電話號碼
      obrData.placerField1 || '',               // OBR-18: 申請方欄位1
      obrData.placerField2 || '',               // OBR-19: 申請方欄位2
      obrData.fillerField1 || '',               // OBR-20: 執行方欄位1
      obrData.fillerField2 || '',               // OBR-21: 執行方欄位2
      obrData.resultsRptStatusChngDateTime || '', // OBR-22: 結果報告狀態變更日期時間
      obrData.chargeToPractice || '',           // OBR-23: 收費實踐
      obrData.diagnosticServSectId || '',    // OBR-24: 診斷服務部門ID
      obrData.resultStatus || '',               // OBR-25: 結果狀態
      obrData.parentResult || '',               // OBR-26: 父結果
      obrData.quantityTiming || '',             // OBR-27: 數量/時間
      obrData.resultCopiesTo || '',             // OBR-28: 結果副本發送至
      obrData.parent || '',                     // OBR-29: 父項目
      obrData.transportationMode || '',         // OBR-30: 運輸模式
      obrData.reasonForStudy || '',             // OBR-31: 檢查原因
      obrData.principalResultInterpreter || '', // OBR-32: 主要結果解釋者
      obrData.assistantResultInterpreter || '', // OBR-33: 助理結果解釋者
      obrData.technician || '',                 // OBR-34: 技術員
      obrData.transcriptionist || '',           // OBR-35: 轉錄員
      obrData.scheduledDateTime || '',          // OBR-36: 排程日期時間
      obrData.numberOfSampleContainers || '',   // OBR-37: 樣本容器數量
      obrData.transportLogisticsOfCollectedSample || '', // OBR-38: 採集樣本的運輸物流
      obrData.collectorsComment || '',          // OBR-39: 採集者評論
      obrData.transportArrangementResponsibility || '', // OBR-40: 運輸安排責任
      obrData.transportArranged || '',          // OBR-41: 運輸已安排
      obrData.escort || '',                     // OBR-42: 需要護送
      obrData.plannedPatientTransportComment || '', // OBR-43: 計劃的病人運輸評論
      obrData.procedureCode || '',              // OBR-44: 程序代碼
      obrData.procedureCodeModifier || '',      // OBR-45: 程序代碼修飾符
      obrData.placerSupplementalServiceInformation || '', // OBR-46: 申請方補充服務資訊
      obrData.fillerSupplementalServiceInformation || '', // OBR-47: 執行方補充服務資訊
      obrData.medicallyNecessaryDuplicateProcedureReason || '', // OBR-48: 醫療必要重複程序原因
      obrData.resultHandling || '',             // OBR-49: 結果處理
      obrData.parentUniversalServiceIdentifier || '' // OBR-50: 父通用服務識別碼
    ];

    return segments.join('|');
  }
} 