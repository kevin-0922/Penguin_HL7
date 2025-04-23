import { BaseSegmentGenerator } from '../base/BaseSegmentGenerator';

/**
 * RCP 段落生成器
 * 生成 HL7 訊息的 RCP 段落
 */
export class RCPSegmentGenerator extends BaseSegmentGenerator {
  /**
   * 生成 RCP 段落
   * @param {Object} formData - 表單數據
   * @returns {string} - 生成的 RCP 段落
   */
  generate(formData) {
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
  }
} 