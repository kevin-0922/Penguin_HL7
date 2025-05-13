// const parseHL7 = require('./hl7Utils'); // ✅ 沒錯，這樣是函式
// // 這個你要能把 HL7 字串轉成 message 物件
// const db = require('../../database/db');

// /**
//  * 處理 QBP^Q11 查詢
//  */
// async function handleQBPQuery(rawMessage) {
//   const message = parseHL7(rawMessage); // 你要自己寫這個 function，把 HL7 字串轉物件

//   const msh = message.getSegment('MSH');
//   const qpd = message.getSegment('QPD');

//   if (!msh || !qpd) {
//     throw new Error('無效的 QBP 訊息：缺少 MSH 或 QPD');
//   }

//   const qpdFields = qpd.fields;
//   const queryId = qpdFields[1]?.value; // QPD-2
//   const patientId = qpdFields[2]?.value; // QPD-3 假設查詢用這個

//   // 查資料庫中是否有符合病人 ID 的 HL7 訊息
//   const record = await db.get(
//     'SELECT * FROM received_messages WHERE message LIKE ?',
//     [`%${patientId}%`]
//   );

//   let rsp;
//   if (record) {
//     rsp = [
//       `MSH|^~\\&|HIS|HOSPITAL|LIS|LAB|${new Date().toISOString()}||RSP^K11|123456|P|2.5`,
//       `MSA|AA|123456`,
//       `QAK|${queryId}|OK`,
//       `QPD|${qpdFields.map(f => f?.value || '').join('|')}`,
//       `PID|||${patientId}||Doe^John||19900101|M`
//     ];
//   } else {
//     rsp = [
//       `MSH|^~\\&|HIS|HOSPITAL|LIS|LAB|${new Date().toISOString()}||RSP^K11|123456|P|2.5`,
//       `MSA|AA|123456`,
//       `QAK|${queryId}|NF`, // Not Found
//       `QPD|${qpdFields.map(f => f?.value || '').join('|')}`,
//       `ERR|||No matching patient found`
//     ];
//   }

//   return rsp.join('\r');
// }

// module.exports = {
//   handleQBPQuery
// };
