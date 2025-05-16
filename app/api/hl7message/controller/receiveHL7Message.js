const fhirClient = require("@models/fhirClient");

module.exports = async (req, res, next) => {
  try {
    const queryKey = { fhirServer: "pas", ...req.params, ...req.query };
    const [reqRes, reqFailed, reqErr] = await fhirClient.expungeResource(req.reqSetting, queryKey);

    if (reqRes) return res.status(200).json(reqRes);
    if (reqFailed) return res.status(400).json(reqFailed);
    return res.status(500).json(reqErr);
  } catch (e) {
    next(e);
  }
};
