function parseQPD(message) {
    const lines = message.split(/\r\n|\r|\n/);
    const qpdLine = lines.find(line => line.startsWith('QPD'));
    if (!qpdLine) throw new Error('找不到 QPD 段');
  
    const fields = qpdLine.split('|');
    return {
      queryName: fields[1],
      queryTag: fields[2],
      parameters: fields.slice(3) // 你可以根據實際內容做解析
    };
  }
  module.exports = parseQPD;
  