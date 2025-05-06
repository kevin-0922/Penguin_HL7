import { createSlice } from '@reduxjs/toolkit';
import { o33DataInitialState,q11DataInitialState } from '../utils/data/formDataInitialState';


const messageTypeToInitialState = {
  'O33': o33DataInitialState,
  'Q11': q11DataInitialState,

};

// 預設消息類型 - 可以設為空或第一個可用的消息類型
const defaultMessageType = Object.keys(messageTypeToInitialState)[0] || '';

const hl7FormSlice = createSlice({
  name: 'hl7Form',
  initialState: {
    showFieldNotation: true, // 控制是否顯示欄位標記 (MSH-3)
    forms: {
      'O33': o33DataInitialState,
      'Q11': q11DataInitialState,
      //可新增訊息
    }
  },
  reducers: {
    // 更新特定消息類型的表單數據
    updateFormData: (state, action) => {
      const { messageType, segment, field, value } = action.payload;
      if (state.forms[messageType] && state.forms[messageType][segment]) {
        state.forms[messageType][segment][field] = value;
      }
    },
    //重置指定類型的表單
    resetForm: (state, action) => {
      const messageType = action.payload;
      if (!messageType) {
        console.warn('resetForm 需要提供 messageType 參數');
        return;
      }
      
      const initialState = messageTypeToInitialState[messageType];
      if (initialState) {
        state.forms[messageType] = initialState;
      } else {
        console.warn(`找不到 ${messageType} 的初始狀態定義`);
      }
    },
     // 重置全部表單
     resetAllForms: (state) => {
      // 優先使用 messageTypeToInitialState 的鍵，確保所有已知的訊息類型都被重置
      const allMessageTypes = new Set([
        ...Object.keys(messageTypeToInitialState),
        ...Object.keys(state.forms)
      ]);
      
      allMessageTypes.forEach(messageType => {
        const initialState = messageTypeToInitialState[messageType];
        if (initialState) {
          // 如果有初始狀態定義，使用它重置
          state.forms[messageType] = initialState;
        } else if (state.forms[messageType]) {
          // 如果沒有初始狀態但存在於 forms 中，記錄警告
          console.warn(`重置表單時找不到 ${messageType} 的初始狀態定義`);
        }
      });
    },
    // 設置是否顯示欄位標記
    setFieldNotation: (state, action) => {
      state.showFieldNotation = action.payload;
    }
  }
});

export const { updateFormData, resetForm, resetAllForms, setFieldNotation } = hl7FormSlice.actions;
export default hl7FormSlice.reducer; 

