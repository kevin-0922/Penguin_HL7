import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName, selectClassName } from './FormSection';

const SACSection = ({messageType}) => {
  const dispatch = useDispatch();
  const sacData = useSelector((state) => state.hl7Form.forms[messageType].sac);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({
      messageType: messageType, //辨別是哪個訊息類型
      segment: 'sac',
      field: id,
      value
    }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">容器段落 (SAC)</h3>
        <p className="text-sm text-blue-600">
          此段落用於記錄容器的詳細信息，包括容器類型、狀態、位置等。
          標記 * 的欄位為必填項目。
        </p>
      </div>

      <FormSection title="SAC (容器)">
        {/* SAC-2 Accession Identifier */}
        <FormField label="樣本號碼 (SAC-2)"  enName='Accession Identifier' required>
          <input
            type="text"
            id="AccessionIdentifier"
            name="AccessionIdentifier"
            value={sacData.AccessionIdentifier || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器位置"
          />
        </FormField>

        {/* SAC-3 Container Identifier*/}
        <FormField label="容器接收狀態 (SAC-3)"  required>
          <select
            id="ContainerIdentifier"
            name="ContainerIdentifier"
            value={sacData.containerStatus || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇容器狀態</option>
            <option value="I">初始狀態 (I)</option>
            <option value="P">處理中 (P)</option>
            <option value="R">已接收 (R)</option>
            <option value="C">已完成 (C)</option>
            <option value="X">已取消 (X)</option>
            <option value="E">錯誤 (E)</option>
            <option value="H">暫停 (H)</option>
          </select>
        </FormField>

        {/* SAC-4 Type of Container */}
        <FormField label="容器類型 (SAC-4)" required>
          <select
            id="containerType"
            name="containerType"
            value={sacData.containerType || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇容器類型</option>
            <option value="SLIDE">玻片 (SLIDE)</option>
            <option value="TUBE">試管 (TUBE)</option>
            <option value="CUP">採檢杯 (CUP)</option>
            <option value="PLATE">培養皿 (PLATE)</option>
            <option value="BLOCK">蠟塊 (BLOCK)</option>
            <option value="BAG">採血袋 (BAG)</option>
            <option value="BOT">瓶子 (BOT)</option>
            <option value="URN">尿壺 (URN)</option>
            <option value="VIAL">小瓶 (VIAL)</option>
          </select>
        </FormField>

        {/* SAC-5 Container Condition */}
        <FormField label="容器條件 (SAC-5)">
          <select
            id="containerCondition"
            name="containerCondition"
            value={sacData.containerCondition || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇容器條件</option>
            <option value="INTACT">完好 (INTACT)</option>
            <option value="DAMAGED">損壞 (DAMAGED)</option>
            <option value="LEAKED">洩漏 (LEAKED)</option>
            <option value="CRACKED">破裂 (CRACKED)</option>
          </select>
        </FormField>

        {/* SAC-6 Separator Type */}
        <FormField label="分離器類型 (SAC-6)">
          <select
            id="separatorType"
            name="separatorType"
            value={sacData.separatorType || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇分離器類型</option>
            <option value="GEL">凝膠 (GEL)</option>
            <option value="FILTER">過濾器 (FILTER)</option>
            <option value="NONE">無 (NONE)</option>
          </select>
        </FormField>

        {/* SAC-7 Cap Type */}
        <FormField label="填充等級 (SAC-7)">
          <select
            id="capType"
            name="capType"
            value={sacData.capType || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇填充等級</option>
            <option value="FULL">完全填充 (FULL)</option>
            <option value="HALF">半滿 (HALF)</option>
            <option value="MIN">最小量 (MIN)</option>
          </select>
        </FormField>

        {/* SAC-8 Additive */}
        <FormField label="添加劑 (SAC-8)">
          <select
            id="additive"
            name="additive"
            value={sacData.additive || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇添加劑</option>
            <option value="EDTA">EDTA</option>
            <option value="HEPARIN">肝素 (HEPARIN)</option>
            <option value="SST">SST</option>
            <option value="NACIT">檸檬酸鈉 (NACIT)</option>
            <option value="NONE">無 (NONE)</option>
          </select>
        </FormField>

        {/* SAC-9 Specimen Volume */}
        <FormField label="檢體量 (SAC-9)">
          <input
            type="number"
            id="specimenVolume"
            name="specimenVolume"
            value={sacData.specimenVolume || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入檢體量"
            min="0"
            step="0.01"
          />
        </FormField>

        {/* SAC-10 Specimen Volume Units */}
        <FormField label="檢體單位量 (SAC-10)">
          <select
            id="specimenVolumeUnits"
            name="specimenVolumeUnits"
            value={sacData.specimenVolumeUnits || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇單位</option>
            <option value="ML">毫升 (ML)</option>
            <option value="UL">微升 (UL)</option>
            <option value="L">升 (L)</option>
          </select>
        </FormField>

        {/* SAC-11 Specimen Volume Extracted */}
        <FormField label="檢體處理量 (SAC-11)">
          <input
            type="number"
            id="specimenVolumeExtracted"
            name="specimenVolumeExtracted"
            value={sacData.specimenVolumeExtracted || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入檢體處理量"
            min="0"
            step="0.01"
          />
        </FormField>

        {/* SAC-12 Specimen Volume Extracted Units */}
        <FormField label="檢體處理量單位 (SAC-12)">
          <select
            id="specimenVolumeExtractedUnits"
            name="specimenVolumeExtractedUnits"
            value={sacData.specimenVolumeExtractedUnits || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇單位</option>
            <option value="ML">毫升 (ML)</option>
            <option value="UL">微升 (UL)</option>
            <option value="L">升 (L)</option>
          </select>
        </FormField>

        {/* SAC-13 Container ID/Bar Code ID */}
        <FormField label="容器確認數 (SAC-13)">
          <input
            type="text"
            id="containerConfirmationCount"
            name="containerConfirmationCount"
            value={sacData.containerConfirmationCount || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器確認數"
          />
        </FormField>

        {/* SAC-14 Container Lot Number */}
        <FormField label="容器條碼 (SAC-14)">
          <input
            type="text"
            id="containerBarcode"
            name="containerBarcode"
            value={sacData.containerBarcode || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器條碼"
          />
        </FormField>

        {/* SAC-15 Container Position */}
        <FormField label="容器位置 (SAC-15)">
          <input
            type="text"
            id="containerPosition"
            name="containerPosition"
            value={sacData.containerPosition || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器位置"
          />
        </FormField>

        {/* SAC-16 Container Weight */}
        <FormField label="容器重量 (SAC-16)">
          <input
            type="number"
            id="containerWeight"
            name="containerWeight"
            value={sacData.containerWeight || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器重量"
            min="0"
            step="0.01"
          />
        </FormField>

        {/* SAC-17 Container Weight Units */}
        <FormField label="容器重量單位 (SAC-17)">
          <select
            id="containerWeightUnits"
            name="containerWeightUnits"
            value={sacData.containerWeightUnits || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇單位</option>
            <option value="G">克 (G)</option>
            <option value="MG">毫克 (MG)</option>
            <option value="KG">公斤 (KG)</option>
          </select>
        </FormField>

        {/* SAC-18 Container Volume */}
        <FormField label="容器體積 (SAC-18)">
          <input
            type="number"
            id="containerVolume"
            name="containerVolume"
            value={sacData.containerVolume || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器體積"
            min="0"
            step="0.01"
          />
        </FormField>

        {/* SAC-19 Container Volume Units */}
        <FormField label="容器體積單位 (SAC-19)">
          <select
            id="containerVolumeUnits"
            name="containerVolumeUnits"
            value={sacData.containerVolumeUnits || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇單位</option>
            <option value="ML">毫升 (ML)</option>
            <option value="UL">微升 (UL)</option>
            <option value="L">升 (L)</option>
          </select>
        </FormField>

        {/* SAC-20 Container Temperature */}
        <FormField label="容器體積溫度 (SAC-20)">
          <input
            type="number"
            id="containerTemperature"
            name="containerTemperature"
            value={sacData.containerTemperature || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器溫度"
            step="0.1"
          />
        </FormField>

        {/* SAC-21 Container Temperature Units */}
        <FormField label="容器溫度單位 (SAC-21)">
          <select
            id="containerTemperatureUnits"
            name="containerTemperatureUnits"
            value={sacData.containerTemperatureUnits || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇單位</option>
            <option value="C">攝氏 (C)</option>
            <option value="F">華氏 (F)</option>
            <option value="K">克氏 (K)</option>
          </select>
        </FormField>

        {/* SAC-22 Container Tare Weight */}
        <FormField label="容器溫度 (SAC-22)">
          <input
            type="number"
            id="containerTareWeight"
            name="containerTareWeight"
            value={sacData.containerTareWeight || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器溫度"
            min="0"
            step="0.01"
          />
        </FormField>

        {/* SAC-23 Container Tare Weight Units */}
        <FormField label="容器空重單位 (SAC-23)">
          <select
            id="containerTareWeightUnits"
            name="containerTareWeightUnits"
            value={sacData.containerTareWeightUnits || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇單位</option>
            <option value="G">克 (G)</option>
            <option value="MG">毫克 (MG)</option>
            <option value="KG">公斤 (KG)</option>
          </select>
        </FormField>

        {/* SAC-24 Barrier Delta */}
        <FormField label="障礙類型 (SAC-24)">
          <select
            id="barrierType"
            name="barrierType"
            value={sacData.barrierType || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇障礙類型</option>
            <option value="RUBBER">橡膠 (RUBBER)</option>
            <option value="PLASTIC">塑膠 (PLASTIC)</option>
            <option value="METAL">金屬 (METAL)</option>
          </select>
        </FormField>

        {/* SAC-25 Barrier Delta Units */}
        <FormField label="底部障礙差距高度 (SAC-25)">
          <input
            type="number"
            id="barrierDeltaHeight"
            name="barrierDeltaHeight"
            value={sacData.barrierDeltaHeight || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入障礙差距高度"
            min="0"
            step="0.1"
          />
        </FormField>

        {/* SAC-26 Container Height */}
        <FormField label="容器高度 (SAC-26)">
          <input
            type="number"
            id="containerHeight"
            name="containerHeight"
            value={sacData.containerHeight || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器高度"
            min="0"
            step="0.1"
          />
        </FormField>

        {/* SAC-27 Container Height Units */}
        <FormField label="容器高度單位 (SAC-27)">
          <select
            id="containerHeightUnits"
            name="containerHeightUnits"
            value={sacData.containerHeightUnits || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇單位</option>
            <option value="MM">毫米 (MM)</option>
            <option value="CM">公分 (CM)</option>
            <option value="M">公尺 (M)</option>
          </select>
        </FormField>

        {/* SAC-28 Container Diameter */}
        <FormField label="容器直徑 (SAC-28)">
          <input
            type="number"
            id="containerDiameter"
            name="containerDiameter"
            value={sacData.containerDiameter || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器直徑"
            min="0"
            step="0.1"
          />
        </FormField>

        {/* SAC-29 Container Diameter Units */}
        <FormField label="容器直徑單位 (SAC-29)">
          <select
            id="containerDiameterUnits"
            name="containerDiameterUnits"
            value={sacData.containerDiameterUnits || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇單位</option>
            <option value="MM">毫米 (MM)</option>
            <option value="CM">公分 (CM)</option>
            <option value="M">公尺 (M)</option>
          </select>
        </FormField>

        {/* SAC-30 Barrier Change Type */}
        <FormField label="障礙厚度 (SAC-30)">
          <input
            type="number"
            id="barrierThickness"
            name="barrierThickness"
            value={sacData.barrierThickness || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入障礙厚度"
            min="0"
            step="0.1"
          />
        </FormField>

        {/* SAC-31 Gross Limit */}
        <FormField label="底部障礙厚度 (SAC-31)">
          <input
            type="number"
            id="bottomBarrierThickness"
            name="bottomBarrierThickness"
            value={sacData.bottomBarrierThickness || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入底部障礙厚度"
            min="0"
            step="0.1"
          />
        </FormField>

        {/* SAC-32 Gross Limit Units */}
        <FormField label="底部障礙厚度單位 (SAC-32)">
          <select
            id="bottomBarrierThicknessUnits"
            name="bottomBarrierThicknessUnits"
            value={sacData.bottomBarrierThicknessUnits || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇單位</option>
            <option value="MM">毫米 (MM)</option>
            <option value="CM">公分 (CM)</option>
            <option value="M">公尺 (M)</option>
          </select>
        </FormField>

        {/* SAC-33 Gross Volume */}
        <FormField label="容器總重量 (SAC-33)">
          <input
            type="number"
            id="containerGrossWeight"
            name="containerGrossWeight"
            value={sacData.containerGrossWeight || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器總重量"
            min="0"
            step="0.01"
          />
        </FormField>

        {/* SAC-34 Gross Volume Units */}
        <FormField label="容器總重量單位 (SAC-34)">
          <select
            id="containerGrossWeightUnits"
            name="containerGrossWeightUnits"
            value={sacData.containerGrossWeightUnits || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇單位</option>
            <option value="G">克 (G)</option>
            <option value="MG">毫克 (MG)</option>
            <option value="KG">公斤 (KG)</option>
          </select>
        </FormField>

        {/* SAC-35 Gross Volume Limit */}
        <FormField label="容器總容積 (SAC-35)">
          <input
            type="number"
            id="containerGrossVolume"
            name="containerGrossVolume"
            value={sacData.containerGrossVolume || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器總容積"
            min="0"
            step="0.01"
          />
        </FormField>

        {/* SAC-36 Gross Volume Limit Units */}
        <FormField label="容器總容積單位 (SAC-36)">
          <select
            id="containerGrossVolumeUnits"
            name="containerGrossVolumeUnits"
            value={sacData.containerGrossVolumeUnits || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇單位</option>
            <option value="ML">毫升 (ML)</option>
            <option value="UL">微升 (UL)</option>
            <option value="L">升 (L)</option>
          </select>
        </FormField>

        {/* SAC-37 Gross Weight Limit */}
        <FormField label="容器總容積限制 (SAC-37)">
          <input
            type="number"
            id="containerGrossVolumeLimit"
            name="containerGrossVolumeLimit"
            value={sacData.containerGrossVolumeLimit || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器總容積限制"
            min="0"
            step="0.01"
          />
        </FormField>

        {/* SAC-38 Gross Weight Limit Units */}
        <FormField label="容器總容積限制單位 (SAC-38)">
          <select
            id="containerGrossVolumeLimitUnits"
            name="containerGrossVolumeLimitUnits"
            value={sacData.containerGrossVolumeLimitUnits || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇單位</option>
            <option value="ML">毫升 (ML)</option>
            <option value="UL">微升 (UL)</option>
            <option value="L">升 (L)</option>
          </select>
        </FormField>

        {/* SAC-39 Number of Containers */}
        <FormField label="容器總重量限制 (SAC-39)">
          <input
            type="number"
            id="containerGrossWeightLimit"
            name="containerGrossWeightLimit"
            value={sacData.containerGrossWeightLimit || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器總重量限制"
            min="0"
            step="0.01"
          />
        </FormField>

        {/* SAC-40 Container Catalog Number */}
        <FormField label="容器總重量限制單位 (SAC-40)">
          <select
            id="containerGrossWeightLimitUnits"
            name="containerGrossWeightLimitUnits"
            value={sacData.containerGrossWeightLimitUnits || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇單位</option>
            <option value="G">克 (G)</option>
            <option value="MG">毫克 (MG)</option>
            <option value="KG">公斤 (KG)</option>
          </select>
        </FormField>

        {/* SAC-41 Container Lot Number */}
        <FormField label="容器數量 (SAC-41)">
          <input
            type="number"
            id="containerCount"
            name="containerCount"
            value={sacData.containerCount || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器數量"
            min="0"
          />
        </FormField>

        {/* SAC-42 Container Manufacturer */}
        <FormField label="容器目錄號 (SAC-42)">
          <input
            type="text"
            id="containerCatalogNumber"
            name="containerCatalogNumber"
            value={sacData.containerCatalogNumber || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器目錄號"
          />
        </FormField>

        {/* SAC-43 Container Manufacturer Catalog Number */}
        <FormField label="容器批號 (SAC-43)">
          <input
            type="text"
            id="containerLotNumber"
            name="containerLotNumber"
            value={sacData.containerLotNumber || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器批號"
          />
        </FormField>

        {/* SAC-44 Container Manufacturer Lot Number */}
        <FormField label="容器製造商 (SAC-44)">
          <input
            type="text"
            id="containerManufacturer"
            name="containerManufacturer"
            value={sacData.containerManufacturer || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入容器製造商"
          />
        </FormField>
      </FormSection>
    </>
  );
};

export default SACSection; 