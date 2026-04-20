export default function InternManagementPersonalInfoGrid({ items }) {
  return (
    <div className="intern-management-info-grid">
      {items.map((item) => <div key={item.label} className="intern-management-info-item"><span>{item.label}</span><strong>{item.value}</strong></div>)}
    </div>
  );
}