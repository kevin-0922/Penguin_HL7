const { getDicomHL7Order } = require("../../services/dicom/dicomMappingService");
const { query } = require("../../database/db"); // 引入資料庫操作

const ERROR_CODES = {
  INVALID_REQUEST: { code: 1001, message: "InvalidRequest", httpStatus: 400 },
  NOT_FOUND: { code: 1003, message: "NotFound", httpStatus: 404 },
  SERVER_ERROR: { code: 1004, message: "ServerError", httpStatus: 500 },
};

// 新版本的getDicomOrder (從slicing_schedule獲取O33訊息並發送Q11查詢)
exports.getDicomOrder = async (req, res) => {
  try {
    console.log("開始處理DICOM訂單查詢");
    // 從資料庫獲取所有待處理訂單
    const orders = await query(
      `SELECT order_id, message_content FROM slicing_schedule WHERE status = 'pending'`
    );

    if (!orders || orders.length === 0) {
      return res.status(ERROR_CODES.NOT_FOUND.httpStatus).json({
        code: ERROR_CODES.NOT_FOUND.code,
        message: "未找到待處理訂單",
      });
    }

    // 遍歷所有訂單

    const dicomResults = await getDicomHL7Order(orders);

    if (dicomResults.length === 0) {
      return res.status(ERROR_CODES.NOT_FOUND.httpStatus).json({
        code: ERROR_CODES.NOT_FOUND.code,
        message: "未找到有效的DICOM訂單或無法連線至伺服器",
      });
    }

    // 成功
    return res.status(200).json({
      data: dicomResults,
      total: dicomResults.length,
    });
  } catch (error) {
    console.error("處理DICOM訂單查詢時發生錯誤:", error);
    // 伺服器內部錯誤
    return res.status(ERROR_CODES.SERVER_ERROR.httpStatus).json({
      code: ERROR_CODES.SERVER_ERROR.code,
      message: ERROR_CODES.SERVER_ERROR.message,
      details: error.message,
    });
  }
};
