import dayjs from 'dayjs';
import { PickersDay } from '@mui/x-date-pickers';

export const getEventDates = (events) => events.map((event) => event.date);
export const getSortedCalendarEvents = (events) => [...events].sort((left, right) => new Date(left.date) - new Date(right.date));

export function renderCalendarDay(day, dayProps, eventDates) {
  if (!day) return null;
  const dateStr = dayjs(day).format('YYYY-MM-DD');
  const hasEvent = eventDates.includes(dateStr);
  const isToday = dateStr === dayjs().format('YYYY-MM-DD');
  return <PickersDay {...dayProps} day={day} selected={false} sx={{ '& .MuiPickersDay-root.Mui-selected': { backgroundColor: 'transparent !important', color: 'inherit !important' }, borderRadius: '50%', transition: 'all 0.2s ease', ...(hasEvent && { backgroundColor: '#7C3EFF', color: 'white' }), ...(isToday && { backgroundColor: '#C4B5FD' }) }} />;
}