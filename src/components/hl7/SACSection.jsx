import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName, selectClassName, dateTimeClassName } from './FormSection';
import { useLanguage } from '../../contexts/LanguageContext';

const SACSection = ({messageType}) => {
  const dispatch = useDispatch();
  const sacData = useSelector((state) => state.hl7Form.forms[messageType].sac);
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({ messageType, segment: 'sac', field: id, value }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('sections.sac.title')}</h3>
        <p className="text-sm text-blue-600">{t('sections.sac.desc')}</p>
      </div>

      <FormSection title={t('sections.sac.formTitle')}>
        <FormField label="訪問識別碼" enName="Accession Identifier" fieldNotation="SAC-2">
          <input type="text" id="accessionIdentifier" value={sacData?.accessionIdentifier || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入訪問識別碼'} />
        </FormField>

        <FormField label="容器識別碼" enName="Container Identifier" fieldNotation="SAC-3">
          <input type="text" id="containerIdentifier" value={sacData?.containerIdentifier || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入容器識別碼'} />
        </FormField>

        <FormField label="主要(父)容器識別碼" enName="Primary (parent) Container Identifier" fieldNotation="SAC-4">
          <input type="text" id="primaryContainerIdentifier" value={sacData?.primaryContainerIdentifier || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入主要(父)容器識別碼'} />
        </FormField>

        <FormField label="設備容器識別碼" enName="Equipment Container Identifier" fieldNotation="SAC-5">
          <input type="text" id="equipmentContainerIdentifier" value={sacData?.equipmentContainerIdentifier || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入設備容器識別碼'} />
        </FormField>

        <FormField label="標本來源" enName="Specimen Source" fieldNotation="SAC-6">
          <input type="text" id="specimenSource" value={sacData?.specimenSource || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入標本來源'} />
        </FormField>

        <FormField label="登記日期/時間" enName="Registration Date/Time" fieldNotation="SAC-7">
          <input type="datetime-local" id="registrationDateTime" value={sacData?.registrationDateTime || ''} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="容器狀態" enName="Container Status" fieldNotation="SAC-8">
          <select id="containerStatus" value={sacData?.containerStatus || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="I">{isEn ? 'Initial (I)' : '初始狀態 (I)'}</option>
            <option value="P">{isEn ? 'In Process (P)' : '處理中 (P)'}</option>
            <option value="R">{isEn ? 'Received (R)' : '已接收 (R)'}</option>
            <option value="C">{isEn ? 'Completed (C)' : '已完成 (C)'}</option>
            <option value="X">{isEn ? 'Cancelled (X)' : '已取消 (X)'}</option>
            <option value="E">{isEn ? 'Error (E)' : '錯誤 (E)'}</option>
            <option value="H">{isEn ? 'Hold (H)' : '暫停 (H)'}</option>
          </select>
        </FormField>

        <FormField label="載體類型" enName="Carrier Type" fieldNotation="SAC-9">
          <select id="carrierType" value={sacData?.carrierType || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="SLIDE">{isEn ? 'Slide' : '玻片 (SLIDE)'}</option>
            <option value="TUBE">{isEn ? 'Tube' : '試管 (TUBE)'}</option>
            <option value="CUP">{isEn ? 'Cup' : '採檢杯 (CUP)'}</option>
            <option value="PLATE">{isEn ? 'Plate' : '培養皿 (PLATE)'}</option>
            <option value="BLOCK">{isEn ? 'Block' : '蠟塊 (BLOCK)'}</option>
            <option value="BAG">{isEn ? 'Bag' : '採血袋 (BAG)'}</option>
            <option value="BOT">{isEn ? 'Bottle' : '瓶子 (BOT)'}</option>
            <option value="URN">{isEn ? 'Urinal' : '尿壺 (URN)'}</option>
            <option value="VIAL">{isEn ? 'Vial' : '小瓶 (VIAL)'}</option>
          </select>
        </FormField>

        <FormField label="載體識別碼" enName="Carrier Identifier" fieldNotation="SAC-10">
          <input type="text" id="carrierIdentifier" value={sacData?.carrierIdentifier || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入載體識別碼'} />
        </FormField>

        <FormField label="載體中的位置" enName="Position in Carrier" fieldNotation="SAC-11">
          <input type="text" id="positionInCarrier" value={sacData?.positionInCarrier || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入載體中的位置'} />
        </FormField>

        <FormField label="托盤類型" enName="Tray Type" fieldNotation="SAC-12">
          <input type="text" id="trayType" value={sacData?.trayType || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入托盤類型'} />
        </FormField>

        <FormField label="托盤識別碼" enName="Tray Identifier" fieldNotation="SAC-13">
          <input type="text" id="trayIdentifier" value={sacData?.trayIdentifier || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入托盤識別碼'} />
        </FormField>

        <FormField label="托盤中的位置" enName="Position in Tray" fieldNotation="SAC-14">
          <input type="text" id="positionInTray" value={sacData?.positionInTray || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入托盤中的位置'} />
        </FormField>

        <FormField label="位置" enName="Location" fieldNotation="SAC-15">
          <input type="text" id="location" value={sacData?.location || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入位置'} />
        </FormField>

        <FormField label="容器高度" enName="Container Height" fieldNotation="SAC-16">
          <input type="number" id="containerHeight" value={sacData?.containerHeight || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入容器高度'} step="0.01" />
        </FormField>

        <FormField label="容器直徑" enName="Container Diameter" fieldNotation="SAC-17">
          <input type="number" id="containerDiameter" value={sacData?.containerDiameter || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入容器直徑'} step="0.01" />
        </FormField>

        <FormField label="障礙增量" enName="Barrier Delta" fieldNotation="SAC-18">
          <input type="number" id="barrierDelta" value={sacData?.barrierDelta || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入障礙增量'} step="0.01" />
        </FormField>

        <FormField label="底部增量" enName="Bottom Delta" fieldNotation="SAC-19">
          <input type="number" id="bottomDelta" value={sacData?.bottomDelta || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入底部增量'} step="0.01" />
        </FormField>

        <FormField label="容器高度/直徑/增量單位" enName="Container Height/Diameter/Delta Units" fieldNotation="SAC-20">
          <select id="containerHeightDiameterDeltaUnits" value={sacData?.containerHeightDiameterDeltaUnits || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="MM">{isEn ? 'Millimeter (MM)' : '毫米 (MM)'}</option>
            <option value="CM">{isEn ? 'Centimeter (CM)' : '厘米 (CM)'}</option>
            <option value="IN">{isEn ? 'Inch (IN)' : '英寸 (IN)'}</option>
          </select>
        </FormField>

        <FormField label="容器體積" enName="Container Volume" fieldNotation="SAC-21">
          <input type="number" id="containerVolume" value={sacData?.containerVolume || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入容器體積'} step="0.01" />
        </FormField>

        <FormField label="可用標本體積" enName="Available Specimen Volume" fieldNotation="SAC-22">
          <input type="number" id="availableSpecimenVolume" value={sacData?.availableSpecimenVolume || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入可用標本體積'} step="0.01" />
        </FormField>

        <FormField label="初始標本體積" enName="Initial Specimen Volume" fieldNotation="SAC-23">
          <input type="number" id="initialSpecimenVolume" value={sacData?.initialSpecimenVolume || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入初始標本體積'} step="0.01" />
        </FormField>

        <FormField label="體積單位" enName="Volume Units" fieldNotation="SAC-24">
          <select id="volumeUnits" value={sacData?.volumeUnits || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="ML">{isEn ? 'mL' : '毫升 (ML)'}</option>
            <option value="UL">{isEn ? 'µL' : '微升 (UL)'}</option>
            <option value="L">{isEn ? 'L' : '升 (L)'}</option>
          </select>
        </FormField>

        <FormField label="分離器類型" enName="Separator Type" fieldNotation="SAC-25">
          <select id="separatorType" value={sacData?.separatorType || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="GEL">{isEn ? 'Gel' : '凝膠 (GEL)'}</option>
            <option value="FILTER">{isEn ? 'Filter' : '過濾器 (FILTER)'}</option>
            <option value="NONE">{isEn ? 'None' : '無 (NONE)'}</option>
          </select>
        </FormField>

        <FormField label="蓋類型" enName="Cap Type" fieldNotation="SAC-26">
          <select id="capType" value={sacData?.capType || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="SCREW">{isEn ? 'Screw Cap' : '螺旋蓋 (SCREW)'}</option>
            <option value="STOPPER">{isEn ? 'Stopper' : '塞子 (STOPPER)'}</option>
            <option value="PUSH">{isEn ? 'Push Cap' : '按壓蓋 (PUSH)'}</option>
            <option value="NONE">{isEn ? 'No Cap' : '無蓋 (NONE)'}</option>
          </select>
        </FormField>

        <FormField label="添加劑" enName="Additive" fieldNotation="SAC-27">
          <select id="additive" value={sacData?.additive || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="EDTA">EDTA</option>
            <option value="HEPARIN">{isEn ? 'Heparin' : '肝素 (HEPARIN)'}</option>
            <option value="SST">SST</option>
            <option value="NACIT">{isEn ? 'Sodium Citrate' : '檸檬酸鈉 (NACIT)'}</option>
            <option value="NONE">{isEn ? 'None' : '無 (NONE)'}</option>
          </select>
        </FormField>

        <FormField label="標本組件" enName="Specimen Component" fieldNotation="SAC-28">
          <input type="text" id="specimenComponent" value={sacData?.specimenComponent || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入標本組件'} />
        </FormField>

        <FormField label="稀釋因子" enName="Dilution Factor" fieldNotation="SAC-29">
          <input type="text" id="dilutionFactor" value={sacData?.dilutionFactor || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入稀釋因子'} />
        </FormField>

        <FormField label="處理" enName="Treatment" fieldNotation="SAC-30">
          <input type="text" id="treatment" value={sacData?.treatment || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入處理方式'} />
        </FormField>

        <FormField label="溫度" enName="Temperature" fieldNotation="SAC-31">
          <input type="text" id="temperature" value={sacData?.temperature || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入溫度'} />
        </FormField>

        <FormField label="溶血指數" enName="Hemolysis Index" fieldNotation="SAC-32">
          <input type="text" id="hemolysisIndex" value={sacData?.hemolysisIndex || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入溶血指數'} />
        </FormField>

        <FormField label="溶血指數單位" enName="Hemolysis Index Units" fieldNotation="SAC-33">
          <input type="text" id="hemolysisIndexUnits" value={sacData?.hemolysisIndexUnits || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入溶血指數單位'} />
        </FormField>

        <FormField label="脂血指數" enName="Lipemia Index" fieldNotation="SAC-34">
          <input type="text" id="lipemiaIndex" value={sacData?.lipemiaIndex || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入脂血指數'} />
        </FormField>

        <FormField label="脂血指數單位" enName="Lipemia Index Units" fieldNotation="SAC-35">
          <input type="text" id="lipemiaIndexUnits" value={sacData?.lipemiaIndexUnits || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入脂血指數單位'} />
        </FormField>

        <FormField label="黃疸指數" enName="Icterus Index" fieldNotation="SAC-36">
          <input type="text" id="icterusIndex" value={sacData?.icterusIndex || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入黃疸指數'} />
        </FormField>

        <FormField label="黃疸指數單位" enName="Icterus Index Units" fieldNotation="SAC-37">
          <input type="text" id="icterusIndexUnits" value={sacData?.icterusIndexUnits || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入黃疸指數單位'} />
        </FormField>

        <FormField label="纖維蛋白指數" enName="Fibrin Index" fieldNotation="SAC-38">
          <input type="text" id="fibrinIndex" value={sacData?.fibrinIndex || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入纖維蛋白指數'} />
        </FormField>

        <FormField label="纖維蛋白指數單位" enName="Fibrin Index Units" fieldNotation="SAC-39">
          <input type="text" id="fibrinIndexUnits" value={sacData?.fibrinIndexUnits || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入纖維蛋白指數單位'} />
        </FormField>

        <FormField label="系統引起的污染物" enName="System Induced Contaminants" fieldNotation="SAC-40">
          <input type="text" id="systemInducedContaminants" value={sacData?.systemInducedContaminants || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入系統引起的污染物'} />
        </FormField>

        <FormField label="藥物干擾" enName="Drug Interference" fieldNotation="SAC-41">
          <input type="text" id="drugInterference" value={sacData?.drugInterference || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入藥物干擾'} />
        </FormField>

        <FormField label="人工血液" enName="Artificial Blood" fieldNotation="SAC-42">
          <input type="text" id="artificialBlood" value={sacData?.artificialBlood || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入人工血液'} />
        </FormField>

        <FormField label="特殊處理代碼" enName="Special Handling Code" fieldNotation="SAC-43">
          <input type="text" id="specialHandlingCode" value={sacData?.specialHandlingCode || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入特殊處理代碼'} />
        </FormField>

        <FormField label="其他環境因素" enName="Other Environmental Factors" fieldNotation="SAC-44">
          <textarea id="otherEnvironmentalFactors" value={sacData?.otherEnvironmentalFactors || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入其他環境因素'} rows="3" />
        </FormField>
      </FormSection>
    </>
  );
};

export default SACSection;
