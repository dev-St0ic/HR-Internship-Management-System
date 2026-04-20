import React from 'react';
import EmployeeAvatar from './EmployeeAvatar';
import { actionIconMap, getThemeAsset } from '../../../../common/config/appIconRegistry';
import { useTheme } from '../../../../common/theme/ThemeProvider';

const InternRow = ({ intern }) => {
  const { resolvedTheme } = useTheme();
  const editIcon = getThemeAsset(actionIconMap.edit, resolvedTheme);
  const viewIcon = getThemeAsset(actionIconMap.view, resolvedTheme);

  return (
    <tr>
      <td style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <EmployeeAvatar alt={intern.name} name={intern.name} size={32} />
        {intern.name}
      </td>
      <td>{intern.date}</td>
      <td>{intern.ojtHours}</td>
      <td>{intern.rendered}</td>
      <td>
        <button className="action-btn" title="View">
          <img src={viewIcon} alt="View" style={{ width: 20, height: 20, objectFit: 'contain' }} />
        </button>
        <button className="action-btn" title="Edit">
          <img src={editIcon} alt="Edit" style={{ width: 20, height: 20, objectFit: 'contain' }} />
        </button>
      </td>
    </tr>
  );
};

export default InternRow;
