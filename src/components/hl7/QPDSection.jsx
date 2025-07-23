import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName } from './FormSection';

const QPDSection = ({messageType}) => {
  const dispatch = useDispatch();
  const qpdData = useSelector((state) => state.hl7Form.forms[messageType].qpd);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({
      messageType: messageType, //辨別是哪個訊息類型
      segment: 'qpd',
      field: id,
      value
    }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">查詢參數定義段落 (QPD)</h3>
        <p className="text-sm text-blue-600">
          此段落用於定義查詢的參數，包括查詢名稱、標籤和用戶參數等重要資訊。
          標記 * 的欄位為必填項目。
        </p>
      </div>

      <FormSection title="QPD (查詢參數定義)">
        {/* QPD-1 查詢名稱 */}
        <FormField label="查詢名稱" enName="Message Query Name" fieldNotation="QPD-1" >
          <input
            type="text"
            id="messageQueryName"
            value={qpdData?.messageQueryName || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入查詢名稱"
            required_test
          />
        </FormField>

        {/* QPD-2 查詢標籤 */}
        <FormField label="查詢標籤" enName="Query Tag" fieldNotation="QPD-2" >
          <input
            type="text"
            id="queryTag"
            value={qpdData?.queryTag || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入查詢標籤"
            required_test
          />
        </FormField>

        {/* QPD-3 查詢參數 */}
        <FormField label="查詢參數" enName="Query Parameters" fieldNotation="QPD-3" >
          <input
            type="text"
            id="userParametersInSuccessiveFields"
            value={qpdData?.userParametersInSuccessiveFields || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入查詢參數"
            required_test
          />
        </FormField>
      </FormSection>
    </>
  );
};

export default QPDSection;
