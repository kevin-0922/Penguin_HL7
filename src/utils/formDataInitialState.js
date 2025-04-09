// formDataInitialState.js - 存儲HL7表單的初始狀態

// MSH段落初始值 (最多21項)
const mshInitialState = {
  sendingApplication: '',         // MSH-3: Sending Application
  sendingFacility: '',            // MSH-4: Sending Facility
  receivingApplication: '',       // MSH-5: Receiving Application
  receivingFacility: '',          // MSH-6: Receiving Facility
  security: '',                   // MSH-8: Security
  messageControlId: '',           // MSH-10: Message Control ID
  processingId: '',               // MSH-11: Processing ID
  sequenceNumber: '',             // MSH-13: Sequence Number
  continuationPointer: '',        // MSH-14: Continuation Pointer
  acceptAckType: '',              // MSH-15: Accept Acknowledgment Type
  applicationAckType: ''          // MSH-16: Application Acknowledgment Type
};

// PID段落初始值 (最多39項)
const pidInitialState = {
  setId: '1',                     // PID-1: Set ID
  patientId: '',                  // PID-2: Patient ID
  patientIdList: '',              // PID-3: Patient ID List
  alternatePatientId: '',         // PID-4: Alternate Patient ID
  patientName: '',                // PID-5: Patient Name
  motherMaidenName: '',           // PID-6: Mother's Maiden Name
  birthDateTime: '',              // PID-7: Date/Time of Birth
  sex: '',                        // PID-8: Sex
  alias: '',                      // PID-9: Patient Alias
  race: '',                       // PID-10: Race
  patientAddress: '',             // PID-11: Patient Address
  countryCode: '',                // PID-12: County Code
  phoneNumberHome: '',            // PID-13: Phone Number - Home
  phoneNumberBusiness: '',        // PID-14: Phone Number - Business
  primaryLanguage: '',            // PID-15: Primary Language
  maritalStatus: '',              // PID-16: Marital Status
  religion: '',                   // PID-17: Religion
  accountNumber: '',              // PID-18: Patient Account Number
  ssnNumber: '',                  // PID-19: SSN Number
  driversLicense: '',             // PID-20: Driver's License Number
  mothersIdentifier: '',          // PID-21: Mother's Identifier
  ethnicGroup: '',                // PID-22: Ethnic Group
  birthPlace: '',                 // PID-23: Birth Place
  multipleBirthIndicator: '',     // PID-24: Multiple Birth Indicator
  birthOrder: '',                 // PID-25: Birth Order
  citizenship: '',                // PID-26: Citizenship
  veteransMilitaryStatus: '',     // PID-27: Veterans Military Status
  nationality: '',                // PID-28: Nationality
  patientDeathDateTime: '',       // PID-29: Patient Death Date and Time
  patientDeathIndicator: '',      // PID-30: Patient Death Indicator
  identityUnknownIndicator: '',   // PID-31: Identity Unknown Indicator
  identityReliabilityCode: '',    // PID-32: Identity Reliability Code
  lastUpdateDateTime: '',         // PID-33: Last Update Date/Time
  lastUpdateFacility: '',         // PID-34: Last Update Facility
  speciesCode: '',                // PID-35: Species Code
  breedCode: '',                  // PID-36: Breed Code
  strain: '',                     // PID-37: Strain
  productionClassCode: '',        // PID-38: Production Class Code
  tribalCitizenship: ''           // PID-39: Tribal Citizenship
};

