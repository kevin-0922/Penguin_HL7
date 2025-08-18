const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// 設置 Raccon 資料庫連接
const racconSequelize = new Sequelize({
  host: process.env.RACCON_SQL_HOST || 'localhost',
  port: process.env.RACCON_SQL_PORT || 5432,
  username: process.env.RACCON_SQL_USERNAME || 'postgres',
  password: process.env.RACCON_SQL_PASSWORD,
  database: process.env.RACCON_SQL_DB || 'raccoon',
  dialect: process.env.RACCON_SQL_TYPE || 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// 定義 ups_work_item 表模型 (基於提供的 CSV 結構)
const UpsWorkItem = racconSequelize.define('ups_work_item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  upsInstanceUID: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  transactionUID: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  subscribed: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  x00100020: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  x00741200: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  x00404010: {
    type: DataTypes.DATE,
    allowNull: true
  },
  x00741204: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  x00741202: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  x00404025: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  x00404026: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  x00404027: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  x00404034: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  x00404005: {
    type: DataTypes.DATE,
    allowNull: true
  },
  x00404011: {
    type: DataTypes.DATE,
    allowNull: true
  },
  x00404018: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  x00380010: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  x00380014_x00400031: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  x00380014_x00400032: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  x00380014_x00400033: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  x00741000: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  x00080082: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  x00404008: {
    type: DataTypes.DATE,
    allowNull: true
  },
  x00404009: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  x00404036: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  x00404037: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  x00404041: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  json: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'ups_work_item',
  timestamps: true, // 自動管理 createdAt 和 updatedAt
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// 測試連接
racconSequelize.authenticate()
  .then(() => {
    console.log('成功連接到 Raccon 資料庫');
  })
  .catch(err => {
    console.error('連接 Raccon 資料庫失敗:', err.message);
  });

module.exports = {
  racconSequelize,
  UpsWorkItem
};