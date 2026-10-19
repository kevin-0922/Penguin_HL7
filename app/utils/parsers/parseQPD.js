function parseQPD(message) {
    const lines = message.split(/\r\n|\r|\n/);
    const qpdLine = lines.find(line => line.startsWith('QPD'));

    if (!qpdLine) {
        // 沒有 QPD 段，從最後一行最後一個欄位抓 Container ID
        const lastLine = lines.filter(l => l.trim()).pop();
        const lastFields = lastLine ? lastLine.split('|') : [];
        const containerId = lastFields[lastFields.length - 1] || null;
        return {
            queryName: null,
            queryTag: null,
            parameters: containerId ? [containerId] : []
        };
    }

    const fields = qpdLine.split('|');
    return {
        queryName: fields[1],
        queryTag: fields[2],
        parameters: fields.slice(3)
    };
}
module.exports = parseQPD;