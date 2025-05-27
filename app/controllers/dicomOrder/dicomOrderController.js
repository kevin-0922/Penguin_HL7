const { processOrderUpdate } = require('../../services/dicom/hl7status');
const { MLLPRequest } = require('../../services/mllp');  // 引入 MLLPRequest
const { all } = require('../../database/db');    // 引入資料庫操作

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

const MockField = (fieldString, componentSeparator = '^', subcomponentSeparator = '&') => {
  const value = fieldString.split(componentSeparator).map(comp => {
    return comp.split(subcomponentSeparator);
  });
  
  return {
    value,
    originalValue: fieldString,
    toString: () => {
      return value && value[0] && value[0][0] ? value[0][0].toString() : '';
    }
  };
};

const MockSegment = (segmentString, fieldSeparator = '|', componentSeparator = '^', subcomponentSeparator = '&') => {
  const parts = segmentString.split(fieldSeparator);
  const segmentName = parts[0];
  const fields = [];

  if (segmentName === 'MSH') {
    fields.push(MockField(fieldSeparator, componentSeparator, subcomponentSeparator));
    const encodingChars = parts[1] || '^~\\&';
    fields.push(MockField(encodingChars, componentSeparator, subcomponentSeparator));
    for (let i = 2; i < parts.length; i++) {
      fields.push(MockField(parts[i], componentSeparator, subcomponentSeparator));
    }
  } else {
    for (let i = 1; i < parts.length; i++) {
      fields.push(MockField(parts[i], componentSeparator, subcomponentSeparator));
    }
  }

  return {
    segmentName,
    fields
  };
};

const MockMessage = (hl7String) => {
  const segments = [];
  const segmentStrings = hl7String.split('\r').filter(s => s.trim() !== '');

  segmentStrings.forEach(s => {
    segments.push(MockSegment(s, '|', '^', '&'));
  });

  return {
    hl7String,
    segments,
    getSegment: (segmentName) => {
      return segments.find(s => s.segmentName === segmentName);
    },
    split: (separator) => {
      return hl7String.split(separator);
    }
  };
};
// --- 模擬結束 ---

/**
 * 生成 QBP^Q11 查詢訊息
 * @param {String} sac3Value - SAC-3 值(檢體ID)
 * @returns {String} HL7 QBP^Q11 查詢訊息
 */
const generateQ11Message = (sac3Value) => {
  const messageId = `Q11-${Date.now()}`;
  const currentDate = new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);
  
  return `MSH|^~\\&|SCANNER|SCANNER_FACILITY|HIS|HIS_FACILITY|${currentDate}||QBP^Q11|${messageId}|P|2.5.1\rQPD|IWOS^Imaging WOS^IHEDIA|${messageId}|${sac3Value}\rRCP|I||`;
};

/**
 * 從JSON格式的HL7訊息中獲取SAC-3值
 * @param {Object} messageContent - JSON格式的HL7訊息
 * @returns {String} SAC-3值
 */
const getSac3FromMessage = (messageContent) => {
  try {
    if (!messageContent || !messageContent.SAC || !messageContent.SAC[3]) {
      return '';
    }
    return messageContent.SAC[3];
  } catch (error) {
    console.error('獲取SAC-3值時發生錯誤:', error);
    return '';
  }
};

