import { generateMSHSegment } from "../segments/MSHSegmentGenerator";
import { generatePIDSegment } from "../segments/PIDSegmentGenerator";
import { generateSPMSegment } from "../segments/SPMSegmentGenerator";
import { generateSACSegment } from "../segments/SACSegmentGenerator";
import { generateNTESegment } from "../segments/NTESegmentGenerator";
import { generateORCSegment } from "../segments/ORCSegmentGenerator";
import { generateOBRSegment } from "../segments/OBRSegmentGenerator";
import { generateOBXSegment } from "../segments/OBXSegmentGenerator";

/**
 * 生成 O33 訊息
 * @param {Object} formData - 表單數據
 * @returns {string} - 生成的 HL7 訊息
 */
export const generateO33Message = (formData) => {
  const segments = [];

  // 按照 HL7 訊息格式順序生成段落
  segments.push(generateMSHSegment(formData));
  segments.push(generatePIDSegment(formData));
  segments.push(generateSPMSegment(formData));
  segments.push(generateSACSegment(formData));
  // 添加訂單和觀察段落
  segments.push(generateORCSegment(formData));
  segments.push(generateOBRSegment(formData));
  segments.push(generateOBXSegment(formData));

  return segments.join("\r");
};
