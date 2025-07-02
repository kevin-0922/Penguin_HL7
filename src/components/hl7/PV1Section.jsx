import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateFormData } from "../../store/hl7FormSlice";
import FormSection, {
  FormField,
  inputClassName,
  selectClassName,
  dateTimeClassName,
} from "./FormSection";

const PV1Section = ({ messageType }) => {
  const dispatch = useDispatch();
  const pv1Data = useSelector((state) => state.hl7Form.forms[messageType]?.pv1);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(
      updateFormData({
        messageType: messageType,
        segment: "pv1",
        field: id,
        value,
      })
    );
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">病人就診段落 (PV1)</h3>
        <p className="text-sm text-blue-600">
          此段落用於記錄病人的就診信息，包括就診類型、病床分配、主治醫師等資訊。
          標記 * 的欄位為必填項目。
        </p>
      </div>

      <FormSection title="PV1 (病人就診)">
        {/* PV1-1 Set ID */}
        <FormField 
          label="設定ID" 
          enName="Set ID" 
          fieldNotation="PV1-1"
        >
          <input
            type="text"
            id="setId"
            name="setId"
            value={pv1Data?.setId || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入設定ID"
          />
        </FormField>

        {/* PV1-2 Patient Class */}
        <FormField 
          label="病患類別" 
          enName="Patient Class" 
          fieldNotation="PV1-2"
          required
        >
          <select
            id="patientClass"
            name="patientClass"
            value={pv1Data?.patientClass || ""}
            onChange={handleInputChange}
            className={selectClassName}
            required
          >
            <option value="">請選擇</option>
            <option value="I">住院 (Inpatient)</option>
            <option value="O">門診 (Outpatient)</option>
            <option value="E">急診 (Emergency)</option>
            <option value="P">術前登記 (Pre-admit)</option>
            <option value="R">日間照護/重複就診 (Recurring patient)</option>
            <option value="B">嬰兒 (Obstetrics)</option>
            <option value="C">長期照護 (Recurring patient)</option>
            <option value="N">新生兒 (Not applicable)</option>
            <option value="U">未知 (Unknown)</option>
          </select>
        </FormField>

        {/* PV1-3 Assigned Patient Location */}
        <FormField 
          label="病人位置" 
          enName="Assigned Patient Location" 
          fieldNotation="PV1-3"
        >
          <input
            type="text"
            id="assignedPatientLocation"
            name="assignedPatientLocation"
            value={pv1Data?.assignedPatientLocation || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入病人位置 (例: 3W^389^1)"
          />
        </FormField>

        {/* PV1-4 Admission Type */}
        <FormField 
          label="入院類型" 
          enName="Admission Type" 
          fieldNotation="PV1-4"
        >
          <select
            id="admissionType"
            name="admissionType"
            value={pv1Data?.admissionType || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="A">意外 (Accident)</option>
            <option value="E">急診 (Emergency)</option>
            <option value="L">勞工與產業 (Labor and Delivery)</option>
            <option value="R">常規 (Routine)</option>
            <option value="N">新生兒 (Newborn)</option>
            <option value="U">緊急 (Urgent)</option>
            <option value="C">選擇性 (Elective)</option>
            <option value="G">婦產科 (Geriatric)</option>
          </select>
        </FormField>

        {/* PV1-5 Preadmit Number */}
        <FormField 
          label="預約住院號碼" 
          enName="Preadmit Number" 
          fieldNotation="PV1-5"
        >
          <input
            type="text"
            id="preadmitNumber"
            name="preadmitNumber"
            value={pv1Data?.preadmitNumber || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入預約住院號碼"
          />
        </FormField>

        {/* PV1-6 Prior Patient Location */}
        <FormField 
          label="先前病人位置" 
          enName="Prior Patient Location" 
          fieldNotation="PV1-6"
        >
          <input
            type="text"
            id="priorPatientLocation"
            name="priorPatientLocation"
            value={pv1Data?.priorPatientLocation || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入先前病人位置"
          />
        </FormField>

        {/* PV1-7 Attending Doctor */}
        <FormField 
          label="主治醫師" 
          enName="Attending Doctor" 
          fieldNotation="PV1-7"
        >
          <input
            type="text"
            id="attendingDoctor"
            name="attendingDoctor"
            value={pv1Data?.attendingDoctor || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入主治醫師 (例: 12345^王醫師)"
          />
        </FormField>

        {/* PV1-8 Referring Doctor */}
        <FormField 
          label="轉介醫師" 
          enName="Referring Doctor" 
          fieldNotation="PV1-8"
        >
          <input
            type="text"
            id="referringDoctor"
            name="referringDoctor"
            value={pv1Data?.referringDoctor || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入轉介醫師"
          />
        </FormField>

        {/* PV1-9 Consulting Doctor */}
        <FormField 
          label="會診醫師" 
          enName="Consulting Doctor" 
          fieldNotation="PV1-9"
        >
          <input
            type="text"
            id="consultingDoctor"
            name="consultingDoctor"
            value={pv1Data?.consultingDoctor || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入會診醫師"
          />
        </FormField>

        {/* PV1-10 Hospital Service */}
        <FormField 
          label="醫院服務" 
          enName="Hospital Service" 
          fieldNotation="PV1-10"
        >
          <input
            type="text"
            id="hospitalService"
            name="hospitalService"
            value={pv1Data?.hospitalService || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入醫院服務 (例: SUR 表示外科)"
          />
        </FormField>
        
        {/* PV1-11 Temporary Location */}
        <FormField 
          label="臨時位置" 
          enName="Temporary Location" 
          fieldNotation="PV1-11"
        >
          <input
            type="text"
            id="temporaryLocation"
            name="temporaryLocation"
            value={pv1Data?.temporaryLocation || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入臨時位置"
          />
        </FormField>
        
        {/* PV1-12 Preadmit Test Indicator */}
        <FormField 
          label="入院前測試指標" 
          enName="Preadmit Test Indicator" 
          fieldNotation="PV1-12"
        >
          <select
            id="preadmitTestIndicator"
            name="preadmitTestIndicator"
            value={pv1Data?.preadmitTestIndicator || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是 (Yes)</option>
            <option value="N">否 (No)</option>
          </select>
        </FormField>
        
        {/* PV1-13 Re-admission Indicator */}
        <FormField 
          label="再入院指標" 
          enName="Re-admission Indicator" 
          fieldNotation="PV1-13"
        >
          <select
            id="readmissionIndicator"
            name="readmissionIndicator"
            value={pv1Data?.readmissionIndicator || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="R">再入院 (Re-admission)</option>
            <option value="N">非再入院 (Not a re-admission)</option>
          </select>
        </FormField>

        {/* PV1-14 Admit Source */}
        <FormField 
          label="入院來源" 
          enName="Admit Source" 
          fieldNotation="PV1-14"
        >
          <select
            id="admitSource"
            name="admitSource"
            value={pv1Data?.admitSource || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="1">醫師轉介 (Physician referral)</option>
            <option value="2">診所轉介 (Clinic referral)</option>
            <option value="3">HMO轉介 (HMO referral)</option>
            <option value="4">院內轉診 (Transfer from hospital)</option>
            <option value="5">轉院 (Transfer from other health care facility)</option>
            <option value="6">急診轉入 (Transfer from emergency room)</option>
            <option value="7">轉自其他醫師 (Transfer from another health care facility)</option>
            <option value="8">產出院 (HMO enrollee)</option>
            <option value="9">新生兒 (Information not available)</option>
          </select>
        </FormField>
        
        {/* PV1-15 Ambulatory Status */}
        <FormField 
          label="行動狀態" 
          enName="Ambulatory Status" 
          fieldNotation="PV1-15"
        >
          <select
            id="ambulatoryStatus"
            name="ambulatoryStatus"
            value={pv1Data?.ambulatoryStatus || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="A0">無行動限制 (No functional limitations)</option>
            <option value="A1">輪椅使用者 (Ambulates with assistive device)</option>
            <option value="A2">擔架使用者 (Ambulates with help from other person)</option>
            <option value="A3">限制行動 (Ambulates with significant limitations)</option>
            <option value="A4">非行走能力 (Non-ambulatory)</option>
          </select>
        </FormField>
        
        {/* PV1-16 VIP Indicator */}
        <FormField 
          label="VIP指標" 
          enName="VIP Indicator" 
          fieldNotation="PV1-16"
        >
          <select
            id="vipIndicator"
            name="vipIndicator"
            value={pv1Data?.vipIndicator || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是 (Yes)</option>
            <option value="N">否 (No)</option>
            <option value="VIP">VIP</option>
          </select>
        </FormField>
        
        {/* PV1-17 Admitting Doctor */}
        <FormField 
          label="住院醫師" 
          enName="Admitting Doctor" 
          fieldNotation="PV1-17"
        >
          <input
            type="text"
            id="admittingDoctor"
            name="admittingDoctor"
            value={pv1Data?.admittingDoctor || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入住院醫師 (例: 12345^陳醫師)"
          />
        </FormField>

        {/* PV1-18 Patient Type */}
        <FormField 
          label="病患類型" 
          enName="Patient Type" 
          fieldNotation="PV1-18"
        >
          <input
            type="text"
            id="patientType"
            name="patientType"
            value={pv1Data?.patientType || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入病患類型"
          />
        </FormField>

        {/* PV1-19 Visit Number */}
        <FormField 
          label="就診號碼" 
          enName="Visit Number" 
          fieldNotation="PV1-19"
        >
          <input
            type="text"
            id="visitNumber"
            name="visitNumber"
            value={pv1Data?.visitNumber || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入就診號碼"
          />
        </FormField>

        {/* PV1-20 Financial Class */}
        <FormField 
          label="財務類別" 
          enName="Financial Class" 
          fieldNotation="PV1-20"
        >
          <input
            type="text"
            id="financialClass"
            name="financialClass"
            value={pv1Data?.financialClass || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入財務類別 (例: IC 表示健保)"
          />
        </FormField>
        
        {/* PV1-21 Charge Price Indicator */}
        <FormField 
          label="收費價格指標" 
          enName="Charge Price Indicator" 
          fieldNotation="PV1-21"
        >
          <input
            type="text"
            id="chargePriceIndicator"
            name="chargePriceIndicator"
            value={pv1Data?.chargePriceIndicator || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入收費價格指標"
          />
        </FormField>
        
        {/* PV1-22 Courtesy Code */}
        <FormField 
          label="禮遇代碼" 
          enName="Courtesy Code" 
          fieldNotation="PV1-22"
        >
          <input
            type="text"
            id="courtesyCode"
            name="courtesyCode"
            value={pv1Data?.courtesyCode || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入禮遇代碼"
          />
        </FormField>
        
        {/* PV1-23 Credit Rating */}
        <FormField 
          label="信用評級" 
          enName="Credit Rating" 
          fieldNotation="PV1-23"
        >
          <input
            type="text"
            id="creditRating"
            name="creditRating"
            value={pv1Data?.creditRating || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入信用評級"
          />
        </FormField>
        
        {/* PV1-24 Contract Code */}
        <FormField 
          label="合約代碼" 
          enName="Contract Code" 
          fieldNotation="PV1-24"
        >
          <input
            type="text"
            id="contractCode"
            name="contractCode"
            value={pv1Data?.contractCode || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入合約代碼"
          />
        </FormField>
        
        {/* PV1-25 Contract Effective Date */}
        <FormField 
          label="合約生效日期" 
          enName="Contract Effective Date" 
          fieldNotation="PV1-25"
        >
          <input
            type="date"
            id="contractEffectiveDate"
            name="contractEffectiveDate"
            value={pv1Data?.contractEffectiveDate || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>
        
        {/* PV1-26 Contract Amount */}
        <FormField 
          label="合約金額" 
          enName="Contract Amount" 
          fieldNotation="PV1-26"
        >
          <input
            type="number"
            id="contractAmount"
            name="contractAmount"
            value={pv1Data?.contractAmount || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入合約金額"
          />
        </FormField>
        
        {/* PV1-27 Contract Period */}
        <FormField 
          label="合約期間" 
          enName="Contract Period" 
          fieldNotation="PV1-27"
        >
          <input
            type="text"
            id="contractPeriod"
            name="contractPeriod"
            value={pv1Data?.contractPeriod || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入合約期間"
          />
        </FormField>
        
        {/* PV1-28 Interest Code */}
        <FormField 
          label="利息代碼" 
          enName="Interest Code" 
          fieldNotation="PV1-28"
        >
          <input
            type="text"
            id="interestCode"
            name="interestCode"
            value={pv1Data?.interestCode || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入利息代碼"
          />
        </FormField>
        
        {/* PV1-29 Transfer to Bad Debt Code */}
        <FormField 
          label="轉入壞帳代碼" 
          enName="Transfer to Bad Debt Code" 
          fieldNotation="PV1-29"
        >
          <input
            type="text"
            id="transferToBadDebtCode"
            name="transferToBadDebtCode"
            value={pv1Data?.transferToBadDebtCode || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入轉入壞帳代碼"
          />
        </FormField>
        
        {/* PV1-30 Transfer to Bad Debt Date */}
        <FormField 
          label="轉入壞帳日期" 
          enName="Transfer to Bad Debt Date" 
          fieldNotation="PV1-30"
        >
          <input
            type="date"
            id="transferToBadDebtDate"
            name="transferToBadDebtDate"
            value={pv1Data?.transferToBadDebtDate || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>
        
        {/* PV1-31 Bad Debt Agency Code */}
        <FormField 
          label="壞帳機構代碼" 
          enName="Bad Debt Agency Code" 
          fieldNotation="PV1-31"
        >
          <input
            type="text"
            id="badDebtAgencyCode"
            name="badDebtAgencyCode"
            value={pv1Data?.badDebtAgencyCode || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入壞帳機構代碼"
          />
        </FormField>
        
        {/* PV1-32 Bad Debt Transfer Amount */}
        <FormField 
          label="壞帳轉移金額" 
          enName="Bad Debt Transfer Amount" 
          fieldNotation="PV1-32"
        >
          <input
            type="number"
            id="badDebtTransferAmount"
            name="badDebtTransferAmount"
            value={pv1Data?.badDebtTransferAmount || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入壞帳轉移金額"
          />
        </FormField>
        
        {/* PV1-33 Bad Debt Recovery Amount */}
        <FormField 
          label="壞帳回收金額" 
          enName="Bad Debt Recovery Amount" 
          fieldNotation="PV1-33"
        >
          <input
            type="number"
            id="badDebtRecoveryAmount"
            name="badDebtRecoveryAmount"
            value={pv1Data?.badDebtRecoveryAmount || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入壞帳回收金額"
          />
        </FormField>
        
        {/* PV1-34 Delete Account Indicator */}
        <FormField 
          label="刪除帳戶指標" 
          enName="Delete Account Indicator" 
          fieldNotation="PV1-34"
        >
          <select
            id="deleteAccountIndicator"
            name="deleteAccountIndicator"
            value={pv1Data?.deleteAccountIndicator || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是 (Yes)</option>
            <option value="N">否 (No)</option>
          </select>
        </FormField>
        
        {/* PV1-35 Delete Account Date */}
        <FormField 
          label="刪除帳戶日期" 
          enName="Delete Account Date" 
          fieldNotation="PV1-35"
        >
          <input
            type="date"
            id="deleteAccountDate"
            name="deleteAccountDate"
            value={pv1Data?.deleteAccountDate || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* PV1-36 Discharge Disposition */}
        <FormField 
          label="出院狀態" 
          enName="Discharge Disposition" 
          fieldNotation="PV1-36"
        >
          <select
            id="dischargeDisposition"
            name="dischargeDisposition"
            value={pv1Data?.dischargeDisposition || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="01">一般性出院 (Routine discharge)</option>
            <option value="02">出院並轉至長照 (Discharged to home for hospice care)</option>
            <option value="03">出院至其他照護機構 (Discharged to alternate care facility)</option>
            <option value="04">出院至長照機構 (Discharged to long term care facility)</option>
            <option value="05">離開醫師醫囑 (Left against medical advice)</option>
            <option value="06">病患死亡 (Patient died)</option>
            <option value="07">離開而未通知 (Left without notice)</option>
            <option value="08">未返回但預期將返回 (Expected to return)</option>
            <option value="09">仍在住院 (Still inpatient)</option>
          </select>
        </FormField>
        
        {/* PV1-37 Discharged to Location */}
        <FormField 
          label="出院至位置" 
          enName="Discharged to Location" 
          fieldNotation="PV1-37"
        >
          <input
            type="text"
            id="dischargedToLocation"
            name="dischargedToLocation"
            value={pv1Data?.dischargedToLocation || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入出院至位置"
          />
        </FormField>
        
        {/* PV1-38 Diet Type */}
        <FormField 
          label="飲食類型" 
          enName="Diet Type" 
          fieldNotation="PV1-38"
        >
          <input
            type="text"
            id="dietType"
            name="dietType"
            value={pv1Data?.dietType || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入飲食類型"
          />
        </FormField>
        
        {/* PV1-39 Servicing Facility */}
        <FormField 
          label="服務機構" 
          enName="Servicing Facility" 
          fieldNotation="PV1-39"
        >
          <input
            type="text"
            id="servicingFacility"
            name="servicingFacility"
            value={pv1Data?.servicingFacility || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入服務機構"
          />
        </FormField>
        
        {/* PV1-40 Bed Status */}
        <FormField 
          label="床位狀態" 
          enName="Bed Status" 
          fieldNotation="PV1-40"
        >
          <select
            id="bedStatus"
            name="bedStatus"
            value={pv1Data?.bedStatus || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="C">已關閉 (Closed)</option>
            <option value="H">已保留 (Housekeeping)</option>
            <option value="I">隔離 (Isolated)</option>
            <option value="K">已佔用 (Contaminated)</option>
            <option value="O">開放 (Open)</option>
            <option value="U">未知 (Unknown)</option>
          </select>
        </FormField>
        
        {/* PV1-41 Account Status */}
        <FormField 
          label="帳戶狀態" 
          enName="Account Status" 
          fieldNotation="PV1-41"
        >
          <input
            type="text"
            id="accountStatus"
            name="accountStatus"
            value={pv1Data?.accountStatus || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入帳戶狀態"
          />
        </FormField>
        
        {/* PV1-42 Pending Location */}
        <FormField 
          label="待定位置" 
          enName="Pending Location" 
          fieldNotation="PV1-42"
        >
          <input
            type="text"
            id="pendingLocation"
            name="pendingLocation"
            value={pv1Data?.pendingLocation || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入待定位置"
          />
        </FormField>
        
        {/* PV1-43 Prior Temporary Location */}
        <FormField 
          label="先前臨時位置" 
          enName="Prior Temporary Location" 
          fieldNotation="PV1-43"
        >
          <input
            type="text"
            id="priorTemporaryLocation"
            name="priorTemporaryLocation"
            value={pv1Data?.priorTemporaryLocation || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入先前臨時位置"
          />
        </FormField>

        {/* PV1-44 Admit Date/Time */}
        <FormField 
          label="入院日期時間" 
          enName="Admit Date/Time" 
          fieldNotation="PV1-44"
        >
          <input
            type="datetime-local"
            id="admitDateTime"
            name="admitDateTime"
            value={pv1Data?.admitDateTime || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* PV1-45 Discharge Date/Time */}
        <FormField 
          label="出院日期時間" 
          enName="Discharge Date/Time" 
          fieldNotation="PV1-45"
        >
          <input
            type="datetime-local"
            id="dischargeDateTime"
            name="dischargeDateTime"
            value={pv1Data?.dischargeDateTime || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>
      </FormSection>
    </>
  );
};

export default PV1Section;
