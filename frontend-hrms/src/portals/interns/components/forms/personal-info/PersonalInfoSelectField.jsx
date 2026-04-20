export default function PersonalInfoSelectField({ baseInput, field, isEmpty, onChange }) {
  return (
    <div className="relative"><select required={field.required} className={`${baseInput} appearance-none ${isEmpty ? 'text-gray-400' : 'text-gray-900'}`} defaultValue="" onChange={() => onChange(field.name)}><option value="" disabled hidden>{field.placeholder}</option>{field.options.map((option) => <option key={option.value} value={option.value} className="text-gray-900">{option.label}</option>)}</select><div className="absolute inset-y-0 right-4 flex items-center pointer-events-none"><svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></div></div>
  );
}