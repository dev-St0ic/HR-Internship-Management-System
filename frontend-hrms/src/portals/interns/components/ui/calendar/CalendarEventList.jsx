import dayjs from 'dayjs';

export default function CalendarEventList({ events, selectedDate }) {
  return (
    <div className="mt-4 border-t pt-3 max-h-60 overflow-y-auto"><h3 className="text-sm font-semibold mb-3">{selectedDate.format('dddd, DD MMMM YYYY')}</h3>{events.length > 0 ? events.map((event) => {
      const eventDate = dayjs(event.date);
      return <div key={event.id} className="flex flex-col gap-3 mb-3"><div className="text-sm font-semibold">{eventDate.format('dddd, MMMM D YYYY')}</div><div className="flex gap-3 mb-3"><div className="text-lg font-bold w-12">{event.time}</div><div className="w-0.5 bg-purple-400"></div><div><p className="text-xs text-gray-400">{event.category}</p><p className="text-sm font-medium">{event.title}</p></div></div></div>;
    }) : <p className="text-gray-400 text-sm">No event</p>}</div>
  );
}