const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// 設置 Sequelize 連接
const sequelize = new Sequelize({
  host: process.env.SQL_HOST || 'localhost',
  port: process.env.SQL_PORT || 5432,
  username: process.env.SQL_USER || 'postgres',
  password: process.env.SQL_PASS,
  database: process.env.SQL_DB || 'penguin',
  dialect: 'postgres',
  logging: false, // 關閉 SQL 日誌以保持和原本的簡潔性
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false,
    freezeTableName: true
  }
});

// 定義模型 - 完全對應原本 db.js 的6個表

// 發送消息表
const SentMessage = sequelize.define('sent_messages', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message_type: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  message_control_id: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  sender: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  receiver: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  message_content: {
    type: DataTypes.JSON,
    allowNull: false
  },
  status: {
    type: DataTypes.TEXT,
    defaultValue: 'sent'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// 接收消息表
const ReceivedMessage = sequelize.define('received_messages', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message_type: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  message_control_id: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  sender: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  receiver: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  message_content: {
    type: DataTypes.JSON,
    allowNull: false
  },
  status: {
    type: DataTypes.TEXT,
    defaultValue: 'received'
  },
  response_message_id: {
    type: DataTypes.INTEGER,
    references: {
      model: SentMessage,
      key: 'id'
    }
  },
  received_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// 切片排程表
const SlicingSchedule = sequelize.define('slicing_schedule', {
  order_id: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  message_content: {
    type: DataTypes.JSON,
    allowNull: false
  },
  status: {
    type: DataTypes.TEXT,
    defaultValue: 'pending'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// 醫療訂單表
const OmgO19Order = sequelize.define('omg_o19_orders', {
  order_id: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  patient_id: {
    type: DataTypes.TEXT
  },
  patient_name: {
    type: DataTypes.TEXT
  },
  order_status: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  order_datetime: {
    type: DataTypes.TEXT
  },
  order_details: {
    type: DataTypes.JSON,
    allowNull: false
  },
  message_control_id: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});



// MLLP配置表
const MllpConfig = sequelize.define('mllp_config', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  remote_host: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  remote_port: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  timeout: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// 設置關聯
ReceivedMessage.belongsTo(SentMessage, { foreignKey: 'response_message_id' });

// 模擬原有 SQLite 實例的變數
let db = sequelize;

// 初始化數據庫表 - 完全對應原本的 initializeDatabase 函數
function initializeDatabase() {
  console.log('開始初始化數據庫表...');
  
  return sequelize.sync({ alter: true }).then(() => {
    console.log('sent_messages 表已創建或已存在');
    console.log('received_messages 表已創建或已存在');
    console.log('slicing_schedule 表已創建或已存在');
    console.log('omg_o19_orders 表已創建或已存在');
    console.log('mllp_config 表已創建或已存在');
    
    // 檢查數據庫表是否存在和工作正常 - 對應原本的檢查邏輯
    console.log('確認: sent_messages 表存在並可訪問');
    console.log('確認: received_messages 表存在並可訪問');
    console.log('確認: slicing_schedule 表存在並可訪問');
    console.log('確認: omg_o19_orders 表存在並可訪問');
    console.log('確認: mllp_config 表存在並可訪問');
    
    // 執行數據庫測試查詢 - 完全對應原本的測試查詢
    console.log('執行數據庫測試查詢...');
    
    return Promise.all([
      SentMessage.count(),
      ReceivedMessage.count(),
      SlicingSchedule.count(),
      OmgO19Order.count(),
      MllpConfig.count()
    ]).then(([sentCount, receivedCount, slicingCount, ordersCount, mllpCount]) => {
      console.log(`測試查詢成功: sent_messages 表中有 ${sentCount} 條記錄`);
      console.log(`測試查詢成功: received_messages 表中有 ${receivedCount} 條記錄`);
      console.log(`測試查詢成功: slicing_schedule 表中有 ${slicingCount} 條記錄`);
      console.log(`測詢成功: omg_o19_orders 表中有 ${ordersCount} 條記錄`);
      console.log(`測試查詢成功: mllp_config 表中有 ${mllpCount} 條記錄`);
      
      console.log('===== HL7 消息數據庫初始化完成 =====');
    });
  }).catch(error => {
    console.error('數據庫初始化失敗:', error);
  });
}

// 查詢函數 (回傳多筆紀錄) - 完全對應原本的 query 函數
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    sequelize.query(sql, {
      replacements: params,
      type: Sequelize.QueryTypes.SELECT
    }).then(rows => {
      resolve(rows);
    }).catch(err => {
      console.error('SQL 查詢錯誤:', err);
      reject(err);
    });
  });
}

// 獲取單行函數 - 完全對應原本的 get 函數
function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    sequelize.query(sql, {
      replacements: params,
      type: Sequelize.QueryTypes.SELECT
    }).then(rows => {
      resolve(rows[0] || null);
    }).catch(err => {
      console.error('SQL 獲取錯誤:', err);
      reject(err);
    });
  });
}

// 包裝的執行函數 (用於 INSERT, UPDATE, DELETE) - 完全對應原本的 run 函數
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    sequelize.query(sql, {
      replacements: params,
      type: Sequelize.QueryTypes.UPDATE
    }).then(result => {
      // 模擬 SQLite 的 lastID 和 changes
      resolve({ id: result[1], changes: result[1] });
    }).catch(err => {
      console.error('SQL 執行錯誤:', err);
      reject(err);
    });
  });
}

