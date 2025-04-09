const { db, query, get, run } = require('../../database/db');

class MessageService {
  constructor() {
    console.log('初始化HL7訊息服務...');
  }

  // 保存訊息
  async saveMessage(type, messageData) {
    try {
      const { message_type, message_control_id, sender, receiver, message_content, status } = messageData;
      
      const table = type === 'sent' ? 'sent_messages' : 'received_messages';
      const statusValue = status || (type === 'sent' ? 'sent' : 'received');
      
      const result = await run(
        `INSERT INTO ${table} 
        (message_type, message_control_id, sender, receiver, message_content, status)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [message_type, message_control_id, sender, receiver, message_content, statusValue]
      );
      
      return {
        success: true,
        id: result.id,
        message: `Message saved to ${type} queue`
      };
    } catch (error) {
      console.error(`保存${type}訊息時發生錯誤:`, error);
      throw error;
    }
  }

  // 獲取訊息列表
  async getMessages(type, limit = 100, offset = 0) {
    try {
      const table = type === 'sent' ? 'sent_messages' : 'received_messages';
      const timeField = type === 'sent' ? 'created_at' : 'received_at';
      
      return await query(
        `SELECT * FROM ${table} 
        ORDER BY ${timeField} DESC 
        LIMIT ? OFFSET ?`,
        [limit, offset]
      );
    } catch (error) {
      console.error(`獲取${type}訊息列表時發生錯誤:`, error);
      throw error;
    }
  }

  // 獲取訊息詳情
  async getMessageById(type, id) {
    try {
      const table = type === 'sent' ? 'sent_messages' : 'received_messages';
      
      return await get(
        `SELECT * FROM ${table} WHERE id = ?`,
        [id]
      );
    } catch (error) {
      console.error(`獲取訊息詳情時發生錯誤:`, error);
      throw error;
    }
  }

  // 搜尋訊息
  async searchMessages(type, searchText) {
    try {
      const tables = [];
      if (type === 'all' || type === 'sent') tables.push('sent_messages');
      if (type === 'all' || type === 'received') tables.push('received_messages');
      
      let results = [];
      
      for (const table of tables) {
        const timeField = table === 'sent_messages' ? 'created_at' : 'received_at';
        const sourceType = table === 'sent_messages' ? 'sent' : 'received';
        
        const messages = await query(
          `SELECT *, '${sourceType}' as source FROM ${table} 
          WHERE message_type LIKE ? OR message_control_id LIKE ? OR sender LIKE ? OR receiver LIKE ? OR message_content LIKE ?
          ORDER BY ${timeField} DESC LIMIT 100`,
          Array(5).fill(`%${searchText}%`)
        );
        
        results = [...results, ...messages];
      }
      
      return results;
    } catch (error) {
      console.error('搜尋訊息時發生錯誤:', error);
      throw error;
    }
  }
}

module.exports = new MessageService();
