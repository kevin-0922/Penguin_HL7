import React from 'react';
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
        <h3 className="text-lg font-semibold text-blue-800 mb-2">回應控制參數段落 (RCP)</h3>
        <p className="text-sm text-blue-600">
          此段落用於控制查詢回應的參數，包括優先順序、延遲回應時間等設定。
        </p>
      </div>

      <FormSection title="RCP (響應控制參數)">
        {/* RCP-1 查詢優先級 */}
        <FormField label="查詢優先級" enName="Query Priority" fieldNotation="RCP-1">
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

        {/* RCP-2 數量限制請求 */}
        <FormField label="數量限制請求" enName="Quantity Limited Request" fieldNotation="RCP-2">
          <input
            type="number"
            id="quantityLimitedRequest"
            value={rcpData?.quantityLimitedRequest || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入數量限制"
          />
        </FormField>

        {/* RCP-3 回應模式 */}
        <FormField label="回應模式" enName="Response Modality" fieldNotation="RCP-3">
          <select
            id="responseModality"
            value={rcpData?.responseModality || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="R">實時 (Real-time)</option>
            <option value="B">批量 (Batch)</option>
            <option value="T">Bolus (a series of responses sent at the same time without use of batch formatting)</option>
          </select>
        </FormField>

        {/* RCP-4 執行和診斷時間 */}
        <FormField label="執行和診斷時間" enName="Execution and Delivery Time" fieldNotation="RCP-4">
          <input
            type="datetime-local"
            id="executionAndDeliveryTime"
            value={rcpData?.executionAndDeliveryTime || ''}
            onChange={handleInputChange}
            className={inputClassName}
          />
        </FormField>
        {/* RCP-5 修改指示器 */}
        <FormField label="修改指示器" enName="Modify Indicator" fieldNotation="RCP-5">
          <select
            id="modifyIndicator"
            value={rcpData?.modifyIndicator || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="M">Modified Subscription</option>
            <option value="N">New Subscription</option>
          </select>
        </FormField>
        {/* RCP-6 排序欄位 */}
        <FormField label="排序欄位" enName="Sort-by Field" fieldNotation="RCP-6">
          <input
            type="text"
            id="sortByComponent"
            value={rcpData?.sortByComponent || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入排序欄位"
          />
        </FormField>
        {/* RCP-7 段落群組包含 */}
        <FormField label="段落群組包含" enName="Segment Group Inclusion" fieldNotation="RCP-7">
        <select
            id="segmentGroupInclusion"
            value={rcpData?.segmentGroupInclusion || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="OBRG">OBR group</option>
            <option value="ORCG">ORC group</option>
            <option value="PIDG">PID group</option>
            <option value="RXAG">RXA group</option>
            <option value="RXDG">RXD group</option>
            <option value="RXEG">RXE group</option>
            <option value="RXOG">RXO group</option>
          </select>
        </FormField>
      </FormSection>
    </>
  );
};

export default RCPSection;