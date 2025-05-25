
const parseQAK = (message) => {
    const qak = message.getSegment("QAK");
    // 如果找不到 QAK 段，記錄訊息並返回 null
    if (!qak) {
        console.log("找不到 QAK 段");
        return null;
    }
    return qak.fields.map((field, index) => ({
        field: index + 1,
        components: field.value,
    }));
};

module.exports = parseQAK;