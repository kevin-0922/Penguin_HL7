const express = require('express');
const hl7Controller = require('./hl7/hl7Controller');

const router = express.Router();

// 註冊路由
router.post('/hl7', hl7Controller.handleHttpRequest);
router.options('/hl7', (req, res) => {
  // 處理 CORS 預檢請求
  res.status(204).end();
});

module.exports = router;