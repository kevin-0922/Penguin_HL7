/**
 * 生成 IPC 段落 (Image Procedure Control - 影像程序控制)
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
    'IPC',                                 // 段落標識
    ipc.accessionIdentifier || '',         // IPC-1: 存取識別碼
    ipc.requestedProcedureId || '',        // IPC-2: 申請程序ID
    ipc.studyInstanceUid || '',            // IPC-3: 研究實例UID
    ipc.scheduledProcedureStepId || '',    // IPC-4: 排程程序步驟ID
    ipc.modality || '',                    // IPC-5: 模態
    ipc.protocolCode || '',                // IPC-6: 協議代碼
    ipc.scheduledStationName || '',        // IPC-7: 排程站台名稱
    ipc.scheduledProcedureStepLocation || '', // IPC-8: 排程程序步驟位置
    ipc.scheduledAeTitle || ''             // IPC-9: 排程AE標題
  ];

  // 組合所有段落項目
  return ipcFields.join('|');
}; 