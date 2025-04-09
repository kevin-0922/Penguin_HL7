// hl7MessageGenerator.js - 處理HL7消息生成的邏輯

// 導入工具函數
import { convertToHL7Date, getHL7Timestamp } from './hl7Utils';

// 生成MSH段落
export const generateMSHSegment = (formData) => {
  const mshData = formData.msh || {};
  
  const segments = [
    'MSH',                                    // MSH-1: Segment ID (固定)
    '^~\\&',                                  // MSH-2: Field Separator (固定)
    mshData.sendingApplication || '',         // MSH-3: Sending Application
    mshData.sendingFacility || '',            // MSH-4: Sending Facility
    mshData.receivingApplication || '',       // MSH-5: Receiving Application
    mshData.receivingFacility || '',          // MSH-6: Receiving Facility
    getHL7Timestamp(),                        // MSH-7: Message Date/Time (固定)
    mshData.security || '',                   // MSH-8: Security
    'OML^O33',                               // MSH-9: Message Type (固定)
    mshData.messageControlId || '',           // MSH-10: Message Control ID
    mshData.processingId || '',               // MSH-11: Processing ID
    '2.5.1',                                 // MSH-12: Version ID (固定)
    mshData.sequenceNumber || '',             // MSH-13: Sequence Number
    mshData.continuationPointer || '',        // MSH-14: Continuation Pointer
    mshData.acceptAckType || '',              // MSH-15: Accept Acknowledgment Type
    mshData.applicationAckType || '',         // MSH-16: Application Acknowledgment Type
    'TW',                                    // MSH-17: Country Code (固定)
    'UTF-8',                                 // MSH-18: Character Set (固定)
    'zh-TW',                                // MSH-19: Principal Language (固定)
    'UTF-8',                                // MSH-20: Alternate Character Set (固定)
    '12345^LAB^HIS'                         // MSH-21: Message Profile Identifier (固定)
  ];

  return segments.join('|');
};

// 生成PID段落
export const generatePIDSegment = (formData) => {
  const pidData = formData.pid || {};
  
  // 轉換日期時間欄位為 HL7 格式
  const birthDateTime = convertToHL7Date(pidData.birthDateTime, true);
  const patientDeathDateTime = convertToHL7Date(pidData.patientDeathDateTime, true);
  const lastUpdateDateTime = convertToHL7Date(pidData.lastUpdateDateTime, true);
  
  // 獲取所有欄位，任何未定義的欄位設置為空字符串
  const segments = [
    'PID',                                    // Segment Identifier
    pidData.setId || '1',                     // PID-1: Set ID
    pidData.patientId || '',                  // PID-2: Patient ID
    pidData.patientIdList || '',              // PID-3: Patient ID List
    pidData.alternatePatientId || '',         // PID-4: Alternate Patient ID
    pidData.patientName || '',                // PID-5: Patient Name
    pidData.motherMaidenName || '',           // PID-6: Mother's Maiden Name
    birthDateTime || '',                      // PID-7: Date/Time of Birth
    pidData.sex || '',                        // PID-8: Sex
    pidData.alias || '',                      // PID-9: Patient Alias
    pidData.race || '',                       // PID-10: Race
    pidData.patientAddress || '',             // PID-11: Patient Address
    pidData.countryCode || '',                // PID-12: County Code
    pidData.phoneNumberHome || '',            // PID-13: Phone Number - Home
    pidData.phoneNumberBusiness || '',        // PID-14: Phone Number - Business
    pidData.primaryLanguage || '',            // PID-15: Primary Language
    pidData.maritalStatus || '',              // PID-16: Marital Status
    pidData.religion || '',                   // PID-17: Religion
    pidData.accountNumber || '',              // PID-18: Patient Account Number
    pidData.ssnNumber || '',                  // PID-19: SSN Number
    pidData.driversLicense || '',             // PID-20: Driver's License Number
    pidData.mothersIdentifier || '',          // PID-21: Mother's Identifier
    pidData.ethnicGroup || '',                // PID-22: Ethnic Group
    pidData.birthPlace || '',                 // PID-23: Birth Place
    pidData.multipleBirthIndicator || '',     // PID-24: Multiple Birth Indicator
    pidData.birthOrder || '',                 // PID-25: Birth Order
    pidData.citizenship || '',                // PID-26: Citizenship
    pidData.veteransMilitaryStatus || '',     // PID-27: Veterans Military Status
    pidData.nationality || '',                // PID-28: Nationality
    patientDeathDateTime || '',               // PID-29: Patient Death Date and Time
    pidData.patientDeathIndicator || '',      // PID-30: Patient Death Indicator
    pidData.identityUnknownIndicator || '',   // PID-31: Identity Unknown Indicator
    pidData.identityReliabilityCode || '',    // PID-32: Identity Reliability Code
    lastUpdateDateTime || '',                 // PID-33: Last Update Date/Time
    pidData.lastUpdateFacility || '',         // PID-34: Last Update Facility
    pidData.speciesCode || '',                // PID-35: Species Code
    pidData.breedCode || '',                  // PID-36: Breed Code
    pidData.strain || '',                     // PID-37: Strain
    pidData.productionClassCode || '',        // PID-38: Production Class Code
    pidData.tribalCitizenship || ''           // PID-39: Tribal Citizenship
  ];

  return segments.join('|');
};

