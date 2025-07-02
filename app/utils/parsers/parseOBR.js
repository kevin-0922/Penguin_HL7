const parseOBR = (message) => {
    const obr = message.getSegment("OBR");
    if (!obr) {
        console.log("找不到 OBR 段");
        return null;
    }
    return obr.fields.map((field, index) => ({
        field: index + 1,
        components: field.value,
    }));
};
module.exports = parseOBR;
