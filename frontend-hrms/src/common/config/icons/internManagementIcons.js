import attendanceRequestOperationSelected from '../../../../icons/navigation/hr-staff/intern-management/operations/selected/attendance-request.png';
import internsOperationSelected from '../../../../icons/navigation/hr-staff/intern-management/operations/selected/interns.png';
import attendanceRequestOperationUnselectedDark from '../../../../icons/navigation/hr-staff/intern-management/operations/unselected/dark/attendance-request.png';
import internsOperationUnselectedDark from '../../../../icons/navigation/hr-staff/intern-management/operations/unselected/dark/interns.png';
import attendanceSectionSelected from '../../../../icons/navigation/hr-staff/intern-management/intern-view/sections/selected/attendance.png';
import evaluationSectionSelected from '../../../../icons/navigation/hr-staff/intern-management/intern-view/sections/selected/evaluation.png';
import profileSectionSelected from '../../../../icons/navigation/hr-staff/intern-management/intern-view/sections/selected/profile.png';
import tasksSectionSelected from '../../../../icons/navigation/hr-staff/intern-management/intern-view/sections/selected/tasks.png';
import attendanceSectionUnselectedDark from '../../../../icons/navigation/hr-staff/intern-management/intern-view/sections/unselected/dark/attendance.png';
import evaluationSectionUnselectedDark from '../../../../icons/navigation/hr-staff/intern-management/intern-view/sections/unselected/dark/evaluation.png';
import profileSectionUnselectedDark from '../../../../icons/navigation/hr-staff/intern-management/intern-view/sections/unselected/dark/profile.png';
import tasksSectionUnselectedDark from '../../../../icons/navigation/hr-staff/intern-management/intern-view/sections/unselected/dark/tasks.png';
import attendanceSectionUnselectedLight from '../../../../icons/navigation/hr-staff/intern-management/intern-view/sections/unselected/light/attendance.png';
import evaluationSectionUnselectedLight from '../../../../icons/navigation/hr-staff/intern-management/intern-view/sections/unselected/light/evaluation.png';
import profileSectionUnselectedLight from '../../../../icons/navigation/hr-staff/intern-management/intern-view/sections/unselected/light/profile.png';
import tasksSectionUnselectedLight from '../../../../icons/navigation/hr-staff/intern-management/intern-view/sections/unselected/light/tasks.png';
import documentsProfileTabSelected from '../../../../icons/navigation/hr-staff/intern-management/intern-view/profile-tabs/selected/documents.png';
import personalInformationProfileTabSelected from '../../../../icons/navigation/hr-staff/intern-management/intern-view/profile-tabs/selected/personal-information.png';

export const hrStaffInternManagementOperationIconMap = {
  interns: { selected: internsOperationSelected, unselected: { light: internsOperationSelected, dark: internsOperationUnselectedDark } },
  'attendance-requests': { selected: attendanceRequestOperationSelected, unselected: { light: attendanceRequestOperationSelected, dark: attendanceRequestOperationUnselectedDark } },
};
export const hrStaffInternViewSectionIconMap = {
  profile: { selected: profileSectionSelected, unselected: { light: profileSectionUnselectedLight, dark: profileSectionUnselectedDark } }, attendance: { selected: attendanceSectionSelected, unselected: { light: attendanceSectionUnselectedLight, dark: attendanceSectionUnselectedDark } },
  tasks: { selected: tasksSectionSelected, unselected: { light: tasksSectionUnselectedLight, dark: tasksSectionUnselectedDark } }, evaluation: { selected: evaluationSectionSelected, unselected: { light: evaluationSectionUnselectedLight, dark: evaluationSectionUnselectedDark } },
};
export const hrStaffInternProfileTabIconMap = { 'personal-information': personalInformationProfileTabSelected, documents: documentsProfileTabSelected };