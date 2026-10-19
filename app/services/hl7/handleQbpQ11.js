const net = require('net');
const crypto = require('crypto');
const { mapSpecimenType } = require('../../utils/mappings/specimenType');
// 目前規格書要求用 HL70487，等 David/Skip 回覆後可改成 'SCT' HL70487
const SPECIMEN_TYPE_SCHEME = 'SCT';
// 把 Excel 表格常見的 "SCT: 代碼 "文字"" 格式，轉成標準 HL7 CE 格式：代碼^文字^SCT
// 部位對照表（從 SPM-14 描述反推 SNOMED CT 部位代碼）
const bodySiteMap = {
  'Skin':     { code: '39937001',  display: 'Skin structure' },
  'Colon':    { code: '71854001',  display: 'Colon structure' },
  'Breast':   { code: '119184005', display: 'Breast part (body structure)' },  // 修正代碼
  'Lung':     { code: '39607008',  display: 'Lung structure' },
  'Prostate': { code: '41216001',  display: 'Prostate structure' },
  'Kidney':   { code: '64033007',  display: 'Kidney structure' },
  'Thyroid':  { code: '69748006',  display: 'Thyroid gland structure' },
  'Cervix':   { code: '71252005',  display: 'Cervix structure' },
  'Duodenum': { code: '38848004',  display: 'Duodenum structure' },
  'Ovary':    { code: '15497006',  display: 'Ovary structure' },
};
// 產生完整的 YYYYMMDDHHMMSS 格式時間戳（比 currentTime 多秒數）
function generateFullTimestamp() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}
function inferSourceSite(spmDescription) {
  if (!spmDescription) return null;
  for (const [keyword, siteInfo] of Object.entries(bodySiteMap)) {
    if (spmDescription.includes(keyword)) {
      return `${siteInfo.code}^${siteInfo.display}^SCT`;
    }
  }
  return null;
}
function convertToCE(rawValue) {
  if (!rawValue) return '';
  const match = rawValue.match(/SCT:\s*(\d+)\s*"([^"]+)"/);
  if (match) {
    return `${match[1]}^${match[2]}^SCT`;
  }
  return rawValue; // 如果格式不符合，原樣回傳（避免出錯）
}
// 產生符合 DICOM 格式的 Study Instance UID
function generateStudyInstanceUID() {
  // 使用一個測試用的 Root OID（實際應向 DICOM 註冊機構申請專屬 Root）
  const rootOid = '2.25';
  const uuid = crypto.randomUUID().replace(/-/g, '');
  // 轉成純數字（2.25 後面接一串大數字，符合 DICOM UID 格式規則）
  const numericPart = BigInt('0x' + uuid).toString();
  return `${rootOid}.${numericPart}`;
}
// OBR-4 Universal Service Identifier 的編碼系統對照（依廠商而定）
const obr4CodingSchemeMap = {
  'HAMAMATSU': 'LN',
};

function buildObr4(senderApp) {
  // 3DHISTECH 用完全固定的值，跟其他廠商邏輯不同
  if (senderApp === 'CASECENTER') {
    return 'SCAN^Scan Slide^3DHISTECH';
  }
  
  const scheme = obr4CodingSchemeMap[senderApp];
  if (scheme === undefined) {
    return '22635-7^Microscopy observation^LN'; // 預設值
  }
  return `22635-7^Microscopy observation^${scheme}`;
}
const {
  parseMSH,
  parseOBR,
  parseORC,
  parsePID,
  parseSPM,
  parseQPD
} = require('../../utils/parsers');

const {
  extractMsgControlId,
  extractSender,
  extractReceiver,
} = require('../../utils/formatters/extractors');

