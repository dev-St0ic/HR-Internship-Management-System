export {
  INTERN_MANAGEMENT_PAGE_SIZE,
  attendanceRequestStatusOptions,
  internManagementOperationTabs,
  internManagementProfileTabs,
  internManagementSectionTabs,
} from './intern-management/constants';
export { createInternAttendanceRequests, createInternManagementInterns } from './intern-management/factories';

import { createInternAttendanceRequests, createInternManagementInterns } from './intern-management/factories';

export const internManagementInterns = createInternManagementInterns();
export const internAttendanceRequests = createInternAttendanceRequests(internManagementInterns);

export function getInternManagementInternBySlug(slug) {
  return internManagementInterns.find((intern) => intern.slug === slug) ?? null;
}
