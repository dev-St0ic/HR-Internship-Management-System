import { createDepartment, createEmployee, createInterns } from './helpers';

const engineeringEmployees = [
  createEmployee(1, '369328232', 'Emily Clark', 'Support', 'Remote', '/assets/images/avatar6.jpg', createInterns([[1, 'Theo Ramirez', '2026-03-18', '600', '142']])) ,
  createEmployee(2, '369328233', 'Frank Wright', 'Software Engineer', 'Hybrid', '/assets/images/avatar7.jpg', createInterns([[1, 'Zoe Richardson', '2026-02-17', '600', '310']])) ,
  createEmployee(3, '369328234', 'Grace Hall', 'Systems Analyst', 'Office', '/assets/images/avatar8.jpg', createInterns([[1, 'Daniel Murphy', '2026-03-04', '600', '220']])) ,
  createEmployee(4, '369328235', 'Henry Adams', 'Tech Lead', 'Office', '/assets/images/avatar9.jpg', createInterns([[1, 'Layla Sanders', '2026-03-06', '600', '205']])) ,
  createEmployee(5, '369328236', 'Isabella Turner', 'UI Engineer', 'Remote', '/assets/images/avatar10.jpg', createInterns([[1, 'Logan Flores', '2026-03-09', '600', '215']])) ,
  createEmployee(6, '369328237', 'Jackie Evans', 'Data Engineer', 'Hybrid', '/assets/images/avatar11.jpg', createInterns([[1, 'Aria Gonzales', '2026-03-11', '600', '198']])) ,
  createEmployee(7, '369328238', 'Kieran Lopez', 'DevOps Engineer', 'Office', '', createInterns([[1, 'Mila Patterson', '2026-03-13', '600', '186']])) ,
  createEmployee(8, '369328239', 'Leah Navarro', 'QA Automation Engineer', 'Remote', '', createInterns([
    [1, 'Omar Jenkins', '2026-03-14', '600', '174'],
    [2, 'Piper Holmes', '2026-03-16', '600', '161'],
  ])),
];

export const engineeringDepartment = createDepartment(2, 'Engineering', engineeringEmployees);