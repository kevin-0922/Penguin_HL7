// MSH段落初始值 (最多21項)
const mshInitialState = {
  sendingApplication: '',         // MSH-3: Sending Application
  sendingFacility: '',            // MSH-4: Sending Facility
  receivingApplication: '',       // MSH-5: Receiving Application
  receivingFacility: '',          // MSH-6: Receiving Facility
  security: '',                   // MSH-8: Security
  messageType: '',               // MSH-9: Message Type
  messageControlId: '',           // MSH-10: Message Control ID
  processingId: '',               // MSH-11: Processing ID
  sequenceNumber: '',             // MSH-13: Sequence Number
  continuationPointer: '',        // MSH-14: Continuation Pointer
  acceptAckType: '',              // MSH-15: Accept Acknowledgment Type
  applicationAckType: '',         // MSH-16: Application Acknowledgment Type
  countryCode: '',                // MSH-17: Country Code
  characterSet: '',               // MSH-18: Character Set
  principalLanguage: '',          // MSH-19: Principal Language
  alternateCharacterSet: '',      // MSH-20: Alternate Character Set
  messageProfileIdentifier: ''    // MSH-21: Message Profile Identifier
};

// PV1段落初始值 (最多45項)
const pv1InitialState = {
  setId: '1',                     // PV1-1: 序號
  patientClass: '',               // PV1-2: 病患類別
  assignedPatientLocation: '',    // PV1-3: 指定病患位置
  admissionType: '',              // PV1-4: 入院類型
  preadmitNumber: '',             // PV1-5: 預先入院號碼
  priorPatientLocation: '',       // PV1-6: 先前病患位置
  attendingDoctor: '',            // PV1-7: 主治醫師
  referringDoctor: '',            // PV1-8: 轉診醫師
  consultingDoctor: '',           // PV1-9: 會診醫師
  hospitalService: '',            // PV1-10: 醫院服務
  temporaryLocation: '',          // PV1-11: 臨時位置
  preadmitTestIndicator: '',      // PV1-12: 預先入院測試指示器
  readmissionIndicator: '',       // PV1-13: 再入院指示器
  admitSource: '',                // PV1-14: 入院來源
  ambulatoryStatus: '',           // PV1-15: 門診狀態
  vipIndicator: '',               // PV1-16: VIP指示器
  admittingDoctor: '',            // PV1-17: 接收醫師
  patientType: '',                // PV1-18: 病患類型
  visitNumber: '',                // PV1-19: 訪視號碼
  financialClass: '',             // PV1-20: 財務類別
  chargePriceIndicator: '',       // PV1-21: 收費價格指示器
  courtesyCode: '',               // PV1-22: 優惠代碼
  creditRating: '',               // PV1-23: 信用評級
  contractCode: '',               // PV1-24: 合約代碼
  contractEffectiveDate: '',      // PV1-25: 合約生效日期
  contractAmount: '',             // PV1-26: 合約金額
  contractPeriod: '',             // PV1-27: 合約期間
  interestCode: '',               // PV1-28: 利息代碼
  transferToBadDebtCode: '',      // PV1-29: 轉為壞賬代碼
  transferToBadDebtDate: '',      // PV1-30: 轉為壞賬日期
  badDebtAgencyCode: '',          // PV1-31: 壞賬機構代碼
  badDebtTransferAmount: '',      // PV1-32: 壞賬轉移金額
  badDebtRecoveryAmount: '',      // PV1-33: 壞賬恢復金額
  deleteAccountIndicator: '',     // PV1-34: 刪除帳戶指示器
  deleteAccountDate: '',          // PV1-35: 刪除帳戶日期
  dischargeDisposition: '',       // PV1-36: 出院處置
  dischargedToLocation: '',       // PV1-37: 出院至位置
  dietType: '',                   // PV1-38: 飲食類型
  servicingFacility: '',          // PV1-39: 服務設施
  bedStatus: '',                  // PV1-40: 床位狀態
  accountStatus: '',              // PV1-41: 帳戶狀態
  pendingLocation: '',            // PV1-42: 待定位置
  priorTemporaryLocation: '',     // PV1-43: 先前臨時位置
  admitDateTime: '',              // PV1-44: 入院日期時間
  dischargeDateTime: '',          // PV1-45: 出院日期時間
  patientStatusCode: '',          // PV1-46: 病患狀態代碼
  patientStatusCodeDate: '',      // PV1-47: 病患狀態代碼日期
  patientStatusCodeTime: '',      // PV1-48: 病患狀態代碼時間
  patientStatusCodeReason: '',    // PV1-49: 病患狀態代碼原因
  patientStatusCodeReasonCode: '' // PV1-50: 病患狀態代碼原因代碼
};

