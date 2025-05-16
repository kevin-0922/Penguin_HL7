const router = require('express').Router();


module.exports = () => {
    router.get('/hl7message', require('./controller/receiveHL7Message'));

    return router;
};
