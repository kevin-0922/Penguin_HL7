class DicomMappingService {
    constructor() {
      console.log('初始化DICOM映射服務...');
    }
    getParsedFieldValue(parsedSegment, fieldIndex, componentIndex = 0, subcomponentIndex = 0) {
      if (!parsedSegment || !Array.isArray(parsedSegment)) return '';
      const fieldEntry = parsedSegment.find(f => f.field === fieldIndex);
      if (!fieldEntry || !fieldEntry.components || !Array.isArray(fieldEntry.components)) return '';
      const component = fieldEntry.components[componentIndex];
      if (!component || !Array.isArray(component)) return '';
      return component[subcomponentIndex] !== undefined ? component[subcomponentIndex].toString() : '';
    }
  
    //MSH 和 MSA 
    getMshOrMsaValue(parsedSegment, fieldIndex, componentIndex = 0, subcomponentIndex = 0) {
      if (!parsedSegment || !parsedSegment.fields) return '';
      const field = parsedSegment.fields[fieldIndex - 1]; 
      if (!field || !field.value || !Array.isArray(field.value)) return '';
      const component = field.value[componentIndex];
      if (!component || !Array.isArray(component)) return '';
      return component[subcomponentIndex] !== undefined ? component[subcomponentIndex].toString() : '';
    }
  

    //解析K11
    mapHl7ToDicom(parsedK11) {
      const dicomResult = {
        "00100020": this.getParsedFieldValue(parsedK11.PID, 3, 0, 0), // 患者ID
        "00100010": this.getParsedFieldValue(parsedK11.PID, 5, 0, 0), // 患者姓名
        "00100030": (this.getParsedFieldValue(parsedK11.PID, 7, 0, 0) || '').slice(0, 8), // 患者出生日期 (YYYYMMDD)
        "00100032": (this.getParsedFieldValue(parsedK11.PID, 7, 0, 0) || '').slice(8), // 患者出生時間 (HHMMSS)
        "00100040": this.getParsedFieldValue(parsedK11.PID, 8, 0, 0), // 患者性別
        "00102160": this.getParsedFieldValue(parsedK11.PID, 10, 0, 0) || this.getParsedFieldValue(parsedK11.PID, 22, 0, 0), // 種族或血型
  
        "00100200": this.getParsedFieldValue(parsedK11.SPM, 11, 0, 0) || "NO", // 這裡預設NO，若HL7無此資料則取NO
        "0020000D": parsedK11.QAK ? this.getParsedFieldValue(parsedK11.QAK, 3, 0, 0) : "", // Study Instance UID (從 QAK-3)
  
        "00080020": (this.getParsedFieldValue(parsedK11.SPM, 17, 0, 0) || '').split("^")[0] || "", // Study Date
        "00080030": (this.getParsedFieldValue(parsedK11.SPM, 17, 0, 0) || '').split("^")[1] || "", // Study Time
        "00080050": this.getParsedFieldValue(parsedK11.SAC, 2, 0, 0) || this.getParsedFieldValue(parsedK11.SPM, 30, 0, 0) || "", // Accession Number (SAC-2 或 SPM-30)
  
        "00402016": this.getParsedFieldValue(parsedK11.ORC, 2, 0, 0) || this.getParsedFieldValue(parsedK11.OBR, 2, 0, 0), // Placer Order Number
        "00400026": [
            this.getParsedFieldValue(parsedK11.ORC, 2, 0, 1),
            this.getParsedFieldValue(parsedK11.ORC, 2, 0, 2),
            this.getParsedFieldValue(parsedK11.ORC, 2, 0, 3)
        ].filter(Boolean).join("^"), // Placer Order Number
  
        "00402017": this.getParsedFieldValue(parsedK11.ORC, 3, 0, 0) || this.getParsedFieldValue(parsedK11.OBR, 3, 0, 0), // Filler Order Number
        "00400027": [
            this.getParsedFieldValue(parsedK11.ORC, 3, 0, 1),
            this.getParsedFieldValue(parsedK11.ORC, 3, 0, 2),
            this.getParsedFieldValue(parsedK11.ORC, 3, 0, 3)
        ].filter(Boolean).join("^"), // Filler Order Number 
  
        "00321064": this.getParsedFieldValue(parsedK11.OBR, 4, 0, 0), // Requested Procedure Description Code (OBR-4)
        "00400101": parsedK11.QPD ? this.getParsedFieldValue(parsedK11.QPD, 1, 0, 0) : "", // Requested Procedure Code Sequence (QPD-1 的第一個組件)
  
        "00080051": "", // 備用字段
        "00400008": "", // 備用字段
        "00400512": this.getParsedFieldValue(parsedK11.SAC, 3, 0, 0), // Specimen Container Identifier (SAC-3)
        "00400513": this.getParsedFieldValue(parsedK11.SAC, 3, 0, 1), // Specimen Container Type (SAC-3 Component 1)
        "00400518": this.getParsedFieldValue(parsedK11.SAC, 47, 0, 0) || this.getParsedFieldValue(parsedK11.SPM, 27, 0, 0), // Specimen UID (SAC-47 或 SPM-27)
        "00400551": this.getParsedFieldValue(parsedK11.SPM, 2, 0, 0), // Specimen Identifier (SPM-2)
        "00400562": this.getParsedFieldValue(parsedK11.SPM, 2, 0, 1), // Specimen Type (SPM-2 Component 1)
        "00400554": this.getParsedFieldValue(parsedK11.SPM, 31, 0, 0), // Specimen Collection Time (SPM-31)
        "0040059A": this.getParsedFieldValue(parsedK11.SPM, 4, 0, 0), // Specimen Short Description (SPM-4)
        "00400600": this.getParsedFieldValue(parsedK11.SPM, 14, 0, 0), // Specimen Detailed Description (SPM-14)
        "00400602": this.getParsedFieldValue(parsedK11.SPM, 14, 0, 0), // Specimen Processing Status (SPM-14)
        "00082228": this.getParsedFieldValue(parsedK11.SPM, 8, 0, 0), // Specimen Location (SPM-8)
        "00082230": this.getParsedFieldValue(parsedK11.SPM, 9, 0, 0), // Specimen Properties (SPM-9)
  
        "00080058": parsedK11.QAK ? this.getParsedFieldValue(parsedK11.QAK, 2, 0, 0) : "" // Query/Retrieve Level (QAK-2)
      };
      return dicomResult;
    }
  }
  
  module.exports = new DicomMappingService();