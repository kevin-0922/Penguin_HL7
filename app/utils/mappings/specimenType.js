// ============================================
// Specimen Type 對照表
// 支援兩種編碼系統：HL7 Table 0487 和 SNOMED CT (DICOM CID 8103)
// 因規格書尚未明確定案，兩種都先準備好，方便隨時切換
// ============================================

// HL7 Table 0487 - Specimen Type
// 參考: https://hl7-definition.caristix.com/v2/HL7v2.8/Tables/0487
const table0487 = {
  'TISS': 'Tissue',
  'BLDA': 'Blood arterial',
  'BLDV': 'Blood venous',
  'BLDCO': 'Blood, Cord',
  'UR': 'Urine',
  'URC': 'Urine clean catch',
  'SAL': 'Saliva',
  'SER': 'Serum',
  'PLAS': 'Plasma',
  'CSF': 'Cerebral spinal fluid',
  'STL': 'Stool = Feces',
  'SWT': 'Sweat',
  'SPT': 'Sputum',
  'SKN': 'Skin',
  'BON': 'Bone',
  'MAR': 'Marrow',
  'ASP': 'Aspirate',
  'PUS': 'Pus',
  'WND': 'Wound',
  'TUMR': 'Tumor',
  'CALC': 'Calculus (stone)',
  'ORH': 'Other',
  // 可依需求持續擴充完整表格
};

// SNOMED CT 版本，對應 DICOM CID 8103 (Anatomic Pathology Specimen Types)
// 參考: https://dicom.nema.org/medical/dicom/current/output/html/part16.html#sect_CID_8103
const snomedCid8103 = {
  'TISS': { code: '119376003', display: 'Tissue specimen' },
  'BLDA': { code: '119297000', display: 'Blood specimen' },
  'BLDV': { code: '119297000', display: 'Blood specimen' },
  'BLDCO': { code: '119297000', display: 'Blood specimen' },
  'UR':   { code: '122575003', display: 'Urine specimen' },
  'URC':  { code: '122575003', display: 'Urine specimen' },
  'SAL':  { code: '119342007', display: 'Saliva specimen' },
  'SER':  { code: '119364003', display: 'Serum specimen' },
  'PLAS': { code: '119361006', display: 'Plasma specimen' },
  'CSF':  { code: '258450006', display: 'Cerebrospinal fluid specimen' },
  'STL':  { code: '119339001', display: 'Stool specimen' },
  'SWT':  { code: '119423009', display: 'Sweat specimen' },
  'SPT':  { code: '119334006', display: 'Sputum specimen' },
  'SKN':  { code: '119370004', display: 'Skin specimen' },
  'BON':  { code: '119332008', display: 'Bone specimen' },
  'MAR':  { code: '119355000', display: 'Marrow specimen' },
  'ASP':  { code: '258531004', display: 'Aspirate specimen' },
  'PUS':  { code: '258542005', display: 'Pus specimen' },
  'WND':  { code: '281655000', display: 'Wound specimen' },
  'TUMR': { code: '432698002', display: 'Tumor tissue specimen' },
  'CALC': { code: '129334004', display: 'Calculus specimen' },
  'ORH':  { code: '119376003', display: 'Tissue specimen' }, // 預設 fallback
};

// 舊系統簡寫代碼對照（相容你之前開單用過的簡化值）
const aliasMap = {
  'TIS': 'TISS',
  'BLD': 'BLDV',
  'OTH': 'ORH',
};

function normalizeCode(rawType) {
  const normalized = (rawType || '').toUpperCase().trim();
  return aliasMap[normalized] || normalized;
}

// 主函數：依照 scheme 參數輸出對應格式
// scheme: 'HL70487'（預設）或 'SCT'
function mapSpecimenType(rawType, scheme = 'HL70487') {
  const code = normalizeCode(rawType);

  if (scheme === 'SCT') {
    const mapped = snomedCid8103[code] || snomedCid8103['ORH'];
    return `${mapped.code}^${mapped.display}^SCT`;
  }

  // 預設走 HL70487
  const display = table0487[code];
  if (!display) {
    console.warn(`SPM-4 標本類型代碼 "${rawType}" 不在 HL7 Table 0487 中，使用 Other 代替`);
    return `ORH^Other^HL70487`;
  }
  return `${code}^${display}^HL70487`;
}

module.exports = { mapSpecimenType, table0487, snomedCid8103 };
