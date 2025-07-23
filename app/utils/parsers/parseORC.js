const parseORC = (message) => {
    try {
        let orc;
        
        // 檢查消息類型
        if (typeof message === 'string') {
            // 處理字符串消息
            const segments = message.split(/\r\n|\r|\n/);
            orc = segments.find(seg => seg.startsWith('ORC'));
            if (!orc) {
                console.log("找不到 ORC 段");
                return null;
            }
            
            // 分割 ORC 段落為欄位
            const fields = orc.split('|');
            
            // 返回訂單資訊
            return {
                orderControl: fields[1] || '',
                placerOrderNumber: fields[2] || '',
                fillerOrderNumber: fields[3] || '',
                orderStatus: fields[5] || '',
                dateTimeOfTransaction: fields[9] || '',
                enteredBy: fields[10] || '',
            };
        } else if (message && typeof message.getSegment === 'function') {
            // 處理 hl7Msg 對象
            orc = message.getSegment("ORC");
            if (!orc) {
                console.log("找不到 ORC 段");
                return null;
            }
            
            // 返回訂單資訊
            return {
                orderControl: orc.fields[1]?.value || '',
                placerOrderNumber: orc.fields[2]?.value || '',
                fillerOrderNumber: orc.fields[3]?.value || '',
                orderStatus: orc.fields[5]?.value || '',
                dateTimeOfTransaction: orc.fields[9]?.value || '',
                enteredBy: orc.fields[10]?.value || '',
            };
        } else {
            throw new Error('不支持的消息格式');
        }
    } catch (error) {
        console.error('解析 ORC 段落時發生錯誤:', error);
        return null;
    }
};

module.exports = parseORC;
