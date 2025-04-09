import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName, selectClassName } from './FormSection';

const MSHSection = () => {
  const dispatch = useDispatch();
  const mshData = useSelector((state) => state.hl7Form.msh);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({
      segment: 'msh',
      field: id,
      value
    }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">消息標頭段落 (MSH)</h3>
        <p className="text-sm text-blue-600">
          此段落用於記錄HL7消息的基本標頭信息，包括發送和接收設施等重要資訊。
          標記 * 的欄位為必填項目。
        </p>
      </div>

      <FormSection title="MSH (消息標頭)">
        {/* MSH-3 發送應用程序 */}
        <FormField label="發送應用程序 (MSH-3)" required>
          <input
            type="text"
            id="sendingApplication"
            value={mshData?.sendingApplication || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入發送應用程序"
          />
        </FormField>

        {/* MSH-4 發送設施 */}
        <FormField label="發送設施 (MSH-4)" required>
          <input
            type="text"
            id="sendingFacility"
            value={mshData?.sendingFacility || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入發送設施"
          />
        </FormField>

        {/* MSH-5 接收應用程序 */}
        <FormField label="接收應用程序 (MSH-5)" required>
          <input
            type="text"
            id="receivingApplication"
            value={mshData?.receivingApplication || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入接收應用程序"
          />
        </FormField>

        {/* MSH-6 接收設施 */}
        <FormField label="接收設施 (MSH-6)" required>
          <input
            type="text"
            id="receivingFacility"
            value={mshData?.receivingFacility || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入接收設施"
          />
        </FormField>

        {/* MSH-8 安全性 */}
        <FormField label="安全性 (MSH-8)">
          <input
            type="text"
            id="security"
            value={mshData?.security || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入安全性設定"
          />
        </FormField>

        {/* MSH-10 消息控制ID */}
        <FormField label="消息控制ID (MSH-10)" required>
          <input
            type="text"
            id="messageControlId"
            value={mshData?.messageControlId || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入消息控制ID"
          />
        </FormField>

        {/* MSH-11 處理ID */}
        <FormField label="處理ID (MSH-11)" required>
          <select
            id="processingId"
            name="processingId"
            value={mshData?.processingId || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="D">除錯 (Debug)</option>
            <option value="P">生產 (Production)</option>
            <option value="T">訓練 (Training)</option>
          </select>
        </FormField>

        {/* MSH-13 序列號 */}
        <FormField label="序列號 (MSH-13)">
          <input
            type="text"
            id="sequenceNumber"
            value={mshData?.sequenceNumber || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入序列號"
          />
        </FormField>

        {/* MSH-14 序列指針 */}
        <FormField label="序列指針 (MSH-14)">
          <input
            type="text"
            id="continuationPointer"
            value={mshData?.continuationPointer || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入序列指針"
          />
        </FormField>

        {/* MSH-15 接受確認類型 */}
        <FormField label="接受確認類型 (MSH-15)">
          <select
            id="acceptAckType"
            name="acceptAckType"
            value={mshData?.acceptAckType || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="AL">總是 (Always)</option>
            <option value="NE">從不 (Never)</option>
            <option value="ER">錯誤時 (Error)</option>
            <option value="SU">成功時 (Successful)</option>
          </select>
        </FormField>

        {/* MSH-16 應用程序確認類型 */}
        <FormField label="應用程序確認類型 (MSH-16)">
          <select
            id="applicationAckType"
            name="applicationAckType"
            value={mshData?.applicationAckType || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="AL">總是 (Always)</option>
            <option value="NE">從不 (Never)</option>
            <option value="ER">錯誤時 (Error)</option>
            <option value="SU">成功時 (Successful)</option>
          </select>
        </FormField>
      </FormSection>
    </>
  );
};

export default MSHSection; 