import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName, selectClassName, dateTimeClassName } from './FormSection';

const ORCSection = () => {
  const dispatch = useDispatch();
  const orcData = useSelector((state) => state.hl7Form.orc);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({
      segment: 'orc',
      field: id,
      value
    }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">通用訂單段落 (ORC)</h3>
        <p className="text-sm text-blue-600">
          此段落用於記錄醫療訂單的通用資訊，包括訂單控制、狀態和相關人員等資訊。
          標記 * 的欄位為必填項目。
        </p>
      </div>

      <FormSection title="ORC (通用訂單)">
        {/* ORC-1 Order Control */}
        <FormField label="訂單控制 (ORC-1)" required>
          <select
            id="orderControl"
            name="orderControl"
            value={orcData?.orderControl || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="NW">新訂單 (NW)</option>
            <option value="OK">訂單已接受 (OK)</option>
            <option value="CA">取消訂單 (CA)</option>
            <option value="DC">中止訂單 (DC)</option>
            <option value="HD">暫停訂單 (HD)</option>
            <option value="RP">替換訂單 (RP)</option>
            <option value="XO">修改訂單 (XO)</option>
          </select>
        </FormField>

        {/* ORC-2 Placer Order Number */}
        <FormField label="申請方訂單編號 (ORC-2)" required>
          <input
            type="text"
            id="placerOrderNumber"
            name="placerOrderNumber"
            value={orcData?.placerOrderNumber || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入申請方訂單編號"
          />
        </FormField>

        {/* ORC-3 Filler Order Number */}
        <FormField label="執行方訂單編號 (ORC-3)" required>
          <input
            type="text"
            id="fillerOrderNumber"
            name="fillerOrderNumber"
            value={orcData?.fillerOrderNumber || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入執行方訂單編號"
          />
        </FormField>

        {/* ORC-4 Placer Group Number */}
        <FormField label="申請方群組編號 (ORC-4)">
          <input
            type="text"
            id="placerGroupNumber"
            name="placerGroupNumber"
            value={orcData?.placerGroupNumber || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入申請方群組編號"
          />
        </FormField>

        {/* ORC-5 Order Status */}
        <FormField label="訂單狀態 (ORC-5)" required>
          <select
            id="orderStatus"
            name="orderStatus"
            value={orcData?.orderStatus || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="A">已核准 (A)</option>
            <option value="CA">已取消 (CA)</option>
            <option value="CM">已完成 (CM)</option>
            <option value="DC">已中止 (DC)</option>
            <option value="ER">錯誤 (ER)</option>
            <option value="HD">已暫停 (HD)</option>
            <option value="IP">處理中 (IP)</option>
            <option value="SC">已排程 (SC)</option>
          </select>
        </FormField>

        {/* ORC-6 Response Flag */}
        <FormField label="回應標記 (ORC-6)">
          <select
            id="responseFlag"
            name="responseFlag"
            value={orcData?.responseFlag || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="E">錯誤/拒絕</option>
            <option value="R">已接收</option>
            <option value="F">已完成</option>
          </select>
        </FormField>

        {/* ORC-7 Quantity/Timing */}
        <FormField label="數量/時間 (ORC-7)">
          <input
            type="text"
            id="quantityTiming"
            name="quantityTiming"
            value={orcData?.quantityTiming || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入數量/時間"
          />
        </FormField>

        {/* ORC-8 Parent */}
        <FormField label="父項目 (ORC-8)">
          <input
            type="text"
            id="parent"
            name="parent"
            value={orcData?.parent || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入父項目"
          />
        </FormField>

        {/* ORC-9 DateTime of Transaction */}
        <FormField label="交易日期時間 (ORC-9)" required>
          <input
            type="datetime-local"
            id="dateTimeOfTransaction"
            name="dateTimeOfTransaction"
            value={orcData?.dateTimeOfTransaction || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* ORC-10 Entered By */}
        <FormField label="輸入者 (ORC-10)">
          <input
            type="text"
            id="enteredBy"
            name="enteredBy"
            value={orcData?.enteredBy || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入輸入者"
          />
        </FormField>

        {/* ORC-11 Verified By */}
        <FormField label="確認者 (ORC-11)">
          <input
            type="text"
            id="verifiedBy"
            name="verifiedBy"
            value={orcData?.verifiedBy || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入確認者"
          />
        </FormField>

        {/* ORC-12 Ordering Provider */}
        <FormField label="開單醫師 (ORC-12)" required>
          <input
            type="text"
            id="orderingProvider"
            name="orderingProvider"
            value={orcData?.orderingProvider || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入開單醫師"
          />
        </FormField>

        {/* ORC-13 Enterers Location */}
        <FormField label="輸入者位置 (ORC-13)">
          <input
            type="text"
            id="enterersLocation"
            name="enterersLocation"
            value={orcData?.enterersLocation || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入輸入者位置"
          />
        </FormField>

        {/* ORC-14 Call Back Phone Number */}
        <FormField label="回電電話號碼 (ORC-14)">
          <input
            type="tel"
            id="callBackPhoneNumber"
            name="callBackPhoneNumber"
            value={orcData?.callBackPhoneNumber || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入回電電話號碼"
          />
        </FormField>

        {/* ORC-15 Order Effective DateTime */}
        <FormField label="訂單生效日期時間 (ORC-15)">
          <input
            type="datetime-local"
            id="orderEffectiveDateTime"
            name="orderEffectiveDateTime"
            value={orcData?.orderEffectiveDateTime || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* ORC-16 Order Control Code Reason */}
        <FormField label="訂單控制代碼原因 (ORC-16)">
          <input
            type="text"
            id="orderControlCodeReason"
            name="orderControlCodeReason"
            value={orcData?.orderControlCodeReason || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入訂單控制代碼原因"
          />
        </FormField>

        {/* ORC-17 Entering Organization */}
        <FormField label="輸入組織 (ORC-17)">
          <input
            type="text"
            id="enteringOrganization"
            name="enteringOrganization"
            value={orcData?.enteringOrganization || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入輸入組織"
          />
        </FormField>

        {/* ORC-18 Entering Device */}
        <FormField label="輸入設備 (ORC-18)">
          <input
            type="text"
            id="enteringDevice"
            name="enteringDevice"
            value={orcData?.enteringDevice || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入輸入設備"
          />
        </FormField>

        {/* ORC-19 Action By */}
        <FormField label="執行者 (ORC-19)">
          <input
            type="text"
            id="actionBy"
            name="actionBy"
            value={orcData?.actionBy || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入執行者"
          />
        </FormField>

        {/* ORC-20 Advanced Beneficiary Notice Code */}
        <FormField label="預先受益人通知代碼 (ORC-20)">
          <input
            type="text"
            id="advancedBeneficiaryNoticeCode"
            name="advancedBeneficiaryNoticeCode"
            value={orcData?.advancedBeneficiaryNoticeCode || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入預先受益人通知代碼"
          />
        </FormField>

        {/* ORC-21 Ordering Facility Name */}
        <FormField label="開單設施名稱 (ORC-21)">
          <input
            type="text"
            id="orderingFacilityName"
            name="orderingFacilityName"
            value={orcData?.orderingFacilityName || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入開單設施名稱"
          />
        </FormField>

        {/* ORC-22 Ordering Facility Address */}
        <FormField label="開單設施地址 (ORC-22)">
          <input
            type="text"
            id="orderingFacilityAddress"
            name="orderingFacilityAddress"
            value={orcData?.orderingFacilityAddress || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入開單設施地址"
          />
        </FormField>

        {/* ORC-23 Ordering Facility Phone Number */}
        <FormField label="開單設施電話號碼 (ORC-23)">
          <input
            type="tel"
            id="orderingFacilityPhoneNumber"
            name="orderingFacilityPhoneNumber"
            value={orcData?.orderingFacilityPhoneNumber || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入開單設施電話號碼"
          />
        </FormField>

        {/* ORC-24 Ordering Provider Address */}
        <FormField label="開單醫師地址 (ORC-24)">
          <input
            type="text"
            id="orderingProviderAddress"
            name="orderingProviderAddress"
            value={orcData?.orderingProviderAddress || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入開單醫師地址"
          />
        </FormField>

        {/* ORC-25 Order Status Modifier */}
        <FormField label="訂單狀態修飾符 (ORC-25)">
          <input
            type="text"
            id="orderStatusModifier"
            name="orderStatusModifier"
            value={orcData?.orderStatusModifier || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入訂單狀態修飾符"
          />
        </FormField>

        {/* ORC-26 Advanced Confidentiality Indicator */}
        <FormField label="進階保密指標 (ORC-26)">
          <select
            id="advancedConfidentialityIndicator"
            name="advancedConfidentialityIndicator"
            value={orcData?.advancedConfidentialityIndicator || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="N">正常</option>
            <option value="R">限制性</option>
            <option value="V">非常限制</option>
          </select>
        </FormField>

        {/* ORC-27 Ordering Provider Supplement */}
        <FormField label="開單醫師補充資訊 (ORC-27)">
          <textarea
            id="orderingProviderSupplement"
            name="orderingProviderSupplement"
            value={orcData?.orderingProviderSupplement || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入開單醫師補充資訊"
            rows="3"
          />
        </FormField>

        {/* ORC-28 Advanced Beneficiary Notice Override Reason */}
        <FormField label="預先受益人通知覆蓋原因 (ORC-28)">
          <input
            type="text"
            id="advancedBeneficiaryNoticeOverrideReason"
            name="advancedBeneficiaryNoticeOverrideReason"
            value={orcData?.advancedBeneficiaryNoticeOverrideReason || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入預先受益人通知覆蓋原因"
          />
        </FormField>

        {/* ORC-29 Order Status Effective DateTime */}
        <FormField label="訂單狀態生效日期時間 (ORC-29)">
          <input
            type="datetime-local"
            id="orderStatusEffectiveDateTime"
            name="orderStatusEffectiveDateTime"
            value={orcData?.orderStatusEffectiveDateTime || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* ORC-30 Confidentiality Code */}
        <FormField label="保密代碼 (ORC-30)">
          <select
            id="confidentialityCode"
            name="confidentialityCode"
            value={orcData?.confidentialityCode || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="U">一般性</option>
            <option value="L">低度機密</option>
            <option value="M">中度機密</option>
            <option value="H">高度機密</option>
            <option value="V">極機密</option>
          </select>
        </FormField>

        {/* ORC-31 Order Type */}
        <FormField label="訂單類型 (ORC-31)">
          <select
            id="orderType"
            name="orderType"
            value={orcData?.orderType || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="I">住院</option>
            <option value="O">門診</option>
            <option value="E">急診</option>
            <option value="A">門診預約</option>
          </select>
        </FormField>
      </FormSection>
    </>
  );
};

export default ORCSection; 