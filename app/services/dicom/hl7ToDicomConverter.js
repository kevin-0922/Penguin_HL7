const { UpsWorkItem, Patient } = require('../../database/raccon_db');
const { generateUpsInstanceUID } = require('../../utils/upsInstanceGenerator');

//將 HL7 O19 訊息的 JSON 物件轉換為 UPS 格式並存儲到 raccon 資料庫
const convertO19ToDicom = async (hl7Json, orderId = null) => {
  console.log('🔍 DICOM 轉換 - 輸入數據:');
  console.log('HL7 JSON:', hl7Json);
  // 生成 UPS Instance UID
  const upsInstanceUID = generateUpsInstanceUID();
  
  // 從 HL7 JSON 中提取關鍵數據
  const pid = hl7Json.PID || {};
  const orc = hl7Json.ORC || {};
  const obr = hl7Json.OBR || {};
  const msh = hl7Json.MSH || {};
  const pv1 = hl7Json.PV1 || {};
  const tq1 = hl7Json.TQ1 || {};
  const ipc = hl7Json.IPC || {};
  const dg1 = hl7Json.DG1 || {};
  
  
  // 準備 JSON 部分的詳細數據 - 改進欄位映射
  const jsonData = {
    x00100010: pid.patientName || "", // Patient Name
    x00100030: (pid.dateOfBirth || "").slice(0, 8) || "", // Birth Date
    x00100040: pid.sex || "", // Patient Sex
    x00080090: obr.orderingProvider  || "", // Referring Physician
    x00080050: obr.placerOrderNumber || "", // Accession Number
    x00402016: orc.fillerOrderNumber || "", // Filler Order Number
    x00321060: obr.universalServiceId || "", // Requested Procedure Description
    x00080060: ipc.modality || "", // Modality
    x00401001: orc.placerOrderNumber || "", // Requested Procedure ID
    x00400009: ipc.scheduledProcedureStepId || "", // Scheduled Procedure Step ID
    x0020000D: ipc.studyInstanceUid || "", // Study Instance UID
    x0040100A: dg1.diagnosisCode || "", // 診斷代碼
    x00401002: dg1.diagnosisDescription , // 診斷描述
    x00401003: tq1.priority || obr.priority  // 優先級
  };
  
  console.log('🔍 JSON 數據:', JSON.stringify(jsonData, null, 2));
  
  // 輔助函數：安全地創建日期
  const createSafeDate = (dateString) => {
    if (!dateString) return null;
    try {
      // 處理 HL7 日期格式 (YYYYMMDDHHMMSS)
      if (dateString.length >= 8) {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        const hour = dateString.length >= 10 ? dateString.substring(8, 10) : '00';
        const minute = dateString.length >= 12 ? dateString.substring(10, 12) : '00';
        const second = dateString.length >= 14 ? dateString.substring(12, 14) : '00';
        
        const isoString = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
        const date = new Date(isoString);
        return isNaN(date.getTime()) ? null : date;
      }
      return null;
    } catch (error) {
      console.log('日期轉換錯誤:', error);
      return null;
    }
  };

  
  // 構建 UPS 工作項目格式 - 改進欄位映射和預設值
  const upsData = {
    upsInstanceUID: upsInstanceUID,
    x00100020: pid.patientId || null, // Patient ID (STRING)
    x00741200: null, // Procedure Step State (STRING)
    x00404010: createSafeDate(tq1.startDateTime) || createSafeDate(obr.requestedDateTime) || null, // Scheduled Procedure Step Start Date (DATE)
    x00741204: ipc.scheduledProcedureStepStatus || null, // Scheduled Procedure Step Status (STRING)
    x00741202: ipc.scheduledStationName || null, // Scheduled Station Name (STRING)
    x00404025: null, // Scheduled Station AE Title (INTEGER) - 設為 null 避免外鍵約束
    x00404026: null, // Scheduled Station Name (INTEGER) - 設為 null 避免外鍵約束
    x00404027: null, // Scheduled Station Geographic Location (INTEGER) - 設為 null 避免外鍵約束
    x00404034: null, // Scheduled Human Performers Name (INTEGER) - 設為 null 避免外鍵約束
    x00404005: createSafeDate(tq1.startDateTime) || createSafeDate(obr.requestedDateTime) || new Date(), // Scheduled Procedure Step Start Date (DATE)
    x00404011: createSafeDate(tq1.endDateTime) || (createSafeDate(obr.requestedDateTime) ? new Date(createSafeDate(obr.requestedDateTime).getTime() + 60*60*1000) : new Date()), // Scheduled Procedure Step End Date (DATE)
    x00404018: null, // Scheduled Procedure Step End Time (INTEGER) - 設為 null 避免外鍵約束
    x00380010: pv1.visitNumber || pv1.assignedPatientLocation || null, // Admission ID (STRING)
    x00380014_x00400031: tq1.startDateTime || obr.requestedDateTime || new Date().toISOString().slice(0, 8), // Scheduled Procedure Step Start Date (TEXT)
    x00380014_x00400032: tq1.startDateTime || obr.requestedDateTime || new Date().toISOString().slice(9, 15), // Scheduled Procedure Step Start Time (TEXT)
    x00380014_x00400033: tq1.endDateTime || obr.requestedDateTime || new Date().toISOString().slice(0, 8), // Scheduled Procedure Step End Date (STRING)
    x00741000: null, // Scheduled Procedure Step State (STRING)
    x00080082: null, // Institution Code Sequence (INTEGER) - 設為 null 避免外鍵約束
    x00404008: createSafeDate(tq1.startDateTime) || createSafeDate(obr.requestedDateTime) || new Date(), // Scheduled Procedure Step Start Time (DATE)
    x00404009: null, // Scheduled Procedure Step ID (INTEGER) - 設為 null 避免外鍵約束
    x00404036: orc.enteredBy || orc.orderingProvider || null, // Human Performers Organization (STRING)
    x00404037: null, // Human Performers Name (INTEGER) - 設為 null 避免外鍵約束
    x00404041: orc.enteringOrganization || orc.orderingProvider || null, // Human Performers Organization (STRING)
    user_id: null,
    patient_id: pid.patientId,
    json: jsonData
  };

  console.log('🔍 UPS 數據預覽:', {
    upsInstanceUID: upsData.upsInstanceUID,
    x00100020: upsData.x00100020,
    x00741200: upsData.x00741200,
    x00741204: upsData.x00741204,
    x00741202: upsData.x00741202,
    x00380010: upsData.x00380010,
    x00404036: upsData.x00404036,
    x00404041: upsData.x00404041,
    patient_id: upsData.patient_id,
    totalFields: Object.keys(upsData).length
  });
  
  // 同時存儲到 raccon 資料庫的 ups_work_item 表
  console.log('🔄 開始存儲 UPS 工作項目到 raccon 資料庫...');
  
  try {
    let patientId = null;
    
    // 檢查並創建 Patient 記錄
    if (pid.patientId) {
      console.log('🔍 檢查 Patient 是否存在:', pid.patientId);
      
      // 查找現有 Patient
      let existingPatient = await Patient.findOne({
        where: { x00100020: pid.patientId }
      });
      
      if (!existingPatient) {
        console.log('🆕 Patient 不存在，創建新的 Patient 記錄');
        
        // 準備 Patient 數據 - 只填入現有的 DICOM 標籤
        const patientData = {
          x00100020: pid.patientId, // Patient ID (必須)
          x00100010: pid.patientName ? parseInt(pid.patientName.replace(/\D/g, '')) || null : null, // Patient Name (轉為整數)
          x00100030: pid.dateOfBirth ? new Date(pid.dateOfBirth.slice(0, 4) + '-' + pid.dateOfBirth.slice(4, 6) + '-' + pid.dateOfBirth.slice(6, 8)) : null, // Birth Date
          x00100040: pid.sex || null, // Patient Sex
          json: JSON.stringify(jsonData),
          deleteStatus: 0
        };
        
        console.log('📝 準備插入的 Patient 數據:', patientData);
        
        // 創建新的 Patient
        const newPatient = await Patient.create(patientData);
        patientId = newPatient.id;
        
        console.log('✅ Patient 記錄創建成功, ID:', patientId);
      } else {
        patientId = existingPatient.id;
        console.log('✅ Patient 已存在, ID:', patientId);
      }
    } else {
      console.log('⚠️ 沒有提供 Patient ID，將不會創建 Patient 記錄');
    }
    
    const upsWorkItemData = {
      upsInstanceUID: upsData.upsInstanceUID,
      transactionUID: null,
      subscribed: 0,
      x00100020: upsData.x00100020,
      x00741200: upsData.x00741200,
      x00404010: upsData.x00404010,
      x00741204: upsData.x00741204,
      x00741202: upsData.x00741202,
      x00404025: upsData.x00404025,
      x00404026: upsData.x00404026,
      x00404027: upsData.x00404027,
      x00404034: upsData.x00404034,
      x00404005: upsData.x00404005,
      x00404011: upsData.x00404011,
      x00404018: upsData.x00404018,
      x00380010: upsData.x00380010,
      x00380014_x00400031: upsData.x00380014_x00400031,
      x00380014_x00400032: upsData.x00380014_x00400032,
      x00380014_x00400033: upsData.x00380014_x00400033,
      x00741000: upsData.x00741000,
      x00080082: upsData.x00080082,
      x00404008: upsData.x00404008,
      x00404009: upsData.x00404009,
      x00404036: upsData.x00404036,
      x00404037: upsData.x00404037,
      x00404041: upsData.x00404041,
      json: JSON.stringify(upsData.json),
      user_id: upsData.user_id,
      patient_id: patientId // 使用我們剛才獲得的 patient_id
    };
    
    
    // 檢查資料庫連接
    console.log('🔍 檢查資料庫連接狀態...');
    
    const createdItem = await UpsWorkItem.create(upsWorkItemData);
    console.log(`✅ UPS 工作項目已成功存儲到 raccon 資料庫!`);
   
    // 驗證資料是否真的寫入
    console.log('🔍 驗證資料寫入...');
    const verifyItem = await UpsWorkItem.findByPk(createdItem.id);
    if (verifyItem) {
      console.log('✅ 資料驗證成功 - 記錄確實存在於資料庫中');
      console.log('📋 完整記錄:', JSON.stringify(verifyItem.toJSON(), null, 2));
    } else {
      console.log('❌ 資料驗證失敗 - 找不到剛插入的記錄');
    }
    
    return true; // 存儲成功
    
  } catch (dbError) {
    console.error(`❌ 存儲 UPS 工作項目到 raccon 資料庫失敗!`);
    console.error(`錯誤詳情:`, {
      message: dbError.message,
      name: dbError.name,
      stack: dbError.stack
    });
    
    // 檢查是否是資料庫連接問題
    if (dbError.name === 'SequelizeConnectionError') {
      console.error('🔍 資料庫連接錯誤 - 請檢查環境變數設定');
      console.error('環境變數檢查:');
      console.error('RACCON_SQL_HOST:', process.env.RACCON_SQL_HOST);
      console.error('RACCON_SQL_PORT:', process.env.RACCON_SQL_PORT);
      console.error('RACCON_SQL_USERNAME:', process.env.RACCON_SQL_USERNAME);
      console.error('RACCON_SQL_DB:', process.env.RACCON_SQL_DB);
    }
    
    return false; // 存儲失敗
  }
};

module.exports = {
  convertO19ToDicom,
};