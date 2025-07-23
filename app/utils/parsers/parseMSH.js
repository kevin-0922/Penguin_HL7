function parseMSH(message) {
    try {
        // 檢查消息類型
        if (typeof message === 'string') {
            // 處理字符串消息
            const segments = message.split(/\r\n|\r|\n/);
            const msh = segments.find(seg => seg.startsWith("MSH"));
            
            if (!msh) throw new Error('找不到MSH段');
            
            const fields = msh.split("|");
            
            return {
                sendingApplication: fields[2] || '',     // MSH-3
                sendingFacility: fields[3] || '',        // MSH-4
                receivingApplication: fields[4] || '',   // MSH-5
                receivingFacility: fields[5] || '',      // MSH-6
                messageDatetime: fields[6] || '',        // MSH-7
                messageType: fields[8] || '',            // MSH-9, e.g. QBP^Q11^QBP_Q11
                messageControlId: fields[9] || '',       // MSH-10
            };
        } else if (message && typeof message.getSegment === 'function') {
            // 處理 hl7Msg 對象
            const msh = message.getSegment("MSH");
            
            if (!msh) throw new Error('找不到MSH段');
            
            return {
                sendingApplication: msh.fields[2]?.value || '',     // MSH-3
                sendingFacility: msh.fields[3]?.value || '',        // MSH-4
                receivingApplication: msh.fields[4]?.value || '',   // MSH-5
                receivingFacility: msh.fields[5]?.value || '',      // MSH-6
                messageDatetime: msh.fields[6]?.value || '',        // MSH-7
                messageType: msh.fields[8]?.value || '',            // MSH-9
                messageControlId: msh.fields[9]?.value || '',       // MSH-10
            };
        } else {
            throw new Error('不支持的消息格式');
        }
    } catch (error) {
        console.error('解析 MSH 段落時發生錯誤:', error);
        return {
            sendingApplication: '',
            sendingFacility: '',
            receivingApplication: '',
            receivingFacility: '',
            messageDatetime: '',
            messageType: '',
            messageControlId: '',
        };
    }
}
  
module.exports = parseMSH;