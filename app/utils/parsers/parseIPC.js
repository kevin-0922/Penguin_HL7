const parseIPC = (message) => {
    try {
        let ipc;
        
        // 檢查消息類型
        if (typeof message === 'string') {
            // 處理字符串消息
            const segments = message.split(/\r\n|\r|\n/);
            ipc = segments.find(seg => seg.startsWith('IPC'));
            if (!ipc) {
                console.log("找不到 IPC 段");
                return null;
            }
            
            // 分割 IPC 段落為欄位
            const fields = ipc.split('|');
            
            // 返回影像程序碼資訊
            return {
                accessionIdentifier: fields[1] || '',
                requestedProcedureId: fields[2] || '',
                studyInstanceUid: fields[3] || '',
                scheduledProcedureStepId: fields[4] || '',
                modality: fields[5] || '',
                protocolCode: fields[6] || '',
                scheduledStationName: fields[7] || '',
                scheduledProcedureStepLocation: fields[8] || '',
                scheduledProcedureStepStatus: fields[9] || ''
            };
        } else if (message && typeof message.getSegment === 'function') {
            // 處理 hl7Msg 對象
            ipc = message.getSegment("IPC");
            if (!ipc) {
                console.log("找不到 IPC 段");
                return null;
            }
            
            // 返回影像程序碼資訊
            return {
                accessionIdentifier: ipc.fields[1]?.value || '',
                requestedProcedureId: ipc.fields[2]?.value || '',
                studyInstanceUid: ipc.fields[3]?.value || '',
                scheduledProcedureStepId: ipc.fields[4]?.value || '',
                modality: ipc.fields[5]?.value || '',
                protocolCode: ipc.fields[6]?.value || '',
                scheduledStationName: ipc.fields[7]?.value || '',
                scheduledProcedureStepLocation: ipc.fields[8]?.value || '',
                scheduledProcedureStepStatus: ipc.fields[9]?.value || ''
            };
        } else {
            throw new Error('不支持的消息格式');
        }
    } catch (error) {
        console.error('解析 IPC 段落時發生錯誤:', error);
        return null;
    }
};

module.exports = parseIPC; 