const { buildAckResponse } = require('../../utils/formatters/ackMessage');
const { get } = require('../../database/db');
function inferFixationAndEmbedding(spmDescription) {
  const result = { fixative: null, embedding: null };
  if (spmDescription && spmDescription.includes('FFPE')) {
    result.fixative = { code: '111095003', display: 'Formaldehyde', system: 'SCT' };  // 修正代碼
    result.embedding = { code: '311731000', display: 'Paraffin wax', system: 'SCT' };
  }
  return result;
}
// 解析染色資訊字串，拆成多筆結構化資料
// 輸入例如: SCT: 104210008 "Hematoxylin and eosin stain"; SCT: 36879007 "Water soluble eosin stain"
function parseStains(obxValue) {
  if (!obxValue) return [];
  return obxValue.split(';').map(part => {
    const match = part.trim().match(/SCT:\s*(\d+)\s*"([^"]+)"/);
    if (match) {
      return { code: match[1], display: match[2], system: 'SCT' };
    }
    return null;
  }).filter(Boolean);
}
// 處理QBP^Q11訊息
async function handleQbpQ11(message) {
  try {
    const msh = parseMSH(message);
    const qpd = parseQPD(message);
    console.log('qpd部分:', qpd);
    const responseData = await queryByQpd(qpd);

    // 回傳 RSP^K11（簡化版，不帶 PID/ORC/SPM/SAC/OBX）
    const response = buildRspK11Response(message, msh, responseData);
    console.log('生成RSP^K11回應:', response);

    // 額外主動送 OML^O33 給對方（LAB-80）
    if (responseData) {
      const senderApp = msh.sendingApplication;
      const targetConfig = getTargetConfig(senderApp);
      if (targetConfig) {
        sendOmlO33(message, msh, responseData, targetConfig);
      } else {
        console.warn(`找不到 ${senderApp} 的 LAB-80 目標設定`);
      }
    }

    return response;

  } catch (error) {
    console.error('處理QBP^Q11訊息時發生錯誤:', error);
    return buildAckResponse(message, 'AE', error.message);
  }
}

// 根據 MSH-3（發送應用程式）找到對應的 LAB-80 目標位址
const getTargetConfig = (senderApp) => {
  const configs = {
    'EVIDENT':        { host: '106.51.66.54',    port: 6661 },
    'HAMAMATSU': { host: 'hamamatsu-test.ddns.net', port: 4321 },
    'Segue_SCU':     { host: '20.66.121.2',    port: 7766 },  // 原本的
'Segue_SCU_NEW': { host: '184.184.115.194', port: 7766 },  // 新增的
    'HOLX':           { host: '40.90.248.156',   port: 1440 },
    'HURON_SCAN_LIS': { host: '24.114.225.62',   port: 2576 },
    '3DHISTECH':      { host: '195.228.199.136', port: 1034 },
    'CASECENTER':     { host: '195.228.199.136', port: 1034 },
  };
  return configs[senderApp] || null;
};

// 主動送 OML^O33 給廠商（LAB-80）
const sendOmlO33 = (originalMessage, msh, responseData, targetConfig) => {
  const data = responseData.message_content;
  const pid = data.PID || {};
  const spm = data.SPM || {};
  const sac = data.SAC || {};
  const obx = data.OBX || {};
  const orc = data.ORC || {};
  const currentTime = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const msgControlId = extractMsgControlId(originalMessage);

  const spmDescription = spm['14'] || '';
  const { fixative, embedding } = inferFixationAndEmbedding(spmDescription);
  const stains = parseStains(obx['5']);
  const studyInstanceUID = generateStudyInstanceUID();
  const specimenUID = generateStudyInstanceUID(); // SPM-31 用，跟 Study Instance UID 分開產生
  const collectionMethod = convertToCE(spm['7']);
  const sourceSite = (spm['8'] === 'OTH' || !spm['8'])
    ? (inferSourceSite(spmDescription) || '119184005^Breast part (body structure)^SCT')
    : convertToCE(spm['8']);

  const containerType = '433466003^Microscope slide^SCT'; // 固定值
  const accessionId = sac['2'] ? `${sac['2']}^NTUNHS` : '';
  const collectionDateTime = spm['17'] || '';
  const specimenId = sac['3'] || spm['2'] || '';

  const segments = [
    `MSH|^~\\&|PENGUIN|NTUNHS|${msh.sendingApplication}|${msh.sendingFacility}|${currentTime}||OML^O33^OML_O33|${msgControlId}_OML|P|2.5.1|||||||||LAB-80^IHE`,
    `PID|1||${pid['3'] || ''}||${pid['5'] || ''}||${pid['7'] || ''}|${pid['8'] || ''}`,
    `SPM|1|${specimenId}||${mapSpecimenType(spm['4'], SPECIMEN_TYPE_SCHEME)}|||${collectionMethod}|${sourceSite}||||||${spmDescription}|||${collectionDateTime}||||||||||${containerType}|||${accessionId}|${specimenUID}`,
  ];

  let obxIndex = 1;
  const equipmentId = 'Penguin_v1.0^NTUNHS~ACQMGR-001^NTUNHS~PENGUIN^NTUNHS';

  if (fixative) {
    segments.push(`OBX|${obxIndex++}|CE|430864009^Tissue fixative^SCT||${fixative.code}^${fixative.display}^${fixative.system}||||||O|||||||${equipmentId}`);
  }
  if (embedding) {
    segments.push(`OBX|${obxIndex++}|CE|430863003^Embedding medium^SCT||${embedding.code}^${embedding.display}^${embedding.system}||||||O|||||||${equipmentId}`);
  }
  stains.forEach(stain => {
    segments.push(`OBX|${obxIndex++}|CE|8026-7^Stain method^LN||${stain.code}^${stain.display}^${stain.system}||||||O|||||||${equipmentId}`);
  });

  // SAC-2 加上機構代碼
  segments.push(`SAC||${sac['2'] ? sac['2'] + '^NTUNHS' : ''}|${sac['3'] || ''}`);
  segments.push(`ORC|NW||||||||${generateFullTimestamp()}`);
  
  const obr4Value = buildObr4(msh.sendingApplication);
  segments.push(`OBR||IWOS_0001||${obr4Value}`);
  
  segments.push(`OBX|${obxIndex++}|EI|110180^Study Instance UID^DCM||${studyInstanceUID}||||||O|||||||${equipmentId}`);

  const omlMsg = segments.join('\r');
  const mllpMsg = Buffer.concat([
    Buffer.from([0x0b]),
    Buffer.from(omlMsg, 'utf-8'),
    Buffer.from([0x1c, 0x0d])
  ]);

  const client = new net.Socket();
  client.setTimeout(8000);

  client.connect(targetConfig.port, targetConfig.host, () => {
    console.log(`LAB-80 OML^O33 送出到 ${targetConfig.host}:${targetConfig.port}`);
    console.log('訊息內容:\n' + omlMsg.replace(/\r/g, '\n'));
    client.write(mllpMsg);
  });

  client.on('data', (d) => {
    console.log(`LAB-80 收到 ACK:`, d.toString('utf-8'));
    client.end();
  });

  client.on('timeout', () => {
    console.warn(`LAB-80 連線逾時 ${targetConfig.host}:${targetConfig.port}`);
    client.end();
  });

  client.on('error', (err) => {
    console.error(`LAB-80 連線錯誤:`, err.message);
  });
};