// 生成SPM段落
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

// 生成SAC段落
export const generateSACSegment = (formData) => {
  const sacData = formData.sac || {};
  
  const segments = [
    'SAC',                                    // 段落標識符
    '1',                     // SAC-1: 設置ID - SAC
    sacData.containerLocation || '',          // SAC-2: 容器位置
    sacData.containerStatus || '',            // SAC-3: 容器接收狀態
    sacData.containerType || '',              // SAC-4: 容器類型
    sacData.containerCondition || '',         // SAC-5: 容器條件
    sacData.separatorType || '',              // SAC-6: 分離器類型
    sacData.capType || '',                    // SAC-7: 填充等級
    sacData.additive || '',                   // SAC-8: 添加劑
    sacData.specimenVolume || '',             // SAC-9: 檢體量
    sacData.specimenVolumeUnits || '',        // SAC-10: 檢體單位量
    sacData.specimenVolumeExtracted || '',    // SAC-11: 檢體處理量
    sacData.specimenVolumeExtractedUnits || '', // SAC-12: 檢體處理量單位
    sacData.containerConfirmationCount || '', // SAC-13: 容器確認數
    sacData.containerBarcode || '',           // SAC-14: 容器條碼
    sacData.containerPosition || '',          // SAC-15: 容器位置
    sacData.containerWeight || '',            // SAC-16: 容器重量
    sacData.containerWeightUnits || '',       // SAC-17: 容器重量單位
    sacData.containerVolume || '',            // SAC-18: 容器體積
    sacData.containerVolumeUnits || '',       // SAC-19: 容器體積單位
    sacData.containerTemperature || '',       // SAC-20: 容器體積溫度
    sacData.containerTemperatureUnits || '',  // SAC-21: 容器溫度單位
    sacData.containerTareWeight || '',        // SAC-22: 容器溫度
    sacData.containerTareWeightUnits || '',   // SAC-23: 容器空重單位
    sacData.barrierType || '',                // SAC-24: 障礙類型
    sacData.barrierDeltaHeight || '',         // SAC-25: 底部障礙差距高度
    sacData.containerHeight || '',            // SAC-26: 容器高度
    sacData.containerHeightUnits || '',       // SAC-27: 容器高度單位
    sacData.containerDiameter || '',          // SAC-28: 容器直徑
    sacData.containerDiameterUnits || '',     // SAC-29: 容器直徑單位
    sacData.barrierThickness || '',           // SAC-30: 障礙厚度
    sacData.bottomBarrierThickness || '',     // SAC-31: 底部障礙厚度
    sacData.bottomBarrierThicknessUnits || '', // SAC-32: 底部障礙厚度單位
    sacData.containerGrossWeight || '',       // SAC-33: 容器總重量
    sacData.containerGrossWeightUnits || '',  // SAC-34: 容器總重量單位
    sacData.containerGrossVolume || '',       // SAC-35: 容器總容積
    sacData.containerGrossVolumeUnits || '',  // SAC-36: 容器總容積單位
    sacData.containerGrossVolumeLimit || '',  // SAC-37: 容器總容積限制
    sacData.containerGrossVolumeLimitUnits || '', // SAC-38: 容器總容積限制單位
    sacData.containerGrossWeightLimit || '',  // SAC-39: 容器總重量限制
    sacData.containerGrossWeightLimitUnits || '', // SAC-40: 容器總重量限制單位
    sacData.containerCount || '',             // SAC-41: 容器數量
    sacData.containerCatalogNumber || '',     // SAC-42: 容器目錄號
    sacData.containerLotNumber || '',         // SAC-43: 容器批號
    sacData.containerManufacturer || ''       // SAC-44: 容器製造商
  ];

  return segments.join('|');
};

