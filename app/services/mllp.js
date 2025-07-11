const net = require("net");
const db = require("../database/db");

// MLLP封裝常量
const MLLP_HEADER = Buffer.from([0x0b]); // <VT>
const MLLP_TRAILER = Buffer.from([0x1c, 0x0d]); // <FS><CR>

// 配置參數，未來可從環境變數或配置文件獲取
const config = {
  localHost: process.env.MLLP_LOCAL_HOST,
  localPort: parseInt(process.env.MLLP_LOCAL_PORT),
  remoteHost: null, // 將從資料庫動態獲取
  remotePort: null, // 將從資料庫動態獲取
  timeout: 30000, // 預設值，將從資料庫動態獲取
};

// 從資料庫加載 MLLP 配置
async function loadMllpConfig() {
  try {
    const dbConfig = await db.getFirstMllpConfig();
    if (dbConfig) {
      config.remoteHost = dbConfig.remote_host;
      config.remotePort = parseInt(dbConfig.remote_port);
      config.timeout = parseInt(dbConfig.timeout || "30000");
      console.log('已從資料庫載入 MLLP 配置');
    } else {
      console.log('未找到 MLLP 配置，使用預設值');
    }
  } catch (error) {
    console.error('載入 MLLP 配置失敗:', error);
  }
}

async function MLLPRequest(message) {
  try {
    // 檢查請求體是否存在
    if (!message) {
      throw new Error("請求體為空，無法處理HL7訊息");
    }

    // 加載最新配置
    await loadMllpConfig();
    
    // 檢查配置是否有效
    if (!config.remoteHost || !config.remotePort) {
      throw new Error("MLLP 配置無效，請先設置遠端伺服器資訊");
    }

    // 獲取HL7訊息並確保是字符串格式
    const hl7Message =
      typeof message === "string"
        ? message
        : typeof message.message === "string"
        ? message.message
        : JSON.stringify(message);

    // 使用Socket直接發送MLLP消息，提供完整的MLLP封裝數據
    const responseData = await sendViaSocket(config.remoteHost, config.remotePort, hl7Message);

    // 返回響應
    return responseData;
  } catch (error) {
    console.error(`處理HL7訊息時發生錯誤: ${error.message}`);

    return {
      success: false,
      error: error.message,
    };
  }
}

// 使用Socket直接發送MLLP消息
async function sendViaSocket(host, port, message) {
  return new Promise((resolve, reject) => {
    // 創建TCP Socket連接
    const client = new net.Socket();
    let responseData = Buffer.alloc(0);
    let responseReceived = false;

    // 設置超時處理
    client.setTimeout(config.timeout);

    client.on("connect", () => {
      console.log(`連接成功到 ${host}:${port}`);

      // 準備MLLP封裝的消息
      const mllpMessage = Buffer.concat([MLLP_HEADER, Buffer.from(message), MLLP_TRAILER]);

      // // 輸出發送的消息格式
      // console.log("封裝後的MLLP訊息:");
      // console.log("-".repeat(50));
      // console.log(mllpMessage.toString("hex")); // 十六進制輸出
      // console.log("-".repeat(50));

      // 發送消息
      console.log("正在發送HL7消息...");
      client.write(mllpMessage);
      console.log("消息已發送！");
    });

    client.on("data", (data) => {
      // 累積接收到的數據
      responseData = Buffer.concat([responseData, data]);

      // 檢查是否收到完整的MLLP消息（包含結束標記）
      const trailerIndex = responseData.indexOf(MLLP_TRAILER);
      if (trailerIndex >= 0) {
        responseReceived = true;

        // // 顯示十六進制形式
        // console.log("\n原始接收數據 (十六進制):");
        // console.log("-".repeat(50));
        // console.log(responseData.toString("hex"));
        // console.log("-".repeat(50));

        // // 顯示字節表示
        // console.log("\n原始接收數據 (字節表示):");
        // console.log("-".repeat(50));
        // console.log(responseData);
        // console.log("-".repeat(50));

        // 檢查回應是否符合MLLP格式並解析
        if (responseData[0] === MLLP_HEADER[0]) {
          // 提取HL7消息內容 (去除MLLP包裝)
          const hl7Content = responseData.slice(1, trailerIndex).toString("utf-8");

          // 按段落分行顯示
          console.log("\nHL7回應 (按段落分行):");
          console.log("-".repeat(50));
          const segments = hl7Content.split("\r");
          segments.forEach((segment) => {
            if (segment.trim()) {
              console.log(segment);
            }
          });
          console.log("-".repeat(50));
        }

        // 關閉連接
        client.end();
      }
    });

    client.on("timeout", () => {
      client.destroy();
      reject(new Error(`連接超時，超過 ${config.timeout}ms 未收到回應`));
    });

    client.on("error", (err) => {
      client.destroy();
      reject(err);
    });

    client.on("close", () => {
      if (responseReceived) {
        // 處理接收到的數據
        const trailerIndex = responseData.indexOf(MLLP_TRAILER);
        if (responseData[0] === MLLP_HEADER[0] && trailerIndex > 0) {
          // 提取HL7消息內容 (去除MLLP包裝)
          const hl7Content = responseData.slice(1, trailerIndex).toString("utf-8");
          resolve(hl7Content);
        } else {
          // 不是標準MLLP格式，直接轉換
          resolve(responseData.toString("utf-8"));
        }
      } else {
        reject(new Error("連接關閉，但未收到有效響應"));
      }
    });

    // 連接到伺服器
    console.log(`正在連接到 ${host}:${port}...`);
    client.connect(port, host);
  });
}

module.exports = {
  MLLPRequest,
};