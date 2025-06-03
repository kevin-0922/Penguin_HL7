const { processOrderUpdate } = require('../../services/dicom/hl7status');

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

  
  