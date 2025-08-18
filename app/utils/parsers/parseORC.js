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
            
            // 返回訂單資訊 - 擴展更多欄位
            return {
                orderControl: fields[1] || '',
                placerOrderNumber: fields[2] || '',
                fillerOrderNumber: fields[3] || '',
                placerGroupNumber: fields[4] || '',
                orderStatus: fields[5] || '',
                responseFlag: fields[6] || '',
                quantityTiming: fields[7] || '',
                parent: fields[8] || '',
                dateTimeOfTransaction: fields[9] || '',
                enteredBy: fields[10] || '',
                verifiedBy: fields[11] || '',
                orderingProvider: fields[12] || '',
                enterersLocation: fields[13] || '',
                callBackPhoneNumber: fields[14] || '',
                orderEffectiveDateTime: fields[15] || '',
                orderControlCodeReason: fields[16] || '',
                enteringOrganization: fields[17] || '',
                enteringDevice: fields[18] || '',
                actionBy: fields[19] || '',
                advancedBeneficiaryNoticeCode: fields[20] || '',
                orderingFacilityName: fields[21] || '',
                orderingFacilityAddress: fields[22] || '',
                orderingFacilityPhoneNumber: fields[23] || '',
                orderingProviderAddress: fields[24] || '',
                orderStatusModifier: fields[25] || '',
                advancedBeneficiaryNoticeOverrideReason: fields[26] || '',
                fillersExpectedAvailabilityDateTime: fields[27] || '',
                confidentialityCode: fields[28] || '',
                orderType: fields[29] || '',
                entererAuthorizationMode: fields[30] || '',
                parentUniversalServiceIdentifier: fields[31] || ''
            };
        } else if (message && typeof message.getSegment === 'function') {
            // 處理 hl7Msg 對象
            orc = message.getSegment("ORC");
            if (!orc) {
                console.log("找不到 ORC 段");
                return null;
            }
            
            // 返回訂單資訊 - 擴展更多欄位
            return {
                orderControl: orc.fields[1]?.value || '',
                placerOrderNumber: orc.fields[2]?.value || '',
                fillerOrderNumber: orc.fields[3]?.value || '',
                placerGroupNumber: orc.fields[4]?.value || '',
                orderStatus: orc.fields[5]?.value || '',
                responseFlag: orc.fields[6]?.value || '',
                quantityTiming: orc.fields[7]?.value || '',
                parent: orc.fields[8]?.value || '',
                dateTimeOfTransaction: orc.fields[9]?.value || '',
                enteredBy: orc.fields[10]?.value || '',
                verifiedBy: orc.fields[11]?.value || '',
                orderingProvider: orc.fields[12]?.value || '',
                enterersLocation: orc.fields[13]?.value || '',
                callBackPhoneNumber: orc.fields[14]?.value || '',
                orderEffectiveDateTime: orc.fields[15]?.value || '',
                orderControlCodeReason: orc.fields[16]?.value || '',
                enteringOrganization: orc.fields[17]?.value || '',
                enteringDevice: orc.fields[18]?.value || '',
                actionBy: orc.fields[19]?.value || '',
                advancedBeneficiaryNoticeCode: orc.fields[20]?.value || '',
                orderingFacilityName: orc.fields[21]?.value || '',
                orderingFacilityAddress: orc.fields[22]?.value || '',
                orderingFacilityPhoneNumber: orc.fields[23]?.value || '',
                orderingProviderAddress: orc.fields[24]?.value || '',
                orderStatusModifier: orc.fields[25]?.value || '',
                advancedBeneficiaryNoticeOverrideReason: orc.fields[26]?.value || '',
                fillersExpectedAvailabilityDateTime: orc.fields[27]?.value || '',
                confidentialityCode: orc.fields[28]?.value || '',
                orderType: orc.fields[29]?.value || '',
                entererAuthorizationMode: orc.fields[30]?.value || '',
                parentUniversalServiceIdentifier: orc.fields[31]?.value || ''
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
