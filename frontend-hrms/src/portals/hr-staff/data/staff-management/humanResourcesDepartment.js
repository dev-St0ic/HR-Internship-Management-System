import { createDepartment, createEmployee, createInterns } from './helpers';

const humanResourcesEmployees = [
  createEmployee(1, '345321231', 'Alice Smith', 'Manager', 'Office', '/assets/images/avatar1.jpg', createInterns([
    [1, 'Sophia Turner', '2026-01-15', '600', '420'],
    [2, 'Ethan Cruz', '2026-01-22', '600', '365'],
    [3, 'Ava Collins', '2026-02-03', '600', '298'],
    [4, 'Lucas Reed', '2026-02-10', '600', '250'],
    [5, 'Chloe Diaz', '2026-03-01', '600', '180'],
    [6, 'Grace Mendoza', '2026-03-08', '600', '156'],
    [7, 'Nathan Cole', '2026-03-15', '600', '132'],
    [8, 'Isla Romero', '2026-03-21', '600', '98'],
  ])),
  createEmployee(2, '445521232', 'Bob Lee', 'Developer', 'Remote', '/assets/images/avatar2.jpg', createInterns([
    [1, 'Mason Price', '2026-01-20', '600', '330'],
    [2, 'Harper Kelly', '2026-02-14', '600', '260'],
    [3, 'Elijah Brooks', '2026-02-25', '600', '205'],
  ])),
  createEmployee(3, '355309230', 'Catherine Jones', 'Designer', 'Office', '/assets/images/avatar3.jpg', createInterns([
    [1, 'Ella Simmons', '2026-03-03', '520', '240'],
    [2, 'James Perry', '2026-03-12', '520', '180'],
  ])),
  createEmployee(4, '315121737', 'David Kim', 'QA Engineer', 'Office', '/assets/images/avatar4.jpg', createInterns([
    [1, 'Amelia Ward', '2026-02-08', '480', '170'],
  ])),
];

export const humanResourcesDepartment = createDepartment(1, 'Human Resources', humanResourcesEmployees);