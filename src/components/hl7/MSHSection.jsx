import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName, selectClassName } from './FormSection';
import { useEffect } from 'react';

const MSHSection = ({messageType,hl7MessageType}) => {
  const dispatch = useDispatch();
  const mshData = useSelector((state) => state.hl7Form.forms[messageType]?.msh);

  // 當組件加載或 hl7MessageType 變化時，初始化 messageType 字段
  useEffect(() => {
    if (hl7MessageType && (!mshData?.messageType || mshData.messageType !== hl7MessageType)) {
      dispatch(updateFormData({
        messageType: messageType,
        segment: 'msh',
        field: 'messageType',
        value: hl7MessageType
      }));
    }
  }, [hl7MessageType, messageType, dispatch, mshData?.messageType]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({
      messageType: messageType, //辨別是哪個訊息類型
      segment: 'msh',
      field: id,
      value
    }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">訊息標頭段落 (MSH)</h3>
        <p className="text-sm text-blue-600">
          此段落用於記錄HL7訊息的基本標頭資訊，包括發送和接收機構等重要資訊。
          標記 * 的欄位為必填項目。
        </p>
      </div>

      <FormSection title="MSH (訊息標頭)">
        {/* MSH-3 發送應用程式 */}
        <FormField 
          label="發送應用程式" 
          enName="Sending Application"
          fieldNotation="MSH-3" 
        >
          <input
            type="text"
            id="sendingApplication"
            value={mshData?.sendingApplication || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入發送應用程式"
            required_test
          />
        </FormField>

        {/* MSH-4 發送機構 */}
        <FormField 
          label="發送機構" 
          enName="Sending Facility"
          fieldNotation="MSH-4" 
        >
          <input
            type="text"
            id="sendingFacility"
            value={mshData?.sendingFacility || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入發送機構"
            required_test
          />
        </FormField>

        {/* MSH-5 接收應用程式 */}
        <FormField 
          label="接收應用程式" 
          enName="Receiving Application"
          fieldNotation="MSH-5" 
        >
          <input
            type="text"
            id="receivingApplication"
            value={mshData?.receivingApplication || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入接收應用程式"
            required_test
          />
        </FormField>

        {/* MSH-6 接收機構 */}
        <FormField 
          label="接收機構" 
          enName="Receiving Facility"
          fieldNotation="MSH-6"
        >
          <input
            type="text"
            id="receivingFacility"
            value={mshData?.receivingFacility || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入接收機構"
            required_test
          />
        </FormField>

        {/* MSH-8 安全性 */}
        <FormField 
          label="安全性" 
          enName="Security"
          fieldNotation="MSH-8"
        >
          <input
            type="text"
            id="security"
            value={mshData?.security || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入安全性設定"
          />
        </FormField>

        {/* MSH-9 訊息類型 */}
        <FormField 
          label="訊息類型" 
          enName="Message Type"
          fieldNotation="MSH-9"
        >
          <input
            type="text"
            id="messageType"
            value={mshData?.messageType || hl7MessageType}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入訊息類型"
          />
        </FormField>

        {/* MSH-10 訊息控制ID */}
        <FormField 
          label="訊息控制ID" 
          enName="Message Control ID"
          fieldNotation="MSH-10"
        >
          <input
            type="text"
            id="messageControlId"
            value={mshData?.messageControlId || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入訊息控制ID"
            required_test
          />
        </FormField>

        {/* MSH-11 處理ID */}
        <FormField 
          label="處理ID" 
          enName="Processing ID"
          fieldNotation="MSH-11"
        >
          <select
            id="processingId"
            name="processingId"
            value={mshData?.processingId || ''}
            onChange={handleInputChange}
            className={selectClassName}
            required_test
          >
            <option value="">請選擇</option>
            <option value="P">Production</option>
            <option value="D">Debugging</option>
            <option value="T">Training</option>
          </select>
        </FormField>

        {/* MSH-13 序列號 */}
        <FormField 
          label="序列號" 
          enName="Sequence Number"
          fieldNotation="MSH-13"
        >
          <input
            type="text"
            id="sequenceNumber"
            value={mshData?.sequenceNumber || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入序列號"
          />
        </FormField>

        {/* MSH-14 延續指標 */}
        <FormField 
          label="延續指標" 
          enName="Continuation Pointer"
          fieldNotation="MSH-14"
        >
          <input
            type="text"
            id="continuationPointer"
            value={mshData?.continuationPointer || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入延續指標"
          />
        </FormField>

        {/* MSH-15 接收確認類型 */}
        <FormField 
          label="接收確認類型" 
          enName="Accept Acknowledgment Type"
          fieldNotation="MSH-15"
        >
          <select
            id="acceptAckType"
            name="acceptAckType"
            value={mshData?.acceptAckType || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="AL">Always</option>
            <option value="NE">Never</option>
            <option value="ER">Error/reject conditions only</option>
            <option value="SU">Successful completion only</option>
          </select>
        </FormField>

        {/* MSH-16 應用程式確認類型 */}
        <FormField 
          label="應用程式確認類型" 
          enName="Application Acknowledgment Type"
          fieldNotation="MSH-16"
        >
          <select
            id="applicationAckType"
            name="applicationAckType"
            value={mshData?.applicationAckType || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="AL">Always</option>
            <option value="NE">Never</option>
            <option value="ER">Error/reject conditions only</option>
            <option value="SU">Successful completion only</option>
          </select>
        </FormField>
      </FormSection>
    </>
  );
};

export default MSHSection; 
