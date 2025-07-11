function parseMSH(message) {
    const msh = message.getSegment("MSH");

    if (!msh) throw new Error('找不到MSH段');
  
    // 處理 MSH 段落的欄位，需要特殊處理 MSH-1 和後續欄位索引
    // msh.fields[0] 是 "MSH"
    // msh.fields[1] 是 MSH-2 (即"^~\&")，而 MSH-1 ("|") 在分割時已經被用作分隔符
    
    // 建立正確的欄位映射，修正索引偏移
    const fields = [
      null, // 索引0不使用
      { value: '|' }, // MSH-1 是分隔符 "|" 本身
      ...msh.fields.slice(1) // 從 MSH-2 開始的其餘欄位
    ];
    
    return {
      sendingApplication: fields[3]?.value || '',    // MSH-3
      sendingFacility: fields[4]?.value || '',       // MSH-4
      receivingApplication: fields[5]?.value || '',  // MSH-5
      receivingFacility: fields[6]?.value || '',     // MSH-6
      messageDatetime: fields[7]?.value || '',       // MSH-7
      messageType: fields[9]?.value || '',           // MSH-9, e.g. QBP^Q11^QBP_Q11
      messageControlId: fields[10]?.value || '',     // MSH-10
    };
  }
  
module.exports = parseMSH;