// 將日期轉換為 HL7 格式
export const convertToHL7Date = (dateStr, includeTime = false) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  if (includeTime) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
  
  return `${year}${month}${day}`;
};

// 獲取當前時間的 HL7 格式時間戳
export const getHL7Timestamp = () => {
  const now = new Date();
  return now
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 14);
}; 