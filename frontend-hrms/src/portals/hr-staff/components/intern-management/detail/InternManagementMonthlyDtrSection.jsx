import { ChevronLeft, ChevronRight } from 'lucide-react';

import { attendanceTableColumns } from '../../../utils/intern-management/detail/constants';
import { getStatusClassName } from '../../../utils/intern-management/detail/helpers';
import InternManagementDetailTable from './InternManagementDetailTable';

export default function InternManagementMonthlyDtrSection({ activeMonth, activeMonthIndex, maxMonthIndex, entries, emptyRowCount, currentPage, totalPages, onPageChange, onPreviousMonth, onNextMonth, remainingHours, backIcon, onBack }) {
  const footer = <div className="intern-management-month-footer"><p><strong>Remaining Hours :</strong> {remainingHours} Hours</p><button type="button" className="intern-management-primary-button intern-management-back-button" onClick={onBack}><img src={backIcon} alt="" aria-hidden="true" /><span>Back</span></button></div>;
  return (
    <>
      <div className="intern-management-month-nav"><button type="button" className="intern-management-month-arrow" onClick={onPreviousMonth} disabled={activeMonthIndex === 0} aria-label="Previous month"><ChevronLeft size={20} /></button><h3>{activeMonth.label}</h3><button type="button" className="intern-management-month-arrow" onClick={onNextMonth} disabled={activeMonthIndex === maxMonthIndex} aria-label="Next month"><ChevronRight size={20} /></button></div>
      <InternManagementDetailTable columns={attendanceTableColumns} rows={entries} emptyRowCount={emptyRowCount} totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} footer={footer} renderRow={(entry) => <tr key={`${activeMonth.label}-${entry.id}`}><td>{entry.date}</td><td>{entry.checkIn}</td><td>{entry.checkOut}</td><td>{entry.breakDuration}</td><td>{entry.workingHours}</td><td><span className={`intern-management-status-pill is-${getStatusClassName(entry.status)}`}>{entry.status}</span></td></tr>} />
    </>
  );
}