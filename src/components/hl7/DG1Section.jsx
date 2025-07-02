import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateFormData } from "../../store/hl7FormSlice";
import FormSection, {
  FormField,
  inputClassName,
  selectClassName,
  dateTimeClassName,
} from "./FormSection";

const DG1Section = ({ messageType }) => {
  const dispatch = useDispatch();
  const dg1Data = useSelector((state) => state.hl7Form.forms[messageType]?.dg1);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(
      updateFormData({
        messageType: messageType,
        segment: "dg1",
        field: id,
        value,
      })
    );
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">診斷資訊段落 (DG1)</h3>
        <p className="text-sm text-blue-600">
          此段落用於記錄病人的診斷信息，包括診斷代碼、診斷類型、診斷日期等資訊。
          標記 * 的欄位為必填項目。
        </p>
      </div>

      <FormSection title="DG1 (診斷資訊)">
        {/* DG1-1 Set ID */}
        <FormField 
          label="設定ID" 
          enName="Set ID" 
          fieldNotation="DG1-1"
          required
        >
          <input
            type="text"
            id="setId"
            name="setId"
            value={dg1Data?.setId || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入設定ID"
            required
          />
        </FormField>

        {/* DG1-2 Diagnosis Coding Method */}
        <FormField 
          label="診斷編碼方法" 
          enName="Diagnosis Coding Method" 
          fieldNotation="DG1-2"
        >
          <select
            id="diagnosisCodingMethod"
            name="diagnosisCodingMethod"
            value={dg1Data?.diagnosisCodingMethod || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="I9C">ICD-9-CM</option>
            <option value="I10">ICD-10</option>
            <option value="I10P">ICD-10-PCS</option>
            <option value="SNM">SNOMED</option>
            <option value="LN">LOINC</option>
            <option value="ACR">ACR代碼</option>
            <option value="UML">統一醫學語言</option>
            <option value="SCT">SNOMED-CT</option>
            <option value="CD">自定義代碼</option>
          </select>
        </FormField>

        {/* DG1-3 Diagnosis Code */}
        <FormField 
          label="診斷代碼" 
          enName="Diagnosis Code" 
          fieldNotation="DG1-3"
          required
        >
          <input
            type="text"
            id="diagnosisCode"
            name="diagnosisCode"
            value={dg1Data?.diagnosisCode || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入診斷代碼"
            required
          />
        </FormField>

        {/* DG1-4 Diagnosis Description */}
        <FormField 
          label="診斷描述" 
          enName="Diagnosis Description" 
          fieldNotation="DG1-4"
        >
          <input
            type="text"
            id="diagnosisDescription"
            name="diagnosisDescription"
            value={dg1Data?.diagnosisDescription || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入診斷描述"
          />
        </FormField>

        {/* DG1-5 Diagnosis Date/Time */}
        <FormField 
          label="診斷日期時間" 
          enName="Diagnosis Date/Time" 
          fieldNotation="DG1-5"
        >
          <input
            type="datetime-local"
            id="diagnosisDateTime"
            name="diagnosisDateTime"
            value={dg1Data?.diagnosisDateTime || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* DG1-6 Diagnosis Type */}
        <FormField 
          label="診斷類型" 
          enName="Diagnosis Type" 
          fieldNotation="DG1-6"
          required
        >
          <select
            id="diagnosisType"
            name="diagnosisType"
            value={dg1Data?.diagnosisType || ""}
            onChange={handleInputChange}
            className={selectClassName}
            required
          >
            <option value="">請選擇</option>
            <option value="A">入院診斷 (Admitting)</option>
            <option value="W">工作診斷 (Working)</option>
            <option value="F">最終診斷 (Final)</option>
            <option value="T">暫時診斷 (Temporary)</option>
            <option value="P">臨床前診斷 (Preliminary)</option>
            <option value="C">諮詢/轉診診斷 (Consultant)</option>
            <option value="D">治療後診斷 (Post-procedure)</option>
            <option value="M">主要診斷 (Primary)</option>
            <option value="S">次要診斷 (Secondary)</option>
            <option value="O">其他診斷 (Other)</option>
          </select>
        </FormField>

        {/* DG1-7 Major Diagnostic Category */}
        <FormField 
          label="主要診斷類別" 
          enName="Major Diagnostic Category" 
          fieldNotation="DG1-7"
        >
          <input
            type="text"
            id="majorDiagnosticCategory"
            name="majorDiagnosticCategory"
            value={dg1Data?.majorDiagnosticCategory || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入主要診斷類別"
          />
        </FormField>

        {/* DG1-8 Diagnostic Related Group */}
        <FormField 
          label="診斷相關群組" 
          enName="Diagnostic Related Group" 
          fieldNotation="DG1-8"
        >
          <input
            type="text"
            id="diagnosticRelatedGroup"
            name="diagnosticRelatedGroup"
            value={dg1Data?.diagnosticRelatedGroup || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入診斷相關群組"
          />
        </FormField>

        {/* DG1-9 DRG Approval Indicator */}
        <FormField 
          label="DRG批准指標" 
          enName="DRG Approval Indicator" 
          fieldNotation="DG1-9"
        >
          <select
            id="drgApprovalIndicator"
            name="drgApprovalIndicator"
            value={dg1Data?.drgApprovalIndicator || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是</option>
            <option value="N">否</option>
          </select>
        </FormField>

        {/* DG1-10 DRG Grouper Review Code */}
        <FormField 
          label="DRG分組審查代碼" 
          enName="DRG Grouper Review Code" 
          fieldNotation="DG1-10"
        >
          <input
            type="text"
            id="drgGrouperReviewCode"
            name="drgGrouperReviewCode"
            value={dg1Data?.drgGrouperReviewCode || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入DRG分組審查代碼"
          />
        </FormField>

        {/* DG1-11 Outlier Type */}
        <FormField 
          label="異常類型" 
          enName="Outlier Type" 
          fieldNotation="DG1-11"
        >
          <select
            id="outlierType"
            name="outlierType"
            value={dg1Data?.outlierType || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="C">成本異常 (Cost)</option>
            <option value="D">日數異常 (Day)</option>
            <option value="L">低成本異常 (Low cost)</option>
            <option value="S">短日異常 (Short stay)</option>
            <option value="N">無異常 (No outlier)</option>
          </select>
        </FormField>

        {/* DG1-12 Outlier Days */}
        <FormField 
          label="異常天數" 
          enName="Outlier Days" 
          fieldNotation="DG1-12"
        >
          <input
            type="number"
            id="outlierDays"
            name="outlierDays"
            value={dg1Data?.outlierDays || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入異常天數"
          />
        </FormField>

        {/* DG1-13 Outlier Cost */}
        <FormField 
          label="異常成本" 
          enName="Outlier Cost" 
          fieldNotation="DG1-13"
        >
          <input
            type="number"
            id="outlierCost"
            name="outlierCost"
            value={dg1Data?.outlierCost || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入異常成本"
          />
        </FormField>

        {/* DG1-14 Grouper Version And Type */}
        <FormField 
          label="分組器版本和類型" 
          enName="Grouper Version And Type" 
          fieldNotation="DG1-14"
        >
          <input
            type="text"
            id="grouperVersionAndType"
            name="grouperVersionAndType"
            value={dg1Data?.grouperVersionAndType || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入分組器版本和類型"
          />
        </FormField>

        {/* DG1-15 Diagnosis Priority */}
        <FormField 
          label="診斷優先順序" 
          enName="Diagnosis Priority" 
          fieldNotation="DG1-15"
        >
          <input
            type="number"
            id="diagnosisPriority"
            name="diagnosisPriority"
            value={dg1Data?.diagnosisPriority || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入診斷優先順序"
          />
        </FormField>

        {/* DG1-16 Diagnosing Clinician */}
        <FormField 
          label="診斷臨床醫師" 
          enName="Diagnosing Clinician" 
          fieldNotation="DG1-16"
        >
          <input
            type="text"
            id="diagnosingClinician"
            name="diagnosingClinician"
            value={dg1Data?.diagnosingClinician || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入診斷臨床醫師 (例: 12345^陳醫師)"
          />
        </FormField>

        {/* DG1-17 Diagnosis Classification */}
        <FormField 
          label="診斷分類" 
          enName="Diagnosis Classification" 
          fieldNotation="DG1-17"
        >
          <input
            type="text"
            id="diagnosisClassification"
            name="diagnosisClassification"
            value={dg1Data?.diagnosisClassification || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入診斷分類"
          />
        </FormField>

        {/* DG1-18 Confidential Indicator */}
        <FormField 
          label="保密指標" 
          enName="Confidential Indicator" 
          fieldNotation="DG1-18"
        >
          <select
            id="confidentialIndicator"
            name="confidentialIndicator"
            value={dg1Data?.confidentialIndicator || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是</option>
            <option value="N">否</option>
          </select>
        </FormField>

        {/* DG1-19 Attestation Date/Time */}
        <FormField 
          label="認證日期時間" 
          enName="Attestation Date/Time" 
          fieldNotation="DG1-19"
        >
          <input
            type="datetime-local"
            id="attestationDateTime"
            name="attestationDateTime"
            value={dg1Data?.attestationDateTime || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* DG1-20 Diagnosis Identifier */}
        <FormField 
          label="診斷識別碼" 
          enName="Diagnosis Identifier" 
          fieldNotation="DG1-20"
        >
          <input
            type="text"
            id="diagnosisIdentifier"
            name="diagnosisIdentifier"
            value={dg1Data?.diagnosisIdentifier || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入診斷識別碼"
          />
        </FormField>

        {/* DG1-21 Diagnosis Action Code */}
        <FormField 
          label="診斷操作代碼" 
          enName="Diagnosis Action Code" 
          fieldNotation="DG1-21"
        >
          <select
            id="diagnosisActionCode"
            name="diagnosisActionCode"
            value={dg1Data?.diagnosisActionCode || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="A">新增 (Add)</option>
            <option value="D">刪除 (Delete)</option>
            <option value="U">更新 (Update)</option>
          </select>
        </FormField>
      </FormSection>
    </>
  );
};

export default DG1Section;
