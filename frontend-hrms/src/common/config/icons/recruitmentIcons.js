import applicationsRecruitmentSelected from '../../../../icons/navigation/hr-staff/recruitment-tabs/selected/applications.png';
import forAdminApprovalRecruitmentSelected from '../../../../icons/navigation/hr-staff/recruitment-tabs/selected/for-admin-approval.png';
import partnerUniversityRecruitmentSelected from '../../../../icons/navigation/hr-staff/recruitment-tabs/selected/partner-university.png';
import applicationsRecruitmentUnselectedDark from '../../../../icons/navigation/hr-staff/recruitment-tabs/unselected/dark/applications.png';
import forAdminApprovalRecruitmentUnselectedDark from '../../../../icons/navigation/hr-staff/recruitment-tabs/unselected/dark/for-admin-approval.png';
import partnerUniversityRecruitmentUnselectedDark from '../../../../icons/navigation/hr-staff/recruitment-tabs/unselected/dark/partner-university.png';
import applicationsRecruitmentUnselectedLight from '../../../../icons/navigation/hr-staff/recruitment-tabs/unselected/light/applications.png';
import forAdminApprovalRecruitmentUnselectedLight from '../../../../icons/navigation/hr-staff/recruitment-tabs/unselected/light/for-admin-approval.png';
import partnerUniversityRecruitmentUnselectedLight from '../../../../icons/navigation/hr-staff/recruitment-tabs/unselected/light/partner-university.png';

export const hrStaffRecruitmentTabIconMap = {
  applications: { selected: applicationsRecruitmentSelected, unselected: { light: applicationsRecruitmentUnselectedLight, dark: applicationsRecruitmentUnselectedDark } },
  'for-admin-approval': { selected: forAdminApprovalRecruitmentSelected, unselected: { light: forAdminApprovalRecruitmentUnselectedLight, dark: forAdminApprovalRecruitmentUnselectedDark } },
  'partner-university': { selected: partnerUniversityRecruitmentSelected, unselected: { light: partnerUniversityRecruitmentUnselectedLight, dark: partnerUniversityRecruitmentUnselectedDark } },
};