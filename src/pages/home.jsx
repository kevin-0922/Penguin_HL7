import { useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const Home = () => {
  const [hl7, setHl7] = useState([]);
  const [testItems, setTestItems] = useState([{ testName: "", testResult: "" }]);
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    patientBarth: "",
    specimenId: "",
    specimenName: ""
  });
  const [result, setResult] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleTestInputChange = (index, field, value) => {
    const updatedTestItems = [...testItems];
    updatedTestItems[index][field] = value;
    setTestItems(updatedTestItems);
  };

  const addTestItem = () => {
    setTestItems([...testItems, { testName: "", testResult: "" }]);
  };

  const getHL7Timestamp = () => {
    const now = new Date();
    return now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { patientId, patientName, patientBarth, specimenId, specimenName } = formData;
    
    // 構建 HL7 訊息
    const newHl7 = [
      `MSH|^~\\&|ORDERSYSTEM|NTUNHS|||${getHL7Timestamp()}||ORM^O01|12345|T|2.5`,
      `PID|1|${patientId}|${patientId}||${patientName}||${patientBarth}|M`,
      `ORC|NW|ORDER|RIS123|SC||1||${getHL7Timestamp()}|||`,
      `SPM|1|${specimenId}|SPECIMEN_PARENT|||SER|${specimenName}||||${getHL7Timestamp()}`
    ];

    // 添加測試項目和結果
    testItems.forEach((item, index) => {
      if (item.testName.trim()) {
        newHl7.push(`OBR|${index + 1}|ORDER${12345 + index}|RIS${123 + index}|${item.testName}^檢查項目`);
      }
      if (item.testResult.trim()) {
        newHl7.push(`OBX|${index + 1}|NM|${item.testResult}^檢查結果|1|1`);
      }
    });

    setHl7(newHl7);

    try {
      setResult("與伺服器通訊中，請稍後...");
      console.log("開始執行")
      const stringData = newHl7.join('\r');
      const response = await axios.post(`${baseUrl}/api/hl7`, stringData, {
        headers: { 
          "Content-Type": "application/hl7-v2" 
        }
      });
      
      setResult(response.data);
    } catch (error) {
      setResult(`錯誤: ${error.message}`);
    }
  };

  return (
    // <form  className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
    //   <h1 className="text-2xl font-bold mb-4">HL7開單</h1>

    //   <div className="mb-4">
    //     <label className="block text-gray-700 text-sm font-bold mb-2">病人 ID：</label>
    //     <input 
    //       type="text" 
    //       id="patientId" 
    //       value={formData.patientId}
    //       onChange={handleInputChange}
    //       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
    //     />
    //   </div>
    //   <div className="mb-4">
    //     <label className="block text-gray-700 text-sm font-bold mb-2">病人姓名：</label>
    //     <input 
    //       type="text" 
    //       id="patientName" 
    //       value={formData.patientName}
    //       onChange={handleInputChange}
    //       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
    //     />
    //   </div>
    //   <div className="mb-4">
    //     <label className="block text-gray-700 text-sm font-bold mb-2">病人生日：</label>
    //     <input 
    //       type="date" 
    //       id="patientBarth" 
    //       value={formData.patientBarth}
    //       onChange={handleInputChange}
    //       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
    //     />
    //   </div>
    //   <div className="mb-4">
    //     <label className="block text-gray-700 text-sm font-bold mb-2">標本 ID：</label>
    //     <input 
    //       type="text" 
    //       id="specimenId" 
    //       value={formData.specimenId}
    //       onChange={handleInputChange}
    //       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
    //     />
    //   </div>
    //   <div className="mb-4">
    //     <label className="block text-gray-700 text-sm font-bold mb-2">標本名稱：</label>
    //     <input 
    //       type="text" 
    //       id="specimenName" 
    //       value={formData.specimenName}
    //       onChange={handleInputChange}
    //       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
    //     />
    //   </div>
    //   <h3 className="text-xl font-bold mt-6 mb-3">檢查項目</h3>
    //   <div>
    //     {testItems.map((item, index) => (
    //       <div key={index} className="mb-2 flex space-x-2">
    //         <input
    //           type="text"
    //           value={item.testName}
    //           onChange={(e) => handleTestInputChange(index, "testName", e.target.value)}
    //           className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           placeholder="輸入檢查項目"
    //         />
    //         <input
    //           type="text"
    //           value={item.testResult}
    //           onChange={(e) => handleTestInputChange(index, "testResult", e.target.value)}
    //           className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           placeholder="輸入檢查結果"
    //         />
    //       </div>
    //     ))}
    //   </div>

    //   <button 
    //     type="button" 
    //     onClick={addTestItem}
    //     className="mt-2 mb-4 mr-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    //   >
    //     新增檢查
    //   </button>

    //   <button 
    //     type="button"
    //     onClick={handleSubmit}
    //     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    //   >
    //     發送 HL7 訊息
    //   </button>
      
    //   <h3 className="text-xl font-bold mt-6 mb-3">HL7 訊息</h3>
    //   <pre className="mt-2 p-4 bg-gray-100 border border-gray-300 rounded-md overflow-auto">
    //     {hl7.length > 0 ? hl7.join('\n') : ''}
    //   </pre>
    //   <h3 className="text-xl font-bold mt-6 mb-3">HL7 回應</h3>
    //   <pre className="mt-2 p-4 bg-gray-100 border border-gray-300 rounded-md overflow-auto">
    //     {result || (hl7.length > 0 ? hl7.join('\n') : '')}
    //   </pre>
    // </form>
    <> <h1 className="text-2xl font-bold mb-4 text-center">HL7開單</h1></>
  );
};

export default Home;
