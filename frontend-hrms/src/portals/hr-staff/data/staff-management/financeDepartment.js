import { createDepartment, createEmployee, createInterns } from './helpers';

const financeEmployees = [
  createEmployee(1, '245621120', 'Samuel Brooks', 'Finance Manager', 'Office', '/assets/images/avatar21.jpg', createInterns([
    [1, 'Mia Carter', '2026-02-10', '600', '320'],
    [2, 'Noah Bennett', '2026-02-18', '600', '280'],
  ])),
  createEmployee(2, '245621121', 'Tina Chen', 'Payroll Specialist', 'Hybrid', '/assets/images/avatar22.jpg', createInterns([
    [1, 'Olivia Ramos', '2026-03-01', '500', '210'],
    [2, 'Liam Foster', '2026-03-07', '500', '190'],
  ])),
];

export const financeDepartment = createDepartment(5, 'Finance', financeEmployees);