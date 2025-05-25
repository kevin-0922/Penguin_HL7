const {
  parseMSH,
  parseOBR,
  parseORC,
  parsePID,
  parseSPM,
  parseOBX,
  parseSAC,
  parseQPD,
  parseMSA,
  parseQAK
} = require('../../utils/parsers');

const ERROR_CODES = {
  INVALID_REQUEST: { code: 1001, message: "InvalidRequest", httpStatus: 400 },
  NOT_FOUND: { code: 1003, message: "NotFound", httpStatus: 404 },
  SERVER_ERROR: { code: 1004, message: "ServerError", httpStatus: 500 },
};

// 找不到的段落跳過
// K11 假資料 只包含 QAK:
const k11RawMessageExample = `QAK|QUERYID456|AA|1.3.6.1.4.1.5962.1.2.0.1739193339.66766.0^StudyInstanceUID^DCM`;
//文件Example
//const k11RawMessageExample = `MSH|^~\&|MT-DICOMPATH||EH_ENRICH||20250407095611||RSP^K11^RSP_K11|e9017860-e3c6-4754-888f-c681e59684d7|P|2.5.1|||||||||LAB-81^IHE\rMSA|AA|MSG001001\rQAK|IWOS|OK|WOS^^\rQPD|IWOS^Imaging WOS^IHEDIA|0667eaf1-d177-4f82-9112-c9f1187d6cb2|PR-24-1220-A2-1\r`
// k11範例
//const k11RawMessageExample = `MSH|^~\\&|HIS_APP|HIS_FACILITY|YOUR_APP|YOUR_FACILITY|202505251030||RSP^K11^RSP_K11|MSGID456|P|2.5.1|||AL|NE\rMSA|AA|QUERYID\rQAK|QUERYID456|AA|1.3.6.1.4.1.5962.1.2.0.1739193339.66766.0^StudyInstanceUID^DCM\rQRD|202505251025|R|D|1234567890|Q11^Find Candidates By Name^HL70471|PATIENT_ID_TYPE|M^MATCHED|1|RD^Record Display^HL70391||||||||\rPID|||37386152^^^HospitalID^MR||王小明^DAVID||19900101|F|||123 Main St^^City^State^ZIP^CN||(123)456-7890|||M|Black|||||\rPV1||O|ER^^^ER_UNIT^Room101|||||||||||||||||||||||||||||||||||||\rORC|NW|SP19-000425^Placer|FILLER-ORDER-001^Filler||CM|||||202505251020||||||||||||\rOBR|1|SP19-000425^Placer|FILLER-ORDER-001^Filler|0001^X-Ray Chest^L9999|||202505251020|||||||||||||||||||||||||||`;

//模擬 hl7-parser
class MockField {
  constructor(fieldString, componentSeparator = '^', subcomponentSeparator = '&') {
    this.value = fieldString.split(componentSeparator).map(comp => {
      return comp.split(subcomponentSeparator);
    });
    this.originalValue = fieldString;
  }
  toString() {
    return this.value && this.value[0] && this.value[0][0] ? this.value[0][0].toString() : '';
  }
}

class MockSegment {
  constructor(segmentString, fieldSeparator = '|', componentSeparator = '^', subcomponentSeparator = '&') {
    const parts = segmentString.split(fieldSeparator);
    this.segmentName = parts[0];
    this.fields = [];

    if (this.segmentName === 'MSH') {
      this.fields.push(new MockField(fieldSeparator, componentSeparator, subcomponentSeparator));
      const encodingChars = parts[1] || '^~\\&';
      this.fields.push(new MockField(encodingChars, componentSeparator, subcomponentSeparator));
      for (let i = 2; i < parts.length; i++) {
        this.fields.push(new MockField(parts[i], componentSeparator, subcomponentSeparator));
      }
    } else {
      for (let i = 1; i < parts.length; i++) {
        this.fields.push(new MockField(parts[i], componentSeparator, subcomponentSeparator));
      }
    }
  }
}

