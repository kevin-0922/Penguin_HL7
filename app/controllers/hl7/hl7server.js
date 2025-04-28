const mllp = require("mllp-node");

class Hl7Server {
  constructor() {
    // 創建 MLLP 伺服器實例
    this.server = new mllp.MLLPServer("127.0.0.1", 4321);
    
    // 監聽接收到的HL7訊息
    this.server.on('hl7', function(data) {
      console.log('接收到HL7訊息:', data);
    });
  }

  async handleRequest(req, res) {
    console.log("接收到HL7訊息:", req.body);
    try {
      const hl7Message = req.body; // 從請求中獲取HL7訊息
      
      // 使用 MLLP 協議將訊息發送到目標伺服器
      this.server.send("35.195.170.176", 46750, hl7Message, (err, ackData) => {
        if (err) {
          console.error("傳送失敗:", err);
          res.status(500).send(err.message);
        } else {
          console.log("收到 ACK:", ackData.toString());
          res.status(200).send(ackData.toString());
        }
      });
    } catch (error) {
      console.error("處理HL7訊息時發生錯誤:", error);
      res.status(500).send(error.message);
    }
  }
}

module.exports = new Hl7Server();
