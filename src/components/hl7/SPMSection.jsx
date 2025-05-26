import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName, selectClassName, dateTimeClassName } from './FormSection';

const SPMSection = ({messageType}) => {
  const dispatch = useDispatch();
  const spmData = useSelector((state) => state.hl7Form.forms[messageType].spm);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({
      messageType: messageType, //辨別是哪個訊息類型
      segment: 'spm',
      field: id,
      value
    }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">標本段落 (SPM)</h3>
        <p className="text-sm text-blue-600">
          此段落用於記錄標本的詳細信息，包括標本類型、採集方法、來源部位等。
          標記 * 的欄位為必填項目。
        </p>
      </div>

      <FormSection title="SPM (標本)">
        {/* SPM-2 Specimen ID */}
        <FormField label="標本編號 (SPM-2)"  enName='Specimen ID' required>
          <input
            type="text"
            id="specimenId"
            name="specimenId"
            value={spmData?.specimenId || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入標本ID"
          />
        </FormField>

        {/* SPM-3 Specimen Parent IDs */}
        <FormField label="父標本編號 (SPM-3)" enName='Specimen Parent IDs'>
          <input
            type="text"
            id="specimenParentIds"
            name="specimenParentIds"
            value={spmData?.specimenParentIds || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入標本父ID"
          />
        </FormField>

        {/* SPM-4 Specimen Type */}
        <FormField label="標本類型 (SPM-4)" enName='Specimen Type' required>
          <select
            id="specimenType"
            name="specimenType"
            value={spmData?.specimenType || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="BLD">血液 (Blood)</option>
            <option value="UR">尿液 (Urine)</option>
            <option value="TIS">組織 (Tissue)</option>
            <option value="SAL">唾液 (Saliva)</option>
            <option value="SWB">拭子 (Swab)</option>
            <option value="OTH">其他 (Other)</option>
          </select>
        </FormField>

        {/* SPM-5 Specimen Type Modifier */}
        <FormField label="標本類型修飾符 (SPM-5)" enName='Specimen Type Modifier'>
          <input
            type="text"
            id="specimenTypeModifier"
            name="specimenTypeModifier"
            value={spmData?.specimenTypeModifier || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入標本類型修飾符"
          />
        </FormField>

        {/* SPM-6 Specimen Additives */}
        <FormField label="標本添加劑 (SPM-6)" enName='Specimen Additives'>
          <input
            type="text"
            id="specimenAdditives"
            name="specimenAdditives"
            value={spmData?.specimenAdditives || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入標本添加劑"
          />
        </FormField>

        {/* SPM-7 Specimen Collection Method */}
        <FormField label="標本採集方法 (SPM-7)" enName='Specimen Collection Method'>
          <input
            type="text"
            id="collectionMethod"
            name="collectionMethod"
            value={spmData?.collectionMethod || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入採集方法"
          />
        </FormField>

        {/* SPM-8 Specimen Source Site */}
        <FormField label="標本來源部位 (SPM-8)" enName='Specimen Source Site' >
          <select
            id="sourceSite"
            name="sourceSite"
            value={spmData?.sourceSite || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="VEN">靜脈 (Venous)</option>
            <option value="ART">動脈 (Arterial)</option>
            <option value="CAP">毛細血管 (Capillary)</option>
            <option value="OTH">其他 (Other)</option>
          </select>
        </FormField>

        {/* SPM-9 Specimen Source Site Modifier */}
        <FormField label="標本來源部位修飾符 (SPM-9)" enName='Specimen Source Site Modifier'>
          <input
            type="text"
            id="sourceSiteModifier"
            name="sourceSiteModifier"
            value={spmData?.sourceSiteModifier || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入來源部位修飾符"
          />
        </FormField>

        {/* SPM-10 Specimen Collection Site */}
        <FormField label="標本採集地點 (SPM-10)" enName='Specimen Collection Site'>
          <input
            type="text"
            id="collectionSite"
            name="collectionSite"
            value={spmData?.collectionSite || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入採集部位"
          />
        </FormField>

        {/* SPM-11 Specimen Role */}
        <FormField label="標本角色 (SPM-11)" enName='Specimen Role'>
          <select
            id="specimenRole"
            name="specimenRole"
            value={spmData?.specimenRole || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="P">病人 (Patient)</option>
            <option value="C">對照 (Control)</option>
            <option value="Q">品質控制 (Quality Control)</option>
            <option value="B">空白 (Blank)</option>
            <option value="R">重複 (Replicate)</option>
          </select>
        </FormField>

        {/* SPM-12 Specimen Collection Amount */}
        <FormField label="標本採集量 (SPM-12)" enName='Specimen Collection Amount'>
          <div className="flex gap-2">
            <input
              type="text"
              id="collectionAmount"
              name="collectionAmount"
              value={spmData?.collectionAmount || ''}
              onChange={handleInputChange}
              className={inputClassName}
              placeholder="請輸入採集量"
            />
            <select
              id="specimenCollectionUnit"
              value={spmData?.specimenCollectionUnit || ''}
              onChange={handleInputChange}
              className={selectClassName}
            >
              <option value="">單位</option>
              <option value="ML">毫升</option>
              <option value="MG">毫克</option>
              <option value="G">克</option>
              <option value="UL">微升</option>
              <option value="CM">公分</option>
            </select>
        </div>
        </FormField>

        {/* SPM-13 Grouped Specimen Count */}
        <FormField label="分組標本數量 (SPM-13)" enName='Grouped Specimen Count'>
          <input
            type="text"
            id="groupedSpecimenCount"
            name="groupedSpecimenCount"
            value={spmData?.groupedSpecimenCount || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入分組標本計數"
          />
        </FormField>

        {/* SPM-14 Specimen Description */}
        <FormField label="標本描述 (SPM-14)" enName='Specimen Description'>
          <textarea
            id="specimenDescription"
            name="specimenDescription"
            value={spmData?.specimenDescription || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入標本描述"
            rows="3"
          />
        </FormField>

        {/* SPM-15 Specimen Handling Code */}
        <FormField label="標本處理代碼 (SPM-15)" enName='Specimen Handling Code'>
          <select
            id="handlingCode"
            name="handlingCode"
            value={spmData?.handlingCode || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="F">冷凍 (Frozen)</option>
            <option value="R">冷藏 (Refrigerated)</option>
            <option value="A">常溫 (Ambient)</option>
            <option value="H">加熱 (Heated)</option>
          </select>
        </FormField>

        {/* SPM-16 Specimen Risk Code */}
        <FormField label="標本風險代碼 (SPM-16)" enName='Specimen Risk Code'> 
          <select
            id="riskCode" 
            name="riskCode"
            value={spmData?.riskCode || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="L">低風險 (Low)</option>
            <option value="M">中風險 (Medium)</option>
            <option value="H">高風險 (High)</option>
          </select>
        </FormField>

        {/* SPM-17 Specimen Collection Date/Time */}
        <FormField label="標本採集日期時間 (SPM-17)" enName='Specimen Collection Date/Time'>
          <input
            type="datetime-local"
            id="collectionDateTime"
            name="collectionDateTime"
            value={spmData?.collectionDateTime || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* SPM-18 Specimen Received Date/Time */}
        <FormField label="標本接收日期時間 (SPM-18)" enName='Specimen Received Date/Time'>
          <input
            type="datetime-local"
            id="receivedDateTime"
            name="receivedDateTime"
            value={spmData?.receivedDateTime || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* SPM-19 Specimen Expiration Date/Time */}
        <FormField label="標本到期日期時間 (SPM-19)" enName='Specimen Expiration Date/Time'>
          <input
            type="datetime-local"
            id="expirationDateTime"
            name="expirationDateTime"
            value={spmData?.expirationDateTime || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* SPM-20 Specimen Availability */}
        <FormField label="標本可用性 (SPM-20)" enName='Specimen Availability'>
          <select
            id="availability"
            name="availability"
            value={spmData?.availability || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇可用性</option>
            <option value="Y">可用 (Available)</option>
            <option value="N">不可用 (Not Available)</option>
            <option value="P">永久不可用 (Permanently Not Available)</option>
          </select>
        </FormField>

        {/* SPM-21 Specimen Reject Reason */}
        <FormField label="標本拒收原因 (SPM-21)" enName='Specimen Reject Reason'>
          <select
            id="rejectionReason"
            name="rejectionReason"
            value={spmData?.rejectionReason || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇拒收原因</option>
            <option value="BROKEN">破損 (Broken Container)</option>
            <option value="CLOTTED">凝血 (Clotted Specimen)</option>
            <option value="HEMOLYZED">溶血 (Hemolyzed Specimen)</option>
            <option value="INCORRECT">錯誤容器 (Incorrect Container)</option>
            <option value="INSUFFICIENT">量不足 (Insufficient Quantity)</option>
            <option value="OLD">過期 (Specimen Too Old)</option>
          </select>
        </FormField>

        {/* SPM-22 Specimen Quality */}
        <FormField label="標本品質 (SPM-22)" 	enName='Specimen Quality'>
          <select
            id="specimenQuality"
            name="specimenQuality"
            value={spmData?.specimenQuality || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇標本品質</option>
            <option value="E">優良 (Excellent)</option>
            <option value="G">良好 (Good)</option>
            <option value="F">一般 (Fair)</option>
            <option value="P">不良 (Poor)</option>
          </select>
        </FormField>

        {/* SPM-23 Specimen Appropriateness */}
        <FormField label="標本適當性 (SPM-23)" enName='Specimen Appropriateness'>
          <select
            id="specimenAppropriateness"
            name="specimenAppropriateness"
            value={spmData?.specimenAppropriateness || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇標本適當性</option>
            <option value="A">適當 (Appropriate)</option>
            <option value="I">不適當 (Inappropriate)</option>
            <option value="P">協定外 (Protocol)</option>
          </select>
        </FormField>

        {/* SPM-24 Specimen Condition */}
        <FormField label="標本狀態 (SPM-24)" enName='Specimen Condition'>
          <select
            id="specimenCondition"
            name="specimenCondition"
            value={spmData?.specimenCondition || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇標本狀態</option>
            <option value="AUT">自溶 (Autolyzed)</option>
            <option value="CLOT">凝血 (Clotted)</option>
            <option value="CON">污染 (Contaminated)</option>
            <option value="COOL">冷藏 (Cool)</option>
            <option value="FROZ">冷凍 (Frozen)</option>
            <option value="HEM">溶血 (Hemolyzed)</option>
            <option value="LIVE">活體 (Live)</option>
            <option value="FRESH">新鮮 (Fresh)</option>
            <option value="FIXED">固定 (Fixed)</option>
          </select>
        </FormField>

        {/* SPM-25 Specimen Current Quantity */}
        <FormField label="標本當前數量 (SPM-25)" enName='Specimen Current Quantity'>
          <div className="flex gap-2">
            <input
              type="number"
              id="specimenCurrentQuantity"
              value={spmData?.specimenCurrentQuantity || ''}
              onChange={handleInputChange}
              className={inputClassName}
              placeholder="請輸入當前數量"
              min="0"
              step="0.01"
            />
            <select
              id="specimenCurrentQuantityUnit"
              value={spmData?.specimenCurrentQuantityUnit || ''}
              onChange={handleInputChange}
              className={selectClassName}
            >
              <option value="">單位</option>
              <option value="ML">毫升</option>
              <option value="MG">毫克</option>
              <option value="G">克</option>
              <option value="UL">微升</option>
              <option value="CM">公分</option>
            </select>
        </div>
        </FormField>

        {/* SPM-26 Number of Specimen Containers */}
        <FormField label="標本容器數量 (SPM-26)" enName='Number of Specimen Containers'>
          <input
            type="number"
            id="numberOfSpecimenContainers"
            value={spmData?.numberOfSpecimenContainers || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器數量"
            min="0"
          />
        </FormField>

        {/* SPM-27 Container Type */}
        <FormField label="容器類型 (SPM-27)" enName='Container Type'>
          <select
            id="containerType"
            name="containerType"
            value={spmData?.containerType || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇容器類型</option>
            <option value="BAG">袋子 (Bag)</option>
            <option value="BOT">瓶子 (Bottle)</option>
            <option value="CUP">杯子 (Cup)</option>
            <option value="PLATE">培養皿 (Plate)</option>
            <option value="TUBE">試管 (Tube)</option>
            <option value="URN">尿壺 (Urinal)</option>
            <option value="SLIDE">玻片 (Slide)</option>
            <option value="BLOCK">蠟塊 (Block)</option>
          </select>
        </FormField>

        {/* SPM-28 Container Condition */}
        <FormField label="容器狀態 (SPM-28)" enName='Container Condition'>
          <select
            id="containerCondition"
            name="containerCondition"
            value={spmData?.containerCondition || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇容器狀態</option>
            <option value="INTACT">完好 (Intact)</option>
            <option value="LEAKED">洩漏 (Leaked)</option>
            <option value="DAMAGED">損壞 (Damaged)</option>
          </select>
        </FormField>

        {/* SPM-29 Specimen Child Role */}
        <FormField label="子標本角色 (SPM-29)" enName='Specimen Child Role'>
          <select
            id="specimenChildRole"
            name="specimenChildRole"
            value={spmData?.specimenChildRole || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇子標本角色</option>
            <option value="A">同質 (Aliquot)</option>
            <option value="C">複製 (Calibrator)</option>
            <option value="M">混合 (Multiplexed)</option>
            <option value="R">複檢 (Replicate)</option>
            <option value="S">分裂 (Split)</option>
          </select>
        </FormField>

        {/* SPM-30 Accession ID */}
        <FormField label="接收編號 (SPM-30)" enName='Accession ID'>
          <input
            type="text"
            id="accessionId"
            value={spmData?.accessionId || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入接收編號"
          />
        </FormField>

        {/* SPM-31 Other Specimen ID */}
        <FormField label="其他標本編號 (SPM-31)" enName='Other Specimen ID'>
          <input
            type="text"
            id="otherSpecimenId"
            name="otherSpecimenId"
            value={spmData?.otherSpecimenId || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入其他標本編號"
          />
        </FormField>

        {/* SPM-32 Shipment ID */}
        <FormField label="運送編號 (SPM-32)" enName='Shipment ID'>
          <input
            type="text"
            id="shipmentId"
            name="shipmentId"
            value={spmData?.shipmentId || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入運送編號"
          />
        </FormField>
      </FormSection>
    </>
  );
};

export default SPMSection; 