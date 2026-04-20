import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import InternManagementCalendarTransition from './InternManagementCalendarTransition';

export default function FilterDateSection({ label, count, fromField, toField, fromValue, toValue, onDateChange }) {
  return (
    <div className="intern-management-filter-grid"><section className="filter-section intern-management-filter-section intern-management-filter-section-wide intern-management-filter-date-section"><div className="intern-management-filter-section-header"><label>{label}</label><span className="intern-management-filter-section-count">{count}</span></div><LocalizationProvider dateAdapter={AdapterDayjs}><div className="intern-management-filter-date-grid"><div className="intern-management-filter-date-field"><span>From</span><DatePicker value={fromValue ? dayjs(fromValue) : null} onChange={(value) => onDateChange(fromField, value ? value.format('YYYY-MM-DD') : '')} format="DD/MM/YYYY" reduceAnimations={false} slots={{ desktopTransition: InternManagementCalendarTransition }} slotProps={{ popper: { placement: 'bottom-start', className: 'intern-management-filter-date-popper' }, textField: { fullWidth: true, className: 'intern-management-filter-date-picker' } }} /></div><div className="intern-management-filter-date-field"><span>To</span><DatePicker value={toValue ? dayjs(toValue) : null} onChange={(value) => onDateChange(toField, value ? value.format('YYYY-MM-DD') : '')} format="DD/MM/YYYY" reduceAnimations={false} slots={{ desktopTransition: InternManagementCalendarTransition }} slotProps={{ popper: { placement: 'bottom-start', className: 'intern-management-filter-date-popper' }, textField: { fullWidth: true, className: 'intern-management-filter-date-picker' } }} /></div></div></LocalizationProvider></section></div>
  );
}