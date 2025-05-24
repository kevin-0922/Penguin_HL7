const express = require("express");
const router = express.Router();

// 引入位於 app/controllers/hl7/ 的中央 HL7 控制器
// ../ 表示跳出 api/ 目錄，到達 app/ 層級
const centralHl7Controller = require("../controllers/hl7/hl7Controller");

module.exports = () => {
  router.post("/hl7order", centralHl7Controller.handleHttpRequest);

  return router;
};
