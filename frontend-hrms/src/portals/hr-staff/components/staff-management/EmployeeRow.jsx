import React from 'react';
import EmployeeAvatar from './EmployeeAvatar';
import { actionIconMap, getThemeAsset } from '../../../../common/config/appIconRegistry';
import { useTheme } from '../../../../common/theme/ThemeProvider';

const EmployeeRow = ({ employee, onEdit }) => {
  const { resolvedTheme } = useTheme();
  const editIcon = getThemeAsset(actionIconMap.edit, resolvedTheme);
  const viewIcon = getThemeAsset(actionIconMap.view, resolvedTheme);

  return (
    <tr>
      <td>{employee.employeeId}</td>
      <td style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <EmployeeAvatar
          src={employee.avatar}
          alt={employee.name}
          name={employee.name}
          className="avatar"
          size={32}
        />
        {employee.name}
      </td>
      <td>{employee.designation}</td>
      <td>{employee.type}</td>
      <td>{employee.interns}</td>
      <td>
        <button className="action-btn" title="View" onClick={onEdit}>
          <img src={viewIcon} alt="View" style={{ width: 20, height: 20, objectFit: 'contain' }} />
        </button>
        <button className="action-btn" title="Edit">
          <img src={editIcon} alt="Edit" style={{ width: 20, height: 20, objectFit: 'contain' }} />
        </button>
      </td>
    </tr>
  );
};

export default EmployeeRow;
