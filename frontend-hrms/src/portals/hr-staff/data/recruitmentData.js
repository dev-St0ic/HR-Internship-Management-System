export { RECRUITMENT_PAGE_SIZE, recruitmentTabs } from './recruitment/constants';
export { createRecruitmentApplications } from './recruitment/applications';
export { createRecruitmentPartnerUniversities } from './recruitment/universities';

import { createRecruitmentApplications } from './recruitment/applications';
import { createRecruitmentPartnerUniversities } from './recruitment/universities';

export const recruitmentApplications = createRecruitmentApplications();
export const recruitmentPartnerUniversities = createRecruitmentPartnerUniversities(recruitmentApplications);