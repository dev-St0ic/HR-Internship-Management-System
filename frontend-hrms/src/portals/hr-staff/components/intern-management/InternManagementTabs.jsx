import { getThemeAsset, hrStaffInternManagementOperationIconMap } from '../../../../common/config/appIconRegistry';
import { internManagementOperationTabs } from '../../data/internManagementData';

export default function InternManagementTabs({ activeTab, onSelect, resolvedTheme }) {
  return (
    <div className="intern-management-overview-tabs" role="tablist" aria-label="Intern management overview tabs">{internManagementOperationTabs.map((tab) => { const isActive = activeTab === tab.key; const iconSource = isActive ? hrStaffInternManagementOperationIconMap[tab.key].selected : getThemeAsset(hrStaffInternManagementOperationIconMap[tab.key].unselected, resolvedTheme); return <button key={tab.key} type="button" role="tab" className={`intern-management-overview-tab ${isActive ? 'is-active' : ''}`} aria-selected={isActive} onClick={() => onSelect(tab.key)}><img src={iconSource} alt="" aria-hidden="true" /><span>{tab.label}</span></button>; })}</div>
  );
}