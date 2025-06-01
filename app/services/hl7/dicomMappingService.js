
const getParsedFieldValue = (parsedSegment, fieldIndex, componentIndex = 0, subcomponentIndex = 0) => {
    if (!parsedSegment || !Array.isArray(parsedSegment)) return '';
    const fieldEntry = parsedSegment.find(f => f.field === fieldIndex);
    if (!fieldEntry || !fieldEntry.components || !Array.isArray(fieldEntry.components)) return '';
    const component = fieldEntry.components[componentIndex];
    if (!component || !Array.isArray(component)) return '';
    return component[subcomponentIndex] !== undefined ? component[subcomponentIndex].toString() : '';
  };
  
  // MSH 和 MSA 
  const getMshOrMsaValue = (parsedSegment, fieldIndex, componentIndex = 0, subcomponentIndex = 0) => {
    if (!parsedSegment || !parsedSegment.fields) return '';
    const field = parsedSegment.fields[fieldIndex - 1]; // HL7 字段索引從 1 開始，陣列從 0 開始
    if (!field || !field.value || !Array.isArray(field.value)) return '';
    const component = field.value[componentIndex];
    if (!component || !Array.isArray(component)) return '';
    return component[subcomponentIndex] !== undefined ? component[subcomponentIndex].toString() : '';
  };
  
  const mapHl7ToDicom = (parsedK11) => {
    const dicomResult = {
      "00100020": getParsedFieldValue(parsedK11.PID, 3, 0, 0), // 患者ID
      "00100010": getParsedFieldValue(parsedK11.PID, 5, 0, 0), // 患者姓名
      "00100030": (getParsedFieldValue(parsedK11.PID, 7, 0, 0) || '').slice(0, 8), // 患者出生日期 (YYYYMMDD)
      "00100032": (getParsedFieldValue(parsedK11.PID, 7, 0, 0) || '').slice(8), // 患者出生時間 (HHMMSS)
      "00100040": getParsedFieldValue(parsedK11.PID, 8, 0, 0), // 患者性別
      "00102160": getParsedFieldValue(parsedK11.PID, 10, 0, 0) || getParsedFieldValue(parsedK11.PID, 22, 0, 0), // 種族或血型
  
      "00100200": getParsedFieldValue(parsedK11.SPM, 11, 0, 0) || "NO", // 
      "0020000D": parsedK11.QAK ? getParsedFieldValue(parsedK11.QAK, 3, 0, 0) : "", // Study Instance UID (從 QAK-3)
  
      "00080020": (getParsedFieldValue(parsedK11.SPM, 17, 0, 0) || '').split("^")[0] || "", // Study Date
      "00080030": (getParsedFieldValue(parsedK11.SPM, 17, 0, 0) || '').split("^")[1] || "", // Study Time
      "00080050": getParsedFieldValue(parsedK11.SAC, 2, 0, 0) || getParsedFieldValue(parsedK11.SPM, 30, 0, 0) || "", // Accession Number (SAC-2 或 SPM-30)
  
      "00402016": getParsedFieldValue(parsedK11.ORC, 2, 0, 0) || getParsedFieldValue(parsedK11.OBR, 2, 0, 0), // Placer Order Number
      "00400026": [
          getParsedFieldValue(parsedK11.ORC, 2, 0, 1),
          getParsedFieldValue(parsedK11.ORC, 2, 0, 2),
          getParsedFieldValue(parsedK11.ORC, 2, 0, 3)
      ].filter(Boolean).join("^"), // Placer Order Number (Extension)
  
      "00402017": getParsedFieldValue(parsedK11.ORC, 3, 0, 0) || getParsedFieldValue(parsedK11.OBR, 3, 0, 0), // Filler Order Number
      "00400027": [
          getParsedFieldValue(parsedK11.ORC, 3, 0, 1),
          getParsedFieldValue(parsedK11.ORC, 3, 0, 2),
          getParsedFieldValue(parsedK11.ORC, 3, 0, 3)
      ].filter(Boolean).join("^"), // Filler Order Number (Extension)
  
      "00321064": getParsedFieldValue(parsedK11.OBR, 4, 0, 0), // Requested Procedure Description Code (OBR-4)
      "00400101": parsedK11.QPD ? getParsedFieldValue(parsedK11.QPD, 1, 0, 0) : "", // Requested Procedure Code Sequence (QPD-1)
  
      "00080051": "", // 備用
      "00400008": "", // 備用
      "00400512": getParsedFieldValue(parsedK11.SAC, 3, 0, 0), // Specimen Container Identifier (SAC-3)
      "00400513": getParsedFieldValue(parsedK11.SAC, 3, 0, 1), // Specimen Container Type (SAC-3 Component 1)
      "00400518": getParsedFieldValue(parsedK11.SAC, 47, 0, 0) || getParsedFieldValue(parsedK11.SPM, 27, 0, 0), // Specimen UID (SAC-47 或 SPM-27)
      "00400551": getParsedFieldValue(parsedK11.SPM, 2, 0, 0), // Specimen Identifier (SPM-2)
      "00400562": getParsedFieldValue(parsedK11.SPM, 2, 0, 1), // Specimen Type (SPM-2 Component 1)
      "00400554": getParsedFieldValue(parsedK11.SPM, 31, 0, 0), // Specimen Collection Time (SPM-31)
      "0040059A": getParsedFieldValue(parsedK11.SPM, 4, 0, 0), // Specimen Short Description (SPM-4)
      "00400600": getParsedFieldValue(parsedK11.SPM, 14, 0, 0), // Specimen Detailed Description (SPM-14)
      "00400602": getParsedFieldValue(parsedK11.SPM, 14, 0, 0), // Specimen Processing Status (SPM-14)
      "00082228": getParsedFieldValue(parsedK11.SPM, 8, 0, 0), // Specimen Location (SPM-8)
      "00082230": getParsedFieldValue(parsedK11.SPM, 9, 0, 0), // Specimen Properties (SPM-9)
  
      "00080058": parsedK11.QAK ? getParsedFieldValue(parsedK11.QAK, 2, 0, 0) : "" // Query/Retrieve Level (QAK-2)
    };
    return dicomResult;
  };
  module.exports = {mapHl7ToDicom};