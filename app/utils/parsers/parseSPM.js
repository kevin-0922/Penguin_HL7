const parseSPM = (message) => {
    const spm = message.getSegment("SPM");
    if (!spm) {
        console.log("找不到 SPM 段");
        return null;
    }
    return spm.fields.map((field, index) => ({
        field: index + 1,
        components: field.value,
    }));
};
module.exports = parseSPM;
