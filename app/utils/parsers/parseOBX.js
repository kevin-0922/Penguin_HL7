const parseOBX = (message) => {
    try {
        // 檢查消息類型
        if (typeof message === 'string') {
            // 處理字符串消息
            const segments = message.split(/\r\n|\r|\n/);
            const obxSegments = segments.filter(seg => seg.startsWith('OBX'));
            
            if (obxSegments.length === 0) {
                console.log("找不到 OBX 段");
                return null;
            }
            
            // 解析每個 OBX 段落
            return obxSegments.map(obxSegment => {
                const fields = obxSegment.split('|');
                return {
                    setId: fields[1] || '',
                    valueType: fields[2] || '',
                    observationIdentifier: fields[3] || '',
                    observationValue: fields[5] || '',
                    units: fields[6] || '',
                    referenceRange: fields[7] || '',
                    abnormalFlags: fields[8] || '',
                    observationResultStatus: fields[11] || '',
                };
            });
        } else if (message && typeof message.getSegment === 'function') {
            // 處理 hl7Msg 對象
            const obx = message.getSegment("OBX");
            
            if (!obx) {
                console.log("找不到 OBX 段");
                return null;
            }
            
            // 返回觀察結果
            return [{
                setId: obx.fields[1]?.value || '',
                valueType: obx.fields[2]?.value || '',
                observationIdentifier: obx.fields[3]?.value || '',
                observationValue: obx.fields[5]?.value || '',
                units: obx.fields[6]?.value || '',
                referenceRange: obx.fields[7]?.value || '',
                abnormalFlags: obx.fields[8]?.value || '',
                observationResultStatus: obx.fields[11]?.value || '',
            }];
        } else {
            throw new Error('不支持的消息格式');
        }
    } catch (error) {
        console.error('解析 OBX 段落時發生錯誤:', error);
        return null;
    }
};

module.exports = parseOBX;