// DG1段落初始值 (最多21項)
const dg1InitialState = {
  setId: '1',                     // DG1-1: 序號
  diagnosisCodingMethod: '',      // DG1-2: 診斷編碼方法
  diagnosisCode: '',              // DG1-3: 診斷代碼
  diagnosisDescription: '',       // DG1-4: 診斷描述
  diagnosisDateTime: '',          // DG1-5: 診斷日期時間
  diagnosisType: '',              // DG1-6: 診斷類型
  majorDiagnosisCategory: '',     // DG1-7: 主要診斷類別
  diagnosticRelatedGroup: '',     // DG1-8: 診斷相關群組
  drgApprovalIndicator: '',       // DG1-9: DRG批准指示器
  drgGrouperReviewCode: '',       // DG1-10: DRG分組審查代碼
  outlierType: '',                // DG1-11: 離群值類型
  outlierDays: '',                // DG1-12: 離群值天數
  outlierCost: '',                // DG1-13: 離群值成本
  grouperVersionAndType: '',      // DG1-14: 分組器版本和類型
  diagnosisPriority: '',          // DG1-15: 診斷優先級
  diagnosingClinician: '',        // DG1-16: 診斷醫師
  diagnosisClassification: '',    // DG1-17: 診斷分類
  confidentialIndicator: '',      // DG1-18: 保密指示器
  attestationDateTime: '',        // DG1-19: 認證日期時間
  diagnosisIdentifier: '',        // DG1-20: 診斷標識符
  diagnosisActionCode: ''         // DG1-21: 診斷操作代碼
};

