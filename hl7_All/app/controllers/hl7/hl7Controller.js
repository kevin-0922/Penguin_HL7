const { db, query, get, run } = require('../../database/db');
const path = require('path');
const fs = require('fs');
const hl7 = require('simple-hl7');

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
      ['OML^O33', this.handleOmlO33.bind(this)],
      ['ORL^O34', this.handleOrlO34.bind(this)]
    ]);
  }

  // 處理HTTP請求中的HL7訊息
  async handleHttpRequest(req, res) {
    try {
      // 從請求體中獲取HL7訊息
      const hl7Message = req.body.message || req.body;
      
      console.log('收到HTTP HL7訊息請求:', hl7Message);
      
      // 處理HL7訊息並產生回應
      const response = await this.processHl7Message(hl7Message);
      
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
    try {
        const parser = new hl7.Parser();
        const hl7Msg = parser.parse(message);
      // 解析訊息部分
      const msh = parseMSH(hl7Msg);
      const pid = parsePID(hl7Msg);
      const orc = parseORC(hl7Msg);
      const obr = parseOBR(hl7Msg);
      const spm = parseSPM(hl7Msg);
      
      // 記錄訊息到數據庫
      await this.saveReceivedMessage({
        message_type: 'OML^O33',
        message_control_id: msh.messageControlId,
        sender: msh.sendingApplication,
        receiver: msh.receivingApplication,
        message_content: message
      });
      
      // 構建ACK回應
      return this.buildAckResponse(message, 'AA', 'Message received and processed successfully');
    } catch (error) {
      console.error('處理OML^O33訊息時發生錯誤:', error);
      return this.buildAckResponse(message, 'AE', error.message);
    }
  }

  // 處理ORL^O34訊息
  async handleOrlO34(message) {
    try {
      // 解析訊息部分
      const msh = parseMSH(message);
      
      // 記錄訊息到數據庫
      await this.saveReceivedMessage({
        message_type: 'ORL^O34',
        message_control_id: msh.messageControlId,
        sender: msh.sendingApplication,
        receiver: msh.receivingApplication,
        message_content: message
      });
      
      // 構建ACK回應
      return this.buildAckResponse(message, 'AA', 'Message received and processed successfully');
    } catch (error) {
      console.error('處理ORL^O34訊息時發生錯誤:', error);
      return this.buildAckResponse(message, 'AE', error.message);
    }
  }

  // 處理HL7訊息
  async processHl7Message(message) {
    try {
      // 提取訊息類型
      const messageType = this.extractMessageType(message);
      
      console.log(`處理 ${messageType} 類型的訊息`);
      
      // 獲取對應的訊息處理器
      const handler = this.messageHandlers.get(messageType);
      
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
      const segments = message.split('\r\n');
      
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
      ].join('\r\n');
    } catch (error) {
      console.error('構建ACK回應時發生錯誤:', error);
      return `MSH|^~\\&|ERROR|ERROR|ERROR|ERROR|${new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14)}||ACK|ERROR|P|2.5.1\r\nMSA|AE|ERROR|Error constructing ACK: ${error.message}`;
    }
  }

  
  // 獲取已發送的訊息
  async getSentMessages(req, res) {
    try {
      const messages = await query('SELECT * FROM sent_messages ORDER BY created_at DESC');
      res.json({
        success: true,
        data: messages
      });
    } catch (error) {
      console.error('獲取已發送訊息時發生錯誤:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // 獲取已接收的訊息
  async getReceivedMessages(req, res) {
    try {
      const messages = await query('SELECT * FROM received_messages ORDER BY received_at DESC');
      res.json({
        success: true,
        data: messages
      });
    } catch (error) {
      console.error('獲取已接收訊息時發生錯誤:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // 獲取訊息詳情
  async getMessageDetails(req, res) {
    try {
      const { type, id } = req.params;
      
      if (type !== 'sent' && type !== 'received') {
        return res.status(400).json({
          success: false,
          error: '無效的訊息類型'
        });
      }
      
      const table = type === 'sent' ? 'sent_messages' : 'received_messages';
      const message = await get(`SELECT * FROM ${table} WHERE id = ?`, [id]);
      
      if (!message) {
        return res.status(404).json({
          success: false,
          error: '訊息不存在'
        });
      }
      
      res.json({
        success: true,
        data: message
      });
    } catch (error) {
      console.error('獲取訊息詳情時發生錯誤:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // 保存已發送的訊息
  async saveSentMessage(req, res) {
    try {
      const { message_type, message_control_id, sender, receiver, message_content, status } = req.body;
      
      if (!message_type || !message_control_id || !sender || !receiver || !message_content) {
        return res.status(400).json({
          success: false,
          error: '缺少必要欄位'
        });
      }
      
      const result = await run(
        `INSERT INTO sent_messages 
        (message_type, message_control_id, sender, receiver, message_content, status)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [message_type, message_control_id, sender, receiver, message_content, status || 'sent']
      );
      
      res.json({
        success: true,
        data: {
          id: result.id,
          message: 'Message saved successfully'
        }
      });
    } catch (error) {
      console.error('保存已發送訊息時發生錯誤:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // 保存已接收的訊息
  async saveReceivedMessage(messageData) {
    try {
      const { message_type, message_control_id, sender, receiver, message_content, response_message_id, status } = messageData;
      
      return await run(
        `INSERT INTO received_messages 
        (message_type, message_control_id, sender, receiver, message_content, response_message_id, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [message_type, message_control_id, sender, receiver, message_content, response_message_id || null, status || 'received']
      );
    } catch (error) {
      console.error('保存已接收訊息時發生錯誤:', error);
      throw error;
    }
  }

  // 更新訊息狀態
  async updateMessageStatus(req, res) {
    try {
      const { id } = req.params;
      const { type, status } = req.body;
      
      if (!type || !status) {
        return res.status(400).json({
          success: false,
          error: '缺少必要欄位'
        });
      }
      
      if (type !== 'sent' && type !== 'received') {
        return res.status(400).json({
          success: false,
          error: '無效的訊息類型'
        });
      }
      
      const table = type === 'sent' ? 'sent_messages' : 'received_messages';
      const result = await run(`UPDATE ${table} SET status = ? WHERE id = ?`, [status, id]);
      
      if (result.changes === 0) {
        return res.status(404).json({
          success: false,
          error: '訊息不存在'
        });
      }
      
      res.json({
        success: true,
        data: {
          message: 'Message status updated successfully'
        }
      });
    } catch (error) {
      console.error('更新訊息狀態時發生錯誤:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // 刪除訊息
  async deleteMessage(req, res) {
    try {
      const { type, id } = req.params;
      
      if (type !== 'sent' && type !== 'received') {
        return res.status(400).json({
          success: false,
          error: '無效的訊息類型'
        });
      }
      
      const table = type === 'sent' ? 'sent_messages' : 'received_messages';
      const result = await run(`DELETE FROM ${table} WHERE id = ?`, [id]);
      
      if (result.changes === 0) {
        return res.status(404).json({
          success: false,
          error: '訊息不存在'
        });
      }
      
      res.json({
        success: true,
        data: {
          message: 'Message deleted successfully'
        }
      });
    } catch (error) {
      console.error('刪除訊息時發生錯誤:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // 獲取訊息統計
  async getMessageStats(req, res) {
    try {
      const sentCount = await get('SELECT COUNT(*) as count FROM sent_messages');
      const receivedCount = await get('SELECT COUNT(*) as count FROM received_messages');
      
      const sentByType = await query('SELECT message_type, COUNT(*) as count FROM sent_messages GROUP BY message_type');
      const receivedByType = await query('SELECT message_type, COUNT(*) as count FROM received_messages GROUP BY message_type');
      
      res.json({
        success: true,
        data: {
          sent: {
            total: sentCount.count,
            byType: sentByType
          },
          received: {
            total: receivedCount.count,
            byType: receivedByType
          }
        }
      });
    } catch (error) {
      console.error('獲取訊息統計時發生錯誤:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // 搜索訊息
  async searchMessages(req, res) {
    try {
      const { type, query: searchQuery } = req.query;
      
      if (!type) {
        return res.status(400).json({
          success: false,
          error: '缺少訊息類型'
        });
      }
      
      if (type !== 'sent' && type !== 'received' && type !== 'all') {
        return res.status(400).json({
          success: false,
          error: '無效的訊息類型'
        });
      }
      
      let messages = [];
      
      if (type === 'sent' || type === 'all') {
        const sentMessages = await query(
          `SELECT * FROM sent_messages 
          WHERE message_type LIKE ? OR message_control_id LIKE ? OR sender LIKE ? OR receiver LIKE ? OR message_content LIKE ?
          ORDER BY created_at DESC`,
          Array(5).fill(`%${searchQuery || ''}%`)
        );
        
        messages = [...messages, ...sentMessages.map(msg => ({ ...msg, source: 'sent' }))];
      }
      
      if (type === 'received' || type === 'all') {
        const receivedMessages = await query(
          `SELECT * FROM received_messages 
          WHERE message_type LIKE ? OR message_control_id LIKE ? OR sender LIKE ? OR receiver LIKE ? OR message_content LIKE ?
          ORDER BY received_at DESC`,
          Array(5).fill(`%${searchQuery || ''}%`)
        );
        
        messages = [...messages, ...receivedMessages.map(msg => ({ ...msg, source: 'received' }))];
      }
      
      res.json({
        success: true,
        data: messages
      });
    } catch (error) {
      console.error('搜索訊息時發生錯誤:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

// 導出hl7Controller實例
module.exports = new Hl7Controller();
