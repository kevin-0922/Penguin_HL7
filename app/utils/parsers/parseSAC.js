const parseSAC = (message) => {
    const sac = message.getSegment("SAC");
    if (!sac) {
        console.log("找不到 SAC 段");
        return null;
    }
    return sac.fields.map((field, index) => ({
        field: index + 1,
        components: field.value,
    }));
};
module.exports = parseSAC;
