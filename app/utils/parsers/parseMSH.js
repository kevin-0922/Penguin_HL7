function parseMSH(message) {
  const msh = message.getSegment("MSH");

  if (!msh) throw new Error('找不到MSH段');

  const fields = msh.fields.map((field, index) => ({
      field: index + 1,
      components: field.value,
  }));
  return {
    sendingApplication: fields[2] || '',
    sendingFacility: fields[3] || '',
    receivingApplication: fields[4] || '',
    receivingFacility: fields[5] || '',
    messageDatetime: fields[6] || '',
    messageType: fields[8] || '', // e.g. QBP^Q11^QBP_Q11
    messageControlId: fields[9] || '',
    version: fields[11] || '2.5.1'
  };
}

module.exports = parseMSH;