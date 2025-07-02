const parseORC = (message) => {
    const orc = message.getSegment("ORC");
    if (!orc) {
        console.log("找不到 ORC 段");
        return null;
    }
    return orc.fields.map((field, index) => ({
        field: index + 1,
        components: field.value,
    }));
};
module.exports = parseORC;
