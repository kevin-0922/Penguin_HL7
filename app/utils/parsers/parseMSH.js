function parseMSH(message) {
    const lines = message.split(/\r\n|\r|\n/); // 處理不同換行符號
    const mshLine = lines.find(line => line.startsWith('MSH'));
    if (!mshLine) throw new Error('找不到MSH段');
  
    const fields = mshLine.split('|');
    return {
      sendingApplication: fields[2] || '',
      sendingFacility: fields[3] || '',
      receivingApplication: fields[4] || '',
      receivingFacility: fields[5] || '',
      messageDatetime: fields[6] || '',
      messageType: fields[8] || '', // e.g. QBP^Q11^QBP_Q11
      messageControlId: fields[9] || '',
      version: fields[11] || '2.5.1'
    };
  }
  
module.exports = parseMSH;