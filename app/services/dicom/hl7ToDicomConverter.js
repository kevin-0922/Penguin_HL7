const { generateUpsInstanceUID } = require("../../utils/upsInstanceGenerator");
const axios = require("axios");

const RacconBaseUrl = process.env.Raccon_API_URL;

const upsDataFunction = (hl7Json) => {
  const upsInstanceUID = generateUpsInstanceUID();
  const pid = hl7Json.PID || {};
  const orc = hl7Json.ORC || {};
  const obr = hl7Json.OBR || {};
  const msh = hl7Json.MSH || {};
  const pv1 = hl7Json.PV1 || {};
  const tq1 = hl7Json.TQ1 || {};
  const ipc = hl7Json.IPC || {};
  const dg1 = hl7Json.DG1 || {};
  // 輔助函數：安全地創建日期
  const createSafeDate = (dateString) => {
    if (!dateString) return null;
    try {
      // 處理 HL7 日期格式 (YYYYMMDDHHMMSS)
      if (dateString.length >= 8) {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        const hour = dateString.length >= 10 ? dateString.substring(8, 10) : "00";
        const minute = dateString.length >= 12 ? dateString.substring(10, 12) : "00";
        const second = dateString.length >= 14 ? dateString.substring(12, 14) : "00";

        const isoString = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
        const date = new Date(isoString);
        return isNaN(date.getTime()) ? null : date;
      }
      return null;
    } catch (error) {
      console.log("日期轉換錯誤:", error);
      return null;
    }
  };

  // 構建 UPS 工作項目格式 - DICOM JSON 格式
  const upsData = [
    {
      "00100020": {
        vr: "LO",
        Value: [pid.patientId || ""],
      },
      "00741200": {
        vr: "CS",
        Value: ["SCHEDULED"],
      },
      "00404010": {
        vr: "DA",
        Value: [createSafeDate(tq1.startDateTime) || createSafeDate(obr.requestedDateTime) || null],
      },
      "00741204": {
        vr: "CS",
        Value: [ipc.scheduledProcedureStepStatus || "SCHEDULED"],
      },
      "00741202": {
        vr: "AE",
        Value: [ipc.scheduledStationName || ""],
      },
      "00404005": {
        vr: "DA",
        Value: [createSafeDate(tq1.startDateTime) || createSafeDate(obr.requestedDateTime) || null],
      },
      "00404011": {
        vr: "DA",
        Value: [createSafeDate(tq1.endDateTime) || createSafeDate(obr.requestedDateTime) || null],
      },
      "00380010": {
        vr: "LO",
        Value: [pv1.visitNumber || pv1.assignedPatientLocation || ""],
      },
      "00380014": {
        vr: "SQ",
        Value: [
          {
            "00400031": {
              vr: "DA",
              Value: [
                tq1.startDateTime
                  ? tq1.startDateTime.slice(0, 8)
                  : obr.requestedDateTime
                  ? obr.requestedDateTime.slice(0, 8)
                  : new Date().toISOString().slice(0, 10).replace(/-/g, ""),
              ],
            },
            "00400032": {
              vr: "TM",
              Value: [
                tq1.startDateTime
                  ? tq1.startDateTime.slice(8, 14)
                  : obr.requestedDateTime
                  ? obr.requestedDateTime.slice(8, 14)
                  : new Date().toISOString().slice(11, 19).replace(/:/g, ""),
              ],
            },
            "00400033": {
              vr: "DA",
              Value: [
                tq1.endDateTime
                  ? tq1.endDateTime.slice(0, 8)
                  : obr.requestedDateTime
                  ? obr.requestedDateTime.slice(0, 8)
                  : new Date().toISOString().slice(0, 10).replace(/-/g, ""),
              ],
            },
          },
        ],
      },
      "00741000": {
        vr: "CS",
        Value: ["SCHEDULED"],
      },
      "00404008": {
        vr: "TM",
        Value: [createSafeDate(tq1.startDateTime) || createSafeDate(obr.requestedDateTime) || null],
      },
      "00404036": {
        vr: "LO",
        Value: [orc.enteredBy || orc.orderingProvider || ""],
      },
      "00404041": {
        vr: "LO",
        Value: [orc.enteringOrganization || orc.orderingProvider || ""],
      },
      // 包含原有的 jsonData DICOM 欄位
      "00100010": {
        vr: "PN",
        Value: [
          {
            Alphabetic: pid.patientName || "",
          },
        ],
      },
      "00100030": {
        vr: "DA",
        Value: [(pid.dateOfBirth || "").slice(0, 8) || ""],
      },
      "00100040": {
        vr: "CS",
        Value: [pid.sex || ""],
      },
      "00080090": {
        vr: "PN",
        Value: [
          {
            Alphabetic: obr.orderingProvider || "",
          },
        ],
      },
      "00080050": {
        vr: "SH",
        Value: [obr.placerOrderNumber || ""],
      },
      "00402016": {
        vr: "LO",
        Value: [orc.fillerOrderNumber || ""],
      },
      "00321060": {
        vr: "LO",
        Value: [obr.universalServiceId || ""],
      },
      "00080060": {
        vr: "CS",
        Value: [ipc.modality || ""],
      },
      "00401001": {
        vr: "SH",
        Value: [orc.placerOrderNumber || ""],
      },
      "00400009": {
        vr: "SH",
        Value: [ipc.scheduledProcedureStepId || ""],
      },
      "0020000D": {
        vr: "UI",
        Value: [ipc.studyInstanceUid || ""],
      },
      "0040100A": {
        vr: "SH",
        Value: [dg1.diagnosisCode || ""],
      },
      "00401002": {
        vr: "LO",
        Value: [dg1.diagnosisDescription || ""],
      },
      "00401003": {
        vr: "SH",
        Value: [tq1.priority || obr.priority || ""],
      },
      "00400100": {
        vr: "SQ",
        Value: [
          {
            "00080060": { vr: "CS", Value: [ipc.modality || ""] },
            "00321070": { vr: "LO", Value: [obr.procedureCode || ""] },
            "00400001": { vr: "AE",Value:  [ipc.scheduledProcedureStepStatus || ""],}, 
            "00400002": { vr: "DA", Value: [createSafeDate(tq1.startDateTime) || createSafeDate(obr.requestedDateTime) || null] }, 
            "00400003": { vr: "TM", Value: [createSafeDate(tq1.startDateTime) || createSafeDate(obr.requestedDateTime) || null] }, 
            "00400006": { vr: "PN", Value: [{ Alphabetic: obr.orderingProvider || "" }] }, 
            "00400007": { vr: "LO", Value: [obr.universalServiceId || ""] }, 
            "00400009": { vr: "SH", Value: [ipc.scheduledProcedureStepId || ""] }, 
            "00400010": { vr: "SH", Value: [ipc.scheduledStationName || ""] }, 
            "00400011": { vr: "SH", Value: [pv1.assignedPatientLocation || ipc.scheduledProcedureStepLocation || ""] },
            "00400012": { vr: "LO", Value: [""] },
            "00400400": { vr: "LT", Value: [""] },
          },
        ],
      },
    },
  ];
  return upsData;
};
//將 HL7 O19 訊息轉換為 DICOM JSON 格式並發送到 API
const convertO19ToDicom = async (hl7Json) => {
  //console.log('🔍 DICOM 轉換 - 輸入數據:');
  //console.log('HL7 JSON:', hl7Json);
  // 生成 UPS Instance UID
  const upsInstanceUID = generateUpsInstanceUID();

  const upsData = upsDataFunction(hl7Json);

  // 發送到 API
  console.log("🔄 發送 DICOM 數據到 API...");
  console.log("UPS 數據:", upsData);

  try {
    console.log("路徑:", `${RacconBaseUrl}/dicom-web/workitems`);
    const response = await axios.post(`${RacconBaseUrl}/dicom-web/workitems`, upsData, {
      headers: {
        "Content-Type": "application/dicom+json",
        Accept: "application/dicom+json",
      },
      timeout: 10000,
    });

    console.log("✅ DICOM API 呼叫成功");
    console.log("API 回應狀態:", response.status);
    console.log("API 回應數據:", response.data);

    return true;
  } catch (error) {
    console.error("❌ DICOM API 呼叫失敗");
    console.error("錯誤詳情:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
      },
    });

    return false;
  }
};

