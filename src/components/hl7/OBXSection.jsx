import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName, selectClassName, dateTimeClassName } from './FormSection';

const OBXSection = ({messageType}) => {
  const dispatch = useDispatch();
  const obxData = useSelector((state) => state.hl7Form.forms[messageType].obx);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({
      messageType: messageType, //辨別是哪個訊息類型
      segment: 'obx',
      field: id,
      value
    }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">觀察結果段落 (OBX)</h3>
        <p className="text-sm text-blue-600">
          此段落用於記錄檢驗/檢查的觀察結果，包括結果值、單位、參考範圍等資訊。
          標記 * 的欄位為必填項目。
        </p>
      </div>

      <FormSection title="OBX (觀察結果)">
        {/* OBX-1 Set ID */}
        <FormField label="序號" enName='Set ID' fieldNotation="OBX-1">
          <input
            type="text"
            id="setId"
            value={obxData?.setId || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入序號"
          />
        </FormField>

        {/* OBX-2 Value Type */}
        <FormField label="值類型" enName="Value Type" fieldNotation="OBX-2" required>
          <select
            id="valueType"
            value={obxData?.valueType || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="NM">數值 (NM)</option>
            <option value="ST">字串 (ST)</option>
            <option value="TX">文本 (TX)</option>
            <option value="CE">編碼元素 (CE)</option>
            <option value="CWE">編碼與文字 (CWE)</option>
            <option value="DT">日期 (DT)</option>
            <option value="TM">時間 (TM)</option>
            <option value="TS">時間戳 (TS)</option>
          </select>
        </FormField>

        {/* OBX-3 Observation Identifier */}
        <FormField label="觀察識別碼" enName='Observation Identifier' fieldNotation="OBX-3" required>
          <input
            type="text"
            id="observationIdentifier"
            value={obxData?.observationIdentifier || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入觀察識別碼"
          />
        </FormField>

        {/* OBX-4 Observation Sub-ID */}
        <FormField label="觀察子識別碼" enName='Observation Sub-ID' fieldNotation="OBX-4">
          <input
            type="text"
            id="observationSubId"
            value={obxData?.observationSubId || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入觀察子識別碼"
          />
        </FormField>

        {/* OBX-5 Observation Value */}
        <FormField label="觀察值" enName='Observation Value' fieldNotation="OBX-5">
          <textarea
            id="observationValue"
            value={obxData?.observationValue || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入觀察值"
            rows="3"
          />
        </FormField>

        {/* OBX-6 Units */}
        <FormField label="單位" enName='Units' fieldNotation="OBX-6">
          <input
            type="text"
            id="units"
            value={obxData?.units || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入單位"
          />
        </FormField>

        {/* OBX-7 References Range */}
        <FormField label="參考範圍" enName='References Range' fieldNotation="OBX-7">
          <input
            type="text"
            id="referencesRange"
            value={obxData?.referencesRange || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入參考範圍"
          />
        </FormField>

        {/* OBX-8 Abnormal Flags */}
        <FormField label="異常標記" enName='Abnormal Flags' fieldNotation="OBX-8">
          <select
            id="abnormalFlags"
            value={obxData?.abnormalFlags || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="L">低於參考值 (L)</option>
            <option value="H">高於參考值 (H)</option>
            <option value="LL">極低 (LL)</option>
            <option value="HH">極高 (HH)</option>
            <option value="N">正常 (N)</option>
            <option value="A">異常 (A)</option>
          </select>
        </FormField>

        {/* OBX-9 Probability */}
        <FormField label="概率" enName='Probability' fieldNotation="OBX-9">
          <input
            type="number"
            id="probability"
            value={obxData?.probability || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入概率"
            step="0.01"
            min="0"
            max="1"
          />
        </FormField>

        {/* OBX-10 Nature of Abnormal Test */}
        <FormField label="異常測試性質" enName='Nature of Abnormal Test' fieldNotation="OBX-10">
          <select
            id="natureOfAbnormalTest"
            value={obxData?.natureOfAbnormalTest || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="A">異常 (A)</option>
            <option value="N">正常 (N)</option>
            <option value="I">不確定 (I)</option>
          </select>
        </FormField>

        {/* OBX-11 Observation Result Status */}
        <FormField label="觀察結果狀態" enName='Observation Result Status' fieldNotation="OBX-11" required>
          <select
            id="observationResultStatus"
            value={obxData?.observationResultStatus || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="P">初步結果 (P)</option>
            <option value="F">最終結果 (F)</option>
            <option value="C">修改結果 (C)</option>
            <option value="X">無法取得結果 (X)</option>
            <option value="I">待處理 (I)</option>
            <option value="S">部分結果 (S)</option>
          </select>
        </FormField>

        {/* OBX-12 Effective Date of Reference Range */}
        <FormField label="參考範圍生效日期" enName='Effective Date of Reference Range' fieldNotation="OBX-12">
          <input
            type="datetime-local"
            id="effectiveDateOfReferenceRange"
            value={obxData?.effectiveDateOfReferenceRange || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* OBX-13 User Defined Access Checks */}
        <FormField label="用戶定義訪問檢查" enName='User Defined Access Checks' fieldNotation="OBX-13">
          <input
            type="text"
            id="userDefinedAccessChecks"
            value={obxData?.userDefinedAccessChecks || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入用戶定義訪問檢查"
          />
        </FormField>

        {/* OBX-14 DateTime of the Observation */}
        <FormField label="觀察日期時間" enName='Date/Time of the Observation' fieldNotation="OBX-14">
          <input
            type="datetime-local"
            id="dateTimeOfTheObservation"
            value={obxData?.dateTimeOfTheObservation || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* OBX-15 Producers ID */}
        <FormField label="生產者識別碼" enName="Producer's ID" fieldNotation="OBX-15">
          <input
            type="text"
            id="producersId"
            value={obxData?.producersId || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入生產者識別碼"
          />
        </FormField>

        {/* OBX-16 Responsible Observer */}
        <FormField label="負責觀察者" enName='Responsible Observer' fieldNotation="OBX-16">
          <input
            type="text"
            id="responsibleObserver"
            value={obxData?.responsibleObserver || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入負責觀察者"
          />
        </FormField>

        {/* OBX-17 Observation Method */}
        <FormField label="觀察方法" enName='Observation Method' fieldNotation="OBX-17">
          <input
            type="text"
            id="observationMethod"
            value={obxData?.observationMethod || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入觀察方法"
          />
        </FormField>

        {/* OBX-18 Equipment Instance Identifier */}
        <FormField label="設備實例識別碼" enName='Equipment Instance Identifier' fieldNotation="OBX-18">
          <input
            type="text"
            id="equipmentInstanceIdentifier"
            value={obxData?.equipmentInstanceIdentifier || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入設備實例識別碼"
          />
        </FormField>

        {/* OBX-19 DateTime of the Analysis */}
        <FormField label="分析日期時間" enName='Date/Time of the Analysis' fieldNotation="OBX-19">
          <input
            type="datetime-local"
            id="dateTimeOfTheAnalysis"
            value={obxData?.dateTimeOfTheAnalysis || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* OBX-20 Observation Site */}
        <FormField label="觀察地點" enName=' Observation Site' fieldNotation="OBX-20">
          <input
            type="text"
            id="observationSite"
            value={obxData?.observationSite || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入觀察地點"
          />
        </FormField>

        {/* OBX-21 Observation Instance Identifier */}
        <FormField label="觀察實例識別碼" enName='Observation Instance Identifier' fieldNotation="OBX-21">
          <input
            type="text"
            id="observationInstanceIdentifier"
            value={obxData?.observationInstanceIdentifier || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入觀察實例識別碼"
          />
        </FormField>

        {/* OBX-22 Mood Code */}
        <FormField label="情緒代碼" enName='Mood Code' fieldNotation="OBX-22">
          <select
            id="moodCode"
            value={obxData?.moodCode || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="EVN">事件 (EVN)</option>
            <option value="PRMS">承諾 (PRMS)</option>
            <option value="PRP">提議 (PRP)</option>
            <option value="RQO">要求 (RQO)</option>
          </select>
        </FormField>

        {/* OBX-23 Performing Organization Name */}
        <FormField label="執行組織名稱" enName='Performing Organization Name' fieldNotation="OBX-23">
          <input
            type="text"
            id="performingOrganizationName"
            value={obxData?.performingOrganizationName || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入執行組織名稱"
          />
        </FormField>

        {/* OBX-24 Performing Organization Address */}
        <FormField label="執行組織地址" enName='Performing Organization Address' fieldNotation="OBX-24">
          <textarea
            id="performingOrganizationAddress"
            value={obxData?.performingOrganizationAddress || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入執行組織地址"
            rows="3"
          />
        </FormField>

        {/* OBX-25 Performing Organization Medical Director */}
        <FormField label="執行組織醫療主任" enName='Performing Organization Medical Director' fieldNotation="OBX-25">
          <input
            type="text"
            id="performingOrganizationMedicalDirector"
            value={obxData?.performingOrganizationMedicalDirector || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入執行組織醫療主任"
          />
        </FormField>
      </FormSection>
    </>
  );
};

export default OBXSection; 