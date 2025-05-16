

module.exports = (app) => {
    // 掛載 HL7 路由。
    // require('./api/hl7') 預期會載入 ./api/hl7/index.js，
    //該檔案應導出一個函式。呼叫此函式會回傳一個 Express Router 實例。
    app.use('/api/hl7', require('./api/hl7')());
    app.use('/api/mllp', require('./api/mllp')());
  
    // --- 未來其他的 API 模組可以依照相同模式添加於此 ---
    // 範例：
    // app.use('/api/someOtherFeature', require('./api/someOtherFeature')());
  
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