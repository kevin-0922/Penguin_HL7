const parseTQ1 = (message) => {
    try {
        let tq1;
        
        // 檢查消息類型
        if (typeof message === 'string') {
            // 處理字符串消息
            const segments = message.split(/\r\n|\r|\n/);
            tq1 = segments.find(seg => seg.startsWith('TQ1'));
            if (!tq1) {
                console.log("找不到 TQ1 段");
                return null;
            }
            
            // 分割 TQ1 段落為欄位
            const fields = tq1.split('|');
            
            // 返回時間/數量資訊
            return {
                setId: fields[1] || '',
                quantity: fields[2] || '',
                repeatPattern: fields[3] || '',
                explicitTime: fields[4] || '',
                relativeTimeUnits: fields[5] || '',
                serviceDuration: fields[6] || '',
                startDateTime: fields[7] || '',
                endDateTime: fields[8] || '',
                priority: fields[9] || '',
                conditionText: fields[10] || '',
                textInstruction: fields[11] || '',
                conjunction: fields[12] || '',
                occurrenceDuration: fields[13] || '',
                totalOccurrences: fields[14] || ''
            };
        } else if (message && typeof message.getSegment === 'function') {
            // 處理 hl7Msg 對象
            tq1 = message.getSegment("TQ1");
            if (!tq1) {
                console.log("找不到 TQ1 段");
                return null;
            }
            
            // 返回時間/數量資訊
            return {
                setId: tq1.fields[1]?.value || '',
                quantity: tq1.fields[2]?.value || '',
                repeatPattern: tq1.fields[3]?.value || '',
                explicitTime: tq1.fields[4]?.value || '',
                relativeTimeUnits: tq1.fields[5]?.value || '',
                serviceDuration: tq1.fields[6]?.value || '',
                startDateTime: tq1.fields[7]?.value || '',
                endDateTime: tq1.fields[8]?.value || '',
                priority: tq1.fields[9]?.value || '',
                conditionText: tq1.fields[10]?.value || '',
                textInstruction: tq1.fields[11]?.value || '',
                conjunction: tq1.fields[12]?.value || '',
                occurrenceDuration: tq1.fields[13]?.value || '',
                totalOccurrences: tq1.fields[14]?.value || ''
            };
        } else {
            throw new Error('不支持的消息格式');
        }
    } catch (error) {
        console.error('解析 TQ1 段落時發生錯誤:', error);
        return null;
    }
};

module.exports = parseTQ1; 