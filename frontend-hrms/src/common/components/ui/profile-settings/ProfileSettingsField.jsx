export default function ProfileSettingsField({ disabled = false, field, onChange, value }) {
  const className = disabled ? 'w-full border border-[#A2A1A833] bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed' : 'w-full border border-[#A2A1A833] rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#7C3EFF] transition-colors';

  return (
    <div><label className="block text-xs text-gray-400 mb-1">{field.label}</label>{field.type === 'select' ? <select value={value} disabled className={`${className} appearance-none`}>{field.options.map((option) => <option key={option} value={option}>{option}</option>)}</select> : <input type={field.type} name={field.name} value={value} disabled={disabled} onChange={onChange} className={className} />}</div>
  );
}