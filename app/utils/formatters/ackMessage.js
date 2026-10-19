module.exports.buildAckResponse = (message, ackCode, textMessage) => {
  try {
    const segments = message.split("\r");
    const msh = segments.find((segment) => segment.startsWith("MSH"));
    if (!msh) {
      throw new Error("Invalid HL7 message: MSH segment not found");
    }
    const fields = msh.split("|");
    if (fields.length < 12) {
      throw new Error("Invalid MSH segment: insufficient fields");
    }
    
    const timestamp = new Date().toISOString().replace(/[-:T]/g, "").substring(0, 14);
    const originalMessageControlId = fields[9] || "";
    const newMessageControlId = require('crypto').randomUUID().replace(/-/g, '').substring(0, 20);

    const originalSendingApp = fields[2] || "";
    const originalSendingFacility = fields[3] || "";
    const originalReceivingApp = fields[4] || "";
    const originalReceivingFacility = fields[5] || "";

    const originalMessageType = fields[8] || "";
    const messageTypeParts = originalMessageType.split('^');
    const triggerEvent = messageTypeParts[1] || "";
    const ackMessageType = triggerEvent ? `ACK^${triggerEvent}^ACK` : 'ACK';

    // 根據觸發事件，決定 MSH-21 該用哪個 Profile Identifier
    const profileIdMap = {
      'O33': 'LAB-80^IHE',
      'Q11': 'LAB-81^IHE',
      'R22': 'LAB-82^IHE',
    };
    const profileId = profileIdMap[triggerEvent] || '';
    const profileIdSuffix = profileId ? `|||||||||${profileId}` : '';

    return [
      `MSH|^~\\&|${originalReceivingApp}|${originalReceivingFacility}|${originalSendingApp}|${originalSendingFacility}|${timestamp}||${ackMessageType}|${newMessageControlId}|P|2.5.1${profileIdSuffix}`,
      `MSA|${ackCode}|${originalMessageControlId}|${textMessage}`,
    ].join("\r");
  } catch (error) {
    console.error("構建ACK回應時發生錯誤:", error);
    return `MSH|^~\\&|ERROR|ERROR|ERROR|ERROR|${new Date()
      .toISOString()
      .replace(/[-:T]/g, "")
      .substring(0, 14)}||ACK|ERROR|P|2.5.1\rMSA|AE|ERROR|Error constructing ACK: ${error.message}`;
  }
};