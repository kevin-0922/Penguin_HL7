import { getHL7Timestamp } from '../hl7Utils';

/**
 * MSH 段落生成器
 * 生成 HL7 訊息的 MSH 段落
 */
export const generateMSHSegment = (formData) => {
  const mshData = formData.msh || {};
  
  const segments = [
    'MSH',                                    // MSH-1: Segment ID (固定)
    '^~\&',                                  // MSH-2: Field Separator (固定)
    mshData.sendingApplication || '',         // MSH-3: Sending Application
    mshData.sendingFacility || '',            // MSH-4: Sending Facility
    mshData.receivingApplication || '',       // MSH-5: Receiving Application
    mshData.receivingFacility || '',          // MSH-6: Receiving Facility
    getHL7Timestamp(),                        // MSH-7: Message Date/Time (固定)
    mshData.security || '',                   // MSH-8: Security
    mshData.messageType || '',                // MSH-9: Message Type (固定)
    mshData.messageControlId || '',           // MSH-10: Message Control ID
    mshData.processingId || '',               // MSH-11: Processing ID
    '2.5.1',                                 // MSH-12: Version ID (固定)
    mshData.sequenceNumber || '',             // MSH-13: Sequence Number
    mshData.continuationPointer || '',        // MSH-14: Continuation Pointer
    mshData.acceptAckType || '',              // MSH-15: Accept Acknowledgment Type
    mshData.applicationAckType || '',         // MSH-16: Application Acknowledgment Type
    'TW',                                    // MSH-17: Country Code (固定)
    'UTF-8',                                 // MSH-18: Character Set (固定)
    'zh-TW',                                // MSH-19: Principal Language (固定)
    'UTF-8',                                // MSH-20: Alternate Character Set (固定)
    'LAB-81^IHE'                         // MSH-21: Message Profile Identifier (固定)
  ];

  return segments.join('|');
}; 