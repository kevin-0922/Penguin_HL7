/**
 * 生成 DG1 段落 (Diagnosis)
 * @param {Object} data - 表單資料，包含 dg1 段落資料
 * @returns {string} - 生成的 DG1 段落
 */
export const generateDG1Segment = (data) => {
  // 確保 data.dg1 存在
  if (!data.dg1) {
    return 'DG1|1';
  }

  const dg1 = data.dg1;

  // 建立段落項目數組
  const dg1Fields = [
    'DG1',                              // 段落標識
    dg1.setId || '1',                   // DG1-1: 序號
    dg1.diagnosisCodingMethod || '',    // DG1-2: 診斷編碼方法
    dg1.diagnosisCode || '',            // DG1-3: 診斷代碼
    dg1.diagnosisDescription || '',     // DG1-4: 診斷描述
    dg1.diagnosisDateTime || '',        // DG1-5: 診斷日期時間
    dg1.diagnosisType || '',            // DG1-6: 診斷類型
    dg1.majorDiagnosisCategory || '',   // DG1-7: 主要診斷類別
    dg1.diagnosticRelatedGroup || '',   // DG1-8: 診斷相關群組
    dg1.drgApprovalIndicator || '',     // DG1-9: DRG批准指示器
    dg1.drgGrouperReviewCode || '',     // DG1-10: DRG分組審查代碼
    dg1.outlierType || '',              // DG1-11: 離群值類型
    dg1.outlierDays || '',              // DG1-12: 離群值天數
    dg1.outlierCost || '',              // DG1-13: 離群值成本
    dg1.grouperVersionAndType || '',    // DG1-14: 分組器版本和類型
    dg1.diagnosisPriority || '',        // DG1-15: 診斷優先級
    dg1.diagnosingClinician || '',      // DG1-16: 診斷醫師
    dg1.diagnosisClassification || '',  // DG1-17: 診斷分類
    dg1.confidentialIndicator || '',    // DG1-18: 保密指示器
    dg1.attestationDateTime || '',      // DG1-19: 認證日期時間
    dg1.diagnosisIdentifier || '',      // DG1-20: 診斷標識符
    dg1.diagnosisActionCode || ''       // DG1-21: 診斷操作代碼
  ];

  // 組合所有段落項目
  return dg1Fields.join('|');
}; 