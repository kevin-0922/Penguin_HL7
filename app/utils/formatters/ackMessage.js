module.exports.buildAckResponse = (message, ackCode, textMessage) => {
  try {
    // 分割訊息為段落
    const segments = message.split("\r");
    // 獲取MSH段落
    const msh = segments.find((segment) => segment.startsWith("MSH"));
    if (!msh) {
      throw new Error("Invalid HL7 message: MSH segment not found");
    }
    // 分割MSH段落為欄位
    const fields = msh.split("|");
    if (fields.length < 12) {
      throw new Error("Invalid MSH segment: insufficient fields");
    }

    // 構建ACK回應
    const timestamp = new Date().toISOString().replace(/[-:T]/g, "").substring(0, 14);
    const messageControlId = fields[9] || "";
    const sendingApp = fields[4] || "";
    const sendingFacility = fields[5] || "";
    const receivingApp = fields[2] || "";
    const receivingFacility = fields[3] || "";

    // 構建ACK訊息
    return [
      `MSH|^~\\&|${receivingApp}|${receivingFacility}|${sendingApp}|${sendingFacility}|${timestamp}||ACK|${messageControlId}|P|2.5.1`,
      `MSA|${ackCode}|${messageControlId}|${textMessage}`,
    ].join("\r");
  } catch (error) {
    console.error("構建ACK回應時發生錯誤:", error);
    return `MSH|^~\\&|ERROR|ERROR|ERROR|ERROR|${new Date()
      .toISOString()
      .replace(/[-:T]/g, "")
      .substring(0, 14)}||ACK|ERROR|P|2.5.1\rMSA|AE|ERROR|Error constructing ACK: ${error.message}`;
  }
};
