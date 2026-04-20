import { Calendar } from 'lucide-react';

export default function PolicyTextInput({ name, value, placeholder, onChange, withCalendarIcon = false }) {
  return (
    <div className="relative"><input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} className={`w-full border border-[#A2A1A833] rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#7C3EFF] transition-colors ${withCalendarIcon ? 'pl-4 pr-10' : ''}`} />{withCalendarIcon ? <Calendar size={18} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" /> : null}</div>
  );
}