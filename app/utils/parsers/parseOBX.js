const parseOBX = (message) => {
    const obx = message.getSegment("OBX");
    if (!obx) {
        console.log("找不到 OBX 段");
        return null;
    }
    return obx.fields.map((field, index) => ({
        field: index + 1,
        components: field.value,
    }));
};
module.exports = parseOBX;
