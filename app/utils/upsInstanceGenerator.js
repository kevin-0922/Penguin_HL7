/**
 * UPS Instance UID 生成器
 * 生成基於當前詳細時間的唯一識別碼
 */

/**
 * 生成基於當前詳細時間的 UPS Instance UID
 * 格式: YYYYMMDDHHMMSSSSSS (年月日時分秒毫秒)
 * @returns {String} UPS Instance UID
 */
const generateUpsInstanceUID = () => {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  
  // 添加隨機數確保唯一性
  const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${random}`;
};

module.exports = {
  generateUpsInstanceUID
};