// 處理QPD段查詢
const queryByQpd = async (qpd) => {
  try {
    const containerId = qpd.parameters[0] || qpd.queryTag;
    if (!containerId) {
      throw new Error('QPD 中缺少查詢條件（預期 Container ID）');
    }
    console.log('查詢 Container ID:', containerId);
    const row = await get(
      `SELECT * FROM slicing_schedule WHERE message_content::text LIKE ?`,
      [`%${containerId}%`]
    );
    if (!row) {
      console.log(`查無資料，Container ID: ${containerId}`);
      return null;
    }
    return row;
  } catch (err) {
    console.error('queryByQpd 發生錯誤:', err.message);
    throw err;
  }
};

// 構建RSP^K11回應（簡化版：只回確認，不帶病患/檢體資料）
const buildRspK11Response = (originalMessage, msh, responseData) => {
  const currentTime = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const msgControlId = extractMsgControlId(originalMessage);

  // 抓出原始 QPD 段落
  const lines = originalMessage.split(/\r\n|\r|\n/);
  const originalQpdLine = lines.find(line => line.startsWith('QPD'));
  
  // 解析 QPD-2（查詢ID），這才是 QAK-1 該用的值
  let qpdQueryId = msgControlId; // fallback，萬一解析不到
  if (originalQpdLine) {
    const qpdFields = originalQpdLine.split('|');
    qpdQueryId = qpdFields[2] || msgControlId;  // QPD-2 是第 3 個 | 分隔的欄位（index 2）
  }

  const segments = [
    `MSH|^~\\&|${msh.receivingApplication}|${msh.receivingFacility}|${msh.sendingApplication}|${msh.sendingFacility}|${currentTime}||RSP^K11^RSP_K11|${msgControlId}_RSP|P|2.5.1|||||||||LAB-81^IHE`,
    `MSA|AA|${msgControlId}`,
    `QAK|${qpdQueryId}|${responseData ? 'OK' : 'NF'}|IWOS^Imaging WOS^IHEDIA`,  // ← 改用 qpdQueryId
    originalQpdLine || `QPD|IWOS^Imaging WOS^IHEDIA|${qpdQueryId}`,
  ];

  return segments.join('\r');
};

module.exports = handleQbpQ11;