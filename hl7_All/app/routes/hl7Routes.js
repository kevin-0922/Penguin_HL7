const express = require('express');
const router = express.Router();
const hl7Controller = require('../controllers/hl7/hl7Controller');

// HL7 訊息處理路由
router.post('/receive', hl7Controller.handleHttpRequest.bind(hl7Controller));

// HL7 訊息解析路由
router.post('/parse', hl7Controller.parseHL7Message.bind(hl7Controller));

module.exports = router;
