import EmployeeAvatar from '../../staff-management/EmployeeAvatar';

export default function InternManagementDetailHero({ intern }) {
  return (
    <div className="intern-management-detail-hero">
      <EmployeeAvatar src={intern.avatar} alt={intern.name} name={intern.name} size={68} className="intern-management-detail-avatar" />
      <div>
        <h3>{intern.name}</h3>
        <p>{intern.email}</p>
      </div>
    </div>
  );
}