// 生成NTE段落
export const generateNTESegment = (formData) => {
  if (!formData.containerComments) {
    return '';
  }
  
  const segments = [
    'NTE',
    '',
    '',
    formData.containerComments || ''
  ];

  return segments.join('|');
};

// 生成ORC段落
export const generateORCSegment = (formData) => {
  const orcData = formData.orc || {};
  
  // 處理所有日期時間欄位
  const dateTimeOfTransaction = convertToHL7Date(orcData.dateTimeOfTransaction, true);
  const orderEffectiveDateTime = convertToHL7Date(orcData.orderEffectiveDateTime, true);
  const orderStatusEffectiveDateTime = convertToHL7Date(orcData.orderStatusEffectiveDateTime, true);

  const segments = [
    "ORC",                                    // Segment Type
    orcData.orderControl || "",               // ORC-1: Order Control
    orcData.placerOrderNumber || "",          // ORC-2: Placer Order Number
    orcData.fillerOrderNumber || "",          // ORC-3: Filler Order Number
    orcData.placerGroupNumber || "",          // ORC-4: Placer Group Number
    orcData.orderStatus || "",                // ORC-5: Order Status
    orcData.responseFlag || "",               // ORC-6: Response Flag
    orcData.quantityTiming || "",             // ORC-7: Quantity/Timing
    orcData.parent || "",                     // ORC-8: Parent
    dateTimeOfTransaction || "",              // ORC-9: DateTime of Transaction
    orcData.enteredBy || "",                  // ORC-10: Entered By
    orcData.verifiedBy || "",                 // ORC-11: Verified By
    orcData.orderingProvider || "",           // ORC-12: Ordering Provider
    orcData.enterersLocation || "",           // ORC-13: Enterers Location
    orcData.callBackPhoneNumber || "",        // ORC-14: Call Back Phone Number
    orderEffectiveDateTime || "",             // ORC-15: Order Effective DateTime
    orcData.orderControlCodeReason || "",     // ORC-16: Order Control Code Reason
    orcData.enteringOrganization || "",       // ORC-17: Entering Organization
    orcData.enteringDevice || "",             // ORC-18: Entering Device
    orcData.actionBy || "",                   // ORC-19: Action By
    orcData.advancedBeneficiaryNoticeCode || "", // ORC-20: Advanced Beneficiary Notice Code
    orcData.orderingFacilityName || "",       // ORC-21: Ordering Facility Name
    orcData.orderingFacilityAddress || "",    // ORC-22: Ordering Facility Address
    orcData.orderingFacilityPhoneNumber || "", // ORC-23: Ordering Facility Phone Number
    orcData.orderingProviderAddress || "",    // ORC-24: Ordering Provider Address
    orcData.orderStatusModifier || "",        // ORC-25: Order Status Modifier
    orcData.advancedConfidentialityIndicator || "", // ORC-26: Advanced Confidentiality Indicator
    orcData.orderingProviderSupplement || "", // ORC-27: Ordering Provider Supplement
    orcData.advancedBeneficiaryNoticeOverrideReason || "", // ORC-28: Advanced Beneficiary Notice Override Reason
    orderStatusEffectiveDateTime || "",       // ORC-29: Order Status Effective DateTime
    orcData.confidentialityCode || "",        // ORC-30: Confidentiality Code
    orcData.orderType || ""                   // ORC-31: Order Type
  ];

  return segments.join('|').replace(/\|+$/, "");
};

