/**
 * 生成 TQ1 段落 (時間/數量)
 * @param {Object} formData - 表單數據
 * @param {string} messageType - 訊息類型 (O19, O33 等)
 * @returns {string} - 生成的 TQ1 段落
 */
export const generateTQ1Segment = (formData, messageType = 'O19') => {
  // 修改這行以正確訪問 tq1 數據
  const tq1Data = formData.tq1 || {};
  
  // 將日期時間格式轉換為 HL7 格式 (YYYYMMDDHHMMSS)
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toISOString()
      .replace(/[-:T.Z]/g, '')  // 移除 ISO 格式中的特殊字符
      .slice(0, 14);            // 只保留到秒
  };

  // 構建 TQ1 段落
  const fields = [
    'TQ1',                           // TQ1-0: 段落標識符
    tq1Data.setId || '1',            // TQ1-1: 序號
    tq1Data.quantity || '',          // TQ1-2: 數量
    tq1Data.repeatPattern || '',     // TQ1-3: 重複模式
    tq1Data.explicitTime || '',      // TQ1-4: 明確時間
    tq1Data.relativeTimeUnits || '', // TQ1-5: 相對時間與單位
    tq1Data.serviceDuration || '',   // TQ1-6: 服務持續時間
    formatDateTime(tq1Data.startDateTime) || '', // TQ1-7: 開始日期/時間
    formatDateTime(tq1Data.endDateTime) || '',   // TQ1-8: 結束日期/時間
    tq1Data.priority || '',          // TQ1-9: 優先順序
    tq1Data.conditionText || '',     // TQ1-10: 條件文本
    tq1Data.textInstruction || '',   // TQ1-11: 文本指示
    tq1Data.conjunction || '',       // TQ1-12: 連接詞
    tq1Data.occurrenceDuration || '', // TQ1-13: 發生持續時間
    tq1Data.totalOccurrences || ''   // TQ1-14: 總發生次數
  ];
  
  // 移除尾部的空字段，但保留中間的空字段
  let lastNonEmptyIndex = fields.length - 1;
  while (lastNonEmptyIndex > 0 && fields[lastNonEmptyIndex] === '') {
    lastNonEmptyIndex--;
  }
  
  return fields.slice(0, lastNonEmptyIndex + 1).join('|');
}; 