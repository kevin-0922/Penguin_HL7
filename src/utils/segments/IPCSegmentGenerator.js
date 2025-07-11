/**
 * 生成 IPC 段落 (Insurance Plan Certificate)
 * @param {Object} data - 表單資料，包含 ipc 段落資料
 * @returns {string} - 生成的 IPC 段落
 */
export const generateIPCSegment = (data) => {
  // 確保 data.ipc 存在
  if (!data.ipc) {
    return 'IPC|1';
  }

  const ipc = data.ipc;

  // 建立段落項目數組
  const ipcFields = [
    'IPC',                              // 段落標識
    ipc.setId || '1',                   // IPC-1: 序號
    ipc.accessKey || '',                // IPC-2: 存取金鑰
    ipc.insurancePlanId || '',          // IPC-3: 保險計劃 ID
    ipc.insuranceCompany || '',         // IPC-4: 保險公司
    ipc.insuranceCompanyAddress || '',  // IPC-5: 保險公司地址
    ipc.insuranceCompanyContactPerson || '', // IPC-6: 保險公司聯絡人
    ipc.insuranceCompanyPhoneNumber || '', // IPC-7: 保險公司電話號碼
    ipc.groupNumber || '',              // IPC-8: 群組號碼
    ipc.groupName || '',                // IPC-9: 群組名稱
   
  ];

  // 組合所有段落項目
  return ipcFields.join('|');
}; 