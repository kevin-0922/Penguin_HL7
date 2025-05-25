const parseMSA = (message) => {
    const msa = message.getSegment("MSA");
    // 如果找不到 MSA 段，記錄訊息並返回 null
    if (!msa) {
        console.log("找不到 MSA 段");
        return null;
    }
    return msa.fields.map((field, index) => ({
        field: index + 1,
        components: field.value,
    }));
};

module.exports = parseMSA;