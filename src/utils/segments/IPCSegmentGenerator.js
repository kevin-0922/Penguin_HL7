/**
 * 生成 IPC 段落 (Insurance Plan Certificate)
 * @param {Object} data - 表單資料，包含 ipc 段落資料
 * @returns {string} - 生成的 IPC 段落
 */
export const generateIPCSegment = (data) => {
  // 確保 data.ipc 存在
  if (!data.ipc) {
    return 'IPC|1';
  }

  const ipc = data.ipc;

  // 建立段落項目數組
  const ipcFields = [
    'IPC',                              // 段落標識
    ipc.setId || '1',                   // IPC-1: 序號
    ipc.accessKey || '',                // IPC-2: 存取金鑰
    ipc.insurancePlanId || '',          // IPC-3: 保險計劃 ID
    ipc.insuranceCompany || '',         // IPC-4: 保險公司
    ipc.insuranceCompanyAddress || '',  // IPC-5: 保險公司地址
    ipc.insuranceCompanyContactPerson || '', // IPC-6: 保險公司聯絡人
    ipc.insuranceCompanyPhoneNumber || '', // IPC-7: 保險公司電話號碼
    ipc.groupNumber || '',              // IPC-8: 群組號碼
    ipc.groupName || '',                // IPC-9: 群組名稱
    ipc.insuredGroupEmployerName || '', // IPC-10: 被保險人群組/雇主名稱
    ipc.insuredGroupEmployerAddress || '', // IPC-11: 被保險人群組/雇主地址
    ipc.planEffectiveDate || '',        // IPC-12: 計劃生效日期
    ipc.planExpirationDate || '',       // IPC-13: 計劃到期日期
    ipc.authorizationInformation || '', // IPC-14: 授權資訊
    ipc.planType || '',                 // IPC-15: 計劃類型
    ipc.nameOfInsured || '',            // IPC-16: 被保險人姓名
    ipc.insuredRelationshipToPatient || '', // IPC-17: 被保險人與病人關係
    ipc.insuredDateOfBirth || '',       // IPC-18: 被保險人出生日期
    ipc.insuredAddress || '',           // IPC-19: 被保險人地址
    ipc.assignmentOfBenefits || '',     // IPC-20: 權益轉讓
    ipc.coordinationOfBenefits || '',   // IPC-21: 權益協調
    ipc.coordinationOfBenefitsPriority || '', // IPC-22: 權益協調優先順序
    ipc.noticeOfAdmissionFlag || '',    // IPC-23: 入院通知標誌
    ipc.noticeOfAdmissionDate || '',    // IPC-24: 入院通知日期
    ipc.reportOfEligibilityFlag || '',  // IPC-25: 資格報告標誌
    ipc.reportOfEligibilityDate || '',  // IPC-26: 資格報告日期
    ipc.releaseInformationCode || '',   // IPC-27: 資訊釋出代碼
    ipc.preAdmissionCertFlag || '',     // IPC-28: 預先入院認證標誌
    ipc.preAdmissionCertDate || '',     // IPC-29: 預先入院認證日期
    ipc.verificationDateTime || '',     // IPC-30: 驗證日期時間
    ipc.verificationBy || '',           // IPC-31: 驗證人
    ipc.typeOfAgreementCode || '',      // IPC-32: 協議類型代碼
    ipc.billType || '',                 // IPC-33: 帳單類型
    ipc.billingAccount || '',           // IPC-34: 帳單帳戶
    ipc.specialtyCode || '',            // IPC-35: 專業代碼
    ipc.insuranceTypeCode || '',        // IPC-36: 保險類型代碼
    ipc.billingStatus || '',            // IPC-37: 帳單狀態
    ipc.lifetimeReserveDays || '',      // IPC-38: 終身預留天數
    ipc.delayBeforeLRDay || '',         // IPC-39: 延遲前的生命保留天數
    ipc.companyPlanCode || '',          // IPC-40: 公司計劃代碼
    ipc.policyNumber || '',             // IPC-41: 保單號碼
    ipc.policyDeductible || '',         // IPC-42: 保單自付額
    ipc.policyCopay || '',              // IPC-43: 保單共付額
    ipc.policyLimit || '',              // IPC-44: 保單限額
    ipc.policyOutOfPocket || '',        // IPC-45: 保單自付上限
    ipc.policyLifeTime || '',           // IPC-46: 保單終身
    ipc.policyIcd9Code || '',           // IPC-47: 保單 ICD9 代碼
    ipc.policyIcd10Code || '',          // IPC-48: 保單 ICD10 代碼
    ipc.policyCpt4Code || '',           // IPC-49: 保單 CPT4 代碼
    ipc.policyHcpcsCode || ''           // IPC-50: 保單 HCPCS 代碼
  ];

  // 組合所有段落項目
  return ipcFields.join('|');
}; 