// IPC段落初始值 (最多9項)
const ipcInitialState = {
  accessionIdentifier: '1',            // IPC-1: 存取識別碼
  requestedProcedureId: '',            // IPC-2: 申請程序ID
  studyInstanceUid: '',                // IPC-3: 研究實例UID
  scheduledProcedureStepId: '',        // IPC-4: 排程程序步驟ID
  modality: '',                        // IPC-5: 模態
  protocolCode: '',                    // IPC-6: 協議代碼
  scheduledStationName: '',            // IPC-7: 排程站台名稱
  scheduledProcedureStepLocation: '',  // IPC-8: 排程程序步驟位置
  scheduledProcedureStepStatus: ''     // IPC-9: 排程程序步驟狀態
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
  accessionIdentifier: '',            // SAC-2: 訪問識別碼
  containerIdentifier: '',            // SAC-3: 容器識別碼
  primaryContainerIdentifier: '',     // SAC-4: 主要(父)容器識別碼
  equipmentContainerIdentifier: '',   // SAC-5: 設備容器識別碼
  specimenSource: '',                 // SAC-6: 標本來源
  registrationDateTime: '',           // SAC-7: 登記日期/時間
  containerStatus: '',                // SAC-8: 容器狀態
  carrierType: '',                    // SAC-9: 載體類型
  carrierIdentifier: '',              // SAC-10: 載體識別碼
  positionInCarrier: '',              // SAC-11: 載體中的位置
  trayType: '',                       // SAC-12: 托盤類型
  trayIdentifier: '',                 // SAC-13: 托盤識別碼
  positionInTray: '',                 // SAC-14: 托盤中的位置
  location: '',                       // SAC-15: 位置
  containerHeight: '',                // SAC-16: 容器高度
  containerDiameter: '',              // SAC-17: 容器直徑
  barrierDelta: '',                   // SAC-18: 障礙增量
  bottomDelta: '',                    // SAC-19: 底部增量
  containerHeightDiameterDeltaUnits: '', // SAC-20: 容器高度/直徑/增量單位
  containerVolume: '',                // SAC-21: 容器體積
  availableSpecimenVolume: '',        // SAC-22: 可用標本體積
  initialSpecimenVolume: '',          // SAC-23: 初始標本體積
  volumeUnits: '',                    // SAC-24: 體積單位
  separatorType: '',                  // SAC-25: 分離器類型
  capType: '',                        // SAC-26: 蓋類型
  additive: '',                       // SAC-27: 添加劑
  specimenComponent: '',              // SAC-28: 標本組件
  dilutionFactor: '',                 // SAC-29: 稀釋因子
  treatment: '',                      // SAC-30: 處理
  temperature: '',                    // SAC-31: 溫度
  hemolysisIndex: '',                 // SAC-32: 溶血指數
  hemolysisIndexUnits: '',            // SAC-33: 溶血指數單位
  lipemiaIndex: '',                   // SAC-34: 脂血指數
  lipemiaIndexUnits: '',              // SAC-35: 脂血指數單位
  icterusIndex: '',                   // SAC-36: 黃疸指數
  icterusIndexUnits: '',              // SAC-37: 黃疸指數單位
  fibrinIndex: '',                    // SAC-38: 纖維蛋白指數
  fibrinIndexUnits: '',               // SAC-39: 纖維蛋白指數單位
  systemInducedContaminants: '',      // SAC-40: 系統引起的污染物
  drugInterference: '',               // SAC-41: 藥物干擾
  artificialBlood: '',                // SAC-42: 人工血液
  specialHandlingCode: '',            // SAC-43: 特殊處理代碼
  otherEnvironmentalFactors: ''       // SAC-44: 其他環境因素
};

// ORC段落初始值 (最多31項)
const orcInitialState = {
  orderControl: '',                 // ORC-1: 訂單控制
  placerOrderNumber: '',            // ORC-2: 申請方訂單編號
  fillerOrderNumber: '',            // ORC-3: 執行方訂單編號
  placerGroupNumber: '',            // ORC-4: 申請方群組編號
  orderStatus: '',                  // ORC-5: 訂單狀態
  responseFlag: '',                 // ORC-6: 回應標記
  quantityTiming: '',               // ORC-7: 數量/時間
  parent: '',                       // ORC-8: 父項目
  dateTimeOfTransaction: '',        // ORC-9: 交易日期時間
  enteredBy: '',                    // ORC-10: 輸入者
  verifiedBy: '',                   // ORC-11: 確認者
  orderingProvider: '',             // ORC-12: 開單醫師
  enterersLocation: '',             // ORC-13: 輸入者位置
  callBackPhoneNumber: '',          // ORC-14: 回電電話號碼
  orderEffectiveDateTime: '',       // ORC-15: 訂單生效日期時間
  orderControlCodeReason: '',       // ORC-16: 訂單控制代碼原因
  enteringOrganization: '',         // ORC-17: 輸入組織
  enteringDevice: '',               // ORC-18: 輸入設備
  actionBy: '',                     // ORC-19: 執行者
  advancedBeneficiaryNoticeCode: '', // ORC-20: 預先受益人通知代碼
  orderingFacilityName: '',         // ORC-21: 開單設施名稱
  orderingFacilityAddress: '',      // ORC-22: 開單設施地址
  orderingFacilityPhoneNumber: '',  // ORC-23: 開單設施電話號碼
  orderingProviderAddress: '',      // ORC-24: 開單醫師地址
  orderStatusModifier: '',          // ORC-25: 訂單狀態修飾符
  advancedBeneficiaryNoticeOverrideReason: '', // ORC-26: 預先受益人通知覆蓋原因
  fillersExpectedAvailabilityDateTime: '', // ORC-27: 填充者預期可用日期/時間
  confidentialityCode: '',          // ORC-28: 保密代碼
  orderType: '',                    // ORC-29: 訂單類型
  entererAuthorizationMode: '',     // ORC-30: 輸入者授權模式
  parentUniversalServiceIdentifier: '' // ORC-31: 父通用服務識別碼
};

