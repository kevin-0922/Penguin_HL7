import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName, selectClassName, dateTimeClassName } from './FormSection';
import { useLanguage } from '../../contexts/LanguageContext';

const TQ1Section = ({messageType}) => {
  const dispatch = useDispatch();
  const tq1Data = useSelector((state) => state.hl7Form.forms[messageType].tq1);
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({ messageType, segment: 'tq1', field: id, value }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('sections.tq1.title')}</h3>
        <p className="text-sm text-blue-600">{t('sections.tq1.desc')}</p>
      </div>

      <FormSection title={t('sections.tq1.formTitle')}>
        <FormField label="序號" enName="Set ID" fieldNotation="TQ1-1">
          <input type="text" id="setId" value={tq1Data.setId} onChange={handleInputChange} className={inputClassName} />
        </FormField>

        <FormField label="數量" enName="Quantity" fieldNotation="TQ1-2">
          <input type="text" id="quantity" value={tq1Data.quantity} onChange={handleInputChange} className={inputClassName} />
        </FormField>

        <FormField label="重複模式" enName="Repeat Pattern" fieldNotation="TQ1-3">
          <input type="text" id="repeatPattern" value={tq1Data.repeatPattern} onChange={handleInputChange} className={inputClassName} />
        </FormField>

        <FormField label="明確時間" enName="Explicit Time" fieldNotation="TQ1-4">
          <input type="text" id="explicitTime" value={tq1Data.explicitTime} onChange={handleInputChange} className={inputClassName} />
        </FormField>

        <FormField label="相對時間與單位" enName="Relative Time and Units" fieldNotation="TQ1-5">
          <input type="text" id="relativeTimeUnits" value={tq1Data.relativeTimeUnits} onChange={handleInputChange} className={inputClassName} />
        </FormField>

        <FormField label="服務持續時間" enName="Service Duration" fieldNotation="TQ1-6">
          <input type="text" id="serviceDuration" value={tq1Data.serviceDuration} onChange={handleInputChange} className={inputClassName} />
        </FormField>

        <FormField label="開始日期/時間" enName="Start Date/Time" fieldNotation="TQ1-7">
          <input type="datetime-local" id="startDateTime" value={tq1Data.startDateTime} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="結束日期/時間" enName="End Date/Time" fieldNotation="TQ1-8">
          <input type="datetime-local" id="endDateTime" value={tq1Data.endDateTime} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="優先順序" enName="Priority" fieldNotation="TQ1-9">
          <select id="priority" value={tq1Data.priority} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="S">{isEn ? 'Routine (S)' : '常規 (Routine)'}</option>
            <option value="A">{isEn ? 'ASAP (A)' : '盡快 (ASAP)'}</option>
            <option value="R">{isEn ? 'Stat (R)' : '緊急 (Stat)'}</option>
            <option value="P">{isEn ? 'Preop (P)' : '預先安排 (Preop)'}</option>
          </select>
        </FormField>

        <FormField label="條件文本" enName="Condition Text" fieldNotation="TQ1-10">
          <input type="text" id="conditionText" value={tq1Data.conditionText} onChange={handleInputChange} className={inputClassName} />
        </FormField>

        <FormField label="文本指示" enName="Text Instruction" fieldNotation="TQ1-11">
          <textarea id="textInstruction" value={tq1Data.textInstruction} onChange={handleInputChange} className={`${inputClassName} h-24`} />
        </FormField>

        <FormField label="連接詞" enName="Conjunction" fieldNotation="TQ1-12">
          <select id="conjunction" value={tq1Data.conjunction} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="A">AND</option>
            <option value="O">OR</option>
            <option value="S">{isEn ? 'Then (S)' : '然後 (Then)'}</option>
          </select>
        </FormField>

        <FormField label="發生持續時間" enName="Occurrence Duration" fieldNotation="TQ1-13">
          <input type="text" id="occurrenceDuration" value={tq1Data.occurrenceDuration} onChange={handleInputChange} className={inputClassName} />
        </FormField>

        <FormField label="總發生次數" enName="Total Occurrences" fieldNotation="TQ1-14">
          <input type="number" id="totalOccurrences" value={tq1Data.totalOccurrences} onChange={handleInputChange} className={inputClassName} />
        </FormField>
      </FormSection>
    </>
  );
};

export default TQ1Section;
