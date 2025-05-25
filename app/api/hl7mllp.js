const express = require("express");
const router = express.Router();

// 引入位於 app/controllers/hl7/ 的中央 HL7 控制器
// ../ 表示跳出 api/ 目錄，到達 app/ 層級
const MLLPController = require("../controllers/hl7/hl7server");

module.exports = () => {
  router.post("/", MLLPController.handleMLLPRequest);


  return router;
};