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
      console.log(`[${timestamp}] 原始HL7訊息數據:`, data);
    });
    
    // 監聽錯誤
    this.server.on('error', (error) => {
      console.error(`[${new Date().toISOString()}] MLLP伺服器錯誤:`, error);
    });
    
    // 監聽連接
    this.server.on('connection', (socket) => {
      console.log(`[${new Date().toISOString()}] 新連接建立: ${socket.remoteAddress}:${socket.remotePort}`);
      
      // 為每個連接添加數據監聽器以捕獲所有原始數據
      socket.on('data', (data) => {
        console.log(`[${new Date().toISOString()}] 接收到原始數據從 ${socket.remoteAddress}:${socket.remotePort}:`);
        console.log("原始數據:", data);
        console.log("數據字符串形式:", data.toString());
        console.log("數據十六進制形式:", data.toString('hex'));
        console.log("數據長度:", data.length, "字節");
        
        // 顯示按字節詳細分析
        console.log("原始數據逐字節分析:");
        for (let i = 0; i < data.length; i++) {
          console.log(`字節[${i}]: ${data[i]} (0x${data[i].toString(16)}) ASCII: ${
            data[i] >= 32 && data[i] <= 126 ? String.fromCharCode(data[i]) : '控制字符'
          }`);
        }
      });
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
            if (timeoutId) clearTimeout(timeoutId);
            
            if (err) {
              console.error(`[${new Date().toISOString()}] 傳送失敗:`, err);
              reject(err);
            } else {
              const receiveTimestamp = new Date().toISOString();
              console.log(`[${receiveTimestamp}] 收到伺服器回應:`);
              console.log("=============== 回應內容開始 ===============");
              console.log("原始 ackData:", ackData);
              
              // 檢查是否為 Buffer 對象
              if (Buffer.isBuffer(ackData)) {
                // 顯示原始十六進制和 ASCII 形式
                console.log("十六進制表示:", ackData.toString('hex'));
                console.log("Buffer 長度:", ackData.length);
                
                // 手動解析 MLLP 封裝
                if (ackData.length > 2 && ackData[0] === 0x0B && ackData[ackData.length - 2] === 0x1C && ackData[ackData.length - 1] === 0x0D) {
                  console.log("發現 MLLP 封裝格式");
                  
                  // 移除 MLLP 封裝字符 (起始 0x0B 和結束 0x1C 0x0D)
                  const contentBuffer = ackData.slice(1, -2);
                  console.log("移除 MLLP 封裝後的內容:", contentBuffer.toString());
                  
                  // 嘗試分析 HL7 段落
                  const segments = contentBuffer.toString().split('\r');
                  console.log("檢測到 HL7 段落數量:", segments.length);
                  segments.forEach((segment, i) => {
                    if (segment.trim()) {
                      console.log(`段落 ${i+1}: ${segment}`);
                      
                      // 特別識別 MSH 或 MSA 段
                      if (segment.startsWith('MSH')) {
                        console.log(">>> 發現 MSH 段 <<<");
                      } else if (segment.startsWith('MSA')) {
                        console.log(">>> 發現 MSA 段 <<<");
                      }
                    }
                  });
                } else {
                  console.log("原始內容 (非標準 MLLP 封裝):", ackData.toString());
                }
              } else {
                console.log("ackData 不是 Buffer 類型:", typeof ackData);
                console.log("內容:", ackData);
              }
              
              // 這裡是關鍵部分 - 確保返回的是完整消息
              let responseStr;
              if (Buffer.isBuffer(ackData)) {
                if (ackData[0] === 0x0B && ackData[ackData.length - 2] === 0x1C && ackData[ackData.length - 1] === 0x0D) {
                  // 正確處理 MLLP 封裝，保留完整 HL7 消息
                  responseStr = ackData.slice(1, -2).toString();
                } else {
                  // 如果不是 MLLP 格式，直接轉為字符串
                  responseStr = ackData.toString();
                }
              } else {
                responseStr = ackData ? String(ackData) : "";
              }
              
              // 檢查回應是否只包含 MSA 段，如果是則添加 MSH 段構建完整的 ACK 回應
              if (responseStr && responseStr.trim().startsWith('MSA|')) {
                console.log("檢測到只有 MSA 段，添加 MSH 段構建完整 ACK 回應");
                
                // 從 MSA 段提取控制 ID (MSA|AA|CONTROL_ID)
                const msaParts = responseStr.split('|');
                const controlId = msaParts.length >= 3 ? msaParts[2].trim() : "";
                
                // 生成時間戳
                const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
                
                // 創建標準 MSH 段 (確保格式正確且完整)
                const mshSegment = `MSH|^~\\&|RECEIVING_APP|RECEIVING_FACILITY|SENDING_APP|SENDING_FACILITY|${timestamp}||ACK^Q11^ACK|${controlId}|P|2.5.1|||AL||TW|UTF-8|||`;
                
                // 使用標準 HL7 段分隔符（ASCII 13 = CR）
                responseStr = mshSegment + String.fromCharCode(13) + responseStr;
                
                console.log("構建的完整 ACK 回應 (分段顯示):");
                const segments = responseStr.split(String.fromCharCode(13));
                segments.forEach((segment, index) => {
                  console.log(`段落 ${index+1}: ${segment}`);
                });
              }
              
              // 打印最終回應而不使用 console.log (避免長字符串被截斷)
              console.log("最終回應字符串 (按字節長度): " + responseStr.length + " 字節");
              console.log("最終回應字符串 (前60個字符): " + responseStr.substring(0, 60) + "...");
              console.log("最終回應結構:");
              if (responseStr.includes(String.fromCharCode(13))) {
                const segments = responseStr.split(String.fromCharCode(13));
                segments.forEach((segment, index) => {
                  console.log(`  響應段落 ${index+1}: ${segment.substring(0, 20)}...`);
                });
              } else {
                console.log("  (響應不包含段落分隔符)");
              }
              
              resolve(responseStr);
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

  // 解析MLLP回應 - 已注釋調
  /*
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
  */

  // 驗證ACK消息 - 已注釋調
  /*
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
  */
  
  // 關閉伺服器
  close() {
    console.log(`[${new Date().toISOString()}] 收到關閉MLLP伺服器請求，但已禁用自動關閉`);
  }
}

// 創建並導出伺服器實例
const server = new Hl7Server();
module.exports = server;