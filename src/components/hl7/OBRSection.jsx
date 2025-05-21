import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName, selectClassName, dateTimeClassName } from './FormSection';

const OBRSection = ({messageType}) => {
  const dispatch = useDispatch();
  const obrData = useSelector((state) => state.hl7Form.forms[messageType].obr);


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({
      messageType: messageType, //辨別是哪個訊息類型
      segment: 'obr',
      field: id,
      value
    }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">觀察要求段落 (OBR)</h3>
        <p className="text-sm text-blue-600">
          此段落用於記錄檢驗/檢查的要求和結果資訊，包括檢查項目、採集資訊、結果狀態等。
          標記 * 的欄位為必填項目。
        </p>
      </div>

      <FormSection title="OBR (觀察要求)">
        {/* OBR-1 Set ID */}
        <FormField label="序號 (OBR-1)" enName='Set ID'required>
          <input
            type="text"
            id="setId"
            value="1"
            readOnly
            className={inputClassName}
          />
        </FormField>

        {/* OBR-2 Placer Order Number */}
        <FormField label="申請方訂單編號 (OBR-2)" enName='Placer Order Number' required>
          <input
            type="text"
            id="placerOrderNumber"
            value={obrData?.placerOrderNumber || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入申請方訂單編號"
          />
        </FormField>

        {/* OBR-3 Filler Order Number */}
        <FormField label="執行方訂單編號 (OBR-3)" enName='Filler Order Number'required>
          <input
            type="text"
            id="fillerOrderNumber"
            value={obrData?.fillerOrderNumber || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入執行方訂單編號"
          />
        </FormField>

        {/* OBR-4 Universal Service Identifier */}
        <FormField label="通用服務識別碼 (OBR-4)" enName="Universal Service Identifier" required>
          <input
            type="text"
            id="universalServiceIdentifier"
            value={obrData?.universalServiceIdentifier || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入通用服務識別碼"
          />
        </FormField>

        {/* OBR-5 Priority */}
        <FormField label="優先順序 (OBR-5)" enName='Priority'>
          <select
            id="priority"
            value={obrData?.priority || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="S">緊急</option>
            <option value="A">盡快</option>
            <option value="R">例行</option>
            <option value="P">預先安排</option>
          </select>
        </FormField>

        {/* OBR-6 Requested DateTime */}
        <FormField label="請求日期時間 (OBR-6)" enName='Requested DateTime' required>
          <input
            type="datetime-local"
            id="requestedDateTime"
            value={obrData?.requestedDateTime || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* OBR-7 Observation DateTime */}
        <FormField label="觀察日期時間 (OBR-7)" enName='Observation Date/Time'required>
          <input
            type="datetime-local"
            id="observationDateTime"
            value={obrData?.observationDateTime || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* OBR-8 Observation End DateTime */}
        <FormField label="觀察結束日期時間 (OBR-8)" enName='Observation End Date/Time'>
          <input
            type="datetime-local"
            id="observationEndDateTime"
            value={obrData?.observationEndDateTime || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* OBR-9 Collection Volume */}
        <FormField label="採集量 (OBR-9)" enName='Collection Volume'>
          <input
            type="text"
            id="collectionVolume"
            value={obrData?.collectionVolume || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入採集量"
          />
        </FormField>

        {/* OBR-10 Collector Identifier */}
        <FormField label="採集者識別碼 (OBR-10)" enName='Collector Identifier'>
          <input
            type="text"
            id="collectorIdentifier"
            value={obrData?.collectorIdentifier || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入採集者識別碼"
          />
        </FormField>

        {/* OBR-11 Specimen Action Code */}
        <FormField label="標本操作代碼 (OBR-11)" ENName='Specimen Action Code'>
          <select
            id="specimenActionCode"
            value={obrData?.specimenActionCode || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="A">新增</option>
            <option value="G">產生</option>
            <option value="P">待處理</option>
            <option value="S">儲存</option>
          </select>
        </FormField>

        {/* OBR-12 Danger Code */}
        <FormField label="危險代碼 (OBR-12)" enName='Danger Code'>
          <input
            type="text"
            id="dangerCode"
            value={obrData?.dangerCode || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入危險代碼"
          />
        </FormField>

        {/* OBR-13 Relevant Clinical Info */}
        <FormField label="相關臨床資訊 (OBR-13)" enName='Relevant Clinical Information'>
          <textarea
            id="relevantClinicalInfo"
            value={obrData?.relevantClinicalInfo || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入相關臨床資訊"
            rows="3"
          />
        </FormField>

        {/* OBR-14 Specimen Received DateTime */}
        <FormField label="標本接收日期時間 (OBR-14)" enName='Specimen Received Date/Time'>
          <input
            type="datetime-local"
            id="specimenReceivedDateTime"
            value={obrData?.specimenReceivedDateTime || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* OBR-15 Specimen Source */}
        <FormField label="標本來源 (OBR-15)" enName='Specimen Source'>
          <input
            type="text"
            id="specimenSource"
            value={obrData?.specimenSource || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入標本來源"
          />
        </FormField>

        {/* OBR-16 Ordering Provider */}
        <FormField label="開單醫師 (OBR-16)" enName='Ordering Provider' required>
          <input
            type="text"
            id="orderingProvider"
            value={obrData?.orderingProvider || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入開單醫師"
          />
        </FormField>

        {/* OBR-17 Order Callback Phone Number */}
        <FormField label="訂單回撥電話號碼 (OBR-17)" enName='Order Callback Phone Number'>
          <input
            type="tel"
            id="orderCallbackPhoneNumber"
            value={obrData?.orderCallbackPhoneNumber || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入訂單回撥電話號碼"
          />
        </FormField>

        {/* OBR-18 Placer Field 1 */}
        <FormField label="申請方欄位1 (OBR-18)" enName='Placer Field 1'>
          <input
            type="text"
            id="placerField1"
            value={obrData?.placerField1 || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入申請方欄位1"
          />
        </FormField>

        {/* OBR-19 Placer Field 2 */}
        <FormField label="申請方欄位2 (OBR-19)" enName='Placer Field 2'>
          <input
            type="text"
            id="placerField2"
            value={obrData?.placerField2 || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入申請方欄位2"
          />
        </FormField>

        {/* OBR-20 Filler Field 1 */}
        <FormField label="執行方欄位1 (OBR-20)" enName='Filler Field 1'>
          <input
            type="text"
            id="fillerField1"
            value={obrData?.fillerField1 || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入執行方欄位1"
          />
        </FormField>

        {/* OBR-21 Filler Field 2 */}
        <FormField label="執行方欄位2 (OBR-21)" enName='Filler Field 2'>
          <input
            type="text"
            id="fillerField2"
            value={obrData?.fillerField2 || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入執行方欄位2"
          />
        </FormField>

        {/* OBR-22 Results Rpt Status Chng DateTime */}
        <FormField label="結果報告狀態變更日期時間 (OBR-22)" enName='Results Rpt/Status Chng - Date/Time'>
          <input
            type="datetime-local"
            id="resultsRptStatusChngDateTime"
            value={obrData?.resultsRptStatusChngDateTime || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* OBR-23 Charge to Practice */}
        <FormField label="收費實踐 (OBR-23)" enName='Charge to Practice'>
          <input
            type="text"
            id="chargeToPractice"
            value={obrData?.chargeToPractice || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入收費實踐"
          />
        </FormField>

        {/* OBR-24 Diagnostic Serv Sect ID */}
        <FormField label="診斷服務部門ID (OBR-24)" enName='Diagnostic Serv Sect ID'>
          <select
            id="diagnosticServSectId"
            value={obrData?.diagnosticServSectId || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="RAD">放射科</option>
            <option value="LAB">檢驗科</option>
            <option value="NMR">核磁共振</option>
            <option value="CT">電腦斷層</option>
            <option value="US">超音波</option>
          </select>
        </FormField>

        {/* OBR-25 Result Status */}
        <FormField label="結果狀態 (OBR-25)" enName='Result Status' required>
          <select
            id="resultStatus"
            value={obrData?.resultStatus || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="O">訂單已接收</option>
            <option value="I">結果待確認</option>
            <option value="P">初步結果</option>
            <option value="F">最終結果</option>
            <option value="C">修改結果</option>
            <option value="X">無法取得結果</option>
            <option value="Y">無訂單此檢查</option>
            <option value="Z">無法最終確認</option>
          </select>
        </FormField>

        {/* OBR-26 Parent Result */}
        <FormField label="父結果 (OBR-26)" enName='Parent Result'>
          <input
            type="text"
            id="parentResult"
            value={obrData?.parentResult || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入父結果"
          />
        </FormField>

        {/* OBR-27 Quantity/Timing */}
        <FormField label="數量/時間 (OBR-27)" enName='Quantity/Timing'>
          <input
            type="text"
            id="quantityTiming"
            value={obrData?.quantityTiming || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入數量/時間"
          />
        </FormField>

        {/* OBR-28 Result Copies To */}
        <FormField label="結果副本發送至 (OBR-28)" enName='Result Copies To'>
          <input
            type="text"
            id="resultCopiesTo"
            value={obrData?.resultCopiesTo || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入結果副本發送對象"
          />
        </FormField>

        {/* OBR-29 Parent */}
        <FormField label="父項目 (OBR-29)" enName='Parent'>
          <input
            type="text"
            id="parent"
            value={obrData?.parent || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入父項目"
          />
        </FormField>

        {/* OBR-30 Transportation Mode */}
        <FormField label="運輸模式 (OBR-30)" enName='Transportation Mode'>
          <select
            id="transportationMode"
            value={obrData?.transportationMode || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="WALK">步行</option>
            <option value="CART">推車</option>
            <option value="PORT">搬運</option>
            <option value="WHLC">輪椅</option>
            <option value="AMBU">救護車</option>
          </select>
        </FormField>

        {/* OBR-31 Reason for Study */}
        <FormField label="檢查原因 (OBR-31)" enName='Reason for Study'>
          <textarea
            id="reasonForStudy"
            value={obrData?.reasonForStudy || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入檢查原因"
            rows="3"
          />
        </FormField>

        {/* OBR-32 Principal Result Interpreter */}
        <FormField label="主要結果解釋者 (OBR-32)" enName='Principal Result Interpreter'>
          <input
            type="text"
            id="principalResultInterpreter"
            value={obrData?.principalResultInterpreter || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入主要結果解釋者"
          />
        </FormField>

        {/* OBR-33 Assistant Result Interpreter */}
        <FormField label="助理結果解釋者 (OBR-33)" enName='Assistant Result Interpreter'>
          <input
            type="text"
            id="assistantResultInterpreter"
            value={obrData?.assistantResultInterpreter || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入助理結果解釋者"
          />
        </FormField>

        {/* OBR-34 Technician */}
        <FormField label="技術員 (OBR-34)" enName='Technician'>
          <input
            type="text"
            id="technician"
            value={obrData?.technician || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入技術員"
          />
        </FormField>

        {/* OBR-35 Transcriptionist */}
        <FormField label="轉錄員 (OBR-35)" enName='Transcriptionist'>
          <input
            type="text"
            id="transcriptionist"
            value={obrData?.transcriptionist || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入轉錄員"
          />
        </FormField>

        {/* OBR-36 Scheduled DateTime */}
        <FormField label="排程日期時間 (OBR-36)" enName='Scheduled Date/Time'>
          <input
            type="datetime-local"
            id="scheduledDateTime"
            value={obrData?.scheduledDateTime || ''}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* OBR-37 Number of Sample Containers */}
        <FormField label="樣本容器數量 (OBR-37)" enName='Number of Sample Containers'>
          <input
            type="number"
            id="numberOfSampleContainers"
            value={obrData?.numberOfSampleContainers || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入樣本容器數量"
            min="0"
          />
        </FormField>

        {/* OBR-38 Transport Logistics of Collected Sample */}
        <FormField label="採集樣本的運輸物流 (OBR-38)" enName='Transport Logistics of Collected Sample'>
          <textarea
            id="transportLogisticsOfCollectedSample"
            value={obrData?.transportLogisticsOfCollectedSample || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入採集樣本的運輸物流資訊"
            rows="3"
          />
        </FormField>

        {/* OBR-39 Collectors Comment */}
        <FormField label="採集者評論 (OBR-39)" enName="Collector's Comment">
          <textarea
            id="collectorsComment"
            value={obrData?.collectorsComment || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入採集者評論"
            rows="3"
          />
        </FormField>

        {/* OBR-40 Transport Arrangement Responsibility */}
        <FormField label="運輸安排責任 (OBR-40)" enName='Transport Arrangement Responsibility'>
          <input
            type="text"
            id="transportArrangementResponsibility"
            value={obrData?.transportArrangementResponsibility || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入運輸安排責任"
          />
        </FormField>

        {/* OBR-41 Transport Arranged */}
        <FormField label="運輸已安排 (OBR-41)" enName='Transport Arranged'>
          <select
            id="transportArranged"
            value={obrData?.transportArranged || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="A">已安排</option>
            <option value="N">未安排</option>
            <option value="U">未知</option>
          </select>
        </FormField>

        {/* OBR-42 Escort Required */}
        <FormField label="需要護送 (OBR-42)" enName='Escort Required'>
          <select
            id="escortRequired"
            value={obrData?.escortRequired || ''}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇...</option>
            <option value="Y">是</option>
            <option value="N">否</option>
            <option value="U">未知</option>
          </select>
        </FormField>

        {/* OBR-43 Planned Patient Transport Comment */}
        <FormField label="計劃的病人運輸評論 (OBR-43)" enName='Planned Patient Transport Comment'>
          <textarea
            id="plannedPatientTransportComment"
            value={obrData?.plannedPatientTransportComment || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入計劃的病人運輸評論"
            rows="3"
          />
        </FormField>

        {/* OBR-44 Procedure Code */}
        <FormField label="程序代碼 (OBR-44)" enName='Procedure Code'>
          <input
            type="text"
            id="procedureCode"
            value={obrData?.procedureCode || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入程序代碼"
          />
        </FormField>

        {/* OBR-45 Procedure Code Modifier */}
        <FormField label="程序代碼修飾符 (OBR-45)" enName='Procedure Code Modifier'>
          <input
            type="text"
            id="procedureCodeModifier"
            value={obrData?.procedureCodeModifier || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入程序代碼修飾符"
          />
        </FormField>

        {/* OBR-46 Placer Supplemental Service Information */}
        <FormField label="申請方補充服務資訊 (OBR-46)" enName='Placer Supplemental Service Information'>
          <textarea
            id="placerSupplementalServiceInformation"
            value={obrData?.placerSupplementalServiceInformation || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入申請方補充服務資訊"
            rows="3"
          />
        </FormField>

        {/* OBR-47 Filler Supplemental Service Information */}
        <FormField label="執行方補充服務資訊 (OBR-47)" enName='Filler Supplemental Service Information'>
          <textarea
            id="fillerSupplementalServiceInformation"
            value={obrData?.fillerSupplementalServiceInformation || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入執行方補充服務資訊"
            rows="3"
          />
        </FormField>

        {/* OBR-48 Medically Necessary Duplicate Procedure Reason */}
        <FormField label="醫療必要重複程序原因 (OBR-48)" enName='Medically Necessary Duplicate Procedure Reason'>
          <textarea
            id="medicallyNecessaryDuplicateProcedureReason"
            value={obrData?.medicallyNecessaryDuplicateProcedureReason || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入醫療必要重複程序原因"
            rows="3"
          />
        </FormField>

        {/* OBR-49 Result Handling */}
        <FormField label="結果處理 (OBR-49)" enName='Result Handling'>
          <input
            type="text"
            id="resultHandling"
            value={obrData?.resultHandling || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入結果處理方式"
          />
        </FormField>

        {/* OBR-50 Parent Universal Service Identifier */}
        <FormField label="父通用服務識別碼 (OBR-50)" enName='Parent Universal Service Identifier'>
          <input
            type="text"
            id="parentUniversalServiceIdentifier"
            value={obrData?.parentUniversalServiceIdentifier || ''}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入父通用服務識別碼"
          />
        </FormField>
      </FormSection>
    </>
  );
};

export default OBRSection; 