const parsePID = (message) => {
    const pid = message.getSegment("PID");
    if (!pid) {
        console.log("找不到 PID 段");
        return null;
    }
    return pid.fields.map((field, index) => ({
        field: index + 1,
        components: field.value,
    }));
};
module.exports = parsePID;