// SPM段落初始值 (最多32項)
const spmInitialState = {
  specimenId: '',                 // SPM-2: 標本編號
  specimenParentIds: '',          // SPM-3: 父標本編號
  specimenType: '',               // SPM-4: 標本類型
  specimenTypeModifier: '',       // SPM-5: 標本類型修飾符
  specimenAdditives: '',          // SPM-6: 標本添加劑
  collectionMethod: '',           // SPM-7: 標本採集方法
  sourceSite: '',                 // SPM-8: 標本來源部位
  sourceSiteModifier: '',         // SPM-9: 標本來源部位修飾符
  collectionSite: '',             // SPM-10: 標本採集地點
  specimenRole: '',               // SPM-11: 標本角色
  collectionAmount: '',           // SPM-12: 標本採集量
  groupedSpecimenCount: '',       // SPM-13: 分組標本數量
  specimenDescription: '',        // SPM-14: 標本描述
  handlingCode: '',               // SPM-15: 標本處理代碼
  riskCode: '',                   // SPM-16: 標本風險代碼
  collectionDateTime: '',         // SPM-17: 標本採集日期時間
  receivedDateTime: '',           // SPM-18: 標本接收日期時間
  expirationDateTime: '',         // SPM-19: 標本到期日期時間
  availability: '',               // SPM-20: 標本可用性
  rejectionReason: '',            // SPM-21: 標本拒收原因
  specimenQuality: '',            // SPM-22: 標本質量
  specimenAppropriateness: '',    // SPM-23: 標本適當性
  specimenCondition: '',          // SPM-24: 標本狀態
  specimenCurrentQuantity: '',    // SPM-25: 標本當前數量
  numberOfContainers: '',         // SPM-26: 標本容器數量
  containerType: '',              // SPM-27: 容器類型
  containerCondition: '',         // SPM-28: 容器狀態
  specimenChildRole: '',          // SPM-29: 子標本角色
  accessionId: '',                // SPM-30: 驗收編號
  otherSpecimenId: '',            // SPM-31: 其他標本編號
  shipmentId: ''                  // SPM-32: 運送編號
};

// SAC段落初始值 (最多44項)
const sacInitialState = {
  containerLocation: '',                // SAC-2: 容器位置
  containerStatus: '',                  // SAC-3: 容器接收狀態
  containerType: '',                    // SAC-4: 容器類型
  containerCondition: '',               // SAC-5: 容器條件
  separatorType: '',                    // SAC-6: 分離器類型
  capType: '',                          // SAC-7: 填充等級
  additive: '',                         // SAC-8: 添加劑
  specimenVolume: '',                   // SAC-9: 檢體量
  specimenVolumeUnits: '',              // SAC-10: 檢體單位量
  specimenVolumeExtracted: '',          // SAC-11: 檢體處理量
  specimenVolumeExtractedUnits: '',     // SAC-12: 檢體處理量單位
  containerConfirmationCount: '',       // SAC-13: 容器確認數
  containerBarcode: '',                 // SAC-14: 容器條碼
  containerPosition: '',                // SAC-15: 容器位置
  containerWeight: '',                  // SAC-16: 容器重量
  containerWeightUnits: '',             // SAC-17: 容器重量單位
  containerVolume: '',                  // SAC-18: 容器體積
  containerVolumeUnits: '',             // SAC-19: 容器體積單位
  containerTemperature: '',             // SAC-20: 容器體積溫度
  containerTemperatureUnits: '',        // SAC-21: 容器溫度單位
  containerTareWeight: '',              // SAC-22: 容器溫度
  containerTareWeightUnits: '',         // SAC-23: 容器空重單位
  barrierType: '',                      // SAC-24: 障礙類型
  barrierDeltaHeight: '',               // SAC-25: 底部障礙差距高度
  containerHeight: '',                  // SAC-26: 容器高度
  containerHeightUnits: '',             // SAC-27: 容器高度單位
  containerDiameter: '',                // SAC-28: 容器直徑
  containerDiameterUnits: '',           // SAC-29: 容器直徑單位
  barrierThickness: '',                 // SAC-30: 障礙厚度
  bottomBarrierThickness: '',           // SAC-31: 底部障礙厚度
  bottomBarrierThicknessUnits: '',      // SAC-32: 底部障礙厚度單位
  containerGrossWeight: '',             // SAC-33: 容器總重量
  containerGrossWeightUnits: '',        // SAC-34: 容器總重量單位
  containerGrossVolume: '',             // SAC-35: 容器總容積
  containerGrossVolumeUnits: '',        // SAC-36: 容器總容積單位
  containerGrossVolumeLimit: '',        // SAC-37: 容器總容積限制
  containerGrossVolumeLimitUnits: '',   // SAC-38: 容器總容積限制單位
  containerGrossWeightLimit: '',        // SAC-39: 容器總重量限制
  containerGrossWeightLimitUnits: '',   // SAC-40: 容器總重量限制單位
  containerCount: '',                   // SAC-41: 容器數量
  containerCatalogNumber: '',           // SAC-42: 容器目錄號
  containerLotNumber: '',               // SAC-43: 容器批號
  containerManufacturer: ''             // SAC-44: 容器製造商
};