class MockMessage {
  constructor(hl7String) {
    this.hl7String = hl7String;
    this.segments = [];
    const segmentStrings = hl7String.split('\r').filter(s => s.trim() !== '');

    segmentStrings.forEach(s => {
      this.segments.push(new MockSegment(s, '|', '^', '&'));
    });
  }

  getSegment(segmentName) {
    return this.segments.find(s => s.segmentName === segmentName);
  }

  split(separator) {
    return this.hl7String.split(separator);
  }
}
// --- 模擬結束 ---

exports.getDicomOrder = (req, res) => {
  try {
    const message = new MockMessage(k11RawMessageExample);
    const parsedK11 = {};

    const parseSegmentSafely = (parserFunction, segmentName) => {
        try {
            const parsedData = parserFunction(message);
            if (parsedData === null) {
                console.warn(`Warning: ${segmentName} segment not found or skipped by parser.`);
            }
            return parsedData;
        } catch (e) {
            console.warn(`Warning: Error parsing ${segmentName} segment: ${e.message}. Skipping.`);
            return null;
        }
    };

    parsedK11.MSH = parseSegmentSafely(parseMSH, "MSH");
    parsedK11.PID = parseSegmentSafely(parsePID, "PID");
    parsedK11.ORC = parseSegmentSafely(parseORC, "ORC");
    parsedK11.OBR = parseSegmentSafely(parseOBR, "OBR");
    parsedK11.OBX = parseSegmentSafely(parseOBX, "OBX");
    parsedK11.SPM = parseSegmentSafely(parseSPM, "SPM");
    parsedK11.SAC = parseSegmentSafely(parseSAC, "SAC");
    parsedK11.QPD = parseSegmentSafely(parseQPD, "QPD");
    parsedK11.MSA = parseSegmentSafely(parseMSA, "MSA");
    parsedK11.QAK = parseSegmentSafely(parseQAK, "QAK");


    const getParsedFieldValue = (parsedSegment, fieldIndex, componentIndex = 0, subcomponentIndex = 0) => {
      if (!parsedSegment || !Array.isArray(parsedSegment)) return '';
      const fieldEntry = parsedSegment.find(f => f.field === fieldIndex);
      if (!fieldEntry || !fieldEntry.components || !Array.isArray(fieldEntry.components)) return '';
      const component = fieldEntry.components[componentIndex];
      if (!component || !Array.isArray(component)) return '';
      return component[subcomponentIndex] !== undefined ? component[subcomponentIndex].toString() : '';
    };

    const getMshOrMsaValue = (parsedSegment, fieldIndex, componentIndex = 0, subcomponentIndex = 0) => {
        if (!parsedSegment || !parsedSegment.fields) return '';
        const field = parsedSegment.fields[fieldIndex - 1];
        if (!field || !field.value || !Array.isArray(field.value)) return '';
        const component = field.value[componentIndex];
        if (!component || !Array.isArray(component)) return '';
        return component[subcomponentIndex] !== undefined ? component[subcomponentIndex].toString() : '';
    };
    const dicomResult = {
      "00100020": getParsedFieldValue(parsedK11.PID, 3, 0, 0), // 患者ID
      "00100010": getParsedFieldValue(parsedK11.PID, 5, 0, 0), // 患者姓名
      "00100030": (getParsedFieldValue(parsedK11.PID, 7, 0, 0) || '').slice(0, 8), // 患者出生日期
      "00100032": (getParsedFieldValue(parsedK11.PID, 7, 0, 0) || '').slice(8), // 患者出生時間
      "00100040": getParsedFieldValue(parsedK11.PID, 8, 0, 0), // 患者性別
      "00102160": getParsedFieldValue(parsedK11.PID, 10, 0, 0) || getParsedFieldValue(parsedK11.PID, 22, 0, 0), // 種族或血型 (PID-10 或 PID-22)

      "00100200": getParsedFieldValue(parsedK11.SPM, 11, 0, 0) || "NO", // 這裡預設NO
      "0020000D": parsedK11.QAK ? getParsedFieldValue(parsedK11.QAK, 3, 0, 0) : "", // Study Instance UID (從 QAK-3)

      "00080020": (getParsedFieldValue(parsedK11.SPM, 17, 0, 0) || '').split("^")[0] || "", // Study Date 
      "00080030": (getParsedFieldValue(parsedK11.SPM, 17, 0, 0) || '').split("^")[1] || "", // Study Time 
      "00080050": getParsedFieldValue(parsedK11.SAC, 2, 0, 0) || getParsedFieldValue(parsedK11.SPM, 30, 0, 0) || "", // Accession Number (SAC-2 或 SPM-30)
      "00402016": getParsedFieldValue(parsedK11.ORC, 2, 0, 0) || getParsedFieldValue(parsedK11.OBR, 2, 0, 0),
      "00400026": [
          getParsedFieldValue(parsedK11.ORC, 2, 0, 1),
          getParsedFieldValue(parsedK11.ORC, 2, 0, 2),
          getParsedFieldValue(parsedK11.ORC, 2, 0, 3)
      ].filter(Boolean).join("^"),

      "00402017": getParsedFieldValue(parsedK11.ORC, 3, 0, 0) || getParsedFieldValue(parsedK11.OBR, 3, 0, 0),
      "00400027": [
          getParsedFieldValue(parsedK11.ORC, 3, 0, 1),
          getParsedFieldValue(parsedK11.ORC, 3, 0, 2),
          getParsedFieldValue(parsedK11.ORC, 3, 0, 3)
      ].filter(Boolean).join("^"),

      "00321064": getParsedFieldValue(parsedK11.OBR, 4, 0, 0), // OBR-4
      // QPD 字段
      "00400101": parsedK11.QPD ? getParsedFieldValue(parsedK11.QPD, 1, 0, 0) : "", // QPD-1 
      "00080051": "",
      "00400008": "",
      "00400512": getParsedFieldValue(parsedK11.SAC, 3, 0, 0),
      "00400513": getParsedFieldValue(parsedK11.SAC, 3, 0, 1),
      "00400518": getParsedFieldValue(parsedK11.SAC, 47, 0, 0) || getParsedFieldValue(parsedK11.SPM, 27, 0, 0),
      "00400551": getParsedFieldValue(parsedK11.SPM, 2, 0, 0),
      "00400562": getParsedFieldValue(parsedK11.SPM, 2, 0, 1),
      "00400554": getParsedFieldValue(parsedK11.SPM, 31, 0, 0),
      "0040059A": getParsedFieldValue(parsedK11.SPM, 4, 0, 0),
      "00400600": getParsedFieldValue(parsedK11.SPM, 14, 0, 0),
      "00400602": getParsedFieldValue(parsedK11.SPM, 14, 0, 0),
      "00082228": getParsedFieldValue(parsedK11.SPM, 8, 0, 0),
      "00082230": getParsedFieldValue(parsedK11.SPM, 9, 0, 0),

      "00080058": parsedK11.QAK ? getParsedFieldValue(parsedK11.QAK, 2, 0, 0) : "" // QAK-2
    };

    // 檢查是否沒有任何有意義的數據被解析
    const hasData = Object.values(dicomResult).some(value => value !== "" && value !== "NO");

    if (!hasData) {
      return res.status(ERROR_CODES.NOT_FOUND.httpStatus).json({
        code: ERROR_CODES.NOT_FOUND.code,
        message: ERROR_CODES.NOT_FOUND.message,
      });
    }

    // 成功
    return res.status(200).json({
      data: [dicomResult], 
      total: 1,
    });
  } catch (error) {
    console.error("處理 HL7 並轉 DICOM 發生錯誤:", error);
    // 伺服器內部錯誤
    return res.status(ERROR_CODES.SERVER_ERROR.httpStatus).json({
      code: ERROR_CODES.SERVER_ERROR.code,
      message: ERROR_CODES.SERVER_ERROR.message,
    });
  }
};