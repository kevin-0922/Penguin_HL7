// 輔助方法: 提取訊息控制ID
const extractMsgControlId = (message) => {
  try {
    const segments = message.split(/\r\n|\r|\n/);
    const mshSegment = segments.find((s) => s.startsWith("MSH"));
    if (!mshSegment) return "UNKNOWN";
    const fields = mshSegment.split("|");
    return fields.length > 9 ? fields[9] : "UNKNOWN";
  } catch (e) {
    return "UNKNOWN";
  }
};

// 輔助方法: 提取發送方
const extractSender = (message) => {
  try {
    const segments = message.split(/\r\n|\r|\n/);
    const mshSegment = segments.find((s) => s.startsWith("MSH"));
    if (!mshSegment) return "UNKNOWN";
    const fields = mshSegment.split("|");
    return fields.length > 2 ? fields[2] : "UNKNOWN";
  } catch (e) {
    return "UNKNOWN";
  }
};

// 輔助方法: 提取接收方
const extractReceiver = (message) => {
  try {
    const segments = message.split(/\r\n|\r|\n/);
    const mshSegment = segments.find((s) => s.startsWith("MSH"));
    if (!mshSegment) return "UNKNOWN";
    const fields = mshSegment.split("|");
    return fields.length > 4 ? fields[4] : "UNKNOWN";
  } catch (e) {
    return "UNKNOWN";
  }
};

module.exports = {
  extractMsgControlId,
  extractSender,
  extractReceiver,
};