// ORC段落初始值 (最多31項)
const orcInitialState = {
  orderControl: '',                 // ORC-1: 訂單控制碼
  placerOrderNumber: '',            // ORC-2: 請求方訂單號碼
  fillerOrderNumber: '',            // ORC-3: 執行方訂單號碼
  placerGroupNumber: '',            // ORC-4: 請求方組號
  orderStatus: '',                  // ORC-5: 訂單狀態
  responseFlag: '',                 // ORC-6: 回應標誌
  quantityTiming: '',               // ORC-7: 數量/時間
  parent: '',                       // ORC-8: 父記錄
  dateTimeOfTransaction: '',        // ORC-9: 交易日期時間
  enteredBy: '',                    // ORC-10: 錄入人
  verifiedBy: '',                   // ORC-11: 驗證人
  orderingProvider: '',             // ORC-12: 醫囑開立醫生
  enterersLocation: '',             // ORC-13: 錄入地點
  callBackPhoneNumber: '',          // ORC-14: 回電號碼
  orderEffectiveDateTime: '',       // ORC-15: 醫囑生效日期時間
  orderControlCodeReason: '',       // ORC-16: 訂單控制碼原因
  enteringOrganization: '',         // ORC-17: 錄入組織
  enteringDevice: '',               // ORC-18: 錄入設備
  actionBy: '',                     // ORC-19: 行動者
  advancedBeneficiaryNoticeCode: '', // ORC-20: 高級受益人通知代碼
  orderingFacilityName: '',         // ORC-21: 訂單機構名稱
  orderingFacilityAddress: '',      // ORC-22: 訂單機構地址
  orderingFacilityPhoneNumber: '',  // ORC-23: 訂單機構電話號碼
  orderingProviderAddress: '',      // ORC-24: 醫囑開立醫生地址
  orderStatusModifier: '',          // ORC-25: 訂單狀態修飾符
  advancedConfidentialityIndicator: '', // ORC-26: 高級機密性指標
  orderingProviderSupplement: '',   // ORC-27: 醫囑開立醫生補充
  advancedBeneficiaryNoticeOverrideReason: '', // ORC-28: 高級受益人通知覆蓋原因
  orderStatusEffectiveDateTime: '', // ORC-29: 訂單狀態生效日期時間
  confidentialityCode: '',          // ORC-30: 機密代碼
  orderType: ''                     // ORC-31: 訂單類型
};

