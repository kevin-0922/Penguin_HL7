require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const viteExpress = require('vite-express');
const net = require('net');
const { processHL7Message } = require('./services/hl7/hl7Processor');

// 導入資料庫
console.log('正在初始化 HL7 消息數據庫...');
const db = require('./database/db');

// 從環境變數中獲取配置
const MLLP_HOST = process.env.MLLP_LOCAL_HOST || '127.0.0.1';
const PORT = process.env.server_PORT || 3000;
const MLLP_PORT = process.env.MLLP_LOCAL_PORT || 4321;
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
  
  // 載入路由
  require('./routes')(app);

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

app.post('/hl7', async (req, res) => {
  const hl7Msg = req.body;
  const ack = await processHL7Message(hl7Msg);
  res.send(ack);
});
// 啟動服務器
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('HL7 消息數據庫已初始化完成');
});

// 綁定 Vite
viteExpress.bind(app, server);

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error("捕獲到未處理的錯誤:", err.stack);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    success: false,
    message: err.message || '伺服器發生內部錯誤。',
  });
});


//const MLLP_HEADER = 0x0b;
const MLLP_TRAILER_1 = 0x1c;
const MLLP_TRAILER_2 = 0x0d;

net.createServer(socket => {
  console.log('MLLP client connected');

  let buffer = Buffer.alloc(0);

  socket.on('data', (data) => {
    buffer = Buffer.concat([buffer, data]);

    // 判斷是否收到結尾標誌
    if (buffer.length > 2 && 
        buffer[buffer.length - 2] === MLLP_TRAILER_1 &&
        buffer[buffer.length - 1] === MLLP_TRAILER_2) {
      
      // 去掉頭尾的MLLP控制字元 <VT> 和 <FS><CR>
      const hl7Msg = buffer.slice(1, buffer.length - 2).toString('utf-8');
      console.log('完整HL7訊息:', hl7Msg);

      // 呼叫HL7處理函式 (如 processHL7Message)，得到ACK
      processHL7Message(hl7Msg).then((ackMsg) => {
        // 組裝ACK MLLP封包
        const ackBuffer = Buffer.concat([
          //Buffer.from([MLLP_HEADER]),
          Buffer.from(ackMsg, 'utf-8'),
          Buffer.from([MLLP_TRAILER_1, MLLP_TRAILER_2])
        ]);
        socket.write(ackBuffer);
        buffer = Buffer.alloc(0); // 處理完成清空buffer
      }).catch((err) => {
        console.error('處理HL7訊息錯誤', err);
        socket.end();
      });
    }
  });

  socket.on('end', () => {
    console.log('MLLP client disconnected');
  });

  socket.on('error', (err) => {
    console.error('MLLP server error:', err);
  });
}).listen(MLLP_PORT, MLLP_HOST, () => {
  console.log(`MLLP server running on ${MLLP_HOST}:${MLLP_PORT}`);
});

