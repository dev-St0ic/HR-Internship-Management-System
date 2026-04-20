import { hrStaffRecruitmentTabIconMap } from '../../../../common/config/appIconRegistry';
import { RECRUITMENT_PAGE_SIZE } from '../../data/recruitmentData';

export const initialPages = { applications: 1, 'for-admin-approval': 1, 'partner-university': 1 };
export const ACTION_MESSAGE_DURATION_MS = 4000;
export const PAGE_SIZE_BY_TAB = { applications: RECRUITMENT_PAGE_SIZE, 'for-admin-approval': RECRUITMENT_PAGE_SIZE, 'partner-university': 3 };
export const toneClassNameMap = { success: 'is-success', attention: 'is-attention', accent: 'is-accent', neutral: 'is-neutral' };
export const tabIconMap = hrStaffRecruitmentTabIconMap;
export const tabSearchPlaceholders = {
  applications: 'Search applicant, university, program, or department',
  'for-admin-approval': 'Search queued applicant, reviewer, or university',
  'partner-university': 'Search university, program, or department',
};