// OBR段落初始值 (最多50項)
const obrInitialState = {
  setId: '',                         // OBR-1: 序號
  placerOrderNumber: '',             // OBR-2: 申請方訂單編號
  fillerOrderNumber: '',             // OBR-3: 執行方訂單編號
  universalServiceIdentifier: '',    // OBR-4: 通用服務識別碼
  priority: '',                      // OBR-5: 優先順序
  requestedDateTime: '',             // OBR-6: 請求日期時間
  observationDateTime: '',           // OBR-7: 觀察日期時間
  observationEndDateTime: '',        // OBR-8: 觀察結束日期時間
  collectionVolume: '',              // OBR-9: 採集量
  collectorIdentifier: '',           // OBR-10: 採集者識別碼
  specimenActionCode: '',            // OBR-11: 標本操作代碼
  dangerCode: '',                    // OBR-12: 危險代碼
  relevantClinicalInfo: '',          // OBR-13: 相關臨床資訊
  specimenReceivedDateTime: '',      // OBR-14: 標本接收日期時間
  specimenSource: '',                // OBR-15: 標本來源
  orderingProvider: '',              // OBR-16: 開單醫師
  orderCallbackPhoneNumber: '',      // OBR-17: 訂單回撥電話號碼
  placerField1: '',                  // OBR-18: 申請方欄位1
  placerField2: '',                  // OBR-19: 申請方欄位2
  fillerField1: '',                  // OBR-20: 執行方欄位1
  fillerField2: '',                  // OBR-21: 執行方欄位2
  resultsRptStatusChngDateTime: '',  // OBR-22: 結果報告狀態變更日期時間
  chargeToPractice: '',              // OBR-23: 收費實踐
  diagnosticServSectId: '',          // OBR-24: 診斷服務部門ID
  resultStatus: '',                  // OBR-25: 結果狀態
  parentResult: '',                  // OBR-26: 父結果
  quantityTiming: '',                // OBR-27: 數量/時間
  resultCopiesTo: '',                // OBR-28: 結果副本發送至
  parent: '',                        // OBR-29: 父項目
  transportationMode: '',            // OBR-30: 運輸模式
  reasonForStudy: '',                // OBR-31: 檢查原因
  principalResultInterpreter: '',    // OBR-32: 主要結果解釋者
  assistantResultInterpreter: '',    // OBR-33: 助理結果解釋者
  technician: '',                    // OBR-34: 技術員
  transcriptionist: '',              // OBR-35: 轉錄員
  scheduledDateTime: '',             // OBR-36: 排程日期時間
  numberOfSampleContainers: '',      // OBR-37: 樣本容器數量
  transportLogisticsOfCollectedSample: '', // OBR-38: 採集樣本的運輸物流
  collectorsComment: '',             // OBR-39: 採集者評論
  transportArrangementResponsibility: '', // OBR-40: 運輸安排責任
  transportArranged: '',             // OBR-41: 運輸已安排
  escort: '',                        // OBR-42: 需要護送
  plannedPatientTransportComment: '', // OBR-43: 計劃的病人運輸評論
  procedureCode: '',                 // OBR-44: 程序代碼
  procedureCodeModifier: '',         // OBR-45: 程序代碼修飾符
  placerSupplementalServiceInformation: '', // OBR-46: 申請方補充服務資訊
  fillerSupplementalServiceInformation: '', // OBR-47: 執行方補充服務資訊
  medicallyNecessaryDuplicateProcedureReason: '', // OBR-48: 醫療必要重複程序原因
  resultHandling: '',                // OBR-49: 結果處理
  parentUniversalServiceIdentifier: '' // OBR-50: 父通用服務識別碼
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

// QPD段落初始值 (最多3項)
const qpdInitialState = {
  messageQueryName: '',           // QPD-1: 查詢名稱
  queryTag: '',                  // QPD-2: 查詢標籤
  userParametersInSuccessiveFields: '' // QPD-3: 查詢參數
};

// RCP段落初始值 (最多7項)
const rcpInitialState = {
  queryPriority: '',             // RCP-1: 查詢優先級
  quantityLimitedRequest: '',    // RCP-2: 回應數量限制
  responseModality: '',          // RCP-3: 回應模式
  executionAndDeliveryTime: '',  // RCP-4: 執行和傳送時間
  modifyIndicator: '',           // RCP-5: 修改指示
  sortByComponent: '',           // RCP-6: 排序組件
  segmentGroupInclusion: ''      // RCP-7: 段落組包含指示
};

// NTE段落初始值 (最多4項)
const nteInitialState = {
  setId: '',                    // NTE-1: 設置 ID
  sourceOfComment: '',          // NTE-2: 註釋來源
  comment: '',                  // NTE-3: 註釋
  commentType: ''               // NTE-4: 註釋類型
};

// TQ1段落初始值 (最多14項)
const tq1InitialState = {
  setId: '1',                     // TQ1-1: 序號
  quantity: '',                   // TQ1-2: 數量
  repeatPattern: '',              // TQ1-3: 重複模式
  explicitTime: '',               // TQ1-4: 明確時間
  relativeTimeUnits: '',          // TQ1-5: 相對時間與單位
  serviceDuration: '',            // TQ1-6: 服務持續時間
  startDateTime: '',              // TQ1-7: 開始日期/時間
  endDateTime: '',                // TQ1-8: 結束日期/時間
  priority: '',                   // TQ1-9: 優先順序
  conditionText: '',              // TQ1-10: 條件文本
  textInstruction: '',            // TQ1-11: 文本指示
  conjunction: '',                // TQ1-12: 連接詞
  occurrenceDuration: '',         // TQ1-13: 發生持續時間
  totalOccurrences: ''            // TQ1-14: 總發生次數
};

// O33消息初始值
const o33DataInitialState = {
  msh: mshInitialState,
  pid: pidInitialState,
  spm: spmInitialState,
  sac: sacInitialState,
  nte: nteInitialState,
  orc: orcInitialState,
  obr: obrInitialState,
  obx: obxInitialState
};
// Q11消息初始值
const q11DataInitialState = {
  msh: mshInitialState,
  qpd: qpdInitialState,
  rcp: rcpInitialState
};

// O19消息初始值
const o19DataInitialState = {
  msh: mshInitialState,
  pid: pidInitialState,
  pv1: pv1InitialState,
  dg1: dg1InitialState,
  orc: orcInitialState,
  tq1: tq1InitialState,
  obr: obrInitialState,
  ipc: ipcInitialState,
  nte: nteInitialState
};

// O23消息初始值
const o23DataInitialState = {
  msh: mshInitialState,
  pid: pidInitialState,
  pv1: pv1InitialState,
  dg1: dg1InitialState,
  orc: orcInitialState,
  tq1: tq1InitialState,
  obr: obrInitialState,
  ipc: ipcInitialState,
  nte: nteInitialState
};

// 導出初始狀態
export { o33DataInitialState, q11DataInitialState, o19DataInitialState, o23DataInitialState };

// 導出各個段落的初始狀態
export {
  mshInitialState,
  pidInitialState,
  pv1InitialState,
  dg1InitialState,
  ipcInitialState,
  spmInitialState,
  sacInitialState,
  nteInitialState,
  orcInitialState,
  tq1InitialState,
  obrInitialState,
  obxInitialState,
  qpdInitialState,
  rcpInitialState
}; 