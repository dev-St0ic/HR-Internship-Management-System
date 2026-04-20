import { Eye, EyeOff } from 'lucide-react';

export default function PasswordSettingsField({ onChange, showPassword, toggleVisibility, value }) {
  return (
    <div><label className="block text-xs text-gray-400 mb-1">Password</label><div className="relative"><input type={showPassword ? 'text' : 'password'} name="password" value={value} onChange={onChange} className="w-full border border-[#A2A1A833] rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#7C3EFF] transition-colors" /><button type="button" onClick={toggleVisibility} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">{showPassword ? <Eye size={18} /> : <EyeOff size={18} />}</button></div></div>
  );
}