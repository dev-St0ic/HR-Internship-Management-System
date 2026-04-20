import { getThemeAsset } from '../../../../../common/config/appIconRegistry';
import { internManagementProfileTabs } from '../../../data/internManagementData';
import { profileTabIconMap } from '../../../utils/intern-management/detail/constants';

export default function InternManagementProfileTabs({ activeProfileTab, resolvedTheme, onSelectProfileTab }) {
  return (
    <div className="intern-management-subtabs" role="tablist" aria-label="Profile detail tabs">
      {internManagementProfileTabs.map((tab) => (
        <button key={tab.key} type="button" role="tab" className={`intern-management-subtab ${activeProfileTab === tab.key ? 'is-active' : ''}`} aria-selected={activeProfileTab === tab.key} onClick={() => onSelectProfileTab(tab.key)}>
          <img src={getThemeAsset(profileTabIconMap[tab.key], resolvedTheme)} alt="" aria-hidden="true" />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}