// 生成OBR段落
export const generateOBRSegment = (formData) => {
  const obrData = formData.obr || {};
  
  // 處理所有日期時間欄位
  const requestedDateTime = convertToHL7Date(obrData.requestedDateTime, true);
  const observationDateTime = convertToHL7Date(obrData.observationDateTime, true);
  const observationEndDateTime = convertToHL7Date(obrData.observationEndDateTime, true);
  const specimenReceivedDateTime = convertToHL7Date(obrData.specimenReceivedDateTime, true);
  const resultsRptStatusChngDateTime = convertToHL7Date(obrData.resultsRptStatusChngDateTime, true);
  const scheduledDateTime = convertToHL7Date(obrData.scheduledDateTime, true);

  const segments = [
    "OBR",                                    // Segment Type
    obrData.setId || "1",                     // OBR-1: Set ID
    obrData.placerOrderNumber || "",          // OBR-2: Placer Order Number
    obrData.fillerOrderNumber || "",          // OBR-3: Filler Order Number
    obrData.universalServiceIdentifier || "", // OBR-4: Universal Service ID
    obrData.priority || "",                   // OBR-5: Priority
    requestedDateTime || "",                  // OBR-6: Requested DateTime
    observationDateTime || "",                // OBR-7: Observation DateTime
    observationEndDateTime || "",             // OBR-8: Observation End DateTime
    obrData.collectionVolume || "",           // OBR-9: Collection Volume
    obrData.collectorIdentifier || "",        // OBR-10: Collector Identifier
    obrData.specimenActionCode || "",         // OBR-11: Specimen Action Code
    obrData.dangerCode || "",                 // OBR-12: Danger Code
    obrData.relevantClinicalInfo || "",       // OBR-13: Relevant Clinical Info
    specimenReceivedDateTime || "",           // OBR-14: Specimen Received DateTime
    obrData.specimenSource || "",             // OBR-15: Specimen Source
    obrData.orderingProvider || "",           // OBR-16: Ordering Provider
    obrData.orderCallbackPhoneNumber || "",   // OBR-17: Order Callback Phone Number
    obrData.placerField1 || "",               // OBR-18: Placer Field 1
    obrData.placerField2 || "",               // OBR-19: Placer Field 2
    obrData.fillerField1 || "",               // OBR-20: Filler Field 1
    obrData.fillerField2 || "",               // OBR-21: Filler Field 2
    resultsRptStatusChngDateTime || "",       // OBR-22: Results Rpt Status Chng DateTime
    obrData.chargeToPractice || "",           // OBR-23: Charge to Practice
    obrData.diagnosticServSectId || "",       // OBR-24: Diagnostic Serv Sect ID
    obrData.resultStatus || "",               // OBR-25: Result Status
    obrData.parentResult || "",               // OBR-26: Parent Result
    obrData.quantityTiming || "",             // OBR-27: Quantity/Timing
    obrData.resultCopiesTo || "",             // OBR-28: Result Copies To
    obrData.parent || "",                     // OBR-29: Parent
    obrData.transportationMode || "",         // OBR-30: Transportation Mode
    obrData.reasonForStudy || "",             // OBR-31: Reason for Study
    obrData.principalResultInterpreter || "", // OBR-32: Principal Result Interpreter
    obrData.assistantResultInterpreter || "", // OBR-33: Assistant Result Interpreter
    obrData.technician || "",                 // OBR-34: Technician
    obrData.transcriptionist || "",           // OBR-35: Transcriptionist
    scheduledDateTime || "",                  // OBR-36: Scheduled DateTime
    obrData.numberOfSampleContainers || "",   // OBR-37: Number of Sample Containers
    obrData.transportLogisticsOfCollectedSample || "", // OBR-38: Transport Logistics
    obrData.collectorsComment || "",          // OBR-39: Collectors Comment
    obrData.transportArrangementResponsibility || "", // OBR-40: Transport Arrangement
    obrData.transportArranged || "",          // OBR-41: Transport Arranged
    obrData.escortRequired || "",             // OBR-42: Escort Required
    obrData.plannedPatientTransportComment || "", // OBR-43: Planned Patient Transport Comment
    obrData.procedureCode || "",              // OBR-44: Procedure Code
    obrData.procedureCodeModifier || "",      // OBR-45: Procedure Code Modifier
    obrData.placerSupplementalServiceInformation || "", // OBR-46: Placer Supplemental Service Info
    obrData.fillerSupplementalServiceInformation || "", // OBR-47: Filler Supplemental Service Info
    obrData.medicallyNecessaryDuplicateProcedureReason || "", // OBR-48: Medically Necessary Duplicate Procedure Reason
    obrData.resultHandling || "",             // OBR-49: Result Handling
    obrData.parentUniversalServiceIdentifier || "" // OBR-50: Parent Universal Service ID
  ];

  return segments.join('|').replace(/\|+$/, "");
};

