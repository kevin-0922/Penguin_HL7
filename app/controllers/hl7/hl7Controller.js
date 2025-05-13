const { db, query, get, run } = require('../../database/db');
const path = require('path');
const fs = require('fs');
const parseQPD = require('../../utils/parsers/parseQPD');

// 導入解析器
const parseMSH = require('../../utils/parsers/parseMSH');
const parseOBR = require('../../utils/parsers/parseOBR');
const parseORC = require('../../utils/parsers/parseORC');
const parsePID = require('../../utils/parsers/parsePID');
const parseSPM = require('../../utils/parsers/parseSPM');

class Hl7Controller {
  constructor() {
    // 初始化訊息處理器映射
    this.messageHandlers = new Map([
      ['OML^O33^OML^O33', this.handleOmlO33.bind(this)],
      ['ORL^O34', this.handleOrlO34.bind(this)],
      ['QBP^Q11^QBP_Q11', this.handleQbpQ11.bind(this)] 
    ]);
  }

  // 處理HTTP請求中的HL7訊息
  async handleHttpRequest(req, res) {
    try {
      // 從請求體中獲取HL7訊息
      const hl7Message = req.body.message;
      
      console.log('收到HTTP HL7訊息請求:', hl7Message);
      
      // 處理HL7訊息並產生回應
      const response = await this.processHl7Message(hl7Message);
      //console.log('response:', response);
      // 輸出ACK回應到控制台
      console.log('返回ACK回應:', response);
      
      // 設置回應頭並發送回應
      res.set('Content-Type', 'application/hl7-v2');
      res.send(response);
    } catch (error) {
      console.error('處理HL7訊息時發生錯誤:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // 解析HL7訊息的路由處理器
  async parseHL7Message(req, res) {
    console.log('收到HL7訊息:', req.body);
    try {
      const { message } = req.body;
    
      if (!message) {
        return res.status(400).json({
          success: false,
          error: '缺少HL7訊息'
        });
      }
      
      // 解析訊息
      const parsedMessage = await this.parseMessage(message);
      
      res.json({
        success: true,
        data: parsedMessage
      });
    } catch (error) {
      console.error('解析HL7訊息時發生錯誤:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // 處理MLLP請求中的HL7訊息
  async handleMllpRequest(message) {
    try {
      return await this.processHl7Message(message);
    } catch (error) {
      console.error('處理MLLP請求時發生錯誤:', error);
      throw error;
    }
  }

  // 處理OML^O33訊息
  async handleOmlO33(message) {
    console.log('message測試:', message);
    try {
      let hl7Msg;
      try {
        // 規範化換行符
        const normalizedMessage = message.replace(/\r\n|\n/g, '\r');
        hl7Msg = this.parser.parse(normalizedMessage);
        console.log('成功將消息解析為HL7對象');
      } catch (parseError) {
        console.error('解析HL7消息時出錯:', parseError);
        // 如果解析失敗，創建模擬對象
        hl7Msg = this.createHL7Adapter(message);
      }
      // 解析訊息部分
      const msh = parseMSH(hl7Msg);
      const pid = parsePID(hl7Msg);
      const orc = parseORC(hl7Msg);
      const obr = parseOBR(hl7Msg);
      const spm = parseSPM(hl7Msg);
      
      // 只在控制台輸出訊息內容和解析結果
      console.log('==== 處理 OML^O33 訊息 ====');
      console.log('MSH部分:', msh);
      console.log('PID部分:', pid);
      console.log('ORC部分:', orc);
      console.log('OBR部分:', obr);
      console.log('SPM部分:', spm);
      
      try {
        const messageType = 'OML^O33';
        const messageControlId = this.extractMsgControlId(message);
        const sender = this.extractSender(message);
        const receiver = this.extractReceiver(message);
        
        await run(
          `INSERT INTO received_messages 
          (message_type, message_control_id, sender, receiver, message_content, status)
          VALUES (?, ?, ?, ?, ?, ?)`,
          [messageType, messageControlId, sender, receiver, message, 'received']
        );
        console.log('O33訊息已儲存到資料庫');
      } catch (dbError) {
        console.error('儲存O33訊息時發生錯誤:', dbError);
        // 儲存失敗不影響後續處理
      }
      
      // 構建O34回應訊息(可選)
      const o34Response = this.buildO34Response(message, msh, pid);
      console.log('生成O34回應:', o34Response);

      try {
        const messageControlId = this.extractMsgControlId(message) + '_O34';
        const sender = this.extractReceiver(message); // 角色互換
        const receiver = this.extractSender(message); // 角色互換
        
        await run(
          `INSERT INTO sent_messages 
          (message_type, message_control_id, sender, receiver, message_content, status)
          VALUES (?, ?, ?, ?, ?, ?)`,
          ['ORL^O34', messageControlId, sender, receiver, o34Response, 'sent']
        );
        console.log('O34回應訊息已儲存到資料庫');
      } catch (dbError) {
        console.error('儲存O34回應訊息時發生錯誤:', dbError);
        // 儲存失敗不影響後續處理
      }
      
      // 構建ACK回應
      const ackResponse = this.buildAckResponse(message, 'AA', 'Message received and processed successfully');
      //console.log('生成ACK回應:', ackResponse);

      // try {
      //   const messageControlId = this.extractMsgControlId(message) + '_ACK';
      //   const sender = this.extractReceiver(message); // 角色互換
      //   const receiver = this.extractSender(message); // 角色互換
        
      //   await run(
      //     `INSERT INTO sent_messages 
      //     (message_type, message_control_id, sender, receiver, message_content, status)
      //     VALUES (?, ?, ?, ?, ?, ?)`,
      //     ['ACK', messageControlId, sender, receiver, ackResponse, 'sent']
      //   );
      //   console.log('ACK回應訊息已儲存到資料庫');
      // } catch (dbError) {
      //   console.error('儲存ACK回應訊息時發生錯誤:', dbError);
      //   // 儲存失敗不影響後續處理
      // }
      
      return ackResponse;
    } catch (error) {
      console.error('處理OML^O33訊息時發生錯誤:', error);
      return this.buildAckResponse(message, 'AE', error.message);
    }
  }

   // 輔助方法: 提取訊息控制ID
   extractMsgControlId(message) {
    try {
      const segments = message.split(/\r\n|\r|\n/);
      const mshSegment = segments.find(s => s.startsWith('MSH'));
      if (!mshSegment) return 'UNKNOWN';
      const fields = mshSegment.split('|');
      return fields.length > 9 ? fields[9] : 'UNKNOWN';
    } catch (e) {
      return 'UNKNOWN';
    }
  }

   // 輔助方法: 提取發送方
   extractSender(message) {
    try {
      const segments = message.split(/\r\n|\r|\n/);
      const mshSegment = segments.find(s => s.startsWith('MSH'));
      if (!mshSegment) return 'UNKNOWN';
      const fields = mshSegment.split('|');
      return fields.length > 2 ? fields[2] : 'UNKNOWN';
    } catch (e) {
      return 'UNKNOWN';
    }
  }
  
  // 輔助方法: 提取接收方
  extractReceiver(message) {
    try {
      const segments = message.split(/\r\n|\r|\n/);
      const mshSegment = segments.find(s => s.startsWith('MSH'));
      if (!mshSegment) return 'UNKNOWN';
      const fields = mshSegment.split('|');
      return fields.length > 4 ? fields[4] : 'UNKNOWN';
    } catch (e) {
      return 'UNKNOWN';
    }
  }


  createHL7Adapter(message) {
    console.log('創建HL7適配器...');
    // 分割消息為段落
    const segments = message.split(/\r\n|\r|\n/);
    console.log(`找到 ${segments.length} 個段落`);
    
    // 創建適配器對象
    return {
      getSegment: function(segmentType) {
        const segment = segments.find(s => s.startsWith(segmentType));
        if (!segment) {
          console.log(`找不到 ${segmentType} 段落`);
          return null;
        }
        
        console.log(`找到 ${segmentType} 段落:`, segment);
        const fields = segment.split('|');
        
        return {
          fields: fields.map((value, i) => ({ value })),
          get: function(index) {
            return fields[index] || '';
          }
        };
      }
    };
  }
// 處理QBP^Q11訊息
async handleQbpQ11(message) {
  try {
    const msh = parseMSH(message);
    
    console.log('==== 處理 QBP^Q11 訊息 ====');
    console.log('MSH部分:', msh);

    // 這裡你可以擴充：解析QPD段、做查詢等
     const qpd = parseQPD(message); // 自行建立 parseQPD 工具
     console.log('qpd部分:', qpd);
     const responseData = await this.queryByQpd(qpd); // 自定義查詢函式
     
    // 構建RSP^K11回應（假設你要用RSP回覆）
    const response = this.buildRspK11Response(message, msh);
    console.log('生成RSP^K11回應:', response);

    return this.buildAckResponse(message, 'AA', 'QBP^Q11 message processed');
  } catch (error) {
    console.error('處理QBP^Q11訊息時發生錯誤:', error);
    return this.buildAckResponse(message, 'AE', error.message);
  }
}
buildRspK11Response(originalMessage, msh) {
  const currentTime = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  return [
    `MSH|^~\\&|${msh.receivingApplication}|${msh.receivingFacility}|${msh.sendingApplication}|${msh.sendingFacility}|${currentTime}||RSP^K11|${this.extractMsgControlId(originalMessage)}_RSP|P|2.5.1`,
    `MSA|AA|${this.extractMsgControlId(originalMessage)}`,
    `QAK|${this.extractMsgControlId(originalMessage)}|OK`,
    `QPD|${msh.messageType}|${this.extractMsgControlId(originalMessage)}`
    // 可以再加你要的查詢結果段（如 PID、OBX 等）
  ].join('\r');
}
async queryByQpd(qpd) {
  try {
    const patientId = qpd.queryTag; // 假設你把病人ID放在這

    if (!patientId) {
      throw new Error('QPD 中缺少查詢條件（預期病人 ID）');
    }

    const row = await get(
      `SELECT * FROM received_messages WHERE message_content LIKE ?`,
      [`%${patientId}%`]////
    );

    if (!row) {
      console.log(`查無資料，Patient ID: ${patientId}`);
      return null;
    }

    return row;
  } catch (err) {
    console.error('queryByQpd 發生錯誤:', err.message);
    throw err;
  }
}




  // 處理ORL^O34訊息
  async handleOrlO34(message) {
    try {
      // 解析訊息部分
      const msh = parseMSH(message);
      
      // 只在控制台輸出訊息
      console.log('==== 處理 ORL^O34 訊息 ====');
      console.log('MSH部分:', msh);
      
      // 構建ACK回應
      return this.buildAckResponse(message, 'AA', 'Message received and processed successfully');
    } catch (error) {
      console.error('處理ORL^O34訊息時發生錯誤:', error);
      return this.buildAckResponse(message, 'AE', error.message);
    }
  }handler

  // 處理HL7訊息
  async processHl7Message(message) {
    try {
      // 提取訊息類型
      const messageType = this.extractMessageType(message);
      console.log(`處理 ${messageType} 類型的訊息`);
      
      // 獲取對應的訊息處理器
      const handler = this.messageHandlers.get(messageType);
      console.log('handler:', handler);
      if (!handler) {
        console.warn(`沒有找到 ${messageType} 類型的處理器`);
        return this.buildAckResponse(message, 'AR', `Unsupported message type: ${messageType}`);
      }
      
      // 使用處理器處理訊息
      return await handler(message);
    } catch (error) {
      console.error('處理HL7訊息時發生錯誤:', error);
      return this.buildAckResponse(message, 'AE', error.message);
    }
  }

  // 從HL7訊息中提取訊息類型
  extractMessageType(message) {
    try {
      // 分割訊息為段落
      const segments = message.split('\r\n');
      
      // 獲取MSH段落
      const msh = segments.find(segment => segment.startsWith('MSH'));
      
      if (!msh) {
        throw new Error('Invalid HL7 message: MSH segment not found');
      }
      
      // 分割MSH段落為欄位
      const fields = msh.split('|');
      
      // 獲取訊息類型 (通常在MSH-9欄位)
      if (fields.length < 10) {
        throw new Error('Invalid MSH segment: insufficient fields');
      }
      
      return fields[8].includes('^') ? fields[8] : fields[8] + '^' + fields[9];
    } catch (error) {
      console.error('提取訊息類型時發生錯誤:', error);
      throw new Error(`Failed to extract message type: ${error.message}`);
    }
  }

  // 解析HL7訊息
  async parseMessage(message) {
    try {
      // 分割訊息為段落
      const segments = message.split('\r\n');
      
      // 初始化結果對象
      const result = {
        MSH: null,
        PID: null,
        ORC: null,
        OBR: null,
        SPM: null
      };
      
      // 解析每個段落
      for (const segment of segments) {
        const segmentType = segment.substring(0, 3);
        
        switch (segmentType) {
          case 'MSH':
            result.MSH = parseMSH(segment);
            break;
          case 'PID':
            result.PID = parsePID(segment);
            break;
          case 'ORC':
            result.ORC = parseORC(segment);
            break;
          case 'OBR':
            result.OBR = parseOBR(segment);
            break;
          case 'SPM':
            result.SPM = parseSPM(segment);
            break;
        }
      }
      
      return result;
    } catch (error) {
      console.error('解析HL7訊息時發生錯誤:', error);
      throw new Error(`Failed to parse message: ${error.message}`);
    }
  }

  // 構建ACK回應
  buildAckResponse(message, ackCode, textMessage) {
    try {
      // 分割訊息為段落
      const segments = message.split('\r');
      
      // 獲取MSH段落
      const msh = segments.find(segment => segment.startsWith('MSH'));
      
      if (!msh) {
        throw new Error('Invalid HL7 message: MSH segment not found');
      }
      
      // 分割MSH段落為欄位
      const fields = msh.split('|');
      
      if (fields.length < 12) {
        throw new Error('Invalid MSH segment: insufficient fields');
      }
      
      // 構建ACK回應
      const timestamp = new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);
      const messageControlId = fields[9] || '';
      const sendingApp = fields[4] || '';
      const sendingFacility = fields[5] || '';
      const receivingApp = fields[2] || '';
      const receivingFacility = fields[3] || '';
      
      // 構建ACK訊息
      return [
        `MSH|^~\\&|${receivingApp}|${receivingFacility}|${sendingApp}|${sendingFacility}|${timestamp}||ACK|${messageControlId}|P|2.5.1`,
        `MSA|${ackCode}|${messageControlId}|${textMessage}`
      ].join('\r');
    } catch (error) {
      console.error('構建ACK回應時發生錯誤:', error);
      return `MSH|^~\\&|ERROR|ERROR|ERROR|ERROR|${new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14)}||ACK|ERROR|P|2.5.1\rMSA|AE|ERROR|Error constructing ACK: ${error.message}`;
    }
  }

  // 構建O34回應訊息
  buildO34Response(message, msh, pid) {
    try {
      const timestamp = new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);
      const messageControlId = msh.messageControlId || 'UNKNOWN';
      const sendingApp = msh.receivingApplication || '';
      const sendingFacility = msh.receivingFacility || '';
      const receivingApp = msh.sendingApplication || '';
      const receivingFacility = msh.sendingFacility || '';
      
      // 構建O34回應
      return [
        `MSH|^~\\&|${sendingApp}|${sendingFacility}|${receivingApp}|${receivingFacility}|${timestamp}||ORL^O34|${messageControlId}_ACK|P|2.5.1`,
        `MSA|AA|${messageControlId}|Message processed successfully`,
        `PID|1||${pid?.patientId || ''}^^^MRN||${pid?.patientName || ''}||||||||||||||||`
      ].join('\r');
    } catch (error) {
      console.error('構建O34回應時發生錯誤:', error);
      return `MSH|^~\\&|ERROR|ERROR|ERROR|ERROR|${new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14)}||ORL^O34|ERROR|P|2.5.1\rMSA|AE|ERROR|Error constructing O34 response: ${error.message}`;
    }
  }

  

}

// 導出hl7Controller實例
module.exports = new Hl7Controller();