// OBR段落初始值 (最多50項)
const obrInitialState = {
  setId: '',                         // OBR-1: 設置ID
  placerOrderNumber: '',             // OBR-2: 請求方訂單號碼
  fillerOrderNumber: '',             // OBR-3: 執行方訂單號碼
  universalServiceIdentifier: '',    // OBR-4: 通用服務標識符
  priority: '',                      // OBR-5: 優先級
  requestedDateTime: '',             // OBR-6: 請求日期時間
  observationDateTime: '',           // OBR-7: 觀察日期時間
  observationEndDateTime: '',        // OBR-8: 觀察結束日期時間
  collectionVolume: '',              // OBR-9: 採集量
  collectorIdentifier: '',           // OBR-10: 採集者標識符
  specimenActionCode: '',            // OBR-11: 標本操作代碼
  dangerCode: '',                    // OBR-12: 危險代碼
  relevantClinicalInfo: '',          // OBR-13: 相關臨床信息
  specimenReceivedDateTime: '',      // OBR-14: 標本接收日期時間
  specimenSource: '',                // OBR-15: 標本來源
  orderingProvider: '',              // OBR-16: 醫囑開立醫生
  orderCallbackPhoneNumber: '',      // OBR-17: 醫囑回電號碼
  placerField1: '',                  // OBR-18: 請求方欄位1
  placerField2: '',                  // OBR-19: 請求方欄位2
  fillerField1: '',                  // OBR-20: 執行方欄位1
  fillerField2: '',                  // OBR-21: 執行方欄位2
  resultsRptStatusChngDateTime: '',  // OBR-22: 結果報告狀態變更日期時間
  chargeToPractice: '',              // OBR-23: 收費信息
  diagnosticServSectId: '',          // OBR-24: 診斷服務科室ID
  resultStatus: '',                  // OBR-25: 結果狀態
  parentResult: '',                  // OBR-26: 父結果
  quantityTiming: '',                // OBR-27: 數量/時間
  resultCopiesTo: '',                // OBR-28: 結果副本接收者
  parent: '',                        // OBR-29: 父記錄
  transportationMode: '',            // OBR-30: 運輸模式
  reasonForStudy: '',                // OBR-31: 研究原因
  principalResultInterpreter: '',    // OBR-32: 主要結果解釋者
  assistantResultInterpreter: '',    // OBR-33: 輔助結果解釋者
  technician: '',                    // OBR-34: 技術員
  transcriptionist: '',              // OBR-35: 謄寫員
  scheduledDateTime: '',             // OBR-36: 排程日期時間
  numberOfSampleContainers: '',      // OBR-37: 樣本容器數量
  transportLogisticsOfCollectedSample: '', // OBR-38: 採集樣本的運輸物流
  collectorsComment: '',             // OBR-39: 採集者評論
  transportArrangementResponsibility: '', // OBR-40: 運輸安排責任
  transportArranged: '',             // OBR-41: 運輸已安排
  escortRequired: '',                // OBR-42: 是否需要護送
  plannedPatientTransportComment: '', // OBR-43: 計劃的患者運輸備註
  procedureCode: '',                 // OBR-44: 程序代碼
  procedureCodeModifier: '',         // OBR-45: 程序代碼修飾符
  placerSupplementalServiceInformation: '', // OBR-46: 請求方補充服務信息
  fillerSupplementalServiceInformation: '', // OBR-47: 執行方補充服務信息
  medicallyNecessaryDuplicateProcedureReason: '', // OBR-48: 醫學上必要的重複程序原因
  resultHandling: '',                // OBR-49: 結果處理
  parentUniversalServiceIdentifier: '' // OBR-50: 父通用服務標識符
};

// OBX段落初始值 (最多25項)
const obxInitialState = {
  setId: '',                          // OBX-1: 設置ID
  valueType: '',                      // OBX-2: 值類型
  observationIdentifier: '',          // OBX-3: 觀察識別符
  observationSubId: '',               // OBX-4: 觀察子ID
  observationValue: '',               // OBX-5: 觀察值
  units: '',                          // OBX-6: 單位
  referenceRange: '',                 // OBX-7: 參考範圍
  abnormalFlags: '',                  // OBX-8: 異常標誌
  probability: '',                    // OBX-9: 概率
  natureOfAbnormalTest: '',           // OBX-10: 異常測試的性質
  observationResultStatus: '',        // OBX-11: 觀察結果狀態
  effectiveDateOfReferenceRange: '',  // OBX-12: 參考範圍的生效日期
  userDefinedAccessChecks: '',        // OBX-13: 用戶定義的訪問檢查
  dateTimeOfTheObservation: '',       // OBX-14: 觀察日期時間
  producersId: '',                    // OBX-15: 製造商ID
  responsibleObserver: '',            // OBX-16: 負責觀察者
  observationMethod: '',              // OBX-17: 觀察方法
  equipmentInstanceIdentifier: '',    // OBX-18: 設備實例標識符
  dateTimeOfTheAnalysis: '',          // OBX-19: 分析日期時間
  observationSite: '',                // OBX-20: 觀察地點
  observationInstanceIdentifier: '',  // OBX-21: 觀察實例標識符
  moodCode: '',                       // OBX-22: 情態代碼
  performingOrganizationName: '',     // OBX-23: 執行組織名稱
  performingOrganizationAddress: '',  // OBX-24: 執行組織地址
  performingOrganizationMedicalDirector: '' // OBX-25: 執行組織醫療主任
};

// 合併所有初始狀態
const formDataInitialState = {
  msh: mshInitialState,
  pid: pidInitialState,
  spm: spmInitialState,
  sac: sacInitialState,
  orc: orcInitialState,
  obr: obrInitialState,
  obx: obxInitialState
};

export default formDataInitialState;

// 也可以分別導出各個段落的初始狀態，方便單獨使用
export {
  mshInitialState,
  pidInitialState,
  spmInitialState,
  sacInitialState,
  orcInitialState,
  obrInitialState,
  obxInitialState
}; 