const parsePV1 = (message) => {
    try {
        let pv1;
        
        // 檢查消息類型
        if (typeof message === 'string') {
            // 處理字符串消息
            const segments = message.split(/\r\n|\r|\n/);
            pv1 = segments.find(seg => seg.startsWith('PV1'));
            if (!pv1) {
                console.log("找不到 PV1 段");
                return null;
            }
            
            // 分割 PV1 段落為欄位
            const fields = pv1.split('|');
            
            // 返回患者訪問資訊
            return {
                setId: fields[1] || '',
                patientClass: fields[2] || '',
                assignedPatientLocation: fields[3] || '',
                admissionType: fields[4] || '',
                preadmitNumber: fields[5] || '',
                priorPatientLocation: fields[6] || '',
                attendingDoctor: fields[7] || '',
                referringDoctor: fields[8] || '',
                consultingDoctor: fields[9] || '',
                hospitalService: fields[10] || '',
                temporaryLocation: fields[11] || '',
                preadmitTestIndicator: fields[12] || '',
                readmissionIndicator: fields[13] || '',
                admitSource: fields[14] || '',
                ambulatoryStatus: fields[15] || '',
                vipIndicator: fields[16] || '',
                admittingDoctor: fields[17] || '',
                patientType: fields[18] || '',
                visitNumber: fields[19] || '',
                financialClass: fields[20] || '',
                chargePriceIndicator: fields[21] || '',
                courtesyCode: fields[22] || '',
                creditRating: fields[23] || '',
                contractCode: fields[24] || '',
                contractEffectiveDate: fields[25] || '',
                contractAmount: fields[26] || '',
                contractPeriod: fields[27] || '',
                interestCode: fields[28] || '',
                transferToBadDebtCode: fields[29] || '',
                transferToBadDebtDate: fields[30] || '',
                badDebtAgencyCode: fields[31] || '',
                badDebtTransferAmount: fields[32] || '',
                badDebtRecoveryAmount: fields[33] || '',
                deleteAccountIndicator: fields[34] || '',
                deleteAccountDate: fields[35] || '',
                dischargeDisposition: fields[36] || '',
                dischargedToLocation: fields[37] || '',
                dietType: fields[38] || '',
                servicingFacility: fields[39] || '',
                bedStatus: fields[40] || '',
                accountStatus: fields[41] || '',
                pendingLocation: fields[42] || '',
                priorTemporaryLocation: fields[43] || '',
                admitDateTime: fields[44] || '',
                dischargeDateTime: fields[45] || '',
                patientStatusCode: fields[46] || '',
                patientStatusCodeDate: fields[47] || '',
                patientStatusCodeTime: fields[48] || '',
                patientStatusCodeReason: fields[49] || '',
                patientStatusCodeReasonCode: fields[50] || ''
            };
        } else if (message && typeof message.getSegment === 'function') {
            // 處理 hl7Msg 對象
            pv1 = message.getSegment("PV1");
            if (!pv1) {
                console.log("找不到 PV1 段");
                return null;
            }
            
            // 返回患者訪問資訊
            return {
                setId: pv1.fields[1]?.value || '',
                patientClass: pv1.fields[2]?.value || '',
                assignedPatientLocation: pv1.fields[3]?.value || '',
                admissionType: pv1.fields[4]?.value || '',
                preadmitNumber: pv1.fields[5]?.value || '',
                priorPatientLocation: pv1.fields[6]?.value || '',
                attendingDoctor: pv1.fields[7]?.value || '',
                referringDoctor: pv1.fields[8]?.value || '',
                consultingDoctor: pv1.fields[9]?.value || '',
                hospitalService: pv1.fields[10]?.value || '',
                temporaryLocation: pv1.fields[11]?.value || '',
                preadmitTestIndicator: pv1.fields[12]?.value || '',
                readmissionIndicator: pv1.fields[13]?.value || '',
                admitSource: pv1.fields[14]?.value || '',
                ambulatoryStatus: pv1.fields[15]?.value || '',
                vipIndicator: pv1.fields[16]?.value || '',
                admittingDoctor: pv1.fields[17]?.value || '',
                patientType: pv1.fields[18]?.value || '',
                visitNumber: pv1.fields[19]?.value || '',
                financialClass: pv1.fields[20]?.value || '',
                chargePriceIndicator: pv1.fields[21]?.value || '',
                courtesyCode: pv1.fields[22]?.value || '',
                creditRating: pv1.fields[23]?.value || '',
                contractCode: pv1.fields[24]?.value || '',
                contractEffectiveDate: pv1.fields[25]?.value || '',
                contractAmount: pv1.fields[26]?.value || '',
                contractPeriod: pv1.fields[27]?.value || '',
                interestCode: pv1.fields[28]?.value || '',
                transferToBadDebtCode: pv1.fields[29]?.value || '',
                transferToBadDebtDate: pv1.fields[30]?.value || '',
                badDebtAgencyCode: pv1.fields[31]?.value || '',
                badDebtTransferAmount: pv1.fields[32]?.value || '',
                badDebtRecoveryAmount: pv1.fields[33]?.value || '',
                deleteAccountIndicator: pv1.fields[34]?.value || '',
                deleteAccountDate: pv1.fields[35]?.value || '',
                dischargeDisposition: pv1.fields[36]?.value || '',
                dischargedToLocation: pv1.fields[37]?.value || '',
                dietType: pv1.fields[38]?.value || '',
                servicingFacility: pv1.fields[39]?.value || '',
                bedStatus: pv1.fields[40]?.value || '',
                accountStatus: pv1.fields[41]?.value || '',
                pendingLocation: pv1.fields[42]?.value || '',
                priorTemporaryLocation: pv1.fields[43]?.value || '',
                admitDateTime: pv1.fields[44]?.value || '',
                dischargeDateTime: pv1.fields[45]?.value || '',
                patientStatusCode: pv1.fields[46]?.value || '',
                patientStatusCodeDate: pv1.fields[47]?.value || '',
                patientStatusCodeTime: pv1.fields[48]?.value || '',
                patientStatusCodeReason: pv1.fields[49]?.value || '',
                patientStatusCodeReasonCode: pv1.fields[50]?.value || ''
            };
        } else {
            throw new Error('不支持的消息格式');
        }
    } catch (error) {
        console.error('解析 PV1 段落時發生錯誤:', error);
        return null;
    }
};

module.exports = parsePV1; 