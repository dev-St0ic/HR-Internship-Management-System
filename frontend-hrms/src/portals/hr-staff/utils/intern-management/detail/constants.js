import { actionIconMap, hrStaffInternProfileTabIconMap, hrStaffInternViewSectionIconMap } from '../../../../../common/config/appIconRegistry';

export const ATTENDANCE_PAGE_SIZE = 7;
export const TASKS_PAGE_SIZE = 7;

export const attendanceTableColumns = ['Date', 'Check In', 'Check Out', 'Break', 'Working Hours', 'Status'];
export const taskTableColumns = ['Tasks', 'Date Given', 'Deadline', 'Priority', 'Status'];

export const sectionIconMap = hrStaffInternViewSectionIconMap;
export const profileTabIconMap = hrStaffInternProfileTabIconMap;
export const evaluationIconMap = {
  'work-quality': actionIconMap['work-quality'],
  communication: actionIconMap.communication,
  initiative: actionIconMap.initiative,
  attendance: actionIconMap.attendance,
  professionalism: actionIconMap.professionalism,
};