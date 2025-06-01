
const { mapHl7ToDicom } = require('../../services/hl7/dicomMappingService');
const ERROR_CODES = {
  INVALID_REQUEST: { code: 1001, message: "InvalidRequest", httpStatus: 400 },
  NOT_FOUND: { code: 1003, message: "NotFound", httpStatus: 404 },
  SERVER_ERROR: { code: 1004, message: "ServerError", httpStatus: 500 },
};

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
// --- Mock 結束 ---

// 引入 HL7 parser
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

// K11 假資料
const k11RawMessageExample = `MSH|^~\\&|HIS_APP|HIS_FACILITY|YOUR_APP|YOUR_FACILITY|202505251030||RSP^K11^RSP_K11|MSGID456|P|2.5.1|||AL|NE\rMSA|AA|QUERYID\rQAK|QUERYID456|AA|1.3.6.1.4.1.5962.1.2.0.1739193339.66766.0^StudyInstanceUID^DCM\rQRD|202505251025|R|D|1234567890|Q11^Find Candidates By Name^HL70471|PATIENT_ID_TYPE|M^MATCHED|1|RD^Record Display^HL70391||||||||\rPID|||37386152^^^HospitalID^MR||王小明^DAVID||19900101|F|||123 Main St^^City^State^ZIP^CN||(123)456-7890|||M|Black|||||\rPV1||O|ER^^^ER_UNIT^Room101|||||||||||||||||||||||||||||||||||||\rORC|NW|SP19-000425^Placer|FILLER-ORDER-001^Filler||CM|||||202505251020||||||||||||\rOBR|1|SP19-000425^Placer|FILLER-ORDER-001^Filler|0001^X-Ray Chest^L9999|||202505251020|||||||||||||||||||||||||||`;

//文件Example
//const k11RawMessageExample = `MSH|^~\&|MT-DICOMPATH||EH_ENRICH||20250407095611||RSP^K11^RSP_K11|e9017860-e3c6-4754-888f-c681e59684d7|P|2.5.1|||||||||LAB-81^IHE\rMSA|AA|MSG001001\rQAK|IWOS|OK|WOS^^\rQPD|IWOS^Imaging WOS^IHEDIA|0667eaf1-d177-4f82-9112-c9f1187d6cb2|PR-24-1220-A2-1\r`
// k11範例
//const k11RawMessageExample = `MSH|^~\\&|HIS_APP|HIS_FACILITY|YOUR_APP|YOUR_FACILITY|202505251030||RSP^K11^RSP_K11|MSGID456|P|2.5.1|||AL|NE\rMSA|AA|QUERYID\rQAK|QUERYID456|AA|1.3.6.1.4.1.5962.1.2.0.1739193339.66766.0^StudyInstanceUID^DCM\rQRD|202505251025|R|D|1234567890|Q11^Find Candidates By Name^HL70471|PATIENT_ID_TYPE|M^MATCHED|1|RD^Record Display^HL70391||||||||\rPID|||37386152^^^HospitalID^MR||王小明^DAVID||19900101|F|||123 Main St^^City^State^ZIP^CN||(123)456-7890|||M|Black|||||\rPV1||O|ER^^^ER_UNIT^Room101|||||||||||||||||||||||||||||||||||||\rORC|NW|SP19-000425^Placer|FILLER-ORDER-001^Filler||CM|||||202505251020||||||||||||\rOBR|1|SP19-000425^Placer|FILLER-ORDER-001^Filler|0001^X-Ray Chest^L9999|||202505251020|||||||||||||||||||||||||||`;
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

    // DICOM 映射
    const dicomResult = mapHl7ToDicom(parsedK11);

    // 檢查是否沒有任何有意義的數據被解析/映射
    const hasData = Object.values(dicomResult).some(value => value !== "" && value !== "NO");

    if (!hasData) {
      return res.status(ERROR_CODES.NOT_FOUND.httpStatus).json({
        code: ERROR_CODES.NOT_FOUND.code,
        message: ERROR_CODES.NOT_FOUND.message,
      });
    }

    // 成功響應
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