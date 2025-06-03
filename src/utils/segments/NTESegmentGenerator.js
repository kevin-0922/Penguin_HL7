/**
 * NTE 段落生成器
 * 生成 HL7 訊息的 NTE 段落
 */
export const generateNTESegment = (formData) => {
  const nteData = formData.nte || {};
  
  const segments = [
    'NTE',                    // 段落標識符
    nteData.setID || '',      // NTE-1: 設置 ID
    nteData.sourceOfComment || '', // NTE-2: 註釋來源
    nteData.comment || '',    // NTE-3: 註釋
    nteData.commentType || '' // NTE-4: 註釋類型
  ];

  return segments.join('|');
}; 