

module.exports = (app) => {

    app.use('/api/hl7', require('./api/hl7message')());
    app.use('/api/mllp', require('./api/hl7mllp')());
    app.use('/dicom', require('./api/dicomOrder')());
  

  
    // API 路由的通用 404 處理器
    // 此中間件只會在沒有其他 /api/* 路由匹配時執行。
    // 這樣可以確保非 API 的請求（例如前端路由）不會被這個 404 處理器攔截。
    app.use('/api/*', (req, res) => {
      res.status(404).json({
        success: false,
        message: `請求的 API 端點 '${req.originalUrl}' 未找到。`
      });
    });
  
  };