// 新版本的getDicomOrder (從slicing_schedule獲取O33訊息並發送Q11查詢)
exports.getDicomOrder = async (req, res) => {
  try {
    console.log("開始處理DICOM訂單查詢");
    // 從資料庫獲取所有待處理訂單
    const orders = await all(
      `SELECT order_id, message_content FROM slicing_schedule WHERE status = 'pending'`
    );
    
    if (!orders || orders.length === 0) {
      return res.status(ERROR_CODES.NOT_FOUND.httpStatus).json({
        code: ERROR_CODES.NOT_FOUND.code,
        message: "未找到待處理訂單"
      });
    }
    
    const dicomResults = [];
    
    // 遍歷所有訂單
    for (const order of orders) {
      try {
        // 解析訂單的訊息內容
        const messageContent = JSON.parse(order.message_content);
        
        // 獲取SAC-3值
        const sac3Value = getSac3FromMessage(messageContent);
        
        if (!sac3Value) {
          console.warn(`訂單 ${order.order_id} 缺少SAC-3值，跳過`);
          continue;
        }
        
        // 生成Q11查詢訊息
        const q11Message = generateQ11Message(sac3Value);
        console.log(`發送Q11查詢訊息:\n${q11Message}`);
        
        // 使用MLLPRequest發送Q11查詢並獲取K11回應
        const k11Response = await MLLPRequest(q11Message);
        
        if (!k11Response) {
          console.warn(`訂單 ${order.order_id} 查詢未返回回應，跳過`);
          continue;
        }
        
        // 解析K11回應
        const message = MockMessage(k11Response);
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
        
        // 從QAK-3獲取查詢結果中的StudyInstanceUID
        const qak3Value = parsedK11.QAK ? getParsedFieldValue(parsedK11.QAK, 3, 0, 0) : "";
        
        if (!qak3Value) {
          console.warn(`訂單 ${order.order_id} 未找到QAK-3值，跳過`);
          continue;
        }
        
        // 構建DICOM結果 (使用與原來相同的字段映射)
        const dicomResult = {
          "orderId": order.order_id,  // 添加訂單ID以供前端識別
          "00100020": getParsedFieldValue(parsedK11.PID, 3, 0, 0) || qak3Value, // 優先使用PID-3，否則使用QAK-3作為患者ID
          "00100010": getParsedFieldValue(parsedK11.PID, 5, 0, 0), 
          "00100030": (getParsedFieldValue(parsedK11.PID, 7, 0, 0) || '').slice(0, 8),
          "00100032": (getParsedFieldValue(parsedK11.PID, 7, 0, 0) || '').slice(8),
          "00100040": getParsedFieldValue(parsedK11.PID, 8, 0, 0),
          "00102160": getParsedFieldValue(parsedK11.PID, 10, 0, 0) || getParsedFieldValue(parsedK11.PID, 22, 0, 0),

          "00100200": getParsedFieldValue(parsedK11.SPM, 11, 0, 0) || "NO",
          "0020000D": qak3Value, // 使用QAK-3作為Study Instance UID

          "00080020": (getParsedFieldValue(parsedK11.SPM, 17, 0, 0) || '').split("^")[0] || "",
          "00080030": (getParsedFieldValue(parsedK11.SPM, 17, 0, 0) || '').split("^")[1] || "",
          "00080050": getParsedFieldValue(parsedK11.SAC, 2, 0, 0) || getParsedFieldValue(parsedK11.SPM, 30, 0, 0) || sac3Value, // 使用SAC-3作為檢查號
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

          "00321064": getParsedFieldValue(parsedK11.OBR, 4, 0, 0),
          "00400101": parsedK11.QPD ? getParsedFieldValue(parsedK11.QPD, 1, 0, 0) : "",
          "00080051": "",
          "00400008": "",
          "00400512": getParsedFieldValue(parsedK11.SAC, 3, 0, 0) || sac3Value,
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
          "00080058": parsedK11.QAK ? getParsedFieldValue(parsedK11.QAK, 2, 0, 0) : "",
        };
        
        // 檢查是否沒有任何有意義的數據被解析
        const hasData = Object.values(dicomResult).some(value => value !== "" && value !== "NO");
        
        if (hasData) {
          dicomResults.push(dicomResult);
        }
      } catch (error) {
        console.error(`處理訂單 ${order.order_id} 時發生錯誤:`, error);
        // 繼續處理下一個訂單
      }
    }
    
    if (dicomResults.length === 0) {
      return res.status(ERROR_CODES.NOT_FOUND.httpStatus).json({
        code: ERROR_CODES.NOT_FOUND.code,
        message: "未找到有效的DICOM訂單或無法連線至伺服器"
      });
    }
    
    // 成功
    return res.status(200).json({
      data: dicomResults,
      total: dicomResults.length
    });
  } catch (error) {
    console.error("處理DICOM訂單查詢時發生錯誤:", error);
    // 伺服器內部錯誤
    return res.status(ERROR_CODES.SERVER_ERROR.httpStatus).json({
      code: ERROR_CODES.SERVER_ERROR.code,
      message: ERROR_CODES.SERVER_ERROR.message,
      details: error.message
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    if (!orderId) {
      return res.status(ERROR_CODES.INVALID_REQUEST.httpStatus).json({
        success: false,
        code: ERROR_CODES.INVALID_REQUEST.code,
        message: "缺少訂單ID"
      });
    }
    
    // 將整個請求體作為更新字段傳遞
    const result = await processOrderUpdate(orderId, req.body);
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "訂單狀態已更新",
        data: {
          orderId: orderId,
          updateTime: result.data.updateTime
        }
      });
    } else {
      const httpStatus = result.code && ERROR_CODES[result.code] ? 
                        ERROR_CODES[result.code].httpStatus : 
                        ERROR_CODES.SERVER_ERROR.httpStatus;
                        
      return res.status(httpStatus).json({
        success: false,
        code: result.code,
        message: result.message,
        details: result.details
      });
    }
  } catch (error) {
    console.error("更新訂單狀態時發生錯誤:", error);
    return res.status(ERROR_CODES.SERVER_ERROR.httpStatus).json({
      success: false,
      code: ERROR_CODES.SERVER_ERROR.code,
      message: ERROR_CODES.SERVER_ERROR.message,
      details: error.message
    });
  }
};
