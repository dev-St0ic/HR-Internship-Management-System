import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AttendanceStatusDropdown({ value, options, onChange, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const selectedOption = options.find((option) => option === value) ?? options[0];

  useEffect(() => { if (disabled) setIsOpen(false); }, [disabled]);
  useEffect(() => {
    const handleClickOutside = (event) => dropdownRef.current && !dropdownRef.current.contains(event.target) && setIsOpen(false);
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`settings-dropdown settings-dropdown-full intern-management-status-dropdown ${isOpen ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''}`}><button type="button" className="settings-dropdown-trigger" onClick={() => !disabled && setIsOpen((current) => !current)} aria-expanded={isOpen} aria-haspopup="listbox" aria-disabled={disabled}><span>{selectedOption}</span><ChevronDown size={18} className="settings-dropdown-chevron" /></button><div className="settings-dropdown-menu" role="listbox" aria-hidden={!isOpen}>{options.map((option) => <button key={option} type="button" className={`settings-dropdown-option ${option === selectedOption ? 'is-selected' : ''}`} onClick={() => { onChange(option); setIsOpen(false); }}>{option}</button>)}</div></div>
  );
}