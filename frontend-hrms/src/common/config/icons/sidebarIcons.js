import brandLogo from '../../../../icons/brand/logo.png';
import dashboardSelected from '../../../../icons/navigation/hr-staff/sidebar/selected/dashboard.png';
import documentVaultSelected from '../../../../icons/navigation/hr-staff/sidebar/selected/document-vault.png';
import internManagementSelected from '../../../../icons/navigation/hr-staff/sidebar/selected/intern-management.png';
import recruitmentSelected from '../../../../icons/navigation/hr-staff/sidebar/selected/recruitment.png';
import settingsSelected from '../../../../icons/navigation/hr-staff/sidebar/selected/settings.png';
import staffManagementSelected from '../../../../icons/navigation/hr-staff/sidebar/selected/staff-management.png';
import dashboardUnselectedDark from '../../../../icons/navigation/hr-staff/sidebar/unselected/dark/dashboard.png';
import documentVaultUnselectedDark from '../../../../icons/navigation/hr-staff/sidebar/unselected/dark/document-vault.png';
import internManagementUnselectedDark from '../../../../icons/navigation/hr-staff/sidebar/unselected/dark/intern-management.png';
import recruitmentUnselectedDark from '../../../../icons/navigation/hr-staff/sidebar/unselected/dark/recruitment.png';
import settingsUnselectedDark from '../../../../icons/navigation/hr-staff/sidebar/unselected/dark/settings.png';
import staffManagementUnselectedDark from '../../../../icons/navigation/hr-staff/sidebar/unselected/dark/staff-management.png';
import dashboardUnselectedLight from '../../../../icons/navigation/hr-staff/sidebar/unselected/light/dashboard.png';
import documentVaultUnselectedLight from '../../../../icons/navigation/hr-staff/sidebar/unselected/light/document-vault.png';
import internManagementUnselectedLight from '../../../../icons/navigation/hr-staff/sidebar/unselected/light/intern-management.png';
import recruitmentUnselectedLight from '../../../../icons/navigation/hr-staff/sidebar/unselected/light/recruitment.png';
import settingsUnselectedLight from '../../../../icons/navigation/hr-staff/sidebar/unselected/light/settings.png';
import staffManagementUnselectedLight from '../../../../icons/navigation/hr-staff/sidebar/unselected/light/staff-management.png';

export const brandAssets = { logo: brandLogo };
export const hrStaffSidebarIconMap = {
  dashboard: { selected: dashboardSelected, unselected: { light: dashboardUnselectedLight, dark: dashboardUnselectedDark } }, recruitment: { selected: recruitmentSelected, unselected: { light: recruitmentUnselectedLight, dark: recruitmentUnselectedDark } },
  'intern-management': { selected: internManagementSelected, unselected: { light: internManagementUnselectedLight, dark: internManagementUnselectedDark } }, 'staff-management': { selected: staffManagementSelected, unselected: { light: staffManagementUnselectedLight, dark: staffManagementUnselectedDark } },
  'document-vault': { selected: documentVaultSelected, unselected: { light: documentVaultUnselectedLight, dark: documentVaultUnselectedDark } }, settings: { selected: settingsSelected, unselected: { light: settingsUnselectedLight, dark: settingsUnselectedDark } },
};