import { BaseSegmentGenerator } from '../base/BaseSegmentGenerator';
import { convertToHL7Date } from '../hl7Utils';

/**
 * PID 段落生成器
 * 生成 HL7 訊息的 PID 段落
 */
export class PIDSegmentGenerator extends BaseSegmentGenerator {
  /**
   * 生成 PID 段落
   * @param {Object} formData - 表單數據
   * @returns {string} - 生成的 PID 段落
   */
  generate(formData) {
    const pidData = formData.pid || {};
    
    // 轉換日期時間欄位為 HL7 格式
    const birthDateTime = convertToHL7Date(pidData.birthDateTime, true);
    const patientDeathDateTime = convertToHL7Date(pidData.patientDeathDateTime, true);
    const lastUpdateDateTime = convertToHL7Date(pidData.lastUpdateDateTime, true);
    
    // 獲取所有欄位，任何未定義的欄位設置為空字符串
    const segments = [
      'PID',                                    // Segment Identifier
      pidData.setId || '1',                     // PID-1: Set ID
      pidData.patientId || '',                  // PID-2: Patient ID
      pidData.patientIdList || '',              // PID-3: Patient ID List
      pidData.alternatePatientId || '',         // PID-4: Alternate Patient ID
      pidData.patientName || '',                // PID-5: Patient Name
      pidData.motherMaidenName || '',           // PID-6: Mother's Maiden Name
      birthDateTime || '',                      // PID-7: Date/Time of Birth
      pidData.sex || '',                        // PID-8: Sex
      pidData.alias || '',                      // PID-9: Patient Alias
      pidData.race || '',                       // PID-10: Race
      pidData.patientAddress || '',             // PID-11: Patient Address
      pidData.countryCode || '',                // PID-12: County Code
      pidData.phoneNumberHome || '',            // PID-13: Phone Number - Home
      pidData.phoneNumberBusiness || '',        // PID-14: Phone Number - Business
      pidData.primaryLanguage || '',            // PID-15: Primary Language
      pidData.maritalStatus || '',              // PID-16: Marital Status
      pidData.religion || '',                   // PID-17: Religion
      pidData.accountNumber || '',              // PID-18: Patient Account Number
      pidData.ssnNumber || '',                  // PID-19: SSN Number
      pidData.driversLicense || '',             // PID-20: Driver's License Number
      pidData.mothersIdentifier || '',          // PID-21: Mother's Identifier
      pidData.ethnicGroup || '',                // PID-22: Ethnic Group
      pidData.birthPlace || '',                 // PID-23: Birth Place
      pidData.multipleBirthIndicator || '',     // PID-24: Multiple Birth Indicator
      pidData.birthOrder || '',                 // PID-25: Birth Order
      pidData.citizenship || '',                // PID-26: Citizenship
      pidData.veteransMilitaryStatus || '',     // PID-27: Veterans Military Status
      pidData.nationality || '',                // PID-28: Nationality
      patientDeathDateTime || '',               // PID-29: Patient Death Date and Time
      pidData.patientDeathIndicator || '',      // PID-30: Patient Death Indicator
      pidData.identityUnknownIndicator || '',   // PID-31: Identity Unknown Indicator
      pidData.identityReliabilityCode || '',    // PID-32: Identity Reliability Code
      lastUpdateDateTime || '',                 // PID-33: Last Update Date/Time
      pidData.lastUpdateFacility || '',         // PID-34: Last Update Facility
      pidData.speciesCode || '',                // PID-35: Species Code
      pidData.breedCode || '',                  // PID-36: Breed Code
      pidData.strain || '',                     // PID-37: Strain
      pidData.productionClassCode || '',        // PID-38: Production Class Code
      pidData.tribalCitizenship || ''           // PID-39: Tribal Citizenship
    ];

    return segments.join('|');
  }
} 