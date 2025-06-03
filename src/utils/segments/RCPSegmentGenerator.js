/**
 * RCP 段落生成器
 * 生成 HL7 訊息的 RCP 段落
 */
export const generateRCPSegment = (formData) => {
  const rcpData = formData.rcp || {};
  
  const segments = [
    'RCP',                                    // Segment Identifier
    rcpData.queryPriority || '',              // RCP-1: Query Priority
    rcpData.quantityLimitedRequest || '',     // RCP-2: Quantity Limited Request
    rcpData.responseModality || '',           // RCP-3: Response Modality
    rcpData.executionAndDeliveryTime || '',   // RCP-4: Execution and Delivery Time
    rcpData.modifyIndicator || '',            // RCP-5: Modify Indicator
    rcpData.sortByComponent || '',            // RCP-6: Sort By Component
    rcpData.segmentGroupInclusion || ''       // RCP-7: Segment Group Inclusion
  ];

  return segments.join('|');
}; 