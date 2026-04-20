import { createDepartment, createEmployee, createInterns } from './helpers';

const marketingEmployees = [
  createEmployee(1, '458721117', 'Alicia Ramos', 'Digital Marketing Specialist', 'Hybrid', '', createInterns([[1, 'Celine Navarro', '2026-02-18', '480', '204'], [2, 'Paolo Cruz', '2026-02-20', '480', '176']])) ,
  createEmployee(2, '458721118', 'Bryan Castillo', 'Marketing Operations Officer', 'Office', '', createInterns([[1, 'Nina Dela Torre', '2026-02-19', '480', '189'], [2, 'Caleb Mendoza', '2026-03-19', '480', '96']])) ,
  createEmployee(3, '458721119', 'Camille Santos', 'Community Marketing Coordinator', 'Remote', '', createInterns([[1, 'Ethan Mercado', '2026-02-22', '480', '167'], [2, 'Jessa Martin', '2026-02-24', '480', '141']])) ,
  createEmployee(4, '458721120', 'Kevin Brown', 'Marketing Lead', 'Office', '/assets/images/avatar12.jpg', createInterns([[1, 'Hannah Myers', '2026-02-21', '480', '210']])) ,
  createEmployee(5, '458721121', 'Linda Green', 'Content Strategist', 'Hybrid', '/assets/images/avatar13.jpg', createInterns([[1, 'Wyatt Fisher', '2026-02-28', '480', '165']])) ,
  createEmployee(6, '458721122', 'Michael Scott', 'Campaign Manager', 'Office', '/assets/images/avatar14.jpg', createInterns([[1, 'Lily Jenkins', '2026-03-02', '480', '188']])) ,
  createEmployee(7, '458721123', 'Natalie Brooks', 'SEO Specialist', 'Hybrid', '', createInterns([[1, 'Owen Price', '2026-03-04', '480', '172'], [2, 'Ruby Long', '2026-03-08', '480', '149']])) ,
  createEmployee(8, '458721124', 'Patrick Lim', 'Brand Strategist', 'Office', '', createInterns([[1, 'Ivy Stewart', '2026-03-10', '480', '193']])) ,
  createEmployee(9, '458721125', 'Queenie Santos', 'Social Media Manager', 'Remote', '', createInterns([[1, 'Calvin Ross', '2026-03-12', '480', '184']])) ,
  createEmployee(10, '458721126', 'Ryan Torres', 'Media Buyer', 'Hybrid', '', createInterns([[1, 'Nora Webb', '2026-03-13', '480', '158'], [2, 'Eli Diaz', '2026-03-15', '480', '121']])) ,
  createEmployee(11, '458721127', 'Samantha Yu', 'Email Marketing Lead', 'Office', '', createInterns([[1, 'Jade Parker', '2026-03-17', '480', '144']])) ,
  createEmployee(12, '458721128', 'Theo Mendoza', 'Creative Copywriter', 'Remote', '', createInterns([[1, 'Marcus Hill', '2026-03-18', '480', '138']])) ,
  createEmployee(13, '458721129', 'Uma Villanueva', 'PR Coordinator', 'Hybrid', '', createInterns([[1, 'Skye Foster', '2026-03-19', '480', '116']])) ,
  createEmployee(14, '458721130', 'Victor Ong', 'Market Research Analyst', 'Office', '', createInterns([[1, 'Tessa Bryant', '2026-03-20', '480', '102']])) ,
  createEmployee(15, '458721131', 'Wendy Flores', 'Partnerships Associate', 'Hybrid', '', createInterns([[1, 'Adrian Cole', '2026-03-22', '480', '96'], [2, 'Bianca Ray', '2026-03-24', '480', '84']])) ,
];

export const marketingDepartment = createDepartment(3, 'Marketing', marketingEmployees);