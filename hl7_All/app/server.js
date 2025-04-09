require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hl7Routes = require('./routes/hl7Routes');
const controllers = require('./controllers');
const messageRoutes = require('./routes/messageRoutes');
const viteExpress = require('vite-express');

// 明確導入數據庫以確保連接初始化
console.log('正在初始化 HL7 消息數據庫...');
const db = require('./database/db');

// 從環境變數中獲取配置
const PORT = process.env.server_PORT || 3000;
const CORS_ORIGIN = process.env.server_CORS_ORIGIN || '*';

const app = express();

// 設置中間件
app.use(cors({
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'application/hl7-v2' }));

// API 路由
app.use('/api', controllers);
app.use('/api/hl7', hl7Routes);
app.use('/api/messages', messageRoutes);

// 測試數據庫連接
app.get('/api/db-test', async (req, res) => {
  try {
    // 執行簡單的數據庫查詢測試
    const sentCount = await db.get('SELECT COUNT(*) as count FROM sent_messages');
    const receivedCount = await db.get('SELECT COUNT(*) as count FROM received_messages');

    res.json({
      success: true,
      message: 'HL7 數據庫連接正常',
      data: {
        sentMessages: sentCount.count,
        receivedMessages: receivedCount.count
      }
    });
  } catch (error) {
    console.error('數據庫測試失敗:', error);
    res.status(500).json({
      success: false,
      message: '數據庫測試失敗',
      error: error.message
    });
  }
});

// 啟動服務器
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('HL7 消息數據庫已初始化完成');
  console.log(`API 測試地址: http://localhost:${PORT}/api/db-test`);
});

// 綁定 Vite
viteExpress.bind(app, server);

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
