const express = require('express');
const router = express.Router();
const hl7Controller = require('../controllers/hl7/hl7Controller');

// 獲取消息列表
router.get('/sent', hl7Controller.getSentMessages);
router.get('/received', hl7Controller.getReceivedMessages);

// 獲取消息詳情
router.get('/details/:type/:id', hl7Controller.getMessageDetails);

// 保存新消息
router.post('/sent', hl7Controller.saveSentMessage);
router.post('/received', hl7Controller.saveReceivedMessage);

// 更新消息狀態
router.put('/status/:id', hl7Controller.updateMessageStatus);

// 刪除消息
router.delete('/:type/:id', hl7Controller.deleteMessage);

// 獲取消息統計
router.get('/stats', hl7Controller.getMessageStats);

// 搜索消息
router.get('/search', hl7Controller.searchMessages);

// 處理 HL7 訊息的路由
router.post('/hl7', hl7Controller.handleHttpRequest);
router.post('/hl7/parse', hl7Controller.parseHL7Message);

// 處理 MLLP 訊息的路由
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
