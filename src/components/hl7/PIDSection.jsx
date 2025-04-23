import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName, selectClassName, dateTimeClassName } from './FormSection';

const PIDSection = ({messageType}) => {
  const dispatch = useDispatch();
  const pidData = useSelector((state) => state.hl7Form.forms[messageType].pid);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({
      messageType: messageType, //辨別是哪個訊息類型
      segment: 'pid',
      field: id,
      value
    }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">病人識別段落 (PID)</h3>
        <p className="text-sm text-blue-600">
          此段落用於記錄病人的詳細識別信息，包括基本資料、聯絡方式等。
          標記 * 的欄位為必填項目。
        </p>
      </div>

      <FormSection title="PID (病人識別)">
        {/* PID-2 Patient ID */}
        <FormField label="病患編號 (PID-2)">
          <input
            type="text"
            id="patientId"
            name="patientId"
            value={pidData?.patientId || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入病患編號"
          />
        </FormField>

        {/* PID-3 Patient Identifier List */}
        <FormField label="病患識別號碼清單 (PID-3)" required>
          <input
            type="text"
            id="patientIdList"
            name="patientIdList"
            value={pidData?.patientIdList || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入病患識別號碼清單"
          />
        </FormField>

        {/* PID-4 Alternate Patient ID */}
        <FormField label="替代病患編號 (PID-4)">
          <input
            type="text"
            id="alternatePatientId"
            name="alternatePatientId"
            value={pidData?.alternatePatientId || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入替代病患編號"
          />
        </FormField>

        {/* PID-5 Patient Name */}
        <FormField label="病患姓名 (PID-5)" required>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={pidData?.patientName || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入病患姓名"
          />
        </FormField>

        {/* PID-6 Mother's Maiden Name */}
        <FormField label="母親娘家姓氏 (PID-6)">
          <input
            type="text"
            id="motherMaidenName"
            name="motherMaidenName"
            value={pidData?.motherMaidenName || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入母親娘家姓氏"
          />
        </FormField>

        {/* PID-7 Birth Date */}
        <FormField label="出生日期時間 (PID-7)" required>
          <input
            type="datetime-local"
            id="birthDateTime"
            name="birthDateTime"
            value={pidData?.birthDateTime || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* PID-8 Sex */}
        <FormField label="法定性別 (PID-8)" required>
          <select
            id="sex"
            name="sex"
            value={pidData?.sex || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="M">男性 (Male)</option>
            <option value="F">女性 (Female)</option>
            <option value="O">其他 (Other)</option>
            <option value="U">未知 (Unknown)</option>
          </select>
        </FormField>

        {/* PID-9 Patient Alias */}
        <FormField label="病患別稱 (PID-9)">
          <input
            type="text"
            id="alias"
            name="alias"
            value={pidData?.alias || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入病患別稱"
          />
        </FormField>

        {/* PID-10 Race */}
        <FormField label="種族 (PID-10)">
          <select
            id="race"
            name="race"
            value={pidData?.race || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="A">亞洲人 (Asian)</option>
            <option value="B">黑人 (Black)</option>
            <option value="C">白人 (Caucasian)</option>
            <option value="H">西班牙裔 (Hispanic)</option>
            <option value="I">印第安人 (Indian)</option>
            <option value="O">其他 (Other)</option>
            <option value="U">未知 (Unknown)</option>
          </select>
        </FormField>

        {/* PID-11 Patient Address */}
        <FormField label="病患地址 (PID-11)">
          <input
            type="text"
            id="patientAddress"
            name="patientAddress"
            value={pidData?.patientAddress || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入病患地址"
          />
        </FormField>

        {/* PID-12 County Code */}
        <FormField label="縣市代碼 (PID-12)">
          <input
            type="text"
            id="countryCode"
            name="countryCode"
            value={pidData?.countryCode || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入縣市代碼"
          />
        </FormField>

        {/* PID-13 Phone Number - Home */}
        <FormField label="住家電話 (PID-13)">
          <input
            type="tel"
            id="phoneNumberHome"
            name="phoneNumberHome"
            value={pidData?.phoneNumberHome || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入住家電話"
          />
        </FormField>

        {/* PID-14 Phone Number - Business */}
        <FormField label="工作電話 (PID-14)">
          <input
            type="tel"
            id="phoneNumberBusiness"
            name="phoneNumberBusiness"
            value={pidData?.phoneNumberBusiness || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入工作電話"
          />
        </FormField>

        {/* PID-15 Primary Language */}
        <FormField label="主要使用語言 (PID-15)">
          <input
            type="text"
            id="primaryLanguage"
            name="primaryLanguage"
            value={pidData?.primaryLanguage || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入主要使用語言"
          />
        </FormField>

        {/* PID-16 Marital Status */}
        <FormField label="婚姻狀況 (PID-16)">
          <select
            id="maritalStatus"
            name="maritalStatus"
            value={pidData?.maritalStatus || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="S">單身 (Single)</option>
            <option value="M">已婚 (Married)</option>
            <option value="D">離婚 (Divorced)</option>
            <option value="W">喪偶 (Widowed)</option>
            <option value="A">分居 (Separated)</option>
            <option value="U">未知 (Unknown)</option>
          </select>
        </FormField>

        {/* PID-17 Religion */}
        <FormField label="宗教信仰 (PID-17)">
          <select
            id="religion"
            name="religion"
            value={pidData?.religion || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="C">天主教 (Catholic)</option>
            <option value="P">基督教 (Protestant)</option>
            <option value="J">猶太教 (Jewish)</option>
            <option value="M">伊斯蘭教 (Muslim)</option>
            <option value="B">佛教 (Buddhist)</option>
            <option value="H">印度教 (Hindu)</option>
            <option value="O">其他 (Other)</option>
            <option value="U">未知 (Unknown)</option>
          </select>
        </FormField>

        {/* PID-18 Patient Account Number */}
        <FormField label="病患帳戶編號 (PID-18)">
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={pidData?.accountNumber || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入病患帳戶編號"
          />
        </FormField>

        {/* PID-19 SSN Number */}
        <FormField label="身分證字號 (PID-19)">
          <input
            type="text"
            id="ssnNumber"
            name="ssnNumber"
            value={pidData?.ssnNumber || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入身分證字號"
          />
        </FormField>

        {/* PID-20 Driver's License Number */}
        <FormField label="駕駛執照號碼 (PID-20)">
          <input
            type="text"
            id="driversLicense"
            name="driversLicense"
            value={pidData?.driversLicense || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入駕駛執照號碼"
          />
        </FormField>

        {/* PID-21 Mother's Identifier */}
        <FormField label="母親識別號 (PID-21)">
          <input
            type="text"
            id="mothersIdentifier"
            name="mothersIdentifier"
            value={pidData?.mothersIdentifier || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入母親識別號"
          />
        </FormField>

        {/* PID-22 Ethnic Group */}
        <FormField label="民族群體 (PID-22)">
          <input
            type="text"
            id="ethnicGroup"
            name="ethnicGroup"
            value={pidData?.ethnicGroup || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入民族群體"
          />
        </FormField>

        {/* PID-23 Birth Place */}
        <FormField label="出生地點 (PID-23)">
          <input
            type="text"
            id="birthPlace"
            name="birthPlace"
            value={pidData?.birthPlace || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入出生地點"
          />
        </FormField>

        {/* PID-24 Multiple Birth Indicator */}
        <FormField label="多胞胎標記 (PID-24)">
          <select
            id="multipleBirthIndicator"
            name="multipleBirthIndicator"
            value={pidData?.multipleBirthIndicator || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是</option>
            <option value="N">否</option>
          </select>
        </FormField>

        {/* PID-25 Birth Order */}
        <FormField label="出生順序 (PID-25)">
          <input
            type="number"
            id="birthOrder"
            name="birthOrder"
            value={pidData?.birthOrder || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入出生順序"
            min="1"
          />
        </FormField>

        {/* PID-26 Citizenship */}
        <FormField label="國籍 (PID-26)">
          <input
            type="text"
            id="citizenship"
            name="citizenship"
            value={pidData?.citizenship || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入國籍"
          />
        </FormField>

        {/* PID-27 Veterans Military Status */}
        <FormField label="退伍軍人身份 (PID-27)">
          <input
            type="text"
            id="veteransMilitaryStatus"
            name="veteransMilitaryStatus"
            value={pidData?.veteransMilitaryStatus || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入退伍軍人身份"
          />
        </FormField>

        {/* PID-28 Nationality */}
        <FormField label="民族 (PID-28)">
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={pidData?.nationality || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入民族"
          />
        </FormField>

        {/* PID-29 Patient Death Date and Time */}
        <FormField label="死亡日期時間 (PID-29)">
          <input
            type="datetime-local"
            id="patientDeathDateTime"
            name="patientDeathDateTime"
            value={pidData?.patientDeathDateTime || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* PID-30 Patient Death Indicator */}
        <FormField label="死亡標記 (PID-30)">
          <select
            id="patientDeathIndicator"
            name="patientDeathIndicator"
            value={pidData?.patientDeathIndicator || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是</option>
            <option value="N">否</option>
          </select>
        </FormField>

        {/* PID-31 Identity Unknown Indicator */}
        <FormField label="身分不明標記 (PID-31)">
          <select
            id="identityUnknownIndicator"
            name="identityUnknownIndicator"
            value={pidData?.identityUnknownIndicator || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是</option>
            <option value="N">否</option>
          </select>
        </FormField>

        {/* PID-32 Identity Reliability Code */}
        <FormField label="身分可靠性代碼 (PID-32)">
          <input
            type="text"
            id="identityReliabilityCode"
            name="identityReliabilityCode"
            value={pidData?.identityReliabilityCode || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入身分可靠性代碼"
          />
        </FormField>

        {/* PID-33 Last Update Date/Time */}
        <FormField label="最後更新日期時間 (PID-33)">
          <input
            type="datetime-local"
            id="lastUpdateDateTime"
            name="lastUpdateDateTime"
            value={pidData?.lastUpdateDateTime || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* PID-34 Last Update Facility */}
        <FormField label="最後更新設施 (PID-34)">
          <input
            type="text"
            id="lastUpdateFacility"
            name="lastUpdateFacility"
            value={pidData?.lastUpdateFacility || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入最後更新設施"
          />
        </FormField>

        {/* PID-35 Species Code */}
        <FormField label="物種代碼 (PID-35)">
          <input
            type="text"
            id="speciesCode"
            name="speciesCode"
            value={pidData?.speciesCode || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入物種代碼"
          />
        </FormField>

        {/* PID-36 Breed Code */}
        <FormField label="品種代碼 (PID-36)">
          <input
            type="text"
            id="breedCode"
            name="breedCode"
            value={pidData?.breedCode || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入品種代碼"
          />
        </FormField>

        {/* PID-37 Strain */}
        <FormField label="菌株 (PID-37)">
          <input
            type="text"
            id="strain"
            name="strain"
            value={pidData?.strain || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入菌株"
          />
        </FormField>

        {/* PID-38 Production Class Code */}
        <FormField label="生產類別代碼 (PID-38)">
          <input
            type="text"
            id="productionClassCode"
            name="productionClassCode"
            value={pidData?.productionClassCode || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入生產類別代碼"
          />
        </FormField>

        {/* PID-39 Tribal Citizenship */}
        <FormField label="部落公民身份 (PID-39)">
          <input
            type="text"
            id="tribalCitizenship"
            name="tribalCitizenship"
            value={pidData?.tribalCitizenship || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入部落公民身份"
          />
        </FormField>

        {/* 多胞胎數量 (額外欄位，不是標準HL7欄位) */}
        <FormField label="多胞胎數量">
          <input
            type="number"
            id="multipleBirthCount"
            name="multipleBirthCount"
            value={pidData?.multipleBirthCount || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入多胞胎數"
            min="0"
          />
        </FormField>
      </FormSection>
    </>
  );
};

export default PIDSection; 