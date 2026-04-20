import { getThemeAsset } from '../../../../common/config/appIconRegistry';
import { recruitmentTabs } from '../../data/recruitmentData';
import { tabIconMap } from '../../utils/recruitment/pageConfig';

export default function RecruitmentTabs({ activeTab, onSelect, resolvedTheme, tabCounts }) {
  return <div className="recruitment-tabs">{recruitmentTabs.map((tab) => { const isActive = tab.key === activeTab; const iconSource = isActive ? tabIconMap[tab.key].selected : getThemeAsset(tabIconMap[tab.key].unselected, resolvedTheme); return <button key={tab.key} type="button" className={`recruitment-tab ${isActive ? 'is-active' : ''}`} onClick={() => onSelect(tab.key)}><img src={iconSource} alt="" aria-hidden="true" /><span>{tab.label}</span><span className="recruitment-tab-count">{tabCounts[tab.key]}</span></button>; })}</div>;
}