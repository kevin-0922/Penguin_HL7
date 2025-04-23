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
      obrData.setID || '',                      // OBR-1: 設置 ID
      obrData.placerOrderNumber || '',          // OBR-2: 申請者訂單號
      obrData.fillerOrderNumber || '',          // OBR-3: 執行者訂單號
      obrData.universalServiceID || '',         // OBR-4: 通用服務 ID
      obrData.priority || '',                   // OBR-5: 優先級
      obrData.requestedDateTime || '',          // OBR-6: 請求日期時間
      obrData.observationDateTime || '',        // OBR-7: 觀察日期時間
      obrData.observationEndDateTime || '',     // OBR-8: 觀察結束日期時間
      obrData.collectionVolume || '',           // OBR-9: 採集量
      obrData.collectorIdentifier || '',        // OBR-10: 採集者標識符
      obrData.specimenActionCode || '',         // OBR-11: 標本動作代碼
      obrData.dangerCode || '',                 // OBR-12: 危險代碼
      obrData.relevantClinicalInfo || '',       // OBR-13: 相關臨床信息
      obrData.specimenReceivedDateTime || '',   // OBR-14: 標本接收日期時間
      obrData.specimenSource || '',             // OBR-15: 標本來源
      obrData.orderingProvider || '',           // OBR-16: 訂購醫師
      obrData.orderCallbackPhoneNumber || '',   // OBR-17: 訂單回撥電話號碼
      obrData.placerField1 || '',               // OBR-18: 申請者欄位 1
      obrData.placerField2 || '',               // OBR-19: 申請者欄位 2
      obrData.fillerField1 || '',               // OBR-20: 執行者欄位 1
      obrData.fillerField2 || '',               // OBR-21: 執行者欄位 2
      obrData.resultsRptStatusChngDateTime || '', // OBR-22: 結果報告狀態變更日期時間
      obrData.chargeToPractice || '',           // OBR-23: 收費到診所
      obrData.diagnosticServiceSectID || '',    // OBR-24: 診斷服務部門 ID
      obrData.resultStatus || '',               // OBR-25: 結果狀態
      obrData.parentResult || '',               // OBR-26: 父結果
      obrData.quantityTiming || '',             // OBR-27: 數量時間
      obrData.resultCopiesTo || '',             // OBR-28: 結果副本發送給
      obrData.parentOrderNumber || '',          // OBR-29: 父訂單號
      obrData.transportationMode || '',         // OBR-30: 運輸方式
      obrData.reasonForStudy || '',             // OBR-31: 研究原因
      obrData.principalResultInterpreter || '', // OBR-32: 主要結果解釋者
      obrData.assistantResultInterpreter || '', // OBR-33: 助理結果解釋者
      obrData.technician || '',                 // OBR-34: 技術員
      obrData.transcriptionist || '',           // OBR-35: 轉錄員
      obrData.scheduledDateTime || '',          // OBR-36: 預定日期時間
      obrData.numberOfSampleContainers || '',   // OBR-37: 樣本容器數量
      obrData.transportLogisticsOfCollectedSample || '', // OBR-38: 採集樣本的運輸物流
      obrData.collectorsComment || '',          // OBR-39: 採集者註釋
      obrData.transportArrangementResponsibility || '', // OBR-40: 運輸安排責任
      obrData.transportArranged || '',          // OBR-41: 已安排運輸
      obrData.escortRequired || '',             // OBR-42: 需要護送
      obrData.plannedPatientTransportComment || '' // OBR-43: 計劃的患者運輸註釋
    ];

    return segments.join('|');
  }
} 