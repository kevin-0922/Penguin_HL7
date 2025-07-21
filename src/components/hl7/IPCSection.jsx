import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFormData } from "../../store/hl7FormSlice";
import FormSection, { FormField, inputClassName } from "./FormSection";

const IPCSection = ({ messageType }) => {
  const dispatch = useDispatch();
  const ipcData = useSelector((state) => state.hl7Form.forms[messageType]?.ipc);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(
      updateFormData({
        messageType: messageType,
        segment: "ipc",
        field: id,
        value,
      })
    );
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">影像程序控制段落 (IPC)</h3>
        <p className="text-sm text-blue-600">
          此段落用於記錄醫學影像程序的相關資訊。 標記 * 的欄位為必填項目。
        </p>
      </div>

      <FormSection title="IPC (影像程序控制)">
        {/* IPC-1 Accession Identifier */}
        <FormField label="存取識別碼" enName="Accession Identifier" fieldNotation="IPC-1">
          <input
            type="text"
            id="accessionIdentifier"
            name="accessionIdentifier"
            value={ipcData?.accessionIdentifier || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入存取識別碼"
            required_test
          />
        </FormField>

        {/* IPC-2 Requested Procedure ID */}
        <FormField label="申請程序ID" enName="Requested Procedure ID" fieldNotation="IPC-2">
          <input
            type="text"
            id="requestedProcedureId"
            name="requestedProcedureId"
            value={ipcData?.requestedProcedureId || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入申請程序ID"
            required_test
          />
        </FormField>

        {/* IPC-3 Study Instance UID */}
        <FormField label="研究實例UID" enName="Study Instance UID" fieldNotation="IPC-3">
          <input
            type="text"
            id="studyInstanceUid"
            name="studyInstanceUid"
            value={ipcData?.studyInstanceUid || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入研究實例UID"
            required_test
          />
        </FormField>

        {/* IPC-4 Scheduled Procedure Step ID */}
        <FormField
          label="排程程序步驟ID"
          enName="Scheduled Procedure Step ID"
          fieldNotation="IPC-4"
        >
          <input
            type="text"
            id="scheduledProcedureStepId"
            name="scheduledProcedureStepId"
            value={ipcData?.scheduledProcedureStepId || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入排程程序步驟ID"
            required_test
          />
        </FormField>

        {/* IPC-5 Modality */}
        <FormField label="模態" enName="Modality" fieldNotation="IPC-5">
          <input
            type="text"
            id="modality"
            name="modality"
            value={ipcData?.modality || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入模態"
          />
        </FormField>

        {/* IPC-6 Protocol Code */}
        <FormField label="協議代碼" enName="Protocol Code" fieldNotation="IPC-6">
          <input
            type="text"
            id="protocolCode"
            name="protocolCode"
            value={ipcData?.protocolCode || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入協議代碼"
          />
        </FormField>

        {/* IPC-7 Scheduled Station Name */}
        <FormField label="排程站台名稱" enName="Scheduled Station Name" fieldNotation="IPC-7">
          <input
            type="text"
            id="scheduledStationName"
            name="scheduledStationName"
            value={ipcData?.scheduledStationName || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入排程站台名稱"
          />
        </FormField>

        {/* IPC-8 Scheduled Procedure Step Location */}
        <FormField
          label="排程程序步驟位置"
          enName="Scheduled Procedure Step Location"
          fieldNotation="IPC-8"
        >
          <input
            type="text"
            id="scheduledProcedureStepLocation"
            name="scheduledProcedureStepLocation"
            value={ipcData?.scheduledProcedureStepLocation || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入排程程序步驟位置"
          />
        </FormField>

        {/* IPC-9 Scheduled AE Title */}
        <FormField label="排程AE標題" enName="Scheduled AE Title" fieldNotation="IPC-9">
          <input
            type="text"
            id="scheduledAeTitle"
            name="scheduledAeTitle"
            value={ipcData?.scheduledAeTitle || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入排程AE標題"
          />
        </FormField>
      </FormSection>
    </>
  );
};

export default IPCSection;
