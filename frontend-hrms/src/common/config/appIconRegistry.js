import { actionIconMap } from './icons/actionIcons';
import { brandAssets, hrStaffSidebarIconMap } from './icons/sidebarIcons';
import { hrStaffInternManagementOperationIconMap, hrStaffInternProfileTabIconMap, hrStaffInternViewSectionIconMap } from './icons/internManagementIcons';
import { hrStaffRecruitmentTabIconMap } from './icons/recruitmentIcons';

export { actionIconMap, brandAssets, hrStaffSidebarIconMap, hrStaffRecruitmentTabIconMap, hrStaffInternManagementOperationIconMap, hrStaffInternViewSectionIconMap, hrStaffInternProfileTabIconMap };

export function getThemeAsset(asset, theme = 'light') {
  if (!asset) {
    return '';
  }

  if (typeof asset === 'string') {
    return asset;
  }

  return asset[theme] ?? asset.light ?? asset.dark ?? '';
}