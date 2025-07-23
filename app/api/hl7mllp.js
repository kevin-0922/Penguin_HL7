const express = require("express");
const router = express.Router();


const MLLPController = require("../controllers/hl7/hl7server");
const ServerPortController = require("../controllers/hl7/serverPort");

module.exports = () => {
  router.post("/", MLLPController.handleMLLPRequest);
  
  // MLLP 伺服器配置端點
  router.post("/config", ServerPortController.saveMllpConfig);
  router.get("/config", ServerPortController.getMllpConfig);

  return router;
};