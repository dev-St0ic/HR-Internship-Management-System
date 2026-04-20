import EmployeeAvatar from '../staff-management/EmployeeAvatar';
import { currentHrStaffUser } from '../../data/currentHrStaffUser';
import SettingsActions from './SettingsActions';
import SettingsDropdown from './SettingsDropdown';
import SettingsPanelHeader from './SettingsPanelHeader';
import { formatLastSavedLabel } from '../../utils/settings/helpers';

export default function AccountSettingsPanel({ config, draftSettings, genderOptions, onAccountChange, onFieldChange, onReset, onSave }) {
  const account = draftSettings.account;
  return (
    <div className="settings-panel">
      <SettingsPanelHeader config={config} lastSavedLabel={formatLastSavedLabel(draftSettings.meta.lastSavedAt)} />
      <div className="settings-section"><div className="settings-section-body"><div className="settings-profile-header"><EmployeeAvatar name={account.username} src={currentHrStaffUser.avatar} size={64} /><div><h3>{account.username}</h3><p>{account.email}</p></div></div><div className="settings-metadata-grid"><div className="settings-metadata-card"><span className="settings-metadata-label">Role</span><strong className="settings-metadata-value">{currentHrStaffUser.role}</strong></div><div className="settings-metadata-card"><span className="settings-metadata-label">Mobile contact</span><strong className="settings-metadata-value">{account.mobileNumber}</strong></div><div className="settings-metadata-card"><span className="settings-metadata-label">Latest save</span><strong className="settings-metadata-value">{formatLastSavedLabel(draftSettings.meta.lastSavedAt)}</strong></div></div></div></div>
      <div className="settings-section"><div className="settings-section-intro"><div><h3>Identity and contact</h3><p>Keep the details used for notices, approvals, and account recovery up to date.</p></div></div><div className="settings-section-body"><div className="settings-form-grid"><label className="settings-field"><span>User Name</span><input name="username" value={account.username} onChange={onAccountChange} /></label><label className="settings-field"><span>Work Email</span><input type="email" name="email" value={account.email} onChange={onAccountChange} /></label><label className="settings-field"><span>First Name</span><input name="firstName" value={account.firstName} onChange={onAccountChange} /></label><label className="settings-field"><span>Last Name</span><input name="lastName" value={account.lastName} onChange={onAccountChange} /></label><label className="settings-field"><span>Mobile Number</span><input name="mobileNumber" value={account.mobileNumber} onChange={onAccountChange} /></label><div className="settings-field"><span>Gender</span><SettingsDropdown value={account.gender} options={genderOptions} onChange={(value) => onFieldChange('account', 'gender', value)} fullWidth /></div></div></div></div>
      <SettingsActions onReset={onReset} onSave={onSave} saveLabel="Save Account" />
    </div>
  );
}