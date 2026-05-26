import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName, selectClassName } from './FormSection';
import { useLanguage } from '../../contexts/LanguageContext';

const RCPSection = ({ messageType }) => {
  const dispatch = useDispatch();
  const rcpData = useSelector((state) => state.hl7Form.forms[messageType].rcp);
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({ messageType, segment: 'rcp', field: id, value }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('sections.rcp.title')}</h3>
        <p className="text-sm text-blue-600">{t('sections.rcp.desc')}</p>
      </div>

      <FormSection title={t('sections.rcp.formTitle')}>
        <FormField label="查詢優先級" enName="Query Priority" fieldNotation="RCP-1">
          <select id="queryPriority" value={rcpData?.queryPriority || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="I">{isEn ? 'Immediate (I)' : '立即 (Immediate)'}</option>
            <option value="D">{isEn ? 'Deferred (D)' : '延遲 (Deferred)'}</option>
          </select>
        </FormField>

        <FormField label="數量限制請求" enName="Quantity Limited Request" fieldNotation="RCP-2">
          <input type="number" id="quantityLimitedRequest" value={rcpData?.quantityLimitedRequest || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入數量限制'} />
        </FormField>

        <FormField label="回應模式" enName="Response Modality" fieldNotation="RCP-3">
          <select id="responseModality" value={rcpData?.responseModality || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="R">{isEn ? 'Real-time (R)' : '實時 (Real-time)'}</option>
            <option value="B">{isEn ? 'Batch (B)' : '批量 (Batch)'}</option>
            <option value="T">Bolus (T)</option>
          </select>
        </FormField>

        <FormField label="執行和診斷時間" enName="Execution and Delivery Time" fieldNotation="RCP-4">
          <input type="datetime-local" id="executionAndDeliveryTime" value={rcpData?.executionAndDeliveryTime || ''} onChange={handleInputChange} className={inputClassName} />
        </FormField>

        <FormField label="修改指示器" enName="Modify Indicator" fieldNotation="RCP-5">
          <select id="modifyIndicator" value={rcpData?.modifyIndicator || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="M">Modified Subscription</option>
            <option value="N">New Subscription</option>
          </select>
        </FormField>

        <FormField label="排序欄位" enName="Sort-by Field" fieldNotation="RCP-6">
          <input type="text" id="sortByComponent" value={rcpData?.sortByComponent || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入排序欄位'} />
        </FormField>

        <FormField label="段落群組包含" enName="Segment Group Inclusion" fieldNotation="RCP-7">
          <select id="segmentGroupInclusion" value={rcpData?.segmentGroupInclusion || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="OBRG">OBR group</option>
            <option value="ORCG">ORC group</option>
            <option value="PIDG">PID group</option>
            <option value="RXAG">RXA group</option>
            <option value="RXDG">RXD group</option>
            <option value="RXEG">RXE group</option>
            <option value="RXOG">RXO group</option>
          </select>
        </FormField>
      </FormSection>
    </>
  );
};

export default RCPSection;
