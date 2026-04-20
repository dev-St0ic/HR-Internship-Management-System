import { hrAdminNavigation } from './navigation/hrAdminNavigation';
import { hrStaffNavigation } from './navigation/hrStaffNavigation';
import { internNavigation } from './navigation/internNavigation';
import { supervisorNavigation } from './navigation/supervisorNavigation';

export const navigation = {
  hradmin: hrAdminNavigation,
  hrstaff: hrStaffNavigation,
  supervisor: supervisorNavigation,
  intern: internNavigation,
};
