import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName, selectClassName, dateTimeClassName } from './FormSection';
import { useLanguage } from '../../contexts/LanguageContext';

const SPMSection = ({messageType}) => {
  const dispatch = useDispatch();
  const spmData = useSelector((state) => state.hl7Form.forms[messageType].spm);
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({ messageType, segment: 'spm', field: id, value }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('sections.spm.title')}</h3>
        <p className="text-sm text-blue-600">{t('sections.spm.desc')}</p>
      </div>

      <FormSection title={t('sections.spm.formTitle')}>
        <FormField label="標本編號" enName="Specimen ID" fieldNotation="SPM-2">
          <input type="text" id="specimenId" name="specimenId"
            value={spmData?.specimenId || ''} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入標本ID'} />
        </FormField>

        <FormField label="父標本編號" enName="Specimen Parent ID" fieldNotation="SPM-3">
          <input type="text" id="specimenParentIds" name="specimenParentIds"
            value={spmData?.specimenParentIds || ''} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入標本父ID'} />
        </FormField>

        <FormField label="標本類型" enName="Specimen Type" fieldNotation="SPM-4">
          <select id="specimenType" name="specimenType" value={spmData?.specimenType || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="BLD">{isEn ? 'Blood' : '血液 (Blood)'}</option>
            <option value="UR">{isEn ? 'Urine' : '尿液 (Urine)'}</option>
            <option value="TIS">{isEn ? 'Tissue' : '組織 (Tissue)'}</option>
            <option value="SAL">{isEn ? 'Saliva' : '唾液 (Saliva)'}</option>
            <option value="SWB">{isEn ? 'Swab' : '拭子 (Swab)'}</option>
            <option value="OTH">{isEn ? 'Other' : '其他 (Other)'}</option>
          </select>
        </FormField>

        <FormField label="標本類型修飾符" enName="Specimen Type Modifier" fieldNotation="SPM-5">
          <input type="text" id="specimenTypeModifier" name="specimenTypeModifier"
            value={spmData?.specimenTypeModifier || ''} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入標本類型修飾符'} />
        </FormField>

        <FormField label="標本添加劑" enName="Specimen Additives" fieldNotation="SPM-6">
          <input type="text" id="specimenAdditives" name="specimenAdditives"
            value={spmData?.specimenAdditives || ''} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入標本添加劑'} />
        </FormField>

        <FormField label="標本採集方法" enName="Specimen Collection Method" fieldNotation="SPM-7">
          <input type="text" id="collectionMethod" name="collectionMethod"
            value={spmData?.collectionMethod || ''} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入採集方法'} />
        </FormField>

        <FormField label="標本來源部位" enName="Specimen Source Site" fieldNotation="SPM-8">
          <select id="sourceSite" name="sourceSite" value={spmData?.sourceSite || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="VEN">{isEn ? 'Venous' : '靜脈 (Venous)'}</option>
            <option value="ART">{isEn ? 'Arterial' : '動脈 (Arterial)'}</option>
            <option value="CAP">{isEn ? 'Capillary' : '毛細血管 (Capillary)'}</option>
            <option value="OTH">{isEn ? 'Other' : '其他 (Other)'}</option>
          </select>
        </FormField>

        <FormField label="標本來源部位修飾符" enName="Specimen Source Site Modifier" fieldNotation="SPM-9">
          <input type="text" id="sourceSiteModifier" name="sourceSiteModifier"
            value={spmData?.sourceSiteModifier || ''} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入來源部位修飾符'} />
        </FormField>

        <FormField label="標本採集地點" enName="Specimen Collection Site" fieldNotation="SPM-10">
          <input type="text" id="collectionSite" name="collectionSite"
            value={spmData?.collectionSite || ''} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入採集部位'} />
        </FormField>

        <FormField label="標本角色" enName="Specimen Role" fieldNotation="SPM-11">
          <select id="specimenRole" name="specimenRole" value={spmData?.specimenRole || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="P">{isEn ? 'Patient' : '病人 (Patient)'}</option>
            <option value="C">{isEn ? 'Control' : '對照 (Control)'}</option>
            <option value="Q">{isEn ? 'Quality Control' : '品質控制 (Quality Control)'}</option>
            <option value="B">{isEn ? 'Blank' : '空白 (Blank)'}</option>
            <option value="R">{isEn ? 'Replicate' : '重複 (Replicate)'}</option>
          </select>
        </FormField>

        <FormField label="標本採集量" enName="Specimen Collection Amount" fieldNotation="SPM-12">
          <div className="flex gap-2">
            <input type="text" id="collectionAmount" name="collectionAmount"
              value={spmData?.collectionAmount || ''} onChange={handleInputChange}
              className={inputClassName} placeholder={isEn ? '' : '請輸入採集量'} />
            <select id="specimenCollectionUnit" value={spmData?.specimenCollectionUnit || ''} onChange={handleInputChange} className={selectClassName}>
              <option value="">{isEn ? 'Unit' : '單位'}</option>
              <option value="ML">{isEn ? 'mL' : '毫升'}</option>
              <option value="MG">{isEn ? 'mg' : '毫克'}</option>
              <option value="G">{isEn ? 'g' : '克'}</option>
              <option value="UL">{isEn ? 'µL' : '微升'}</option>
              <option value="CM">{isEn ? 'cm' : '公分'}</option>
            </select>
          </div>
        </FormField>

        <FormField label="分組標本數量" enName="Grouped Specimen Count" fieldNotation="SPM-13">
          <input type="text" id="groupedSpecimenCount" name="groupedSpecimenCount"
            value={spmData?.groupedSpecimenCount || ''} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入分組標本計數'} />
        </FormField>

        <FormField label="標本描述" enName="Specimen Description" fieldNotation="SPM-14">
          <textarea id="specimenDescription" name="specimenDescription"
            value={spmData?.specimenDescription || ''} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入標本描述'} rows="3" />
        </FormField>

        <FormField label="標本處理代碼" enName="Specimen Handling Code" fieldNotation="SPM-15">
          <select id="handlingCode" name="handlingCode" value={spmData?.handlingCode || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="F">{isEn ? 'Frozen' : '冷凍 (Frozen)'}</option>
            <option value="R">{isEn ? 'Refrigerated' : '冷藏 (Refrigerated)'}</option>
            <option value="A">{isEn ? 'Ambient' : '常溫 (Ambient)'}</option>
            <option value="H">{isEn ? 'Heated' : '加熱 (Heated)'}</option>
          </select>
        </FormField>

        <FormField label="標本風險代碼" enName="Specimen Risk Code" fieldNotation="SPM-16">
          <select id="riskCode" name="riskCode" value={spmData?.riskCode || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="L">{isEn ? 'Low' : '低風險 (Low)'}</option>
            <option value="M">{isEn ? 'Medium' : '中風險 (Medium)'}</option>
            <option value="H">{isEn ? 'High' : '高風險 (High)'}</option>
          </select>
        </FormField>

        <FormField label="標本採集日期時間" enName="Specimen Collection Date/Time" fieldNotation="SPM-17">
          <input type="datetime-local" id="collectionDateTime" name="collectionDateTime"
            value={spmData?.collectionDateTime || ''} onChange={handleInputChange}
            className={dateTimeClassName} />
        </FormField>

        <FormField label="標本接收日期時間" enName="Specimen Received Date/Time" fieldNotation="SPM-18">
          <input type="datetime-local" id="receivedDateTime" name="receivedDateTime"
            value={spmData?.receivedDateTime || ''} onChange={handleInputChange}
            className={dateTimeClassName} />
        </FormField>

        <FormField label="標本到期日期時間" enName="Specimen Expiration Date/Time" fieldNotation="SPM-19">
          <input type="datetime-local" id="expirationDateTime" name="expirationDateTime"
            value={spmData?.expirationDateTime || ''} onChange={handleInputChange}
            className={dateTimeClassName} />
        </FormField>

        <FormField label="標本可用性" enName="Specimen Availability" fieldNotation="SPM-20">
          <select id="availability" name="availability" value={spmData?.availability || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="Y">{isEn ? 'Available' : '可用 (Available)'}</option>
            <option value="N">{isEn ? 'Not Available' : '不可用 (Not Available)'}</option>
            <option value="P">{isEn ? 'Permanently Not Available' : '永久不可用 (Permanently Not Available)'}</option>
          </select>
        </FormField>

        <FormField label="標本拒收原因" enName="Specimen Reject Reason" fieldNotation="SPM-21">
          <select id="rejectionReason" name="rejectionReason" value={spmData?.rejectionReason || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="BROKEN">{isEn ? 'Broken Container' : '破損 (Broken Container)'}</option>
            <option value="CLOTTED">{isEn ? 'Clotted Specimen' : '凝血 (Clotted Specimen)'}</option>
            <option value="HEMOLYZED">{isEn ? 'Hemolyzed Specimen' : '溶血 (Hemolyzed Specimen)'}</option>
            <option value="INCORRECT">{isEn ? 'Incorrect Container' : '錯誤容器 (Incorrect Container)'}</option>
            <option value="INSUFFICIENT">{isEn ? 'Insufficient Quantity' : '量不足 (Insufficient Quantity)'}</option>
            <option value="OLD">{isEn ? 'Specimen Too Old' : '過期 (Specimen Too Old)'}</option>
          </select>
        </FormField>

        <FormField label="標本質量" enName="Specimen Quality" fieldNotation="SPM-22">
          <select id="specimenQuality" name="specimenQuality" value={spmData?.specimenQuality || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="E">{isEn ? 'Excellent' : '優良 (Excellent)'}</option>
            <option value="G">{isEn ? 'Good' : '良好 (Good)'}</option>
            <option value="F">{isEn ? 'Fair' : '一般 (Fair)'}</option>
            <option value="P">{isEn ? 'Poor' : '不良 (Poor)'}</option>
          </select>
        </FormField>

        <FormField label="標本適當性" enName="Specimen Appropriateness" fieldNotation="SPM-23">
          <select id="specimenAppropriateness" name="specimenAppropriateness" value={spmData?.specimenAppropriateness || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="A">{isEn ? 'Appropriate' : '適當 (Appropriate)'}</option>
            <option value="I">{isEn ? 'Inappropriate' : '不適當 (Inappropriate)'}</option>
            <option value="P">{isEn ? 'Protocol' : '協定外 (Protocol)'}</option>
          </select>
        </FormField>

        <FormField label="標本狀態" enName="Specimen Condition" fieldNotation="SPM-24">
          <select id="specimenCondition" name="specimenCondition" value={spmData?.specimenCondition || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="AUT">{isEn ? 'Autolyzed' : '自溶 (Autolyzed)'}</option>
            <option value="CLOT">{isEn ? 'Clotted' : '凝血 (Clotted)'}</option>
            <option value="CON">{isEn ? 'Contaminated' : '污染 (Contaminated)'}</option>
            <option value="COOL">{isEn ? 'Cool' : '冷藏 (Cool)'}</option>
            <option value="FROZ">{isEn ? 'Frozen' : '冷凍 (Frozen)'}</option>
            <option value="HEM">{isEn ? 'Hemolyzed' : '溶血 (Hemolyzed)'}</option>
            <option value="LIVE">{isEn ? 'Live' : '活體 (Live)'}</option>
            <option value="FRESH">{isEn ? 'Fresh' : '新鮮 (Fresh)'}</option>
            <option value="FIXED">{isEn ? 'Fixed' : '固定 (Fixed)'}</option>
          </select>
        </FormField>

        <FormField label="標本當前數量" enName="Specimen Current Quantity" fieldNotation="SPM-25">
          <div className="flex gap-2">
            <input type="number" id="specimenCurrentQuantity"
              value={spmData?.specimenCurrentQuantity || ''} onChange={handleInputChange}
              className={inputClassName} placeholder={isEn ? '' : '請輸入當前數量'} min="0" step="0.01" />
            <select id="specimenCurrentQuantityUnit" value={spmData?.specimenCurrentQuantityUnit || ''} onChange={handleInputChange} className={selectClassName}>
              <option value="">{isEn ? 'Unit' : '單位'}</option>
              <option value="ML">{isEn ? 'mL' : '毫升'}</option>
              <option value="MG">{isEn ? 'mg' : '毫克'}</option>
              <option value="G">{isEn ? 'g' : '克'}</option>
              <option value="UL">{isEn ? 'µL' : '微升'}</option>
              <option value="CM">{isEn ? 'cm' : '公分'}</option>
            </select>
          </div>
        </FormField>

        <FormField label="標本容器數量" enName="Number of Specimen Containers" fieldNotation="SPM-26">
          <input type="number" id="numberOfSpecimenContainers"
            value={spmData?.numberOfSpecimenContainers || ''} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入容器數量'} min="0" />
        </FormField>

        <FormField label="容器類型" enName="Container Type" fieldNotation="SPM-27">
          <select id="containerType" name="containerType" value={spmData?.containerType || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="BAG">{isEn ? 'Bag' : '袋子 (Bag)'}</option>
            <option value="BOT">{isEn ? 'Bottle' : '瓶子 (Bottle)'}</option>
            <option value="CUP">{isEn ? 'Cup' : '杯子 (Cup)'}</option>
            <option value="PLATE">{isEn ? 'Plate' : '培養皿 (Plate)'}</option>
            <option value="TUBE">{isEn ? 'Tube' : '試管 (Tube)'}</option>
            <option value="URN">{isEn ? 'Urinal' : '尿壺 (Urinal)'}</option>
            <option value="SLIDE">{isEn ? 'Slide' : '玻片 (Slide)'}</option>
            <option value="BLOCK">{isEn ? 'Block' : '蠟塊 (Block)'}</option>
          </select>
        </FormField>

        <FormField label="容器狀態" enName="Container Condition" fieldNotation="SPM-28">
          <select id="containerCondition" name="containerCondition" value={spmData?.containerCondition || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="INTACT">{isEn ? 'Intact' : '完好 (Intact)'}</option>
            <option value="LEAKED">{isEn ? 'Leaked' : '洩漏 (Leaked)'}</option>
            <option value="DAMAGED">{isEn ? 'Damaged' : '損壞 (Damaged)'}</option>
          </select>
        </FormField>

        <FormField label="子標本角色" enName="Specimen Child Role" fieldNotation="SPM-29">
          <select id="specimenChildRole" name="specimenChildRole" value={spmData?.specimenChildRole || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="A">{isEn ? 'Aliquot' : '同質 (Aliquot)'}</option>
            <option value="C">{isEn ? 'Calibrator' : '複製 (Calibrator)'}</option>
            <option value="M">{isEn ? 'Multiplexed' : '混合 (Multiplexed)'}</option>
            <option value="R">{isEn ? 'Replicate' : '複檢 (Replicate)'}</option>
            <option value="S">{isEn ? 'Split' : '分裂 (Split)'}</option>
          </select>
        </FormField>
      </FormSection>
    </>
  );
};

export default SPMSection;
