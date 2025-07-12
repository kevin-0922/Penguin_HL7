import { generateMSHSegment } from '../segments/MSHSegmentGenerator';
import { generatePIDSegment } from '../segments/PIDSegmentGenerator';
import { generatePV1Segment } from '../segments/PV1SegmentGenerator';
import { generateDG1Segment } from '../segments/DG1SegmentGenerator';
import { generateORCSegment } from '../segments/ORCSegmentGenerator';
import { generateOBRSegment } from '../segments/OBRSegmentGenerator';
import { generateIPCSegment } from '../segments/IPCSegmentGenerator';
import { generateNTESegment } from '../segments/NTESegmentGenerator';

/**
 * 生成 O01 訊息
 * @param {Object} formData - 表單數據
 * @returns {string} - 生成的 HL7 訊息
 */
export const generateO01Message = (formData) => {
  const segments = [];
  
  // 按照 HL7 ORM^O01 訊息格式順序生成段落
  segments.push(generateMSHSegment(formData));
  segments.push(generatePIDSegment(formData));
  segments.push(generatePV1Segment(formData));
  segments.push(generateDG1Segment(formData));
  // 添加訂單段落
  segments.push(generateORCSegment(formData));
  segments.push(generateOBRSegment(formData));
  segments.push(generateIPCSegment(formData));
  
  // 添加註釋段落 (如果有)
  if (formData.nte && formData.nte.comment) {
    segments.push(generateNTESegment(formData));
  }
  
  return segments.join('\r');
}; 





