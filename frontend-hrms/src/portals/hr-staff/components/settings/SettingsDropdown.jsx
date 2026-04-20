import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

export default function SettingsDropdown({ value, options, onChange, wide = false, fullWidth = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState(null);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target) && !menuRef.current?.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen || !dropdownRef.current) return undefined;
    const updateMenuPosition = () => {
      const rect = dropdownRef.current.getBoundingClientRect();
      const padding = 12;
      const gap = 8;
      const estimatedHeight = Math.min(options.length * 46 + 16, 280);
      const below = window.innerHeight - rect.bottom - padding;
      const above = rect.top - padding;
      const openUpward = below < estimatedHeight && above > below;
      const maxHeight = Math.max(120, Math.min(280, (openUpward ? above : below) - gap));
      setMenuStyle({ top: openUpward ? Math.max(padding, rect.top - Math.min(estimatedHeight, maxHeight) - gap) : rect.bottom + gap, left: Math.min(Math.max(padding, rect.left), window.innerWidth - rect.width - padding), width: rect.width, maxHeight });
    };
    updateMenuPosition();
    window.addEventListener('resize', updateMenuPosition);
    window.addEventListener('scroll', updateMenuPosition, true);
    return () => {
      window.removeEventListener('resize', updateMenuPosition);
      window.removeEventListener('scroll', updateMenuPosition, true);
    };
  }, [isOpen, options.length]);

  return (
    <div ref={dropdownRef} className={`settings-dropdown ${wide ? 'settings-dropdown-wide' : ''} ${fullWidth ? 'settings-dropdown-full' : ''} ${isOpen ? 'is-open' : ''}`}>
      <button type="button" className="settings-dropdown-trigger" onClick={() => setIsOpen((current) => !current)} aria-expanded={isOpen} aria-haspopup="listbox">
        <span>{selectedOption.label}</span>
        <ChevronDown size={18} className="settings-dropdown-chevron" />
      </button>
      {isOpen && menuStyle ? createPortal(
        <div ref={menuRef} className="settings-dropdown-menu is-portal-open" role="listbox" style={{ position: 'fixed', top: menuStyle.top, left: menuStyle.left, width: menuStyle.width, maxHeight: menuStyle.maxHeight }}>
          {options.map((option) => (
            <button key={option.value} type="button" className={`settings-dropdown-option ${option.value === selectedOption.value ? 'is-selected' : ''}`} onClick={() => { onChange(option.value); setIsOpen(false); }}>
              {option.label}
            </button>
          ))}
        </div>,
        document.body,
      ) : null}
    </div>
  );
}