const db = require('../../database/db');

/**
 * 保存MLLP服務器配置
 * @param {Object} req - 請求對象
 * @param {Object} res - 響應對象
 */
const saveMllpConfig = async (req, res) => {
  try {
    const { remoteHost, remotePort, timeout } = req.body;
    
    // 驗證輸入
    if (!remoteHost || !remotePort || !timeout) {
      return res.status(400).json({ success: false, message: '所有欄位都必須填寫' });
    }
    
    // 檢查是否已存在配置
    const existingConfig = await db.getFirstMllpConfig();
    
    if (existingConfig) {
      // 更新現有配置
      await db.updateMllpConfig(remoteHost, remotePort, timeout);
    } else {
      // 創建新配置
      await db.insertMllpConfig(remoteHost, remotePort, timeout);
    }
    
    res.status(200).json({ success: true, message: '配置已保存' });
  } catch (error) {
    console.error('保存MLLP配置失敗:', error);
    res.status(500).json({ success: false, message: '保存配置失敗，請稍後重試' });
  }
};

/**
 * 獲取MLLP服務器配置
 * @param {Object} req - 請求對象
 * @param {Object} res - 響應對象
 */
const getMllpConfig = async (req, res) => {
  try {
    // 從資料庫獲取配置
    const config = await db.getFirstMllpConfig();
    
    if (!config) {
      return res.status(200).json({
        success: true,
        data: { 
          remoteHost: '',
          remotePort: '',
          timeout: '30000'
        }
      });
    }
    
    res.status(200).json({ 
      success: true, 
      data: {
        remoteHost: config.remote_host,
        remotePort: config.remote_port,
        timeout: config.timeout
      }
    });
  } catch (error) {
    console.error('獲取MLLP配置失敗:', error);
    res.status(500).json({ success: false, message: '獲取配置失敗，請稍後重試' });
  }
};

/**
 * 在應用啟動時獲取MLLP配置並設置到環境變數
 */
const loadMllpConfigToEnv = async () => {
  try {
    const config = await db.getFirstMllpConfig();
    
    if (config) {
      // 將配置加載到環境變數
      process.env.MLLP_LOCAL_HOST = '127.0.0.1';
      process.env.MLLP_LOCAL_PORT = '4321';
      process.env.MLLP_REMOTE_HOST = config.remote_host;
      process.env.MLLP_REMOTE_PORT = config.remote_port;
      process.env.MLLP_TIMEOUT = config.timeout;
      
      console.log('MLLP配置已從資料庫加載到環境變數');
    } else {
      console.log('未找到MLLP配置，使用預設值');
      // 設置預設值
      process.env.MLLP_LOCAL_HOST = '127.0.0.1';
      process.env.MLLP_LOCAL_PORT = '4321';
    }
  } catch (error) {
    console.error('加載MLLP配置到環境變數失敗:', error);
  }
};

module.exports = {
  saveMllpConfig,
  getMllpConfig,
  loadMllpConfigToEnv
};
