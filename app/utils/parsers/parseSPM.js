const parseSPM = (message) => {
    try {
        let spm;
        
        // 檢查消息類型
        if (typeof message === 'string') {
            // 處理字符串消息
            const segments = message.split(/\r\n|\r|\n/);
            spm = segments.find(seg => seg.startsWith('SPM'));
            if (!spm) {
                console.log("找不到 SPM 段");
                return null;
            }
            
            // 分割 SPM 段落為欄位
            const fields = spm.split('|');
            
            // 返回標本資訊
            return {
                setId: fields[1] || '',
                specimenId: fields[2] || '',
                specimenType: fields[4] || '',
                specimenCollectionMethod: fields[7] || '',
                specimenSource: fields[8] || '',
                specimenDescription: fields[14] || '',
                specimenCollectionDateTime: fields[17] || '',
            };
        } else if (message && typeof message.getSegment === 'function') {
            // 處理 hl7Msg 對象
            spm = message.getSegment("SPM");
            if (!spm) {
                console.log("找不到 SPM 段");
                return null;
            }
            
            // 返回標本資訊
            return {
                setId: spm.fields[1]?.value || '',
                specimenId: spm.fields[2]?.value || '',
                specimenType: spm.fields[4]?.value || '',
                specimenCollectionMethod: spm.fields[7]?.value || '',
                specimenSource: spm.fields[8]?.value || '',
                specimenDescription: spm.fields[14]?.value || '',
                specimenCollectionDateTime: spm.fields[17]?.value || '',
            };
        } else {
            throw new Error('不支持的消息格式');
        }
    } catch (error) {
        console.error('解析 SPM 段落時發生錯誤:', error);
        return null;
    }
};

module.exports = parseSPM;