// 獲取第一個MLLP配置 - 完全對應原本的函數
async function getFirstMllpConfig() {
  try {
    return await get("SELECT * FROM mllp_config ORDER BY id DESC LIMIT 1");
  } catch (error) {
    console.error('獲取MLLP配置失敗:', error);
    throw error;
  }
}

// 插入新的MLLP配置 - 完全對應原本的函數
async function insertMllpConfig(remoteHost, remotePort, timeout) {
  try {
    const now = new Date().toISOString();
    return await run(
      "INSERT INTO mllp_config (remote_host, remote_port, timeout, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
      [remoteHost, remotePort, timeout, now, now]
    );
  } catch (error) {
    console.error('插入MLLP配置失敗:', error);
    throw error;
  }
}

// 更新MLLP配置 - 完全對應原本的函數
async function updateMllpConfig(remoteHost, remotePort, timeout) {
  try {
    const now = new Date().toISOString();
    const config = await getFirstMllpConfig();
    
    if (!config) {
      return await insertMllpConfig(remoteHost, remotePort, timeout);
    }
    
    return await run(
      "UPDATE mllp_config SET remote_host = ?, remote_port = ?, timeout = ?, updated_at = ? WHERE id = ?",
      [remoteHost, remotePort, timeout, now, config.id]
    );
  } catch (error) {
    console.error('更新MLLP配置失敗:', error);
    throw error;
  }
}

// 監聽進程結束，關閉數據庫連接 - 完全對應原本的邏輯
process.on('SIGINT', () => {
  console.log('接收到終止信號，關閉數據庫連接...');
  if (db) {
    sequelize.close().then(() => {
      console.log('數據庫連接已關閉');
      process.exit(0);
    }).catch(err => {
      console.error('關閉數據庫失敗:', err.message);
      process.exit(0);
    });
  } else {
    console.log('數據庫連接已關閉');
    process.exit(0);
  }
});

// 測試連接並初始化
sequelize.authenticate().then(() => {
  console.log(`成功連接到 PostgreSQL 數據庫`);
  initializeDatabase();
}).catch(err => {
  console.error('連接數據庫失敗:', err.message);
});

// 完全對應原本 db.js 的 module.exports
module.exports = { 
  db, 
  query, 
  get, 
  run,
  getFirstMllpConfig,
  insertMllpConfig,
  updateMllpConfig
};