const parseSAC = (message) => {
    try {
        let sac;
        
        // 檢查消息類型
        if (typeof message === 'string') {
            // 處理字符串消息
            const segments = message.split(/\r\n|\r|\n/);
            sac = segments.find(seg => seg.startsWith('SAC'));
            if (!sac) {
                console.log("找不到 SAC 段");
                return null;
            }
            
            // 分割 SAC 段落為欄位
            const fields = sac.split('|');
            
            // 返回容器資訊
            return {
                externalContainerId: fields[1] || '',
                accessionIdentifier: fields[2] || '',
                containerIdentifier: fields[3] || '',
                primaryContainerType: fields[4] || '',
                containerStatus: fields[15] || '',
                carrierIdentifier: fields[26] || '',
                positionInCarrier: fields[27] || '',
                containerType: fields[44] || '',
            };
        } else if (message && typeof message.getSegment === 'function') {
            // 處理 hl7Msg 對象
            sac = message.getSegment("SAC");
            if (!sac) {
                console.log("找不到 SAC 段");
                return null;
            }
            
            // 返回容器資訊
            return {
                externalContainerId: sac.fields[1]?.value || '',
                accessionIdentifier: sac.fields[2]?.value || '',
                containerIdentifier: sac.fields[3]?.value || '',
                primaryContainerType: sac.fields[4]?.value || '',
                containerStatus: sac.fields[15]?.value || '',
                carrierIdentifier: sac.fields[26]?.value || '',
                positionInCarrier: sac.fields[27]?.value || '',
                containerType: sac.fields[44]?.value || '',
            };
        } else {
            throw new Error('不支持的消息格式');
        }
    } catch (error) {
        console.error('解析 SAC 段落時發生錯誤:', error);
        return null;
    }
};

module.exports = parseSAC;
