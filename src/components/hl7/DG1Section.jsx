import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFormData } from "../../store/hl7FormSlice";
import FormSection, { FormField, inputClassName, selectClassName, dateTimeClassName } from "./FormSection";
import { useLanguage } from "../../contexts/LanguageContext";

const DG1Section = ({ messageType }) => {
  const dispatch = useDispatch();
  const dg1Data = useSelector((state) => state.hl7Form.forms[messageType]?.dg1);
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({ messageType, segment: "dg1", field: id, value }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('sections.dg1.title')}</h3>
        <p className="text-sm text-blue-600">{t('sections.dg1.desc')}</p>
      </div>

      <FormSection title={t('sections.dg1.formTitle')}>
        <FormField label="設定ID" enName="Set ID" fieldNotation="DG1-1">
          <input type="text" id="setId" name="setId" value={dg1Data?.setId || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入設定ID'} />
        </FormField>

        <FormField label="診斷編碼方法" enName="Diagnosis Coding Method" fieldNotation="DG1-2">
          <input id="diagnosisCodingMethod" name="diagnosisCodingMethod" value={dg1Data?.diagnosisCodingMethod || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入診斷編碼方法'} />
        </FormField>

        <FormField label="診斷代碼" enName="Diagnosis Code" fieldNotation="DG1-3">
          <input type="text" id="diagnosisCode" name="diagnosisCode" value={dg1Data?.diagnosisCode || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入診斷代碼'} />
        </FormField>

        <FormField label="診斷描述" enName="Diagnosis Description" fieldNotation="DG1-4">
          <input type="text" id="diagnosisDescription" name="diagnosisDescription" value={dg1Data?.diagnosisDescription || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入診斷描述'} />
        </FormField>

        <FormField label="診斷日期時間" enName="Diagnosis Date/Time" fieldNotation="DG1-5">
          <input type="datetime-local" id="diagnosisDateTime" name="diagnosisDateTime" value={dg1Data?.diagnosisDateTime || ""} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="診斷類型" enName="Diagnosis Type" fieldNotation="DG1-6">
          <select id="diagnosisType" name="diagnosisType" value={dg1Data?.diagnosisType || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="A">{isEn ? 'Admitting (A)' : '入院診斷 (Admitting)'}</option>
            <option value="W">{isEn ? 'Working (W)' : '工作診斷 (Working)'}</option>
            <option value="F">{isEn ? 'Final (F)' : '最終診斷 (Final)'}</option>
          </select>
        </FormField>

        <FormField label="主要診斷類別" enName="Major Diagnostic Category" fieldNotation="DG1-7">
          <input type="text" id="majorDiagnosticCategory" name="majorDiagnosticCategory" value={dg1Data?.majorDiagnosticCategory || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入主要診斷類別'} />
        </FormField>

        <FormField label="診斷相關群組" enName="Diagnostic Related Group" fieldNotation="DG1-8">
          <input type="text" id="diagnosticRelatedGroup" name="diagnosticRelatedGroup" value={dg1Data?.diagnosticRelatedGroup || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入診斷相關群組'} />
        </FormField>

        <FormField label="DRG批准指標" enName="DRG Approval Indicator" fieldNotation="DG1-9">
          <select id="drgApprovalIndicator" name="drgApprovalIndicator" value={dg1Data?.drgApprovalIndicator || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="Y">{t('common.yes')}</option>
            <option value="N">{t('common.no')}</option>
          </select>
        </FormField>

        <FormField label="DRG分組審查代碼" enName="DRG Grouper Review Code" fieldNotation="DG1-10">
          <input type="text" id="drgGrouperReviewCode" name="drgGrouperReviewCode" value={dg1Data?.drgGrouperReviewCode || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入DRG分組審查代碼'} />
        </FormField>

        <FormField label="異常類型" enName="Outlier Type" fieldNotation="DG1-11">
          <select id="outlierType" name="outlierType" value={dg1Data?.outlierType || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="C">{isEn ? 'Cost (C)' : '成本異常 (Cost)'}</option>
            <option value="D">{isEn ? 'Day (D)' : '日數異常 (Day)'}</option>
            <option value="L">{isEn ? 'Low cost (L)' : '低成本異常 (Low cost)'}</option>
            <option value="S">{isEn ? 'Short stay (S)' : '短日異常 (Short stay)'}</option>
            <option value="N">{isEn ? 'No outlier (N)' : '無異常 (No outlier)'}</option>
          </select>
        </FormField>

        <FormField label="異常天數" enName="Outlier Days" fieldNotation="DG1-12">
          <input type="number" id="outlierDays" name="outlierDays" value={dg1Data?.outlierDays || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入異常天數'} />
        </FormField>

        <FormField label="異常成本" enName="Outlier Cost" fieldNotation="DG1-13">
          <input type="number" id="outlierCost" name="outlierCost" value={dg1Data?.outlierCost || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入異常成本'} />
        </FormField>

        <FormField label="分組器版本和類型" enName="Grouper Version And Type" fieldNotation="DG1-14">
          <input type="text" id="grouperVersionAndType" name="grouperVersionAndType" value={dg1Data?.grouperVersionAndType || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入分組器版本和類型'} />
        </FormField>

        <FormField label="診斷優先順序" enName="Diagnosis Priority" fieldNotation="DG1-15">
          <input type="number" id="diagnosisPriority" name="diagnosisPriority" value={dg1Data?.diagnosisPriority || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入診斷優先順序'} />
        </FormField>

        <FormField label="診斷臨床醫師" enName="Diagnosing Clinician" fieldNotation="DG1-16">
          <input type="text" id="diagnosingClinician" name="diagnosingClinician" value={dg1Data?.diagnosingClinician || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入診斷臨床醫師 (例: 12345^陳醫師)'} />
        </FormField>

        <FormField label="診斷分類" enName="Diagnosis Classification" fieldNotation="DG1-17">
          <input type="text" id="diagnosisClassification" name="diagnosisClassification" value={dg1Data?.diagnosisClassification || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入診斷分類'} />
        </FormField>

        <FormField label="保密指標" enName="Confidential Indicator" fieldNotation="DG1-18">
          <select id="confidentialIndicator" name="confidentialIndicator" value={dg1Data?.confidentialIndicator || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="Y">{t('common.yes')}</option>
            <option value="N">{t('common.no')}</option>
          </select>
        </FormField>

        <FormField label="認證日期時間" enName="Attestation Date/Time" fieldNotation="DG1-19">
          <input type="datetime-local" id="attestationDateTime" name="attestationDateTime" value={dg1Data?.attestationDateTime || ""} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="診斷識別碼" enName="Diagnosis Identifier" fieldNotation="DG1-20">
          <input type="text" id="diagnosisIdentifier" name="diagnosisIdentifier" value={dg1Data?.diagnosisIdentifier || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入診斷識別碼'} />
        </FormField>

        <FormField label="診斷操作代碼" enName="Diagnosis Action Code" fieldNotation="DG1-21">
          <select id="diagnosisActionCode" name="diagnosisActionCode" value={dg1Data?.diagnosisActionCode || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="A">{isEn ? 'Add/Insert (A)' : '新增 (Add/Insert)'}</option>
            <option value="D">{isEn ? 'Delete (D)' : '刪除 (Delete)'}</option>
            <option value="U">{isEn ? 'Update (U)' : '更新 (Update)'}</option>
          </select>
        </FormField>
      </FormSection>
    </>
  );
};

export default DG1Section;
