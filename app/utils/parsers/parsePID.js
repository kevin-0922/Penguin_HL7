const parsePID = (message) => {
    try {
        let pid;
        
        // 檢查消息類型
        if (typeof message === 'string') {
            // 處理字符串消息
            const segments = message.split(/\r\n|\r|\n/);
            pid = segments.find(seg => seg.startsWith('PID'));
            if (!pid) {
                console.log("找不到 PID 段");
                return null;
            }
            
            // 分割 PID 段落為欄位
            const fields = pid.split('|');
            
            // 返回患者資訊
            return {
                patientId: fields[3] || '',
                patientName: fields[5] || '',
                dateOfBirth: fields[7] || '',
                sex: fields[8] || '',
                address: fields[11] || '',
                phoneNumber: fields[13] || '',
            };
        } else if (message && typeof message.getSegment === 'function') {
            // 處理 hl7Msg 對象
            pid = message.getSegment("PID");
            if (!pid) {
                console.log("找不到 PID 段");
                return null;
            }
            
            // 返回患者資訊
            return {
                patientId: pid.fields[3]?.value || '',
                patientName: pid.fields[5]?.value || '',
                dateOfBirth: pid.fields[7]?.value || '',
                sex: pid.fields[8]?.value || '',
                address: pid.fields[11]?.value || '',
                phoneNumber: pid.fields[13]?.value || '',
            };
        } else {
            throw new Error('不支持的消息格式');
        }
    } catch (error) {
        console.error('解析 PID 段落時發生錯誤:', error);
        return null;
    }
};

module.exports = parsePID;
