import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName, selectClassName } from './FormSection';

const RCPSection = ({ messageType }) => {
  const dispatch = useDispatch();
  const rcpData = useSelector((state) => state.hl7Form.forms[messageType].rcp);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({
      messageType: messageType,
      segment: 'rcp',
      field: id,
      value
    }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">響應控制參數段落 (RCP)</h3>
        <p className="text-sm text-blue-600">
          此段落用於控制查詢響應的參數，包括優先級、延遲響應時間等設置。
        </p>
      </div>

      <FormSection title="RCP (響應控制參數)">
        {/* RCP-1 查詢優先級 */}
        <FormField label="查詢優先級 (RCP-1)">
          <select
            id="queryPriority"
            value={rcpData?.queryPriority || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="I">立即 (Immediate)</option>
            <option value="D">延遲 (Deferred)</option>
          </select>
        </FormField>

        {/* RCP-2 數量限制 */}
        <FormField label="數量限制 (RCP-2)">
          <input
            type="number"
            id="quantityLimitedRequest"
            value={rcpData?.quantityLimitedRequest || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入數量限制"
          />
        </FormField>

        {/* RCP-3 響應模式 */}
        <FormField label="響應模式 (RCP-3)">
          <select
            id="responseModality"
            value={rcpData?.responseModality || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="R">實時 (Real-time)</option>
            <option value="B">批量 (Batch)</option>
          </select>
        </FormField>

        {/* RCP-4 執行和診斷時間 */}
        <FormField label="執行和診斷時間 (RCP-4)">
          <input
            type="datetime-local"
            id="executionAndDiagnosticDateTime"
            value={rcpData?.executionAndDiagnosticDateTime || ''}
            onChange={handleInputChange}
            className={inputClassName}
          />
        </FormField>
      </FormSection>
    </>
  );
};

export default RCPSection;