const convertO23ToDicom = async (hl7Json) => {
  const upsData = upsDataFunction(hl7Json);

  // 發送到 API
  console.log("🔄 發送 DICOM 數據到 API...");
  //console.log('UPS 數據:', JSON.stringify(upsData, null, 2));
  console.log("UPS 數據:", JSON.stringify(upsData[0], null, 2));
  try {
    const response = await axios.post(`${RacconBaseUrl}/dicom-web/patients`, upsData[0], {
      headers: {
        "Content-Type": "application/dicom+json",
        Accept: "application/dicom+json",
      },
      timeout: 10000,
    });
    console.log("✅ DICOM API 呼叫成功");
    console.log("API 回應狀態:", response.status);
    console.log("API 回應數據:", response.data);
  } catch (error) {
    console.error("❌ DICOM API 呼叫失敗");
    console.error("錯誤詳情:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
      },
    });

    return false;
  }
  try {
    const response = await axios.post(`${RacconBaseUrl}/dicom-web/mwlitems`, upsData, {
      headers: {
        "Content-Type": "application/dicom+json",
        Accept: "application/dicom+json",
      },
      timeout: 10000,
    });

    console.log("✅ DICOM API 呼叫成功");
    console.log("API 回應狀態:", response.status);
    console.log("API 回應數據:", response.data);

    return true;
  } catch (error) {
    console.error("❌ DICOM API 呼叫失敗");
    console.error("錯誤詳情:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
      },
    });

    return false;
  }
};

module.exports = {
  convertO19ToDicom,
  convertO23ToDicom,
};
