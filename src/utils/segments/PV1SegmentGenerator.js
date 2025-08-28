/**
 * 生成 PV1 段落 (Patient Visit)
 * @param {Object} data - 表單資料，包含 pv1 段落資料
 * @returns {string} - 生成的 PV1 段落
 */
export const generatePV1Segment = (data) => {
  // 確保 data.pv1 存在
  if (!data.pv1) {
    return 'PV1|1';
  }

  const pv1 = data.pv1;

  // 建立段落項目數組
  const pv1Fields = [
    'PV1',                              // 段落標識
    pv1.setId || '1',                   // PV1-1: 序號
    pv1.patientClass || '',             // PV1-2: 病患類別
    pv1.assignedPatientLocation || '',  // PV1-3: 指定病患位置
    pv1.admissionType || '',            // PV1-4: 入院類型
    pv1.preadmitNumber || '',           // PV1-5: 預先入院號碼
    pv1.priorPatientLocation || '',     // PV1-6: 先前病患位置
    pv1.attendingDoctor || '',          // PV1-7: 主治醫師
    pv1.referringDoctor || '',          // PV1-8: 轉診醫師
    pv1.consultingDoctor || '',         // PV1-9: 會診醫師
    pv1.hospitalService || '',          // PV1-10: 醫院服務
    pv1.temporaryLocation || '',        // PV1-11: 臨時位置
    pv1.preadmitTestIndicator || '',    // PV1-12: 預先入院測試指示器
    pv1.readmissionIndicator || '',     // PV1-13: 再入院指示器
    pv1.admitSource || '',              // PV1-14: 入院來源
    pv1.ambulatoryStatus || '',         // PV1-15: 門診狀態
    pv1.vipIndicator || '',             // PV1-16: VIP指示器
    pv1.admittingDoctor || '',          // PV1-17: 接收醫師
    pv1.patientType || '',              // PV1-18: 病患類型
    pv1.visitNumber || '',              // PV1-19: 訪視號碼
    pv1.financialClass || '',           // PV1-20: 財務類別
    pv1.chargePriceIndicator || '',     // PV1-21: 收費價格指示器
    pv1.courtesyCode || '',             // PV1-22: 優惠代碼
    pv1.creditRating || '',             // PV1-23: 信用評級
    pv1.contractCode || '',             // PV1-24: 合約代碼
    pv1.contractEffectiveDate || '',    // PV1-25: 合約生效日期
    pv1.contractAmount || '',           // PV1-26: 合約金額
    pv1.contractPeriod || '',           // PV1-27: 合約期間
    pv1.interestCode || '',             // PV1-28: 利息代碼
    pv1.transferToBadDebtCode || '',    // PV1-29: 轉為壞賬代碼
    pv1.transferToBadDebtDate || '',    // PV1-30: 轉為壞賬日期
    pv1.badDebtAgencyCode || '',        // PV1-31: 壞賬機構代碼
    pv1.badDebtTransferAmount || '',    // PV1-32: 壞賬轉移金額
    pv1.badDebtRecoveryAmount || '',    // PV1-33: 壞賬恢復金額
    pv1.deleteAccountIndicator || '',   // PV1-34: 刪除帳戶指示器
    pv1.deleteAccountDate || '',        // PV1-35: 刪除帳戶日期
    pv1.dischargeDisposition || '',     // PV1-36: 出院處置
    pv1.dischargedToLocation || '',     // PV1-37: 出院至位置
    pv1.dietType || '',                 // PV1-38: 飲食類型
    pv1.servicingFacility || '',        // PV1-39: 服務設施
    pv1.bedStatus || '',                // PV1-40: 床位狀態
    pv1.accountStatus || '',            // PV1-41: 帳戶狀態
    pv1.pendingLocation || '',          // PV1-42: 待定位置
    pv1.priorTemporaryLocation || '',   // PV1-43: 先前臨時位置
    pv1.admitDateTime || '',            // PV1-44: 入院日期時間
    pv1.dischargeDateTime || '',        // PV1-45: 出院日期時間
    pv1.currentPatientBalance || '',        // PV1-46: 病患狀態代碼
    pv1.totalCharges || '',    // PV1-47: 病患狀態代碼日期
    pv1.totalAdjustments || '',    // PV1-48: 病患狀態代碼時間
    pv1.totalPayments || '',  // PV1-49: 病患狀態代碼原因
    pv1.alternateVisitId || '', // PV1-50: 病患狀態代碼原因代碼
    pv1.visitIndicator || '', // PV1-51: 病患狀態代碼原因代碼
    pv1.otherHealthcareProvider || '', // PV1-52: 病患狀態代碼原因代碼
  ];

  // 組合所有段落項目
  return pv1Fields.join('|');
}; 