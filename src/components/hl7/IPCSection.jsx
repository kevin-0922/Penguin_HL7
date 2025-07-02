import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateFormData } from "../../store/hl7FormSlice";
import FormSection, {
  FormField,
  inputClassName,
  selectClassName,
  dateTimeClassName,
} from "./FormSection";

const IPCSection = ({ messageType }) => {
  const dispatch = useDispatch();
  const ipcData = useSelector((state) => state.hl7Form.forms[messageType]?.ipc);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(
      updateFormData({
        messageType: messageType,
        segment: "ipc",
        field: id,
        value,
      })
    );
  };

  return (
    <>
      <div className="bg-blue-50 p-4 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">保險計劃段落 (IPC)</h3>
        <p className="text-sm text-blue-600">
          此段落用於記錄病患的保險計劃及保險公司相關資訊。
          標記 * 的欄位為必填項目。
        </p>
      </div>

      <FormSection title="IPC (保險計劃)">
        {/* IPC-1 Set ID */}
        <FormField 
          label="設定ID" 
          enName="Set ID" 
          fieldNotation="IPC-1"
          required
        >
          <input
            type="text"
            id="setId"
            name="setId"
            value={ipcData?.setId || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入設定ID"
            required
          />
        </FormField>

        {/* IPC-2 Insurance Plan ID */}
        <FormField 
          label="保險計劃ID" 
          enName="Insurance Plan ID" 
          fieldNotation="IPC-2"
          required
        >
          <input
            type="text"
            id="insurancePlanId"
            name="insurancePlanId"
            value={ipcData?.insurancePlanId || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入保險計劃ID"
            required
          />
        </FormField>

        {/* IPC-3 Insurance Company ID */}
        <FormField 
          label="保險公司ID" 
          enName="Insurance Company ID" 
          fieldNotation="IPC-3"
        >
          <input
            type="text"
            id="insuranceCompanyId"
            name="insuranceCompanyId"
            value={ipcData?.insuranceCompanyId || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入保險公司ID"
          />
        </FormField>

        {/* IPC-4 Insurance Company Name */}
        <FormField 
          label="保險公司名稱" 
          enName="Insurance Company Name" 
          fieldNotation="IPC-4"
        >
          <input
            type="text"
            id="insuranceCompanyName"
            name="insuranceCompanyName"
            value={ipcData?.insuranceCompanyName || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入保險公司名稱"
          />
        </FormField>

        {/* IPC-5 Insurance Plan Group Name */}
        <FormField 
          label="保險計劃團體名稱" 
          enName="Insurance Plan Group Name" 
          fieldNotation="IPC-5"
        >
          <input
            type="text"
            id="insurancePlanGroupName"
            name="insurancePlanGroupName"
            value={ipcData?.insurancePlanGroupName || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入保險計劃團體名稱"
          />
        </FormField>

        {/* IPC-6 Insurance Plan Group Number */}
        <FormField 
          label="保險計劃團體編號" 
          enName="Insurance Plan Group Number" 
          fieldNotation="IPC-6"
        >
          <input
            type="text"
            id="insurancePlanGroupNumber"
            name="insurancePlanGroupNumber"
            value={ipcData?.insurancePlanGroupNumber || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入保險計劃團體編號"
          />
        </FormField>

        {/* IPC-7 Insurance Company Address */}
        <FormField 
          label="保險公司地址" 
          enName="Insurance Company Address" 
          fieldNotation="IPC-7"
        >
          <input
            type="text"
            id="insuranceCompanyAddress"
            name="insuranceCompanyAddress"
            value={ipcData?.insuranceCompanyAddress || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入保險公司地址"
          />
        </FormField>

        {/* IPC-8 Insurance Co. Contact Person */}
        <FormField 
          label="保險公司聯絡人" 
          enName="Insurance Co. Contact Person" 
          fieldNotation="IPC-8"
        >
          <input
            type="text"
            id="insuranceCompanyContactPerson"
            name="insuranceCompanyContactPerson"
            value={ipcData?.insuranceCompanyContactPerson || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入保險公司聯絡人"
          />
        </FormField>

        {/* IPC-9 Contact Person Phone Number */}
        <FormField 
          label="聯絡人電話號碼" 
          enName="Contact Person Phone Number" 
          fieldNotation="IPC-9"
        >
          <input
            type="tel"
            id="contactPersonPhoneNumber"
            name="contactPersonPhoneNumber"
            value={ipcData?.contactPersonPhoneNumber || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入聯絡人電話號碼"
          />
        </FormField>

        {/* IPC-10 Group Name */}
        <FormField 
          label="團體名稱" 
          enName="Group Name" 
          fieldNotation="IPC-10"
        >
          <input
            type="text"
            id="groupName"
            name="groupName"
            value={ipcData?.groupName || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入團體名稱"
          />
        </FormField>

        {/* IPC-11 Insured's Group Employer ID */}
        <FormField 
          label="被保險人團體雇主ID" 
          enName="Insured's Group Employer ID" 
          fieldNotation="IPC-11"
        >
          <input
            type="text"
            id="insuredGroupEmployerId"
            name="insuredGroupEmployerId"
            value={ipcData?.insuredGroupEmployerId || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入被保險人團體雇主ID"
          />
        </FormField>

        {/* IPC-12 Insured's Group Employer Name */}
        <FormField 
          label="被保險人團體雇主名稱" 
          enName="Insured's Group Employer Name" 
          fieldNotation="IPC-12"
        >
          <input
            type="text"
            id="insuredGroupEmployerName"
            name="insuredGroupEmployerName"
            value={ipcData?.insuredGroupEmployerName || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入被保險人團體雇主名稱"
          />
        </FormField>

        {/* IPC-13 Plan Effective Date */}
        <FormField 
          label="計劃生效日期" 
          enName="Plan Effective Date" 
          fieldNotation="IPC-13"
        >
          <input
            type="date"
            id="planEffectiveDate"
            name="planEffectiveDate"
            value={ipcData?.planEffectiveDate || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* IPC-14 Plan Expiration Date */}
        <FormField 
          label="計劃失效日期" 
          enName="Plan Expiration Date" 
          fieldNotation="IPC-14"
        >
          <input
            type="date"
            id="planExpirationDate"
            name="planExpirationDate"
            value={ipcData?.planExpirationDate || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* IPC-15 Authorization Information */}
        <FormField 
          label="授權資訊" 
          enName="Authorization Information" 
          fieldNotation="IPC-15"
        >
          <input
            type="text"
            id="authorizationInformation"
            name="authorizationInformation"
            value={ipcData?.authorizationInformation || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入授權資訊"
          />
        </FormField>

        {/* IPC-16 Plan Type */}
        <FormField 
          label="計劃類型" 
          enName="Plan Type" 
          fieldNotation="IPC-16"
        >
          <select
            id="planType"
            name="planType"
            value={ipcData?.planType || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="HMO">健康維護組織 (HMO)</option>
            <option value="PPO">首選醫療機構 (PPO)</option>
            <option value="POS">服務點 (POS)</option>
            <option value="EPO">特約醫療機構 (EPO)</option>
            <option value="INDE">獨立計劃 (Indemnity)</option>
            <option value="HDHP">高自付額健康計劃 (HDHP)</option>
          </select>
        </FormField>

        {/* IPC-17 Name of Insured */}
        <FormField 
          label="被保險人姓名" 
          enName="Name of Insured" 
          fieldNotation="IPC-17"
        >
          <input
            type="text"
            id="nameOfInsured"
            name="nameOfInsured"
            value={ipcData?.nameOfInsured || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入被保險人姓名"
          />
        </FormField>

        {/* IPC-18 Insured's Relationship to Patient */}
        <FormField 
          label="被保險人與病人的關係" 
          enName="Insured's Relationship to Patient" 
          fieldNotation="IPC-18"
        >
          <select
            id="insuredRelationshipToPatient"
            name="insuredRelationshipToPatient"
            value={ipcData?.insuredRelationshipToPatient || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="SEL">自身 (Self)</option>
            <option value="SPO">配偶 (Spouse)</option>
            <option value="CHD">子女 (Child)</option>
            <option value="PAR">父母 (Parent)</option>
            <option value="GRD">監護人 (Guardian)</option>
            <option value="OTH">其他 (Other)</option>
          </select>
        </FormField>

        {/* IPC-19 Insured's Date of Birth */}
        <FormField 
          label="被保險人的出生日期" 
          enName="Insured's Date of Birth" 
          fieldNotation="IPC-19"
        >
          <input
            type="date"
            id="insuredDateOfBirth"
            name="insuredDateOfBirth"
            value={ipcData?.insuredDateOfBirth || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* IPC-20 Insured's Address */}
        <FormField 
          label="被保險人的地址" 
          enName="Insured's Address" 
          fieldNotation="IPC-20"
        >
          <input
            type="text"
            id="insuredAddress"
            name="insuredAddress"
            value={ipcData?.insuredAddress || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入被保險人的地址"
          />
        </FormField>

        {/* IPC-21 Assignment of Benefits */}
        <FormField 
          label="轉讓福利" 
          enName="Assignment of Benefits" 
          fieldNotation="IPC-21"
        >
          <select
            id="assignmentOfBenefits"
            name="assignmentOfBenefits"
            value={ipcData?.assignmentOfBenefits || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是</option>
            <option value="N">否</option>
          </select>
        </FormField>

        {/* IPC-22 Coordination of Benefits */}
        <FormField 
          label="協調福利" 
          enName="Coordination of Benefits" 
          fieldNotation="IPC-22"
        >
          <select
            id="coordinationOfBenefits"
            name="coordinationOfBenefits"
            value={ipcData?.coordinationOfBenefits || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="CO">協調 (Coordination)</option>
            <option value="IN">獨立 (Independent)</option>
          </select>
        </FormField>

        {/* IPC-23 Coord of Ben. Priority */}
        <FormField 
          label="協調福利優先順序" 
          enName="Coord of Ben. Priority" 
          fieldNotation="IPC-23"
        >
          <input
            type="number"
            id="coordinationOfBenPriority"
            name="coordinationOfBenPriority"
            value={ipcData?.coordinationOfBenPriority || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入協調福利優先順序"
          />
        </FormField>

        {/* IPC-24 Notice of Admission Flag */}
        <FormField 
          label="入院通知標誌" 
          enName="Notice of Admission Flag" 
          fieldNotation="IPC-24"
        >
          <select
            id="noticeOfAdmissionFlag"
            name="noticeOfAdmissionFlag"
            value={ipcData?.noticeOfAdmissionFlag || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是</option>
            <option value="N">否</option>
          </select>
        </FormField>

        {/* IPC-25 Notice of Admission Date */}
        <FormField 
          label="入院通知日期" 
          enName="Notice of Admission Date" 
          fieldNotation="IPC-25"
        >
          <input
            type="date"
            id="noticeOfAdmissionDate"
            name="noticeOfAdmissionDate"
            value={ipcData?.noticeOfAdmissionDate || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* IPC-26 Report of Eligibility Flag */}
        <FormField 
          label="資格報告標誌" 
          enName="Report of Eligibility Flag" 
          fieldNotation="IPC-26"
        >
          <select
            id="reportOfEligibilityFlag"
            name="reportOfEligibilityFlag"
            value={ipcData?.reportOfEligibilityFlag || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是</option>
            <option value="N">否</option>
          </select>
        </FormField>

        {/* IPC-27 Report of Eligibility Date */}
        <FormField 
          label="資格報告日期" 
          enName="Report of Eligibility Date" 
          fieldNotation="IPC-27"
        >
          <input
            type="date"
            id="reportOfEligibilityDate"
            name="reportOfEligibilityDate"
            value={ipcData?.reportOfEligibilityDate || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* IPC-28 Release Information Code */}
        <FormField 
          label="釋放信息代碼" 
          enName="Release Information Code" 
          fieldNotation="IPC-28"
        >
          <select
            id="releaseInformationCode"
            name="releaseInformationCode"
            value={ipcData?.releaseInformationCode || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是</option>
            <option value="N">否</option>
            <option value="W">書面同意</option>
          </select>
        </FormField>

        {/* IPC-29 Pre-Admit Cert (PAC) */}
        <FormField 
          label="預先入院證明" 
          enName="Pre-Admit Cert (PAC)" 
          fieldNotation="IPC-29"
        >
          <input
            type="text"
            id="preAdmitCert"
            name="preAdmitCert"
            value={ipcData?.preAdmitCert || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入預先入院證明"
          />
        </FormField>

        {/* IPC-30 Verification Date/Time */}
        <FormField 
          label="驗證日期時間" 
          enName="Verification Date/Time" 
          fieldNotation="IPC-30"
        >
          <input
            type="datetime-local"
            id="verificationDateTime"
            name="verificationDateTime"
            value={ipcData?.verificationDateTime || ""}
            onChange={handleInputChange}
            className={dateTimeClassName}
          />
        </FormField>

        {/* IPC-31 Verification By */}
        <FormField 
          label="驗證人" 
          enName="Verification By" 
          fieldNotation="IPC-31"
        >
          <input
            type="text"
            id="verificationBy"
            name="verificationBy"
            value={ipcData?.verificationBy || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入驗證人"
          />
        </FormField>

        {/* IPC-32 Type of Agreement Code */}
        <FormField 
          label="協議類型代碼" 
          enName="Type of Agreement Code" 
          fieldNotation="IPC-32"
        >
          <input
            type="text"
            id="typeOfAgreementCode"
            name="typeOfAgreementCode"
            value={ipcData?.typeOfAgreementCode || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入協議類型代碼"
          />
        </FormField>

        {/* IPC-33 Billing Status */}
        <FormField 
          label="帳單狀態" 
          enName="Billing Status" 
          fieldNotation="IPC-33"
        >
          <select
            id="billingStatus"
            name="billingStatus"
            value={ipcData?.billingStatus || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="A">活躍 (Active)</option>
            <option value="P">已付 (Paid)</option>
            <option value="C">已關閉 (Closed)</option>
            <option value="O">已逾期 (Overdue)</option>
          </select>
        </FormField>

        {/* IPC-34 Lifetime Reserve Days */}
        <FormField 
          label="終身保留天數" 
          enName="Lifetime Reserve Days" 
          fieldNotation="IPC-34"
        >
          <input
            type="number"
            id="lifetimeReserveDays"
            name="lifetimeReserveDays"
            value={ipcData?.lifetimeReserveDays || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入終身保留天數"
          />
        </FormField>

        {/* IPC-35 Delay before L.R. Day */}
        <FormField 
          label="終身保留天前的延遲" 
          enName="Delay before L.R. Day" 
          fieldNotation="IPC-35"
        >
          <input
            type="number"
            id="delayBeforeLRDay"
            name="delayBeforeLRDay"
            value={ipcData?.delayBeforeLRDay || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入終身保留天前的延遲"
          />
        </FormField>

        {/* IPC-36 Company Plan Code */}
        <FormField 
          label="公司計劃代碼" 
          enName="Company Plan Code" 
          fieldNotation="IPC-36"
        >
          <input
            type="text"
            id="companyPlanCode"
            name="companyPlanCode"
            value={ipcData?.companyPlanCode || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入公司計劃代碼"
          />
        </FormField>

        {/* IPC-37 Policy Number */}
        <FormField 
          label="保單編號" 
          enName="Policy Number" 
          fieldNotation="IPC-37"
        >
          <input
            type="text"
            id="policyNumber"
            name="policyNumber"
            value={ipcData?.policyNumber || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入保單編號"
          />
        </FormField>

        {/* IPC-38 Policy Deductible */}
        <FormField 
          label="保單自付額" 
          enName="Policy Deductible" 
          fieldNotation="IPC-38"
        >
          <input
            type="number"
            id="policyDeductible"
            name="policyDeductible"
            value={ipcData?.policyDeductible || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入保單自付額"
          />
        </FormField>

        {/* IPC-39 Policy Limit - Amount */}
        <FormField 
          label="保單限額 - 金額" 
          enName="Policy Limit - Amount" 
          fieldNotation="IPC-39"
        >
          <input
            type="number"
            id="policyLimitAmount"
            name="policyLimitAmount"
            value={ipcData?.policyLimitAmount || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入保單限額金額"
          />
        </FormField>

        {/* IPC-40 Policy Limit - Days */}
        <FormField 
          label="保單限制 - 天數" 
          enName="Policy Limit - Days" 
          fieldNotation="IPC-40"
        >
          <input
            type="number"
            id="policyLimitDays"
            name="policyLimitDays"
            value={ipcData?.policyLimitDays || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入保單限制天數"
          />
        </FormField>

        {/* IPC-41 Room Rate - Semi-Private */}
        <FormField 
          label="房間費率 - 半私人" 
          enName="Room Rate - Semi-Private" 
          fieldNotation="IPC-41"
        >
          <input
            type="number"
            id="roomRateSemiPrivate"
            name="roomRateSemiPrivate"
            value={ipcData?.roomRateSemiPrivate || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入半私人房間費率"
          />
        </FormField>

        {/* IPC-42 Room Rate - Private */}
        <FormField 
          label="房間費率 - 私人" 
          enName="Room Rate - Private" 
          fieldNotation="IPC-42"
        >
          <input
            type="number"
            id="roomRatePrivate"
            name="roomRatePrivate"
            value={ipcData?.roomRatePrivate || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入私人房間費率"
          />
        </FormField>

        {/* IPC-43 Insured's Employment Status */}
        <FormField 
          label="被保險人的就業狀況" 
          enName="Insured's Employment Status" 
          fieldNotation="IPC-43"
        >
          <select
            id="insuredEmploymentStatus"
            name="insuredEmploymentStatus"
            value={ipcData?.insuredEmploymentStatus || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="F">全職 (Full-time)</option>
            <option value="P">兼職 (Part-time)</option>
            <option value="U">未知 (Unknown)</option>
            <option value="R">退休 (Retired)</option>
            <option value="O">其他 (Other)</option>
          </select>
        </FormField>

        {/* IPC-44 Insured's Administrative Sex */}
        <FormField 
          label="被保險人的行政性別" 
          enName="Insured's Administrative Sex" 
          fieldNotation="IPC-44"
        >
          <select
            id="insuredAdministrativeSex"
            name="insuredAdministrativeSex"
            value={ipcData?.insuredAdministrativeSex || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="M">男性 (Male)</option>
            <option value="F">女性 (Female)</option>
            <option value="O">其他 (Other)</option>
            <option value="U">未知 (Unknown)</option>
            <option value="A">模糊 (Ambiguous)</option>
            <option value="N">不適用 (Not applicable)</option>
          </select>
        </FormField>

        {/* IPC-45 Insured's Employer's Address */}
        <FormField 
          label="被保險人的雇主地址" 
          enName="Insured's Employer's Address" 
          fieldNotation="IPC-45"
        >
          <input
            type="text"
            id="insuredEmployerAddress"
            name="insuredEmployerAddress"
            value={ipcData?.insuredEmployerAddress || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入被保險人的雇主地址"
          />
        </FormField>

        {/* IPC-46 Verification Status */}
        <FormField 
          label="驗證狀態" 
          enName="Verification Status" 
          fieldNotation="IPC-46"
        >
          <select
            id="verificationStatus"
            name="verificationStatus"
            value={ipcData?.verificationStatus || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="V">已驗證 (Verified)</option>
            <option value="U">未驗證 (Unverified)</option>
            <option value="P">擱置中 (Pending)</option>
          </select>
        </FormField>

        {/* IPC-47 Prior Insurance Plan ID */}
        <FormField 
          label="先前保險計劃ID" 
          enName="Prior Insurance Plan ID" 
          fieldNotation="IPC-47"
        >
          <input
            type="text"
            id="priorInsurancePlanId"
            name="priorInsurancePlanId"
            value={ipcData?.priorInsurancePlanId || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入先前保險計劃ID"
          />
        </FormField>

        {/* IPC-48 Coverage Type */}
        <FormField 
          label="承保範圍類型" 
          enName="Coverage Type" 
          fieldNotation="IPC-48"
        >
          <select
            id="coverageType"
            name="coverageType"
            value={ipcData?.coverageType || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="H">醫院 (Hospital)</option>
            <option value="P">醫師 (Physician)</option>
            <option value="B">兩者 (Both)</option>
            <option value="S">補充 (Supplemental)</option>
            <option value="D">牙科 (Dental)</option>
            <option value="V">視力 (Vision)</option>
            <option value="M">藥物 (Medication)</option>
            <option value="O">其他 (Other)</option>
          </select>
        </FormField>

        {/* IPC-49 Handicap */}
        <FormField 
          label="殘疾狀態" 
          enName="Handicap" 
          fieldNotation="IPC-49"
        >
          <select
            id="handicap"
            name="handicap"
            value={ipcData?.handicap || ""}
            onChange={handleInputChange}
            className={selectClassName}
          >
            <option value="">請選擇</option>
            <option value="Y">是</option>
            <option value="N">否</option>
          </select>
        </FormField>

        {/* IPC-50 Insured's ID Number */}
        <FormField 
          label="被保險人的ID編號" 
          enName="Insured's ID Number" 
          fieldNotation="IPC-50"
        >
          <input
            type="text"
            id="insuredIdNumber"
            name="insuredIdNumber"
            value={ipcData?.insuredIdNumber || ""}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="請輸入被保險人的ID編號"
          />
        </FormField>
      </FormSection>
    </>
  );
};

export default IPCSection;