// 生成OBX段落
export const generateOBXSegment = (formData) => {
  const obxData = formData.obx || {};
  
  // 處理日期時間欄位
  const effectiveDateOfReferenceRange = convertToHL7Date(obxData.effectiveDateOfReferenceRange, true);
  const dateTimeOfTheObservation = convertToHL7Date(obxData.dateTimeOfTheObservation, true);
  const dateTimeOfTheAnalysis = convertToHL7Date(obxData.dateTimeOfTheAnalysis, true);

  const segments = [
    'OBX',                                    // Segment Type
    obxData.setId || '',                      // OBX-1: Set ID
    obxData.valueType || '',                  // OBX-2: Value Type (M)
    obxData.observationIdentifier || '',      // OBX-3: Observation Identifier (M)
    obxData.observationSubId || '',           // OBX-4: Observation Sub-ID
    obxData.observationValue || '',           // OBX-5: Observation Value (C)
    obxData.units || '',                      // OBX-6: Units
    obxData.referenceRange || '',             // OBX-7: References Range
    obxData.abnormalFlags || '',              // OBX-8: Abnormal Flags
    obxData.probability || '',                // OBX-9: Probability
    obxData.natureOfAbnormalTest || '',       // OBX-10: Nature of Abnormal Test
    obxData.observationResultStatus || '',    // OBX-11: Observation Result Status (M)
    effectiveDateOfReferenceRange || '',      // OBX-12: Effective Date of Reference Range
    obxData.userDefinedAccessChecks || '',    // OBX-13: User Defined Access Checks
    dateTimeOfTheObservation || '',           // OBX-14: DateTime of the Observation
    obxData.producersId || '',                // OBX-15: Producers ID
    obxData.responsibleObserver || '',        // OBX-16: Responsible Observer
    obxData.observationMethod || '',          // OBX-17: Observation Method
    obxData.equipmentInstanceIdentifier || '', // OBX-18: Equipment Instance Identifier
    dateTimeOfTheAnalysis || '',              // OBX-19: DateTime of the Analysis
    obxData.observationSite || '',            // OBX-20: Observation Site
    obxData.observationInstanceIdentifier || '', // OBX-21: Observation Instance Identifier
    obxData.moodCode || '',                   // OBX-22: Mood Code
    obxData.performingOrganizationName || '', // OBX-23: Performing Organization Name
    obxData.performingOrganizationAddress || '', // OBX-24: Performing Organization Address
    obxData.performingOrganizationMedicalDirector || '' // OBX-25: Performing Organization Medical Director
  ];

  return segments.join('|').replace(/\|+$/, "");
};

// 生成完整的HL7消息
export const generateCompleteHL7Message = (formData) => {
  const mshSegment = generateMSHSegment(formData);
  const pidSegment = generatePIDSegment(formData);
  const spmSegment = generateSPMSegment(formData);
  const sacSegment = generateSACSegment(formData);
  const nteSegment = generateNTESegment(formData);
  const orcSegment = generateORCSegment(formData);
  const obrSegment = generateOBRSegment(formData);
  const obxSegment = generateOBXSegment(formData);

  // 組合完整HL7消息
  let fullHL7Message = `${mshSegment}\n${pidSegment}\n${spmSegment}`;
  
  // 如果有SAC信息，添加SAC段落
  if (formData.containerIdentifier) {
    fullHL7Message += `\n${sacSegment}`;
    if (nteSegment) {
      fullHL7Message += `\n${nteSegment}`;
    }
  }
  
  // 添加訂單和觀察段落
  fullHL7Message += `\n${orcSegment}\n${obrSegment}\n${obxSegment}`;

  return fullHL7Message;
}; 