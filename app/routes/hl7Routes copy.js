const express = require('express');
const router = express.Router();
const hl7Controller = require('../controllers/hl7/hl7Controller');
const hl7Server = require('../controllers/hl7/hl7server');
const { handleQBPQuery } = require('../utils/parsers/qbpHandler');

// 接收 HL7 訊息路由
router.post('/receive', hl7Controller.handleHttpRequest.bind(hl7Controller));

router.post('/hl7server', hl7Server.handleRequest.bind(hl7Server));

// 解析 HL7 訊息路由
router.post('/parse', hl7Controller.parseHL7Message.bind(hl7Controller));

// 處理 MLLP 訊息路由
router.post('/mllp', async (req, res) => {
  try {
    const message = req.body;
    const response = await hl7Controller.handleMllpRequest(message);
    res.set('Content-Type', 'application/hl7-v2');
    res.send(response);
  } catch (error) {
    console.error('處理 MLLP 請求時發生錯誤:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
