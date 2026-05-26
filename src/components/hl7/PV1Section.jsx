import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateFormData } from "../../store/hl7FormSlice";
import FormSection, { FormField, inputClassName, selectClassName, dateTimeClassName } from "./FormSection";
import { useLanguage } from "../../contexts/LanguageContext";

const PV1Section = ({ messageType }) => {
  const dispatch = useDispatch();
  const pv1Data = useSelector((state) => state.hl7Form.forms[messageType]?.pv1);
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFormData({ messageType, segment: "pv1", field: id, value }));
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('sections.pv1.title')}</h3>
        <p className="text-sm text-blue-600">{t('sections.pv1.desc')}</p>
      </div>

      <FormSection title={t('sections.pv1.formTitle')}>
        <FormField label="設定ID" enName="Set ID" fieldNotation="PV1-1">
          <input type="text" id="setId" name="setId" value={pv1Data?.setId || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入設定ID'} />
        </FormField>

        <FormField label="病患類別" enName="Patient Class" fieldNotation="PV1-2">
          <select id="patientClass" name="patientClass" value={pv1Data?.patientClass || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="I">{isEn ? 'Inpatient (I)' : '住院 (Inpatient)'}</option>
            <option value="O">{isEn ? 'Outpatient (O)' : '門診 (Outpatient)'}</option>
            <option value="E">{isEn ? 'Emergency (E)' : '急診 (Emergency)'}</option>
            <option value="P">{isEn ? 'Pre-admit (P)' : '術前登記 (Pre-admit)'}</option>
            <option value="R">{isEn ? 'Recurring patient (R)' : '日間照護/重複就診 (Recurring patient)'}</option>
            <option value="B">{isEn ? 'Obstetrics (B)' : '產科 (Obstetrics)'}</option>
            <option value="C">{isEn ? 'Commercial Account (C)' : '商業帳戶 (Commercial Account)'}</option>
            <option value="N">{isEn ? 'Not applicable (N)' : '不適用 (Not applicable)'}</option>
            <option value="U">{isEn ? 'Unknown (U)' : '未知 (Unknown)'}</option>
          </select>
        </FormField>

        <FormField label="病人位置" enName="Assigned Patient Location" fieldNotation="PV1-3">
          <input type="text" id="assignedPatientLocation" name="assignedPatientLocation" value={pv1Data?.assignedPatientLocation || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入病人位置 (例: 3W^389^1)'} />
        </FormField>

        <FormField label="入院類型" enName="Admission Type" fieldNotation="PV1-4">
          <select id="admissionType" name="admissionType" value={pv1Data?.admissionType || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="A">{isEn ? 'Accident (A)' : '意外 (Accident)'}</option>
            <option value="C">{isEn ? 'Elective (C)' : '選擇性入院 (Elective)'}</option>
            <option value="E">{isEn ? 'Emergency (E)' : '急診 (Emergency)'}</option>
            <option value="L">{isEn ? 'Labor and Delivery (L)' : '產科分娩 (Labor and Delivery)'}</option>
            <option value="R">{isEn ? 'Routine (R)' : '常規 (Routine)'}</option>
            <option value="N">{isEn ? 'Newborn (N)' : '新生兒 (Newborn)'}</option>
          </select>
        </FormField>

        <FormField label="預約住院號碼" enName="Preadmit Number" fieldNotation="PV1-5">
          <input type="text" id="preadmitNumber" name="preadmitNumber" value={pv1Data?.preadmitNumber || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入預約住院號碼'} />
        </FormField>

        <FormField label="先前病人位置" enName="Prior Patient Location" fieldNotation="PV1-6">
          <input type="text" id="priorPatientLocation" name="priorPatientLocation" value={pv1Data?.priorPatientLocation || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入先前病人位置'} />
        </FormField>

        <FormField label="主治醫師" enName="Attending Doctor" fieldNotation="PV1-7">
          <input type="text" id="attendingDoctor" name="attendingDoctor" value={pv1Data?.attendingDoctor || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入主治醫師 (例: 12345^王醫師)'} />
        </FormField>

        <FormField label="轉介醫師" enName="Referring Doctor" fieldNotation="PV1-8">
          <input type="text" id="referringDoctor" name="referringDoctor" value={pv1Data?.referringDoctor || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入轉介醫師'} />
        </FormField>

        <FormField label="會診醫師" enName="Consulting Doctor" fieldNotation="PV1-9">
          <input type="text" id="consultingDoctor" name="consultingDoctor" value={pv1Data?.consultingDoctor || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入會診醫師'} />
        </FormField>

        <FormField label="醫院服務" enName="Hospital Service" fieldNotation="PV1-10">
          <input type="text" id="hospitalService" name="hospitalService" value={pv1Data?.hospitalService || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入醫院服務 (例: SUR 表示外科)'} />
        </FormField>

        <FormField label="臨時位置" enName="Temporary Location" fieldNotation="PV1-11">
          <input type="text" id="temporaryLocation" name="temporaryLocation" value={pv1Data?.temporaryLocation || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入臨時位置'} />
        </FormField>

        <FormField label="入院前測試指標" enName="Preadmit Test Indicator" fieldNotation="PV1-12">
          <input type="text" id="preadmitTestIndicator" name="preadmitTestIndicator" value={pv1Data?.preadmitTestIndicator || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入入院前測試指標'} />
        </FormField>

        <FormField label="再入院指標" enName="Re-admission Indicator" fieldNotation="PV1-13">
          <select id="readmissionIndicator" name="readmissionIndicator" value={pv1Data?.readmissionIndicator || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="R">{isEn ? 'Re-admission (R)' : '再入院 (Re-admission)'}</option>
            <option value="N">{isEn ? 'Not a re-admission (N)' : '非再入院 (Not a re-admission)'}</option>
          </select>
        </FormField>

        <FormField label="入院來源" enName="Admit Source" fieldNotation="PV1-14">
          <select id="admitSource" name="admitSource" value={pv1Data?.admitSource || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="1">{isEn ? 'Physician referral' : '醫師轉介 (Physician referral)'}</option>
            <option value="2">{isEn ? 'Clinic referral' : '診所轉介 (Clinic referral)'}</option>
            <option value="3">{isEn ? 'HMO referral' : 'HMO轉介 (HMO referral)'}</option>
            <option value="4">{isEn ? 'Transfer from hospital' : '院內轉診 (Transfer from hospital)'}</option>
            <option value="5">{isEn ? 'Transfer from other health care facility' : '轉院 (Transfer from other health care facility)'}</option>
            <option value="6">{isEn ? 'Transfer from emergency room' : '急診轉入 (Transfer from emergency room)'}</option>
            <option value="7">{isEn ? 'Transfer from another health care facility' : '轉自其他醫師 (Transfer from another health care facility)'}</option>
            <option value="8">{isEn ? 'HMO enrollee' : '產出院 (HMO enrollee)'}</option>
            <option value="9">{isEn ? 'Information not available' : '新生兒 (Information not available)'}</option>
          </select>
        </FormField>

        <FormField label="行動狀態" enName="Ambulatory Status" fieldNotation="PV1-15">
          <select id="ambulatoryStatus" name="ambulatoryStatus" value={pv1Data?.ambulatoryStatus || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="A0">{isEn ? 'No functional limitations (A0)' : '無行動限制 (A0)'}</option>
            <option value="A1">{isEn ? 'Ambulates with assistive device (A1)' : '使用輔助器具行走 (A1)'}</option>
            <option value="A2">{isEn ? 'Wheelchair/stretcher bound (A2)' : '由他人協助行走 (A2)'}</option>
            <option value="A3">{isEn ? 'Comatose; non-responsive (A3)' : '昏迷／無反應 (A3)'}</option>
            <option value="A4">{isEn ? 'Disoriented (A4)' : '迷失方向 (A4)'}</option>
            <option value="A5">{isEn ? 'Vision impaired (A5)' : '視力受損 (A5)'}</option>
            <option value="A6">{isEn ? 'Uses cane (A6)' : '使用拐杖行走 (A6)'}</option>
            <option value="A7">{isEn ? 'Uses walker (A7)' : '使用助行器行走 (A7)'}</option>
            <option value="A8">{isEn ? 'Critically ill (A8)' : '重症監護 (A8)'}</option>
            <option value="A9">{isEn ? 'Bed patient (A9)' : '臥床 (A9)'}</option>
            <option value="B1">{isEn ? 'Oxygen therapy (B1)' : '氧氣治療 (B1)'}</option>
            <option value="B2">{isEn ? 'Isolation (B2)' : '隔離 (B2)'}</option>
            <option value="B3">{isEn ? 'IV therapy (B3)' : '靜脈治療 (B3)'}</option>
            <option value="B4">{isEn ? 'Cardiac monitoring (B4)' : '心臟監測 (B4)'}</option>
            <option value="B5">{isEn ? 'Leads/ECG (B5)' : 'ECG 監測 (B5)'}</option>
            <option value="B6">{isEn ? 'Pain management (B6)' : '疼痛管理 (B6)'}</option>
          </select>
        </FormField>

        <FormField label="VIP指標" enName="VIP Indicator" fieldNotation="PV1-16">
          <input type="text" id="vipIndicator" name="vipIndicator" value={pv1Data?.vipIndicator || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入VIP指標'} />
        </FormField>

        <FormField label="住院醫師" enName="Admitting Doctor" fieldNotation="PV1-17">
          <input type="text" id="admittingDoctor" name="admittingDoctor" value={pv1Data?.admittingDoctor || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入住院醫師 (例: 12345^陳醫師)'} />
        </FormField>

        <FormField label="病患類型" enName="Patient Type" fieldNotation="PV1-18">
          <input type="text" id="patientType" name="patientType" value={pv1Data?.patientType || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入病患類型'} />
        </FormField>

        <FormField label="就診號碼" enName="Visit Number" fieldNotation="PV1-19">
          <input type="text" id="visitNumber" name="visitNumber" value={pv1Data?.visitNumber || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入就診號碼'} />
        </FormField>

        <FormField label="財務類別" enName="Financial Class" fieldNotation="PV1-20">
          <input type="text" id="financialClass" name="financialClass" value={pv1Data?.financialClass || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入財務類別 (例: IC 表示健保)'} />
        </FormField>

        <FormField label="收費價格指標" enName="Charge Price Indicator" fieldNotation="PV1-21">
          <input type="text" id="chargePriceIndicator" name="chargePriceIndicator" value={pv1Data?.chargePriceIndicator || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入收費價格指標'} />
        </FormField>

        <FormField label="禮遇代碼" enName="Courtesy Code" fieldNotation="PV1-22">
          <input type="text" id="courtesyCode" name="courtesyCode" value={pv1Data?.courtesyCode || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入禮遇代碼'} />
        </FormField>

        <FormField label="信用評級" enName="Credit Rating" fieldNotation="PV1-23">
          <input type="text" id="creditRating" name="creditRating" value={pv1Data?.creditRating || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入信用評級'} />
        </FormField>

        <FormField label="合約代碼" enName="Contract Code" fieldNotation="PV1-24">
          <input type="text" id="contractCode" name="contractCode" value={pv1Data?.contractCode || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入合約代碼'} />
        </FormField>

        <FormField label="合約生效日期" enName="Contract Effective Date" fieldNotation="PV1-25">
          <input type="date" id="contractEffectiveDate" name="contractEffectiveDate" value={pv1Data?.contractEffectiveDate || ""} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="合約金額" enName="Contract Amount" fieldNotation="PV1-26">
          <input type="number" id="contractAmount" name="contractAmount" value={pv1Data?.contractAmount || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入合約金額'} />
        </FormField>

        <FormField label="合約期間" enName="Contract Period" fieldNotation="PV1-27">
          <input type="text" id="contractPeriod" name="contractPeriod" value={pv1Data?.contractPeriod || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入合約期間'} />
        </FormField>

        <FormField label="利息代碼" enName="Interest Code" fieldNotation="PV1-28">
          <input type="text" id="interestCode" name="interestCode" value={pv1Data?.interestCode || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入利息代碼'} />
        </FormField>

        <FormField label="轉入壞帳代碼" enName="Transfer to Bad Debt Code" fieldNotation="PV1-29">
          <input type="text" id="transferToBadDebtCode" name="transferToBadDebtCode" value={pv1Data?.transferToBadDebtCode || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入轉入壞帳代碼'} />
        </FormField>

        <FormField label="轉入壞帳日期" enName="Transfer to Bad Debt Date" fieldNotation="PV1-30">
          <input type="date" id="transferToBadDebtDate" name="transferToBadDebtDate" value={pv1Data?.transferToBadDebtDate || ""} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="壞帳機構代碼" enName="Bad Debt Agency Code" fieldNotation="PV1-31">
          <input type="text" id="badDebtAgencyCode" name="badDebtAgencyCode" value={pv1Data?.badDebtAgencyCode || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入壞帳機構代碼'} />
        </FormField>

        <FormField label="壞帳轉移金額" enName="Bad Debt Transfer Amount" fieldNotation="PV1-32">
          <input type="number" id="badDebtTransferAmount" name="badDebtTransferAmount" value={pv1Data?.badDebtTransferAmount || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入壞帳轉移金額'} />
        </FormField>

        <FormField label="壞帳回收金額" enName="Bad Debt Recovery Amount" fieldNotation="PV1-33">
          <input type="number" id="badDebtRecoveryAmount" name="badDebtRecoveryAmount" value={pv1Data?.badDebtRecoveryAmount || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入壞帳回收金額'} />
        </FormField>

        <FormField label="刪除帳戶指標" enName="Delete Account Indicator" fieldNotation="PV1-34">
          <select id="deleteAccountIndicator" name="deleteAccountIndicator" value={pv1Data?.deleteAccountIndicator || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="Y">{t('common.yes')}</option>
            <option value="N">{t('common.no')}</option>
          </select>
        </FormField>

        <FormField label="刪除帳戶日期" enName="Delete Account Date" fieldNotation="PV1-35">
          <input type="date" id="deleteAccountDate" name="deleteAccountDate" value={pv1Data?.deleteAccountDate || ""} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="出院狀態" enName="Discharge Disposition" fieldNotation="PV1-36">
          <select id="dischargeDisposition" name="dischargeDisposition" value={pv1Data?.dischargeDisposition || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="01">{isEn ? 'Routine discharge' : '一般性出院 (Routine discharge)'}</option>
            <option value="02">{isEn ? 'Discharged to home for hospice care' : '出院並轉至長照 (Discharged to home for hospice care)'}</option>
            <option value="03">{isEn ? 'Discharged to alternate care facility' : '出院至其他照護機構 (Discharged to alternate care facility)'}</option>
            <option value="04">{isEn ? 'Discharged to long term care facility' : '出院至長照機構 (Discharged to long term care facility)'}</option>
            <option value="05">{isEn ? 'Left against medical advice' : '離開醫師醫囑 (Left against medical advice)'}</option>
            <option value="06">{isEn ? 'Patient died' : '病患死亡 (Patient died)'}</option>
            <option value="07">{isEn ? 'Left without notice' : '離開而未通知 (Left without notice)'}</option>
            <option value="08">{isEn ? 'Expected to return' : '未返回但預期將返回 (Expected to return)'}</option>
            <option value="09">{isEn ? 'Still inpatient' : '仍在住院 (Still inpatient)'}</option>
          </select>
        </FormField>

        <FormField label="出院至位置" enName="Discharged to Location" fieldNotation="PV1-37">
          <input type="text" id="dischargedToLocation" name="dischargedToLocation" value={pv1Data?.dischargedToLocation || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入出院至位置'} />
        </FormField>

        <FormField label="飲食類型" enName="Diet Type" fieldNotation="PV1-38">
          <input type="text" id="dietType" name="dietType" value={pv1Data?.dietType || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入飲食類型'} />
        </FormField>

        <FormField label="服務機構" enName="Servicing Facility" fieldNotation="PV1-39">
          <input type="text" id="servicingFacility" name="servicingFacility" value={pv1Data?.servicingFacility || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入服務機構'} />
        </FormField>

        <FormField label="床位狀態" enName="Bed Status" fieldNotation="PV1-40">
          <select id="bedStatus" name="bedStatus" value={pv1Data?.bedStatus || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="C">{isEn ? 'Closed (C)' : '已關閉 (Closed)'}</option>
            <option value="H">{isEn ? 'Housekeeping (H)' : '已保留 (Housekeeping)'}</option>
            <option value="I">{isEn ? 'Isolated (I)' : '隔離 (Isolated)'}</option>
            <option value="K">{isEn ? 'Contaminated (K)' : '已佔用 (Contaminated)'}</option>
            <option value="O">{isEn ? 'Open (O)' : '開放 (Open)'}</option>
            <option value="U">{isEn ? 'Unknown (U)' : '未知 (Unknown)'}</option>
          </select>
        </FormField>

        <FormField label="帳戶狀態" enName="Account Status" fieldNotation="PV1-41">
          <input type="text" id="accountStatus" name="accountStatus" value={pv1Data?.accountStatus || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入帳戶狀態'} />
        </FormField>

        <FormField label="待定位置" enName="Pending Location" fieldNotation="PV1-42">
          <input type="text" id="pendingLocation" name="pendingLocation" value={pv1Data?.pendingLocation || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入待定位置'} />
        </FormField>

        <FormField label="先前臨時位置" enName="Prior Temporary Location" fieldNotation="PV1-43">
          <input type="text" id="priorTemporaryLocation" name="priorTemporaryLocation" value={pv1Data?.priorTemporaryLocation || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入先前臨時位置'} />
        </FormField>

        <FormField label="入院日期時間" enName="Admit Date/Time" fieldNotation="PV1-44">
          <input type="datetime-local" id="admitDateTime" name="admitDateTime" value={pv1Data?.admitDateTime || ""} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="出院日期時間" enName="Discharge Date/Time" fieldNotation="PV1-45">
          <input type="datetime-local" id="dischargeDateTime" name="dischargeDateTime" value={pv1Data?.dischargeDateTime || ""} onChange={handleInputChange} className={dateTimeClassName} />
        </FormField>

        <FormField label="當前病人餘額" enName="Current Patient Balance" fieldNotation="PV1-46">
          <input type="number" id="currentPatientBalance" name="currentPatientBalance" value={pv1Data?.currentPatientBalance || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入當前病人餘額'} step="0.01" />
        </FormField>

        <FormField label="總費用" enName="Total Charges" fieldNotation="PV1-47">
          <input type="number" id="totalCharges" name="totalCharges" value={pv1Data?.totalCharges || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入總費用'} step="0.01" />
        </FormField>

        <FormField label="總調整額" enName="Total Adjustments" fieldNotation="PV1-48">
          <input type="number" id="totalAdjustments" name="totalAdjustments" value={pv1Data?.totalAdjustments || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入總調整額'} step="0.01" />
        </FormField>

        <FormField label="總支付額" enName="Total Payments" fieldNotation="PV1-49">
          <input type="number" id="totalPayments" name="totalPayments" value={pv1Data?.totalPayments || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入總支付額'} step="0.01" />
        </FormField>

        <FormField label="替代就診ID" enName="Alternate Visit ID" fieldNotation="PV1-50">
          <input type="text" id="alternateVisitId" name="alternateVisitId" value={pv1Data?.alternateVisitId || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入替代就診ID'} />
        </FormField>

        <FormField label="就診指示器" enName="Visit Indicator" fieldNotation="PV1-51">
          <select id="visitIndicator" name="visitIndicator" value={pv1Data?.visitIndicator || ""} onChange={handleInputChange} className={selectClassName}>
            <option value="">{t('common.pleaseSelect')}</option>
            <option value="A">{isEn ? 'Acute (A)' : '急性 (Acute)'}</option>
            <option value="C">{isEn ? 'Chronic (C)' : '慢性 (Chronic)'}</option>
            <option value="N">{isEn ? 'None (N)' : '無 (None)'}</option>
            <option value="O">{isEn ? 'Other (O)' : '其他 (Other)'}</option>
            <option value="R">{isEn ? 'Recurrent (R)' : '復發 (Recurrent)'}</option>
            <option value="S">{isEn ? 'Single (S)' : '單次 (Single)'}</option>
          </select>
        </FormField>

        <FormField label="其他醫療提供者" enName="Other Healthcare Provider" fieldNotation="PV1-52">
          <input type="text" id="otherHealthcareProvider" name="otherHealthcareProvider" value={pv1Data?.otherHealthcareProvider || ""} onChange={handleInputChange} className={inputClassName} placeholder={isEn ? '' : '請輸入其他醫療提供者 (例: ID^姓名^類型)'} />
        </FormField>
      </FormSection>
    </>
  );
};

export default PV1Section;
