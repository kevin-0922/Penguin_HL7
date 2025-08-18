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
            
            // 返回檢查資訊 - 擴展更多欄位
            return {
                setId: fields[1] || '',
                placerOrderNumber: fields[2] || '',
                fillerOrderNumber: fields[3] || '',
                universalServiceId: fields[4] || '',
                priority: fields[5] || '',
                requestedDateTime: fields[6] || '',
                observationDateTime: fields[7] || '',
                observationEndDateTime: fields[8] || '',
                collectionVolume: fields[9] || '',
                collectorIdentifier: fields[10] || '',
                specimenActionCode: fields[11] || '',
                dangerCode: fields[12] || '',
                relevantClinicalInfo: fields[13] || '',
                specimenReceivedDateTime: fields[14] || '',
                specimenSource: fields[15] || '',
                orderingProvider: fields[16] || '',
                orderCallbackPhoneNumber: fields[17] || '',
                placerField1: fields[18] || '',
                placerField2: fields[19] || '',
                fillerField1: fields[20] || '',
                fillerField2: fields[21] || '',
                resultsRptStatusChngDateTime: fields[22] || '',
                chargeToPractice: fields[23] || '',
                diagnosticServSectId: fields[24] || '',
                resultStatus: fields[25] || '',
                parentResult: fields[26] || '',
                quantityTiming: fields[27] || '',
                resultCopiesTo: fields[28] || '',
                parent: fields[29] || '',
                transportationMode: fields[30] || '',
                reasonForStudy: fields[31] || '',
                principalResultInterpreter: fields[32] || '',
                assistantResultInterpreter: fields[33] || '',
                technician: fields[34] || '',
                transcriptionist: fields[35] || '',
                scheduledDateTime: fields[36] || '',
                numberOfSampleContainers: fields[37] || '',
                transportLogisticsOfCollectedSample: fields[38] || '',
                collectorsComment: fields[39] || '',
                transportArrangementResponsibility: fields[40] || '',
                transportArranged: fields[41] || '',
                escort: fields[42] || '',
                plannedPatientTransportComment: fields[43] || '',
                procedureCode: fields[44] || '',
                procedureCodeModifier: fields[45] || '',
                placerSupplementalServiceInformation: fields[46] || '',
                fillerSupplementalServiceInformation: fields[47] || '',
                medicallyNecessaryDuplicateProcedureReason: fields[48] || '',
                resultHandling: fields[49] || '',
                parentUniversalServiceIdentifier: fields[50] || ''
            };
        } else if (message && typeof message.getSegment === 'function') {
            // 處理 hl7Msg 對象
            obr = message.getSegment("OBR");
            if (!obr) {
                console.log("找不到 OBR 段");
                return null;
            }
            
            // 返回檢查資訊 - 擴展更多欄位
            return {
                setId: obr.fields[1]?.value || '',
                placerOrderNumber: obr.fields[2]?.value || '',
                fillerOrderNumber: obr.fields[3]?.value || '',
                universalServiceId: obr.fields[4]?.value || '',
                priority: obr.fields[5]?.value || '',
                requestedDateTime: obr.fields[6]?.value || '',
                observationDateTime: obr.fields[7]?.value || '',
                observationEndDateTime: obr.fields[8]?.value || '',
                collectionVolume: obr.fields[9]?.value || '',
                collectorIdentifier: obr.fields[10]?.value || '',
                specimenActionCode: obr.fields[11]?.value || '',
                dangerCode: obr.fields[12]?.value || '',
                relevantClinicalInfo: obr.fields[13]?.value || '',
                specimenReceivedDateTime: obr.fields[14]?.value || '',
                specimenSource: obr.fields[15]?.value || '',
                orderingProvider: obr.fields[16]?.value || '',
                orderCallbackPhoneNumber: obr.fields[17]?.value || '',
                placerField1: obr.fields[18]?.value || '',
                placerField2: obr.fields[19]?.value || '',
                fillerField1: obr.fields[20]?.value || '',
                fillerField2: obr.fields[21]?.value || '',
                resultsRptStatusChngDateTime: obr.fields[22]?.value || '',
                chargeToPractice: obr.fields[23]?.value || '',
                diagnosticServSectId: obr.fields[24]?.value || '',
                resultStatus: obr.fields[25]?.value || '',
                parentResult: obr.fields[26]?.value || '',
                quantityTiming: obr.fields[27]?.value || '',
                resultCopiesTo: obr.fields[28]?.value || '',
                parent: obr.fields[29]?.value || '',
                transportationMode: obr.fields[30]?.value || '',
                reasonForStudy: obr.fields[31]?.value || '',
                principalResultInterpreter: obr.fields[32]?.value || '',
                assistantResultInterpreter: obr.fields[33]?.value || '',
                technician: obr.fields[34]?.value || '',
                transcriptionist: obr.fields[35]?.value || '',
                scheduledDateTime: obr.fields[36]?.value || '',
                numberOfSampleContainers: obr.fields[37]?.value || '',
                transportLogisticsOfCollectedSample: obr.fields[38]?.value || '',
                collectorsComment: obr.fields[39]?.value || '',
                transportArrangementResponsibility: obr.fields[40]?.value || '',
                transportArranged: obr.fields[41]?.value || '',
                escort: obr.fields[42]?.value || '',
                plannedPatientTransportComment: obr.fields[43]?.value || '',
                procedureCode: obr.fields[44]?.value || '',
                procedureCodeModifier: obr.fields[45]?.value || '',
                placerSupplementalServiceInformation: obr.fields[46]?.value || '',
                fillerSupplementalServiceInformation: obr.fields[47]?.value || '',
                medicallyNecessaryDuplicateProcedureReason: obr.fields[48]?.value || '',
                resultHandling: obr.fields[49]?.value || '',
                parentUniversalServiceIdentifier: obr.fields[50]?.value || ''
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
