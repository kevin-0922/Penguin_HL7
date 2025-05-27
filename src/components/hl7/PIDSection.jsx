import { useSelector, useDispatch } from "react-redux";
import { updateFormData } from "../../store/hl7FormSlice";
import FormSection, {
  FormField,
  inputClassName,
  selectClassName,
  dateTimeClassName,
} from "./FormSection";

const PIDSection = ({ messageType }) => {
  const dispatch = useDispatch();
  const pidData = useSelector((state) => state.hl7Form.forms[messageType].pid);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(
      updateFormData({
        messageType: messageType, //辨別是哪個訊息類型
        segment: "pid",
        field: id,
        value,
      })
    );
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">病人識別段落 (PID)</h3>
        <p className="text-sm text-blue-600">
          此段落用於記錄病人的詳細識別信息，包括基本資料、聯絡方式等。 標記 * 的欄位為必填項目。
        </p>
      </div>

      <FormSection title="PID (病人識別)">
        {/* PID-2 Patient ID */}
        <FormField label="病患編號" enName="Patient ID" fieldNotation="PID-2">
          <input
            type="text"
            id="patientId"
            name="patientId"
            value={pidData?.patientId || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入病患編號"
          />
        </FormField>

        {/* PID-3 Patient Identifier List */}
        <FormField
          label="病患識別號碼清單"
          enName="Patient Identifier List"
          fieldNotation="PID-3"
        >
          <input
            type="text"
            id="patientIdList"
            name="patientIdList"
            value={pidData?.patientIdList || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入病患識別號碼清單"
          />
        </FormField>

        {/* PID-4 Alternate Patient ID */}
        <FormField label="替代病患編號" enName="Alternate Patient ID" fieldNotation="PID-4">
          <input
            type="text"
            id="alternatePatientId"
            name="alternatePatientId"
            value={pidData?.alternatePatientId || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入替代病患編號"
          />
        </FormField>

        {/* PID-5 Patient Name */}
        <FormField label="病患姓名" enName="Patient Name" fieldNotation="PID-5">
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={pidData?.patientName || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入病患姓名"
          />
        </FormField>

        {/* PID-6 Mother's Maiden Name */}
        <FormField label="母親娘家姓氏" enName="Mother's Maiden Name" fieldNotation="PID-6">
          <input
            type="text"
            id="motherMaidenName"
            name="motherMaidenName"
            value={pidData?.motherMaidenName || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入母親娘家姓氏"
          />
        </FormField>

        {/* PID-7 Birth Date */}
        <FormField label="出生日期時間" enName="Birth Date" fieldNotation="PID-7">
          <input
            type="datetime-local"
            id="birthDateTime"
            name="birthDateTime"
            value={pidData?.birthDateTime || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* PID-8 Sex */}
        <FormField label="法定性別" enName="Administrative Sex" fieldNotation="PID-8">
          <select
            id="sex"
            name="sex"
            value={pidData?.sex || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="A">模糊 (Ambiguous)</option>
            <option value="M">男性 (Male)</option>
            <option value="F">女性 (Female)</option>
            <option value="N">不適用 (Not Applicable)</option>
            <option value="O">其他 (Other)</option>
            <option value="U">未知 (Unknown)</option>
          </select>
        </FormField>

        {/* PID-9 Patient Alias */}
        <FormField label="病患別稱" enName="Patient Alias" fieldNotation="PID-9">
          <input
            type="text"
            id="alias"
            name="alias"
            value={pidData?.alias || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入病患別稱"
          />
        </FormField>

        {/* PID-10 Race */}
        <FormField label="種族" enName="Race" fieldNotation="PID-10">
          <select
            id="race"
            name="race"
            value={pidData?.race || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="2028-9">亞洲人 (Asian)</option>
            <option value="2054-5">黑人或非裔美國人 (Black or African American)</option>
            <option value="1002-5">美國印地安人或阿拉斯加原住民 (American Indian or Alaska Native)</option>
            <option value="2076-8">夏威夷原住民或其他太平洋島民 (	Native Hawaiian or Other Pacific Islander)</option>
            <option value="2106-3">白人 (White)</option>
            <option value="2131-1">其他 (Other Race)</option>
          </select>
        </FormField>

        {/* PID-11 Patient Address */}
        <FormField label="病患地址" enName="Patient Address" fieldNotation="PID-11">
          <input
            type="text"
            id="patientAddress"
            name="patientAddress"
            value={pidData?.patientAddress || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入病患地址"
          />
        </FormField>

        {/* PID-12 County Code */}
        <FormField label="縣市代碼" enName="County Code" fieldNotation="PID-12">
          <input
            type="text"
            id="countryCode"
            name="countryCode"
            value={pidData?.countryCode || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入縣市代碼"
          />
        </FormField>

        {/* PID-13 Phone Number - Home */}
        <FormField label="住家電話" enName="Phone Number - Home" fieldNotation="PID-13">
          <input
            type="tel"
            id="phoneNumberHome"
            name="phoneNumberHome"
            value={pidData?.phoneNumberHome || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入住家電話"
          />
        </FormField>

        {/* PID-14 Phone Number - Business */}
        <FormField
          label="工作電話"
          enName="Phone Number - Business"
          fieldNotation="PID-14"
        >
          <input
            type="tel"
            id="phoneNumberBusiness"
            name="phoneNumberBusiness"
            value={pidData?.phoneNumberBusiness || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入工作電話"
          />
        </FormField>

        {/* PID-15 Primary Language */}
        <FormField label="主要使用語言" enName="Primary Language" fieldNotation="PID-15">
          <input
            type="text"
            id="primaryLanguage"
            name="primaryLanguage"
            value={pidData?.primaryLanguage || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入主要使用語言"
          />
        </FormField>

        {/* PID-16 Marital Status */}
        <FormField label="婚姻狀況" enName="Marital Status" fieldNotation="PID-16">
          <select
            id="maritalStatus"
            name="maritalStatus"
            value={pidData?.maritalStatus || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="A">分居 (Separated)</option>
            <option value="B">未婚 (Unmarried)</option>
            <option value="C">同居 (Common law)</option>
            <option value="D">離婚 (Divorced)</option>
            <option value="E">合法分居 (Legally Separated)</option>
            <option value="G">同居中 (Living together)</option>
            <option value="I">臨時判決 (Interlocutory)</option>
            <option value="M">已婚 (Married)</option>
            <option value="N">婚姻無效 (Annulled)</option>
            <option value="O">其他 (Other)</option>
            <option value="P">同居伴侶 (Domestic partner)</option>
            <option value="R">已登記同居伴侶 (Registered domestic partner)</option>
            <option value="S">單身 (Single)</option>
            <option value="T">未報告 (Unreported)</option>
            <option value="U">未知 (Unknown)</option>
            <option value="W">喪偶 (Widowed)</option>
          </select>
        </FormField>

        {/* PID-17 Religion */}
        <FormField label="宗教信仰" enName="Religion" fieldNotation="PID-17">
          <select
            id="religion"
            name="religion"
            value={pidData?.religion || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="ABC">基督教：美國浸信會 (Christian: American Baptist Church)</option>
            <option value="AGN">不可知論者 (Agnostic)</option>
            <option value="AME">基督教：非洲衛理公會聖公會 (Christian: African Methodist Episcopal Zion)</option>
            <option value="AMT">基督教：非洲衛理公會 (Christian: African Methodist Episcopal)</option>
            <option value="ANG">基督教：英國國教 (Christian: Anglican)</option>
            <option value="AOG">基督教：神召會 (Christian: Assembly of God)</option>
            <option value="ATH">無神論者 (Atheist)</option>
            <option value="BAH">巴哈伊教 (Baha'i)</option>
            <option value="BAP">基督教：浸信會 (Christian: Baptist)</option>
            <option value="BMA">佛教：大乘佛教 (Buddhist: Mahayana)</option>
            <option value="BOT">佛教：其他 (Buddhist: Other)</option>
            <option value="BTA">佛教：密宗 (Buddhist: Tantrayana)</option>
            <option value="BTH">佛教：上座部佛教 (Buddhist: Theravada)</option>
            <option value="BUD">佛教 (Buddhist)</option>
            <option value="CAT">基督教：羅馬天主教 (Christian: Roman Catholic)</option>
            <option value="CFR">中國民間宗教 (Chinese Folk Religionist)</option>
            <option value="CHR">基督教 (Christian)</option>
            <option value="CHS">基督教：基督教科學會 (Christian: Christian Science)</option>
            <option value="CMA">基督教：基督教宣道會 (Christian: Christian Missionary Alliance)</option>
            <option value="CNF">儒教 (Confucian)</option>
            <option value="COC">基督教：基督教會 (Christian: Church of Christ)</option>
            <option value="COG">基督教：神的教會 (Christian: Church of God)</option>
            <option value="COI">基督教：基督裡的神的教會 (Christian: Church of God in Christ)</option>
            <option value="COL">基督教：公理會 (Christian: Congregational)</option>
            <option value="COM">基督教：社區教會 (Christian: Community)</option>
            <option value="COP">基督教：其他五旬節派 (Christian: Other Pentecostal)</option>
            <option value="COT">基督教：其他 (Christian: Other)</option>
            <option value="CRR">基督教：基督改革宗 (Christian: Christian Reformed)</option>
            <option value="EOT">基督教：東正教 (Christian: Eastern Orthodox)</option>
            <option value="EPI">基督教：聖公會 (Christian: Episcopalian)</option>
            <option value="ERL">民族宗教信仰者 (Ethnic Religionist)</option>
            <option value="EVC">基督教：福音教會 (Christian: Evangelical Church)</option>
            <option value="FRQ">基督教：貴格會 (Christian: Friends)</option>
            <option value="FWB">基督教：自由意志浸信會 (Christian: Free Will Baptist)</option>
            <option value="GRE">基督教：希臘東正教 (Christian: Greek Orthodox)</option>
            <option value="HIN">印度教 (Hindu)</option>
            <option value="HOT">印度教：其他 (Hindu: Other)</option>
            <option value="HSH">印度教：濕婆派 (Hindu: Shaivites)</option>
            <option value="HVA">印度教：毗濕奴派 (Hindu: Vaishnavites)</option>
            <option value="JAI">耆那教 (Jain)</option>
            <option value="JCO">猶太教：保守派 (Jewish: Conservative)</option>
            <option value="JEW">猶太教 (Jewish)</option>
            <option value="JOR">猶太教：正統派 (Jewish: Orthodox)</option>
            <option value="JOT">猶太教：其他 (Jewish: Other)</option>
            <option value="JRC">猶太教：重建派 (Jewish: Reconstructionist)</option>
            <option value="JRF">猶太教：改革派 (Jewish: Reform)</option>
            <option value="JRN">猶太教：更新派 (Jewish: Renewal)</option>
            <option value="JWN">基督教：耶和華見證人 (Christian: Jehovah's Witness)</option>
            <option value="LMS">基督教：路德會密蘇里宗 (Christian: Lutheran Missouri Synod)</option>
            <option value="LUT">基督教：路德會 (Christian: Lutheran)</option>
            <option value="MEN">基督教：門諾會 (Christian: Mennonite)</option>
            <option value="MET">基督教：衛理公會 (Christian: Methodist)</option>
            <option value="MOM">基督教：末世聖徒 (Christian: Latter-day Saints)</option>
            <option value="MOS">伊斯蘭教 (Muslim)</option>
            <option value="MOT">伊斯蘭教：其他 (Muslim: Other)</option>
            <option value="MSH">伊斯蘭教：什葉派 (Muslim: Shiite)</option>
            <option value="MSU">伊斯蘭教：遜尼派 (Muslim: Sunni)</option>
            <option value="NAM">美洲原住民宗教 (Native American)</option>
            <option value="NAZ">基督教：拿撒勒人教會 (Christian: Church of the Nazarene)</option>
            <option value="NOE">無宗教信仰 (Nonreligious)</option>
            <option value="NRL">新興宗教信仰者 (New Religionist)</option>
            <option value="ORT">基督教：東正教 (Christian: Orthodox)</option>
            <option value="OTH">其他 (Other)</option>
            <option value="PEN">基督教：五旬節派 (Christian: Pentecostal)</option>
            <option value="PRC">基督教：其他新教 (Christian: Other Protestant)</option>
            <option value="PRE">基督教：長老會 (Christian: Presbyterian)</option>
            <option value="PRO">基督教：新教 (Christian: Protestant)</option>
            <option value="QUA">基督教：貴格會 (Christian: Friends)</option>
            <option value="REC">基督教：改革宗教會 (Christian: Reformed Church)</option>
            <option value="REO">基督教：耶穌基督重組教會-末世聖徒 (Christian: Reorganized Church of Jesus Christ-LDS)</option>
            <option value="SAA">基督教：救世軍 (Christian: Salvation Army)</option>
            <option value="SEV">基督教：基督復臨安息日會 (Christian: Seventh Day Adventist)</option>
            <option value="SHN">神道教 (Shintoist)</option>
            <option value="SIK">錫克教 (Sikh)</option>
            <option value="SOU">基督教：美南浸信會 (Christian: Southern Baptist)</option>
            <option value="SPI">通靈主義者 (Spiritist)</option>
            <option value="UCC">基督教：基督聯合教會 (Christian: United Church of Christ)</option>
            <option value="UMD">基督教：聯合衛理公會 (Christian: United Methodist)</option>
            <option value="UNI">基督教：一神論派 (Christian: Unitarian)</option>
            <option value="UNU">基督教：一神論普救派 (Christian: Unitarian Universalist)</option>
            <option value="VAR">未知 (Unknown)</option>
            <option value="WES">基督教：衛斯理宗 (Christian: Wesleyan)</option>
            <option value="WMC">基督教：衛斯理衛理公會 (Christian: Wesleyan Methodist)</option>
          </select>
        </FormField>

        {/* PID-18 Patient Account Number */}
        <FormField
          label="病患帳戶編號"
          enName="Patient Account Number"
          fieldNotation="PID-18"
        >
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={pidData?.accountNumber || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入病患帳戶編號"
          />
        </FormField>

        {/* PID-19 SSN Number */}
        <FormField label="身分證字號" enName="SSN Number" fieldNotation="PID-19">
          <input
            type="text"
            id="ssnNumber"
            name="ssnNumber"
            value={pidData?.ssnNumber || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入身分證字號"
          />
        </FormField>

        {/* PID-20 Driver's License Number */}
        <FormField
          label="駕駛執照號碼"
          enName="Driver's License Number"
          fieldNotation="PID-20"
        >
          <input
            type="text"
            id="driversLicense"
            name="driversLicense"
            value={pidData?.driversLicense || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入駕駛執照號碼"
          />
        </FormField>

        {/* PID-21 Mother's Identifier */}
        <FormField label="母親識別號" enName="Mother's Identifier" fieldNotation="PID-21">
          <input
            type="text"
            id="mothersIdentifier"
            name="mothersIdentifier"
            value={pidData?.mothersIdentifier || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入母親識別號"
          />
        </FormField>

        {/* PID-22 Ethnic Group */}
        <FormField label="民族群體" enName="Ethnic Group" fieldNotation="PID-22">
          <input
            type="text"
            id="ethnicGroup"
            name="ethnicGroup"
            value={pidData?.ethnicGroup || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入民族群體"
          />
        </FormField>

        {/* PID-23 Birth Place */}
        <FormField label="出生地點" enName="Birth Place" fieldNotation="PID-23">
          <input
            type="text"
            id="birthPlace"
            name="birthPlace"
            value={pidData?.birthPlace || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入出生地點"
          />
        </FormField>

        {/* PID-24 Multiple Birth Indicator */}
        <FormField
          label="多胞胎標記"
          enName="Multiple Birth Indicator"
          fieldNotation="PID-24"
        >
          <select
            id="multipleBirthIndicator"
            name="multipleBirthIndicator"
            value={pidData?.multipleBirthIndicator || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是</option>
            <option value="N">否</option>
          </select>
        </FormField>

        {/* PID-25 Birth Order */}
        <FormField label="出生順序" enName="Birth Order" fieldNotation="PID-25">
          <input
            type="number"
            id="birthOrder"
            name="birthOrder"
            value={pidData?.birthOrder || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入出生順序"
            min="1"
          />
        </FormField>

        {/* PID-26 Citizenship */}
        <FormField label="國籍" enName="Citizenship" fieldNotation="PID-26">
          <input
            type="text"
            id="citizenship"
            name="citizenship"
            value={pidData?.citizenship || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入國籍"
          />
        </FormField>

        {/* PID-27 Veterans Military Status */}
        <FormField
          label="退伍軍人身份"
          enName="Veterans Military Status"
          fieldNotation="PID-27"
        >
          <input
            type="text"
            id="veteransMilitaryStatus"
            name="veteransMilitaryStatus"
            value={pidData?.veteransMilitaryStatus || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入退伍軍人身份"
          />
        </FormField>

        {/* PID-28 Nationality */}
        <FormField label="民族" enName="Nationality" fieldNotation="PID-28">
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={pidData?.nationality || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入民族"
          />
        </FormField>

        {/* PID-29 Patient Death Date and Time */}
        <FormField
          label="死亡日期時間"
          enName="Patient Death Date and Time"
          fieldNotation="PID-29"
        >
          <input
            type="datetime-local"
            id="patientDeathDateTime"
            name="patientDeathDateTime"
            value={pidData?.patientDeathDateTime || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* PID-30 Patient Death Indicator */}
        <FormField
          label="死亡標記"
          enName="Patient Death Indicator"
          fieldNotation="PID-30"
        >
          <select
            id="patientDeathIndicator"
            name="patientDeathIndicator"
            value={pidData?.patientDeathIndicator || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是</option>
            <option value="N">否</option>
          </select>
        </FormField>

        {/* PID-31 Identity Unknown Indicator */}
        <FormField
          label="身分不明標記"
          enName="Identity Unknown Indicator"
          fieldNotation="PID-31"
        >
          <select
            id="identityUnknownIndicator"
            name="identityUnknownIndicator"
            value={pidData?.identityUnknownIndicator || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是</option>
            <option value="N">否</option>
          </select>
        </FormField>

        {/* PID-32 Identity Reliability Code */}
        <FormField label="身分可靠性代碼" enName="Identity Reliability Code" fieldNotation="PID-32">
          <input
            type="text"
            id="identityReliabilityCode"
            name="identityReliabilityCode"
            value={pidData?.identityReliabilityCode || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入身分可靠性代碼"
          />
        </FormField>

        {/* PID-33 Last Update Date/Time */}
        <FormField label="最後更新日期時間" enName="Last Update Date/Time" fieldNotation="PID-33">
          <input
            type="datetime-local"
            id="lastUpdateDateTime"
            name="lastUpdateDateTime"
            value={pidData?.lastUpdateDateTime || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* PID-34 Last Update Facility */}
        <FormField label="最後更新設施" enName="Last Update Facility" fieldNotation="PID-34">
          <input
            type="text"
            id="lastUpdateFacility"
            name="lastUpdateFacility"
            value={pidData?.lastUpdateFacility || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入最後更新設施"
          />
        </FormField>

        {/* PID-35 Species Code */}
        <FormField label="物種代碼" enName="Species Code" fieldNotation="PID-35">
          <input
            type="text"
            id="speciesCode"
            name="speciesCode"
            value={pidData?.speciesCode || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入物種代碼"
          />
        </FormField>

        {/* PID-36 Breed Code */}
        <FormField label="品種代碼" enName="Breed Code" fieldNotation="PID-36">
          <input
            type="text"
            id="breedCode"
            name="breedCode"
            value={pidData?.breedCode || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入品種代碼"
          />
        </FormField>

        {/* PID-37 Strain */}
        <FormField label="菌株" enName="Strain" fieldNotation="PID-37">
          <input
            type="text"
            id="strain"
            name="strain"
            value={pidData?.strain || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入菌株"
          />
        </FormField>

        {/* PID-38 Production Class Code */}
        <FormField label="生產類別代碼" enName="Production Class Code" fieldNotation="PID-38">
          <input
            type="text"
            id="productionClassCode"
            name="productionClassCode"
            value={pidData?.productionClassCode || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入生產類別代碼"
          />
        </FormField>

        {/* PID-39 Tribal Citizenship */}
        <FormField label="部落公民身份 (PID-39)" enName="Tribal Citizenship" fieldNotation="PID-39">
          <input
            type="text"
            id="tribalCitizenship"
            name="tribalCitizenship"
            value={pidData?.tribalCitizenship || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入部落公民身份"
          />
        </FormField>
      </FormSection>
    </>
  );
};

export default PIDSection;
