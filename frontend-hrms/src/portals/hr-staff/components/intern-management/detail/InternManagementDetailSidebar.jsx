import { NavLink } from 'react-router-dom';

import { getThemeAsset } from '../../../../../common/config/appIconRegistry';
import { internManagementSectionTabs } from '../../../data/internManagementData';
import { sectionIconMap } from '../../../utils/intern-management/detail/constants';

export default function InternManagementDetailSidebar({ internSlug, resolvedTheme }) {
  return (
    <nav className="intern-management-side-nav" aria-label="Intern detail sections">
      {internManagementSectionTabs.map((section) => (
        <NavLink key={section.key} to={section.key === 'profile' ? `/hr-staff/intern-management/intern/${internSlug}/profile` : `/hr-staff/intern-management/intern/${internSlug}/${section.key}`} className={({ isActive }) => `intern-management-side-link ${isActive ? 'is-active' : ''}`}>
          {({ isActive }) => (
            <>
              <img src={isActive ? sectionIconMap[section.key].selected : getThemeAsset(sectionIconMap[section.key].unselected, resolvedTheme)} alt="" aria-hidden="true" />
              <span>{section.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}