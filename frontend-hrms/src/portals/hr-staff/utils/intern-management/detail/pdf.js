function escapePdfText(value) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

export function buildSamplePdf(intern, documentName) {
  const lines = ['Intern Document Preview', `Document: ${documentName}`, `Intern: ${intern.name}`, `University: ${intern.university}`, `Department: ${intern.department}`, `Supervisor: ${intern.supervisorName}`];
  const contentStream = ['BT', '/F1 16 Tf', '50 760 Td', ...lines.flatMap((line, index) => [`${index === 0 ? '' : '0 -24 Td'} (${escapePdfText(line)}) Tj`.trim()]), 'ET'].join('\n');
  const pdfParts = [
    '%PDF-1.4',
    '1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj',
    '2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj',
    '3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 4 0 R>>>>/Contents 5 0 R>>endobj',
    '4 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj',
    `5 0 obj<</Length ${contentStream.length}>>stream\n${contentStream}\nendstream\nendobj`,
  ];
  let offset = 0;
  const objects = pdfParts.map((part) => {
    const entry = { offset, content: `${part}\n` };
    offset += entry.content.length;
    return entry;
  });
  const xrefOffset = offset;
  const xrefEntries = ['0000000000 65535 f ', ...objects.map((object) => `${String(object.offset).padStart(10, '0')} 00000 n `)];
  const pdf = `${objects.map((object) => object.content).join('')}xref\n0 ${objects.length + 1}\n${xrefEntries.join('\n')}\ntrailer<</Size ${objects.length + 1}/Root 1 0 R>>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([pdf], { type: 'application/pdf' });
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function exportAttendanceCsv(intern, month) {
  const rows = [
    ['Intern Name', intern.name],
    ['Month', month.label],
    [],
    ['Date', 'Check In', 'Check Out', 'Break', 'Working Hours', 'Status'],
    ...month.entries.map((entry) => [entry.date, entry.checkIn, entry.checkOut, entry.breakDuration, entry.workingHours, entry.status]),
  ];
  downloadBlob(new Blob([rows.map((row) => row.join(',')).join('\n')], { type: 'text/csv;charset=utf-8' }), `${intern.name.replace(/\s+/g, '_')}_${month.label.replace(/\s+/g, '_')}.csv`);
}