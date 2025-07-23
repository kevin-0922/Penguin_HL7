const parseOBR = (message) => {
    try {
        let obr;
        
        // 檢查消息類型
        if (typeof message === 'string') {
            // 處理字符串消息
            const segments = message.split(/\r\n|\r|\n/);
            obr = segments.find(seg => seg.startsWith('OBR'));
            if (!obr) {
                console.log("找不到 OBR 段");
                return null;
            }
            
            // 分割 OBR 段落為欄位
            const fields = obr.split('|');
            
            // 返回檢查資訊
            return {
                setId: fields[1] || '',
                placerOrderNumber: fields[2] || '',
                fillerOrderNumber: fields[3] || '',
                universalServiceId: fields[4] || '',
                priority: fields[5] || '',
                requestedDateTime: fields[6] || '',
                observationDateTime: fields[7] || '',
            };
        } else if (message && typeof message.getSegment === 'function') {
            // 處理 hl7Msg 對象
            obr = message.getSegment("OBR");
            if (!obr) {
                console.log("找不到 OBR 段");
                return null;
            }
            
            // 返回檢查資訊
            return {
                setId: obr.fields[1]?.value || '',
                placerOrderNumber: obr.fields[2]?.value || '',
                fillerOrderNumber: obr.fields[3]?.value || '',
                universalServiceId: obr.fields[4]?.value || '',
                priority: obr.fields[5]?.value || '',
                requestedDateTime: obr.fields[6]?.value || '',
                observationDateTime: obr.fields[7]?.value || '',
            };
        } else {
            throw new Error('不支持的消息格式');
        }
    } catch (error) {
        console.error('解析 OBR 段落時發生錯誤:', error);
        return null;
    }
};

module.exports = parseOBR;
