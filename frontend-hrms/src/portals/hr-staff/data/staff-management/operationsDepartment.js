import { createDepartment, createEmployee, createInterns } from './helpers';

const operationsEmployees = [
  createEmployee(1, '512341100', 'Nina Patel', 'Operations Supervisor', 'Office', '/assets/images/avatar15.jpg', createInterns([[1, 'Caleb Howard', '2026-03-07', '500', '230']])) ,
  createEmployee(2, '512341101', 'Oscar Rivera', 'Process Analyst', 'Remote', '/assets/images/avatar16.jpg', createInterns([[1, 'Natalie Powell', '2026-03-05', '500', '214']])) ,
  createEmployee(3, '512341102', 'Priya Singh', 'Logistics Coordinator', 'Hybrid', '/assets/images/avatar17.jpg', createInterns([[1, 'Ryan Coleman', '2026-03-10', '500', '205']])) ,
  createEmployee(4, '512341103', 'Quentin Zhao', 'Operations Analyst', 'Office', '/assets/images/avatar18.jpg', createInterns([[1, 'Stella Hughes', '2026-03-12', '500', '187']])) ,
  createEmployee(5, '512341104', 'Rosa Martinez', 'Compliance Officer', 'Office', '/assets/images/avatar19.jpg', createInterns([[1, 'Isaac Russell', '2026-03-15', '500', '176']])) ,
];

export const operationsDepartment = createDepartment(4, 'Operations', operationsEmployees);