export function createDepartment(id, name, employees) {
  return { id, name, employees };
}

export function createEmployee(id, employeeId, name, designation, type, avatar, interns) {
  return { id, employeeId, name, designation, type, avatar, interns };
}

export function createInterns(entries) {
  return entries.map(([id, name, date, ojtHours, rendered]) => ({ id, name, date, ojtHours, rendered }));
}