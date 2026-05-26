import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/hl7FormSlice';
import FormSection, { FormField, inputClassName, selectClassName, dateTimeClassName } from './FormSection';
import { useLanguage } from '../../contexts/LanguageContext';

const OBRSection = ({messageType}) => {
  const dispatch = useDispatch();
  const obrData = useSelector((state) => state.hl7Form.forms[messageType].obr);
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({ messageType, segment: 'obr', field: id, value }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('sections.obr.title')}</h3>
        <p className="text-sm text-blue-600">{t('sections.obr.desc')}</p>
      </div>

      <FormSection title={t('sections.obr.formTitle')}>
        <FormField label="序號" enName="Set ID" fieldNotation="OBR-1">
          <input type="text" id="setId" value="1" readOnly className={inputClassName} />
        </FormField>

        <FormField label="申請方訂單編號" enName="Placer Order Number" fieldNotation="OBR-2">
          <input type="text" id="placerOrderNumber" value={obrData?.placerOrderNumber || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入申請方訂單編號'} />
        </FormField>

        <FormField label="執行方訂單編號" enName="Filler Order Number" fieldNotation="OBR-3">
          <input type="text" id="fillerOrderNumber" value={obrData?.fillerOrderNumber || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入執行方訂單編號'} />
        </FormField>

        <FormField label="通用服務識別碼" enName="Universal Service Identifier" fieldNotation="OBR-4">
          <input type="text" id="universalServiceIdentifier" value={obrData?.universalServiceIdentifier || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入通用服務識別碼'} />
        </FormField>

        <FormField label="優先順序" enName="Priority" fieldNotation="OBR-5">
          <select id="priority" value={obrData?.priority || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="S">{isEn ? 'Stat' : '緊急'}</option>
            <option value="A">{isEn ? 'ASAP' : '盡快'}</option>
            <option value="R">{isEn ? 'Routine' : '例行'}</option>
            <option value="P">{isEn ? 'Pre-op' : '預先安排'}</option>
          </select>
        </FormField>

        <FormField label="請求日期時間" enName="Requested DateTime" fieldNotation="OBR-6">
          <input type="datetime-local" id="requestedDateTime" value={obrData?.requestedDateTime || ''} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="觀察日期時間" enName="Observation Date/Time" fieldNotation="OBR-7">
          <input type="datetime-local" id="observationDateTime" value={obrData?.observationDateTime || ''} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="觀察結束日期時間" enName="Observation End Date/Time" fieldNotation="OBR-8">
          <input type="datetime-local" id="observationEndDateTime" value={obrData?.observationEndDateTime || ''} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="採集量" enName="Collection Volume" fieldNotation="OBR-9">
          <input type="text" id="collectionVolume" value={obrData?.collectionVolume || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入採集量'} />
        </FormField>

        <FormField label="採集者識別碼" enName="Collector Identifier" fieldNotation="OBR-10">
          <input type="text" id="collectorIdentifier" value={obrData?.collectorIdentifier || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入採集者識別碼'} />
        </FormField>

        <FormField label="標本操作代碼" enName="Specimen Action Code" fieldNotation="OBR-11">
          <select id="specimenActionCode" value={obrData?.specimenActionCode || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="A">{isEn ? 'Add' : '新增'}</option>
            <option value="G">{isEn ? 'Generate' : '產生'}</option>
            <option value="P">{isEn ? 'Pending' : '待處理'}</option>
            <option value="S">{isEn ? 'Store' : '儲存'}</option>
          </select>
        </FormField>

        <FormField label="危險代碼" enName="Danger Code" fieldNotation="OBR-12">
          <input type="text" id="dangerCode" value={obrData?.dangerCode || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入危險代碼'} />
        </FormField>

        <FormField label="相關臨床資訊" enName="Relevant Clinical Information" fieldNotation="OBR-13">
          <textarea id="relevantClinicalInfo" value={obrData?.relevantClinicalInfo || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入相關臨床資訊'} rows="3" />
        </FormField>

        <FormField label="標本接收日期時間" enName="Specimen Received Date/Time" fieldNotation="OBR-14">
          <input type="datetime-local" id="specimenReceivedDateTime" value={obrData?.specimenReceivedDateTime || ''} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="標本來源" enName="Specimen Source" fieldNotation="OBR-15">
          <input type="text" id="specimenSource" value={obrData?.specimenSource || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入標本來源'} />
        </FormField>

        <FormField label="開單醫師" enName="Ordering Provider" fieldNotation="OBR-16">
          <input type="text" id="orderingProvider" value={obrData?.orderingProvider || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入開單醫師'} />
        </FormField>

        <FormField label="訂單回撥電話號碼" enName="Order Callback Phone Number" fieldNotation="OBR-17">
          <input type="tel" id="orderCallbackPhoneNumber" value={obrData?.orderCallbackPhoneNumber || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入訂單回撥電話號碼'} />
        </FormField>

        <FormField label="申請方欄位1" enName="Placer Field 1" fieldNotation="OBR-18">
          <input type="text" id="placerField1" value={obrData?.placerField1 || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入申請方欄位1'} />
        </FormField>

        <FormField label="申請方欄位2" enName="Placer Field 2" fieldNotation="OBR-19">
          <input type="text" id="placerField2" value={obrData?.placerField2 || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入申請方欄位2'} />
        </FormField>

        <FormField label="執行方欄位1" enName="Filler Field 1" fieldNotation="OBR-20">
          <input type="text" id="fillerField1" value={obrData?.fillerField1 || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入執行方欄位1'} />
        </FormField>

        <FormField label="執行方欄位2" enName="Filler Field 2" fieldNotation="OBR-21">
          <input type="text" id="fillerField2" value={obrData?.fillerField2 || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入執行方欄位2'} />
        </FormField>

        <FormField label="結果報告狀態變更日期時間" enName="Results Rpt/Status Chng - Date/Time" fieldNotation="OBR-22">
          <input type="datetime-local" id="resultsRptStatusChngDateTime" value={obrData?.resultsRptStatusChngDateTime || ''} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="收費實踐" enName="Charge to Practice" fieldNotation="OBR-23">
          <input type="text" id="chargeToPractice" value={obrData?.chargeToPractice || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入收費實踐'} />
        </FormField>

        <FormField label="診斷服務部門ID" enName="Diagnostic Serv Sect ID" fieldNotation="OBR-24">
          <select id="diagnosticServSectId" value={obrData?.diagnosticServSectId || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="RAD">{isEn ? 'Radiology' : '放射科'}</option>
            <option value="LAB">{isEn ? 'Laboratory' : '檢驗科'}</option>
            <option value="NMR">{isEn ? 'Nuclear Magnetic Resonance' : '核磁共振'}</option>
            <option value="CT">{isEn ? 'CT Scan' : '電腦斷層'}</option>
            <option value="US">{isEn ? 'Ultrasound' : '超音波'}</option>
          </select>
        </FormField>

        <FormField label="結果狀態" enName="Result Status" fieldNotation="OBR-25">
          <select id="resultStatus" value={obrData?.resultStatus || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="O">{isEn ? 'Order received' : '訂單已接收'}</option>
            <option value="I">{isEn ? 'Results pending' : '結果待確認'}</option>
            <option value="P">{isEn ? 'Preliminary results' : '初步結果'}</option>
            <option value="F">{isEn ? 'Final results' : '最終結果'}</option>
            <option value="C">{isEn ? 'Corrected results' : '修改結果'}</option>
            <option value="X">{isEn ? 'Results unavailable' : '無法取得結果'}</option>
            <option value="Y">{isEn ? 'No order on record' : '無訂單此檢查'}</option>
            <option value="Z">{isEn ? 'No record of patient' : '無法最終確認'}</option>
          </select>
        </FormField>

        <FormField label="父結果" enName="Parent Result" fieldNotation="OBR-26">
          <input type="text" id="parentResult" value={obrData?.parentResult || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入父結果'} />
        </FormField>

        <FormField label="數量/時間" enName="Quantity/Timing" fieldNotation="OBR-27">
          <input type="text" id="quantityTiming" value={obrData?.quantityTiming || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入數量/時間'} />
        </FormField>

        <FormField label="結果副本發送至" enName="Result Copies To" fieldNotation="OBR-28">
          <input type="text" id="resultCopiesTo" value={obrData?.resultCopiesTo || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入結果副本發送對象'} />
        </FormField>

        <FormField label="父項目" enName="Parent" fieldNotation="OBR-29">
          <input type="text" id="parent" value={obrData?.parent || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入父項目'} />
        </FormField>

        <FormField label="運輸模式" enName="Transportation Mode" fieldNotation="OBR-30">
          <select id="transportationMode" value={obrData?.transportationMode || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="WALK">{isEn ? 'Walk' : '步行'}</option>
            <option value="CART">{isEn ? 'Cart' : '推車'}</option>
            <option value="PORT">{isEn ? 'Carried' : '搬運'}</option>
            <option value="WHLC">{isEn ? 'Wheelchair' : '輪椅'}</option>
            <option value="AMBU">{isEn ? 'Ambulance' : '救護車'}</option>
          </select>
        </FormField>

        <FormField label="檢查原因" enName="Reason for Study" fieldNotation="OBR-31">
          <textarea id="reasonForStudy" value={obrData?.reasonForStudy || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入檢查原因'} rows="3" />
        </FormField>

        <FormField label="主要結果解釋者" enName="Principal Result Interpreter" fieldNotation="OBR-32">
          <input type="text" id="principalResultInterpreter" value={obrData?.principalResultInterpreter || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入主要結果解釋者'} />
        </FormField>

        <FormField label="助理結果解釋者" enName="Assistant Result Interpreter" fieldNotation="OBR-33">
          <input type="text" id="assistantResultInterpreter" value={obrData?.assistantResultInterpreter || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入助理結果解釋者'} />
        </FormField>

        <FormField label="技術員" enName="Technician" fieldNotation="OBR-34">
          <input type="text" id="technician" value={obrData?.technician || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入技術員'} />
        </FormField>

        <FormField label="轉錄員" enName="Transcriptionist" fieldNotation="OBR-35">
          <input type="text" id="transcriptionist" value={obrData?.transcriptionist || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入轉錄員'} />
        </FormField>

        <FormField label="排程日期時間" enName="Scheduled Date/Time" fieldNotation="OBR-36">
          <input type="datetime-local" id="scheduledDateTime" value={obrData?.scheduledDateTime || ''} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="樣本容器數量" enName="Number of Sample Containers" fieldNotation="OBR-37">
          <input type="number" id="numberOfSampleContainers" value={obrData?.numberOfSampleContainers || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入樣本容器數量'} min="0" />
        </FormField>

        <FormField label="採集樣本的運輸物流" enName="Transport Logistics of Collected Sample" fieldNotation="OBR-38">
          <textarea id="transportLogisticsOfCollectedSample" value={obrData?.transportLogisticsOfCollectedSample || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入採集樣本的運輸物流資訊'} rows="3" />
        </FormField>

        <FormField label="採集者評論" enName="Collector's Comment" fieldNotation="OBR-39">
          <textarea id="collectorsComment" value={obrData?.collectorsComment || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入採集者評論'} rows="3" />
        </FormField>

        <FormField label="運輸安排責任" enName="Transport Arrangement Responsibility" fieldNotation="OBR-40">
          <input type="text" id="transportArrangementResponsibility" value={obrData?.transportArrangementResponsibility || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入運輸安排責任'} />
        </FormField>

        <FormField label="運輸已安排" enName="Transport Arranged" fieldNotation="OBR-41">
          <select id="transportArranged" value={obrData?.transportArranged || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="A">{isEn ? 'Arranged' : '已安排'}</option>
            <option value="N">{isEn ? 'Not Arranged' : '未安排'}</option>
            <option value="U">{isEn ? 'Unknown' : '未知'}</option>
          </select>
        </FormField>

        <FormField label="需要護送" enName="Escort" fieldNotation="OBR-42">
          <select id="escort" value={obrData?.escort || ''} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="Y">{t('common.yes')}</option>
            <option value="N">{t('common.no')}</option>
            <option value="U">{isEn ? 'Unknown' : '未知'}</option>
          </select>
        </FormField>

        <FormField label="計劃的病人運輸評論" enName="Planned Patient Transport Comment" fieldNotation="OBR-43">
          <textarea id="plannedPatientTransportComment" value={obrData?.plannedPatientTransportComment || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入計劃的病人運輸評論'} rows="3" />
        </FormField>

        <FormField label="程序代碼" enName="Procedure Code" fieldNotation="OBR-44">
          <input type="text" id="procedureCode" value={obrData?.procedureCode || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入程序代碼'} />
        </FormField>

        <FormField label="程序代碼修飾符" enName="Procedure Code Modifier" fieldNotation="OBR-45">
          <input type="text" id="procedureCodeModifier" value={obrData?.procedureCodeModifier || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入程序代碼修飾符'} />
        </FormField>

        <FormField label="申請方補充服務資訊" enName="Placer Supplemental Service Information" fieldNotation="OBR-46">
          <textarea id="placerSupplementalServiceInformation" value={obrData?.placerSupplementalServiceInformation || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入申請方補充服務資訊'} rows="3" />
        </FormField>

        <FormField label="執行方補充服務資訊" enName="Filler Supplemental Service Information" fieldNotation="OBR-47">
          <textarea id="fillerSupplementalServiceInformation" value={obrData?.fillerSupplementalServiceInformation || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入執行方補充服務資訊'} rows="3" />
        </FormField>

        <FormField label="醫療必要重複程序原因" enName="Medically Necessary Duplicate Procedure Reason" fieldNotation="OBR-48">
          <textarea id="medicallyNecessaryDuplicateProcedureReason" value={obrData?.medicallyNecessaryDuplicateProcedureReason || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入醫療必要重複程序原因'} rows="3" />
        </FormField>

        <FormField label="結果處理" enName="Result Handling" fieldNotation="OBR-49">
          <input type="text" id="resultHandling" value={obrData?.resultHandling || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入結果處理方式'} />
        </FormField>

        <FormField label="父通用服務識別碼" enName="Parent Universal Service Identifier" fieldNotation="OBR-50">
          <input type="text" id="parentUniversalServiceIdentifier" value={obrData?.parentUniversalServiceIdentifier || ''} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入父通用服務識別碼'} />
        </FormField>
      </FormSection>
    </>
  );
};

export default OBRSection;
