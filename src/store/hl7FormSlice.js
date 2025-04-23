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
    forms: {
      'O33': o33DataInitialState,
      'Q11': q11DataInitialState,
      //可新增訊息
    },
    // 當前選中的消息類型 - 預設為空或第一個可用的消息類型
    activeMessageType: defaultMessageType
  },
  reducers: {
    // 更新特定消息類型的表單數據
    updateFormData: (state, action) => {
      const { messageType, segment, field, value } = action.payload;
      if (state.forms[messageType] && state.forms[messageType][segment]) {
        state.forms[messageType][segment][field] = value;
      }
    },
    // 設置當前活動的消息類型
    setActiveMessageType: (state, action) => {
      const newMessageType = action.payload;
      state.activeMessageType = newMessageType;
      
      // 如果這個消息類型還沒有表單數據，則初始化
      if (!state.forms[newMessageType]) {
        const initialState = messageTypeToInitialState[newMessageType];
        if (initialState) {
          state.forms[newMessageType] = initialState;
        }
      }
    },
    //重置指定類型的表單
    resetForm: (state, action) => {
      const messageType = action.payload || state.activeMessageType;
      const initialState = messageTypeToInitialState[messageType];
      if (initialState) {
        state.forms[messageType] = initialState;
      }
    },
     // 重置全部表單
     resetAllForms: (state) => {
      Object.keys(state.forms).forEach(messageType => {
        const initialState = messageTypeToInitialState[messageType];
        if (initialState) {
          state.forms[messageType] = initialState;
        }
      });
    }
  }
});

export const { updateFormData, setActiveMessageType , resetForm, resetAllForms} = hl7FormSlice.actions;
export default hl7FormSlice.reducer; 

