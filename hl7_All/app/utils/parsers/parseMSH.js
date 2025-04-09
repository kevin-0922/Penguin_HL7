const parseMSH = (message) => {
    const msh = message.header;
    if (!msh) {
        console.log("找不到 MSH 段");
        return null;
    }
    return msh.fields.map((field, index) => ({
        field: index + 1,
        components: field.value,
    }));
};

module.exports = parseMSH;