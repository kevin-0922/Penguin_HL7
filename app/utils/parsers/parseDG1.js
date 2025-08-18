const parseDG1 = (message) => {
    try {
        let dg1;
        
        // 檢查消息類型
        if (typeof message === 'string') {
            // 處理字符串消息
            const segments = message.split(/\r\n|\r|\n/);
            dg1 = segments.find(seg => seg.startsWith('DG1'));
            if (!dg1) {
                console.log("找不到 DG1 段");
                return null;
            }
            
            // 分割 DG1 段落為欄位
            const fields = dg1.split('|');
            
            // 返回診斷資訊
            return {
                setId: fields[1] || '',
                diagnosisCodingMethod: fields[2] || '',
                diagnosisCode: fields[3] || '',
                diagnosisDescription: fields[4] || '',
                diagnosisDateTime: fields[5] || '',
                diagnosisType: fields[6] || '',
                majorDiagnosisCategory: fields[7] || '',
                diagnosticRelatedGroup: fields[8] || '',
                drgApprovalIndicator: fields[9] || '',
                drgGrouperReviewCode: fields[10] || '',
                outlierType: fields[11] || '',
                outlierDays: fields[12] || '',
                outlierCost: fields[13] || '',
                grouperVersionAndType: fields[14] || '',
                diagnosisPriority: fields[15] || '',
                diagnosingClinician: fields[16] || '',
                diagnosisClassification: fields[17] || '',
                confidentialIndicator: fields[18] || '',
                attestationDateTime: fields[19] || '',
                diagnosisIdentifier: fields[20] || '',
                diagnosisActionCode: fields[21] || ''
            };
        } else if (message && typeof message.getSegment === 'function') {
            // 處理 hl7Msg 對象
            dg1 = message.getSegment("DG1");
            if (!dg1) {
                console.log("找不到 DG1 段");
                return null;
            }
            
            // 返回診斷資訊
            return {
                setId: dg1.fields[1]?.value || '',
                diagnosisCodingMethod: dg1.fields[2]?.value || '',
                diagnosisCode: dg1.fields[3]?.value || '',
                diagnosisDescription: dg1.fields[4]?.value || '',
                diagnosisDateTime: dg1.fields[5]?.value || '',
                diagnosisType: dg1.fields[6]?.value || '',
                majorDiagnosisCategory: dg1.fields[7]?.value || '',
                diagnosticRelatedGroup: dg1.fields[8]?.value || '',
                drgApprovalIndicator: dg1.fields[9]?.value || '',
                drgGrouperReviewCode: dg1.fields[10]?.value || '',
                outlierType: dg1.fields[11]?.value || '',
                outlierDays: dg1.fields[12]?.value || '',
                outlierCost: dg1.fields[13]?.value || '',
                grouperVersionAndType: dg1.fields[14]?.value || '',
                diagnosisPriority: dg1.fields[15]?.value || '',
                diagnosingClinician: dg1.fields[16]?.value || '',
                diagnosisClassification: dg1.fields[17]?.value || '',
                confidentialIndicator: dg1.fields[18]?.value || '',
                attestationDateTime: dg1.fields[19]?.value || '',
                diagnosisIdentifier: dg1.fields[20]?.value || '',
                diagnosisActionCode: dg1.fields[21]?.value || ''
            };
        } else {
            throw new Error('不支持的消息格式');
        }
    } catch (error) {
        console.error('解析 DG1 段落時發生錯誤:', error);
        return null;
    }
};

module.exports = parseDG1; 