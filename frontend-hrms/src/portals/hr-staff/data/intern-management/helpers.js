export function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function formatLongDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatMonthDate(monthIndex, day) {
  const monthNumber = String(monthIndex + 1).padStart(2, '0');
  const dayNumber = String(day).padStart(2, '0');
  return formatLongDate(`2026-${monthNumber}-${dayNumber}`);
}

export function buildInternNumericId(index, departmentId, employeeId, internId) {
  const rawValue = `${departmentId}${employeeId}${internId}${index + 1}`.replace(/\D/g, '');
  return rawValue.padEnd(9, `${(index + 3) % 10}`).slice(0, 9);
}

export const buildEmail = (name) => `${slugify(name).replace(/-/g, '')}@gmail.com`;
export const buildPhoneNumber = (index) => `09${String(17832000 + index * 3791).slice(0, 8)}`;

export function buildBirthDate(index) {
  const month = String((index % 9) + 1).padStart(2, '0');
  const day = String((index % 18) + 5).padStart(2, '0');
  return `2004-${month}-${day}`;
}

export const buildAddress = (index, cities) => `${101 + index} ${cities[index % cities.length]} Internship St.`;

export function buildRequestDate(index) {
  const requestDate = new Date('2026-03-17T00:00:00');
  requestDate.setDate(requestDate.getDate() + index * 2);
  return requestDate.toISOString().slice(0, 10);
}