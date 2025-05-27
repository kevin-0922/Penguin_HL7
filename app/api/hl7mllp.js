const express = require("express");
const router = express.Router();


const MLLPController = require("../controllers/hl7/hl7server");

module.exports = () => {
  router.post("/", MLLPController.handleMLLPRequest);


  return router;
};