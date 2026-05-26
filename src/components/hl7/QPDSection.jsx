import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName } from './FormSection';
import { useLanguage } from '../../contexts/LanguageContext';

const QPDSection = ({messageType}) => {
  const dispatch = useDispatch();
  const qpdData = useSelector((state) => state.hl7Form.forms[messageType].qpd);
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({ messageType, segment: 'qpd', field: id, value }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('sections.qpd.title')}</h3>
        <p className="text-sm text-blue-600">{t('sections.qpd.desc')}</p>
      </div>

      <FormSection title={t('sections.qpd.formTitle')}>
        <FormField label="查詢名稱" enName="Message Query Name" fieldNotation="QPD-1">
          <input type="text" id="messageQueryName" value={qpdData?.messageQueryName || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入查詢名稱'} />
        </FormField>

        <FormField label="查詢標籤" enName="Query Tag" fieldNotation="QPD-2">
          <input type="text" id="queryTag" value={qpdData?.queryTag || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入查詢標籤'} />
        </FormField>

        <FormField label="查詢參數" enName="Query Parameters" fieldNotation="QPD-3">
          <input type="text" id="userParametersInSuccessiveFields" value={qpdData?.userParametersInSuccessiveFields || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入查詢參數'} />
        </FormField>
      </FormSection>
    </>
  );
};

export default QPDSection;
