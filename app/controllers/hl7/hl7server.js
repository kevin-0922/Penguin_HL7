const mllp = require("mllp-node");

class Hl7Server {
  constructor() {
    console.log("=== 初始化 HL7 MLLP 伺服器 ===");
    
    // 配置參數，未來可從環境變數或配置文件獲取
    this.config = {
      localHost: process.env.MLLP_LOCAL_HOST || "127.0.0.1",
      localPort: parseInt(process.env.MLLP_LOCAL_PORT || "4321"),
      remoteHost: process.env.MLLP_REMOTE_HOST || "35.195.170.176",
      remotePort: parseInt(process.env.MLLP_REMOTE_PORT || "46750"),
      timeout: parseInt(process.env.MLLP_TIMEOUT || "30000")  // 默認30秒超時
    };
    
    console.log("MLLP 伺服器配置:", this.config);
    
    try {
      // 創建 MLLP 伺服器實例
      this.server = new mllp.MLLPServer(this.config.localHost, this.config.localPort);
      console.log(`MLLP 伺服器創建成功，監聽 ${this.config.localHost}:${this.config.localPort}`);
      
      // 設置各種事件處理器
      this._setupEventHandlers();
    } catch (error) {
      console.error("MLLP 伺服器初始化失敗:", error);
      throw error;
    }
  }
  
  _setupEventHandlers() {
    // 監聽接收到的HL7訊息
    this.server.on('hl7', (data) => {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] 接收到HL7訊息:`, data.toString());
    });
    
    // 監聽錯誤
    this.server.on('error', (error) => {
      console.error(`[${new Date().toISOString()}] MLLP伺服器錯誤:`, error);
    });
    
    // 監聽連接
    this.server.on('connection', (socket) => {
      console.log(`[${new Date().toISOString()}] 新連接建立: ${socket.remoteAddress}:${socket.remotePort}`);
    });
    
    // 監聽關閉
    this.server.on('close', () => {
      console.log(`[${new Date().toISOString()}] MLLP伺服器已關閉`);
    });
  }

  async handleRequest(req, res) {
    const requestTimestamp = new Date().toISOString();
    console.log(`[${requestTimestamp}] 開始處理HTTP HL7請求...`);
    
    try {
      // 檢查請求體是否存在
      if (!req.body) {
        throw new Error("請求體為空，無法處理HL7訊息");
      }
      
      // 獲取HL7訊息並確保是字符串格式
      const hl7Message = typeof req.body === 'string' ? req.body : 
                        typeof req.body.message === 'string' ? req.body.message : 
                        JSON.stringify(req.body);
      
      console.log(`[${requestTimestamp}] 準備發送HL7訊息到 ${this.config.remoteHost}:${this.config.remotePort}`);
      
      // 創建MLLP封裝的消息
      const messageBytes = Buffer.from(hl7Message, 'ascii');
      const outBytes = Buffer.alloc(messageBytes.length + 3);
      outBytes[0] = 0x0B;  // Start Block
      messageBytes.copy(outBytes, 1);
      outBytes[outBytes.length - 2] = 0x1C;  // End Block 1
      outBytes[outBytes.length - 1] = 0x0D;  // End Block 2
      
      // 創建一個超時計時器
      let timeoutId;
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error(`MLLP請求超時，超過 ${this.config.timeout}ms 未收到回應`));
        }, this.config.timeout);
      });
      
      // 創建MLLP發送promise
      const sendPromise = new Promise((resolve, reject) => {
        this.server.send(
          this.config.remoteHost, 
          this.config.remotePort, 
          outBytes, 
          (err, ackData) => {
            console.log('ackData', ackData);
            if (timeoutId) clearTimeout(timeoutId);
            
            if (err) {
              console.error(`[${new Date().toISOString()}] 傳送失敗:`, err);
              reject(err);
            } else {
              const receiveTimestamp = new Date().toISOString();
              console.log(`[${receiveTimestamp}] 收到ACK回應`);
              
              if (ackData) {
                // 解析MLLP封裝的ACK消息
                const ackString = this._parseMLLPResponse(ackData);
                console.log("ACK內容:", ackString);
                
                // 驗證ACK消息
                this._validateACK(ackString);
                
                resolve(ackString);
              } else {
                console.warn("收到空的ACK回應");
                resolve("");
              }
            }
          }
        );
        console.log(`[${new Date().toISOString()}] MLLP請求已發送，等待回應...`);
      });
      
      // 競爭發送和超時
      const ackData = await Promise.race([sendPromise, timeoutPromise]);
      
      // 處理回應
      console.log(`[${new Date().toISOString()}] 處理HTTP回應`);
      res.status(200).send(ackData);
      console.log(`[${new Date().toISOString()}] HTTP回應已發送`);
      
    } catch (error) {
      const errorTimestamp = new Date().toISOString();
      console.error(`[${errorTimestamp}] 處理HL7訊息時發生錯誤:`, error);
      
      res.status(500).json({
        success: false,
        error: error.message,
        timestamp: errorTimestamp
      });
    } finally {
      console.log(`[${new Date().toISOString()}] 請求處理完成`);
    }
  }

  // 解析MLLP回應
  _parseMLLPResponse(responseData) {
    try {
      // 檢查起始字符
      if (responseData[0] !== 0x0B) {
        throw new Error("無效的MLLP回應：缺少起始字符");
      }
      
      // 檢查結束字符
      if (responseData[responseData.length - 2] !== 0x1C || 
          responseData[responseData.length - 1] !== 0x0D) {
        throw new Error("無效的MLLP回應：缺少結束字符");
      }
      
      // 提取消息內容
      return responseData.slice(1, -2).toString("ascii");
    } catch (error) {
      console.error("解析MLLP回應失敗:", error);
      throw new Error(`解析MLLP回應失敗: ${error.message}`);
    }
  }

  // 驗證ACK消息
  _validateACK(ackString) {
    try {
      const segments = ackString.split('\r');
      if (segments.length < 2) {
        throw new Error("無效的ACK消息：缺少必要的段落");
      }
      
      // 檢查MSH段落
      const mshSegment = segments[0];
      if (!mshSegment.startsWith('MSH')) {
        throw new Error("無效的ACK消息：缺少MSH段落");
      }
      
      // 檢查MSA段落
      const msaSegment = segments.find(s => s.startsWith('MSA'));
      if (!msaSegment) {
        throw new Error("無效的ACK消息：缺少MSA段落");
      }
      
      const msaParts = msaSegment.split('|');
      if (msaParts.length < 2) {
        throw new Error("無效的ACK消息：MSA段落格式錯誤");
      }
      
      // 檢查確認狀態
      const ackCode = msaParts[1];
      if (ackCode !== 'AA') {
        throw new Error(`消息被拒絕，狀態碼: ${ackCode}`);
      }
      
    } catch (error) {
      console.error("ACK驗證失敗:", error);
      throw new Error(`ACK驗證失敗: ${error.message}`);
    }
  }
  
  // 關閉伺服器
  close() {
    console.log(`[${new Date().toISOString()}] 收到關閉MLLP伺服器請求，但已禁用自動關閉`);
  }
}

// 創建並導出伺服器實例
const server = new Hl7Server();
module.exports = server;