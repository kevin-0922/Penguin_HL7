import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateFormData } from "../../store/hl7FormSlice";
import FormSection, {
  FormField,
  inputClassName,
  selectClassName,
  dateTimeClassName,
} from "./FormSection";
import { useLanguage } from '../../contexts/LanguageContext';

const PIDSection = ({ messageType }) => {
  const dispatch = useDispatch();
  const pidData = useSelector((state) => state.hl7Form.forms[messageType].pid);
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(
      updateFormData({
        messageType: messageType,
        segment: "pid",
        field: id,
        value,
      })
    );
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('sections.pid.title')}</h3>
        <p className="text-sm text-blue-600">{t('sections.pid.desc')}</p>
      </div>

      <FormSection title={t('sections.pid.formTitle')}>
        <FormField label="病患編號" enName="Patient ID" fieldNotation="PID-2">
          <input type="text" id="patientId" name="patientId"
            value={pidData?.patientId || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入病患編號'} />
        </FormField>

        <FormField label="病患識別號碼清單" enName="Patient Identifier List" fieldNotation="PID-3">
          <input type="text" id="patientIdList" name="patientIdList"
            value={pidData?.patientIdList || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入病患識別號碼清單'} />
        </FormField>

        <FormField label="替代病患編號" enName="Alternate Patient ID" fieldNotation="PID-4">
          <input type="text" id="alternatePatientId" name="alternatePatientId"
            value={pidData?.alternatePatientId || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入替代病患編號'} />
        </FormField>

        <FormField label="病患姓名" enName="Patient Name" fieldNotation="PID-5">
          <input type="text" id="patientName" name="patientName"
            value={pidData?.patientName || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入病患姓名'} />
        </FormField>

        <FormField label="母親娘家姓氏" enName="Mother's Maiden Name" fieldNotation="PID-6">
          <input type="text" id="motherMaidenName" name="motherMaidenName"
            value={pidData?.motherMaidenName || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入母親娘家姓氏'} />
        </FormField>

        <FormField label="出生日期時間" enName="Birth Date" fieldNotation="PID-7">
          <input type="datetime-local" id="birthDateTime" name="birthDateTime"
            value={pidData?.birthDateTime || ""} onChange={handleInputChange}
            className={dateTimeClassName} />
        </FormField>

        <FormField label="法定性別" enName="Administrative Sex" fieldNotation="PID-8">
          <select id="sex" name="sex" value={pidData?.sex || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="A">{isEn ? 'Ambiguous' : '模糊 (Ambiguous)'}</option>
            <option value="M">{isEn ? 'Male' : '男性 (Male)'}</option>
            <option value="F">{isEn ? 'Female' : '女性 (Female)'}</option>
            <option value="N">{isEn ? 'Not Applicable' : '不適用 (Not Applicable)'}</option>
            <option value="O">{isEn ? 'Other' : '其他 (Other)'}</option>
            <option value="U">{isEn ? 'Unknown' : '未知 (Unknown)'}</option>
          </select>
        </FormField>

        <FormField label="病患別稱" enName="Patient Alias" fieldNotation="PID-9">
          <input type="text" id="alias" name="alias"
            value={pidData?.alias || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入病患別稱'} />
        </FormField>

        <FormField label="種族" enName="Race" fieldNotation="PID-10">
          <select id="race" name="race" value={pidData?.race || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="2028-9">{isEn ? 'Asian' : '亞洲人 (Asian)'}</option>
            <option value="2054-5">{isEn ? 'Black or African American' : '黑人或非裔美國人 (Black or African American)'}</option>
            <option value="1002-5">{isEn ? 'American Indian or Alaska Native' : '美國印地安人或阿拉斯加原住民 (American Indian or Alaska Native)'}</option>
            <option value="2076-8">{isEn ? 'Native Hawaiian or Other Pacific Islander' : '夏威夷原住民或其他太平洋島民 (Native Hawaiian or Other Pacific Islander)'}</option>
            <option value="2106-3">{isEn ? 'White' : '白人 (White)'}</option>
            <option value="2131-1">{isEn ? 'Other Race' : '其他 (Other Race)'}</option>
          </select>
        </FormField>

        <FormField label="病患地址" enName="Patient Address" fieldNotation="PID-11">
          <input type="text" id="patientAddress" name="patientAddress"
            value={pidData?.patientAddress || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入病患地址'} />
        </FormField>

        <FormField label="縣市代碼" enName="County Code" fieldNotation="PID-12">
          <input type="text" id="countryCode" name="countryCode"
            value={pidData?.countryCode || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入縣市代碼'} />
        </FormField>

        <FormField label="住家電話" enName="Phone Number - Home" fieldNotation="PID-13">
          <input type="tel" id="phoneNumberHome" name="phoneNumberHome"
            value={pidData?.phoneNumberHome || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入住家電話'} />
        </FormField>

        <FormField label="工作電話" enName="Phone Number - Business" fieldNotation="PID-14">
          <input type="tel" id="phoneNumberBusiness" name="phoneNumberBusiness"
            value={pidData?.phoneNumberBusiness || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入工作電話'} />
        </FormField>

        <FormField label="主要使用語言" enName="Primary Language" fieldNotation="PID-15">
          <input type="text" id="primaryLanguage" name="primaryLanguage"
            value={pidData?.primaryLanguage || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入主要使用語言'} />
        </FormField>

        <FormField label="婚姻狀況" enName="Marital Status" fieldNotation="PID-16">
          <select id="maritalStatus" name="maritalStatus" value={pidData?.maritalStatus || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="A">{isEn ? 'Separated' : '分居 (Separated)'}</option>
            <option value="B">{isEn ? 'Unmarried' : '未婚 (Unmarried)'}</option>
            <option value="C">{isEn ? 'Common law' : '同居 (Common law)'}</option>
            <option value="D">{isEn ? 'Divorced' : '離婚 (Divorced)'}</option>
            <option value="E">{isEn ? 'Legally Separated' : '合法分居 (Legally Separated)'}</option>
            <option value="G">{isEn ? 'Living together' : '同居中 (Living together)'}</option>
            <option value="I">{isEn ? 'Interlocutory' : '臨時判決 (Interlocutory)'}</option>
            <option value="M">{isEn ? 'Married' : '已婚 (Married)'}</option>
            <option value="N">{isEn ? 'Annulled' : '婚姻無效 (Annulled)'}</option>
            <option value="O">{isEn ? 'Other' : '其他 (Other)'}</option>
            <option value="P">{isEn ? 'Domestic partner' : '同居伴侶 (Domestic partner)'}</option>
            <option value="R">{isEn ? 'Registered domestic partner' : '已登記同居伴侶 (Registered domestic partner)'}</option>
            <option value="S">{isEn ? 'Single' : '單身 (Single)'}</option>
            <option value="T">{isEn ? 'Unreported' : '未報告 (Unreported)'}</option>
            <option value="U">{isEn ? 'Unknown' : '未知 (Unknown)'}</option>
            <option value="W">{isEn ? 'Widowed' : '喪偶 (Widowed)'}</option>
          </select>
        </FormField>

        <FormField label="宗教信仰" enName="Religion" fieldNotation="PID-17">
          <select id="religion" name="religion" value={pidData?.religion || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="ABC">Christian: American Baptist Church</option>
            <option value="AGN">Agnostic</option>
            <option value="AME">Christian: African Methodist Episcopal Zion</option>
            <option value="AMT">Christian: African Methodist Episcopal</option>
            <option value="ANG">Christian: Anglican</option>
            <option value="AOG">Christian: Assembly of God</option>
            <option value="ATH">Atheist</option>
            <option value="BAH">Baha'i</option>
            <option value="BAP">Christian: Baptist</option>
            <option value="BMA">Buddhist: Mahayana</option>
            <option value="BOT">Buddhist: Other</option>
            <option value="BTA">Buddhist: Tantrayana</option>
            <option value="BTH">Buddhist: Theravada</option>
            <option value="BUD">Buddhist</option>
            <option value="CAT">Christian: Roman Catholic</option>
            <option value="CFR">Chinese Folk Religionist</option>
            <option value="CHR">Christian</option>
            <option value="CHS">Christian: Christian Science</option>
            <option value="CMA">Christian: Christian Missionary Alliance</option>
            <option value="CNF">Confucian</option>
            <option value="COC">Christian: Church of Christ</option>
            <option value="COG">Christian: Church of God</option>
            <option value="COI">Christian: Church of God in Christ</option>
            <option value="COL">Christian: Congregational</option>
            <option value="COM">Christian: Community</option>
            <option value="COP">Christian: Other Pentecostal</option>
            <option value="COT">Christian: Other</option>
            <option value="CRR">Christian: Christian Reformed</option>
            <option value="EOT">Christian: Eastern Orthodox</option>
            <option value="EPI">Christian: Episcopalian</option>
            <option value="ERL">Ethnic Religionist</option>
            <option value="EVC">Christian: Evangelical Church</option>
            <option value="FRQ">Christian: Friends</option>
            <option value="FWB">Christian: Free Will Baptist</option>
            <option value="GRE">Christian: Greek Orthodox</option>
            <option value="HIN">Hindu</option>
            <option value="HOT">Hindu: Other</option>
            <option value="HSH">Hindu: Shaivites</option>
            <option value="HVA">Hindu: Vaishnavites</option>
            <option value="JAI">Jain</option>
            <option value="JCO">Jewish: Conservative</option>
            <option value="JEW">Jewish</option>
            <option value="JOR">Jewish: Orthodox</option>
            <option value="JOT">Jewish: Other</option>
            <option value="JRC">Jewish: Reconstructionist</option>
            <option value="JRF">Jewish: Reform</option>
            <option value="JRN">Jewish: Renewal</option>
            <option value="JWN">Christian: Jehovah's Witness</option>
            <option value="LMS">Christian: Lutheran Missouri Synod</option>
            <option value="LUT">Christian: Lutheran</option>
            <option value="MEN">Christian: Mennonite</option>
            <option value="MET">Christian: Methodist</option>
            <option value="MOM">Christian: Latter-day Saints</option>
            <option value="MOS">Muslim</option>
            <option value="MOT">Muslim: Other</option>
            <option value="MSH">Muslim: Shiite</option>
            <option value="MSU">Muslim: Sunni</option>
            <option value="NAM">Native American</option>
            <option value="NAZ">Christian: Church of the Nazarene</option>
            <option value="NOE">Nonreligious</option>
            <option value="NRL">New Religionist</option>
            <option value="ORT">Christian: Orthodox</option>
            <option value="OTH">Other</option>
            <option value="PEN">Christian: Pentecostal</option>
            <option value="PRC">Christian: Other Protestant</option>
            <option value="PRE">Christian: Presbyterian</option>
            <option value="PRO">Christian: Protestant</option>
            <option value="QUA">Christian: Friends</option>
            <option value="REC">Christian: Reformed Church</option>
            <option value="REO">Christian: Reorganized Church of Jesus Christ-LDS</option>
            <option value="SAA">Christian: Salvation Army</option>
            <option value="SEV">Christian: Seventh Day Adventist</option>
            <option value="SHN">Shintoist</option>
            <option value="SIK">Sikh</option>
            <option value="SOU">Christian: Southern Baptist</option>
            <option value="SPI">Spiritist</option>
            <option value="UCC">Christian: United Church of Christ</option>
            <option value="UMD">Christian: United Methodist</option>
            <option value="UNI">Christian: Unitarian</option>
            <option value="UNU">Christian: Unitarian Universalist</option>
            <option value="VAR">Unknown</option>
            <option value="WES">Christian: Wesleyan</option>
            <option value="WMC">Christian: Wesleyan Methodist</option>
          </select>
        </FormField>

        <FormField label="病患帳戶編號" enName="Patient Account Number" fieldNotation="PID-18">
          <input type="text" id="accountNumber" name="accountNumber"
            value={pidData?.accountNumber || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入病患帳戶編號'} />
        </FormField>

        <FormField label="身分證字號" enName="SSN Number" fieldNotation="PID-19">
          <input type="text" id="ssnNumber" name="ssnNumber"
            value={pidData?.ssnNumber || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入身分證字號'} />
        </FormField>

        <FormField label="駕駛執照號碼" enName="Driver's License Number" fieldNotation="PID-20">
          <input type="text" id="driversLicense" name="driversLicense"
            value={pidData?.driversLicense || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入駕駛執照號碼'} />
        </FormField>

        <FormField label="母親識別號" enName="Mother's Identifier" fieldNotation="PID-21">
          <input type="text" id="mothersIdentifier" name="mothersIdentifier"
            value={pidData?.mothersIdentifier || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入母親識別號'} />
        </FormField>

        <FormField label="民族群體" enName="Ethnic Group" fieldNotation="PID-22">
          <input type="text" id="ethnicGroup" name="ethnicGroup"
            value={pidData?.ethnicGroup || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入民族群體'} />
        </FormField>

        <FormField label="出生地點" enName="Birth Place" fieldNotation="PID-23">
          <input type="text" id="birthPlace" name="birthPlace"
            value={pidData?.birthPlace || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入出生地點'} />
        </FormField>

        <FormField label="多胞胎標記" enName="Multiple Birth Indicator" fieldNotation="PID-24">
          <select id="multipleBirthIndicator" name="multipleBirthIndicator" value={pidData?.multipleBirthIndicator || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="Y">{t('common.yes')}</option>
            <option value="N">{t('common.no')}</option>
          </select>
        </FormField>

        <FormField label="出生順序" enName="Birth Order" fieldNotation="PID-25">
          <input type="number" id="birthOrder" name="birthOrder"
            value={pidData?.birthOrder || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入出生順序'} min="1" />
        </FormField>

        <FormField label="國籍" enName="Citizenship" fieldNotation="PID-26">
          <input type="text" id="citizenship" name="citizenship"
            value={pidData?.citizenship || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入國籍'} />
        </FormField>

        <FormField label="退伍軍人身份" enName="Veterans Military Status" fieldNotation="PID-27">
          <input type="text" id="veteransMilitaryStatus" name="veteransMilitaryStatus"
            value={pidData?.veteransMilitaryStatus || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入退伍軍人身份'} />
        </FormField>

        <FormField label="民族" enName="Nationality" fieldNotation="PID-28">
          <input type="text" id="nationality" name="nationality"
            value={pidData?.nationality || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入民族'} />
        </FormField>

        <FormField label="死亡日期時間" enName="Patient Death Date and Time" fieldNotation="PID-29">
          <input type="datetime-local" id="patientDeathDateTime" name="patientDeathDateTime"
            value={pidData?.patientDeathDateTime || ""} onChange={handleInputChange}
            className={dateTimeClassName} />
        </FormField>

        <FormField label="死亡標記" enName="Patient Death Indicator" fieldNotation="PID-30">
          <select id="patientDeathIndicator" name="patientDeathIndicator" value={pidData?.patientDeathIndicator || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="Y">{t('common.yes')}</option>
            <option value="N">{t('common.no')}</option>
          </select>
        </FormField>

        <FormField label="身分不明標記" enName="Identity Unknown Indicator" fieldNotation="PID-31">
          <select id="identityUnknownIndicator" name="identityUnknownIndicator" value={pidData?.identityUnknownIndicator || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="Y">{t('common.yes')}</option>
            <option value="N">{t('common.no')}</option>
          </select>
        </FormField>

        <FormField label="身分可靠性代碼" enName="Identity Reliability Code" fieldNotation="PID-32">
          <input type="text" id="identityReliabilityCode" name="identityReliabilityCode"
            value={pidData?.identityReliabilityCode || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入身分可靠性代碼'} />
        </FormField>

        <FormField label="最後更新日期時間" enName="Last Update Date/Time" fieldNotation="PID-33">
          <input type="datetime-local" id="lastUpdateDateTime" name="lastUpdateDateTime"
            value={pidData?.lastUpdateDateTime || ""} onChange={handleInputChange}
            className={dateTimeClassName} />
        </FormField>

        <FormField label="最後更新設施" enName="Last Update Facility" fieldNotation="PID-34">
          <input type="text" id="lastUpdateFacility" name="lastUpdateFacility"
            value={pidData?.lastUpdateFacility || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入最後更新設施'} />
        </FormField>

        <FormField label="物種代碼" enName="Species Code" fieldNotation="PID-35">
          <input type="text" id="speciesCode" name="speciesCode"
            value={pidData?.speciesCode || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入物種代碼'} />
        </FormField>

        <FormField label="品種代碼" enName="Breed Code" fieldNotation="PID-36">
          <input type="text" id="breedCode" name="breedCode"
            value={pidData?.breedCode || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入品種代碼'} />
        </FormField>

        <FormField label="菌株" enName="Strain" fieldNotation="PID-37">
          <input type="text" id="strain" name="strain"
            value={pidData?.strain || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入菌株'} />
        </FormField>

        <FormField label="生產類別代碼" enName="Production Class Code" fieldNotation="PID-38">
          <input type="text" id="productionClassCode" name="productionClassCode"
            value={pidData?.productionClassCode || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入生產類別代碼'} />
        </FormField>

        <FormField label="部落公民身份" enName="Tribal Citizenship" fieldNotation="PID-39">
          <input type="text" id="tribalCitizenship" name="tribalCitizenship"
            value={pidData?.tribalCitizenship || ""} onChange={handleInputChange}
            className={inputClassName} placeholder={isEn ? '' : '請輸入部落公民身份'} />
        </FormField>
      </FormSection>
    </>
  );
};

export default PIDSection;
