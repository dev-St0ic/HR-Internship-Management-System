import NotificationIcon from '../staff-management/NotificationIcon';

export default function DocumentVaultPageHeader({ description }) {
  return (
    <div className="header-row">
      <div><h2>Document Vault</h2><span className="subtitle">{description}</span></div>
      <NotificationIcon />
    </div>
  );
}