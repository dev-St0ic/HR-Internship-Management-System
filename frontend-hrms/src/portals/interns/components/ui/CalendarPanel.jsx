import { useState } from "react";
import dayjs from "dayjs";
import {
  LocalizationProvider,
  DateCalendar,
  PickersDay,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { calendarEvents } from "../../../../common/config/mockCalendarData";
import { useNavigate } from "react-router-dom";
// ADDED: ArrowLeft and ArrowRight imports
import { CalendarDays, ArrowLeft, ArrowRight } from "lucide-react";

export default function CalendarPanel() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const navigate = useNavigate();

  const eventDates = calendarEvents.map((e) => e.date);

  const renderDay = (day, _value, DayComponentProps) => {
  if (!day) return null;

  const dateStr = dayjs(day).format("YYYY-MM-DD");
  const todayStr = dayjs().format("YYYY-MM-DD");

  const isToday = dateStr === todayStr;

    return (
      <PickersDay
        {...DayComponentProps}
        day={day}
        selected={false} 
        sx={{
          // 1. ALL
          fontFamily: "inherit", 
          fontSize: "0.95rem",
          fontWeight: 700, 
          color: "#1e293b",
          borderRadius: "50%",
          transition: "all 0.2s ease",

          // 2. HOVER STATE
          "&:hover": {
            backgroundColor: "#F5F3FF !important",
            color: "#7C3EFF",
          },

          // 3. CURRENT DATE
          ...(isToday ? {
            backgroundColor: "#7C3EFF !important",
            color: "white !important",
            "&:hover": {
            backgroundColor: "#120071 !important", 
            color: "white !important",
          },
          } : {
            backgroundColor: "transparent !important",
            
          }),

          // 4. 
          "&.Mui-selected": {
            backgroundColor: isToday ? "#7C3EFF !important" : "transparent !important",
            color: isToday ? "white !important" : "#1e293b !important",
          },
          "&.Mui-selected:hover": {
            backgroundColor: isToday ? "#7C3EFF !important" : "#F5F3FF !important",
            color: isToday ? "white !important" : "#7C3EFF !important",
          },

          // 5. 
          "&:focus": {
            backgroundColor: isToday ? "#7C3EFF !important" : "transparent !important",
          }
        }}
      />
    );
  };

  const events = [...calendarEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 relative">
      
      {/* 1. Header Section */}
      <div className="flex justify-between items-center mb-6 px-1">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Schedule</h2>
        <button
          onClick={() => navigate("/intern/calendar")}
          className="bg-[#7C3EFF] text-white p-2.5 rounded-xl hover:bg-[#6D31ED] transition-all"
        >
          <CalendarDays size={20} />
        </button>
      </div>

      {/* 2. Calendar Section */}
      <div className="relative">
        {/* Navigation Arrows */}
        <div className="absolute top-[18px] left-0 right-0 flex justify-between px-2 pointer-events-none z-10">
          <button 
            onClick={() => setSelectedDate(selectedDate.subtract(1, 'month'))}
            className="pointer-events-auto bg-[#7C3EFF] text-white p-1.5 rounded-lg hover:bg-[#6D31ED] transition-all"
          >
            <ArrowLeft size={16} strokeWidth={3} />
          </button>
          <button 
            onClick={() => setSelectedDate(selectedDate.add(1, 'month'))}
            className="pointer-events-auto bg-[#7C3EFF] text-white p-1.5 rounded-lg hover:bg-[#6D31ED] transition-all"
          >
            <ArrowRight size={16} strokeWidth={3} />
          </button>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={(newValue) => newValue && setSelectedDate(dayjs(newValue))}
            slots={{ day: (props) => renderDay(props.day, selectedDate, props) }}
            slotProps={{
              calendarHeader: {
                sx: {
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '44px',
                  padding: 0,
                  margin: 0,
                  // MONTH AND YEAR FONT 
                  '& .MuiPickersCalendarHeader-labelContainer': {
                    margin: 0,
                    fontSize: '1.1rem',
                    fontWeight: 800, 
                    color: '#0f172a',
                    fontFamily: 'inherit',
                  },
                  '& .MuiPickersArrowSwitcher-root': { display: 'none' }
                }
              }
            }}
            sx={{
              width: "100%",
              // WEEKDAY LABELS (S, M, T, W...)
              "& .MuiDayCalendar-header": {
                justifyContent: "space-between",
                padding: "0 10px",
                "& .MuiTypography-root": {
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  color: "#94a3b8", 
                  fontFamily: "inherit",
                }
              },
              "& .MuiDayCalendar-weekContainer": {
                justifyContent: "space-between",
                padding: "0 10px",
              },
            }}
          />
        </LocalizationProvider>
      </div>

      {/* 3. Tasks Feed */}
      <div className="border-t border-slate-100 mt-4 pt-6 space-y-6">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest px-1">
          {selectedDate.format("MMMM YYYY")}
        </h3>

        <div className="max-h-72 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          {events.length > 0 ? (
            events.map((event) => {
              const eventDate = dayjs(event.date);
              return (
                <div key={event.id} className="relative pl-5 group">
                  {/* Vertical Line */}
                  <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-violet-100 group-hover:bg-[#7C3EFF] transition-colors rounded-full" />
                  
                  <div className="text-[11px] font-bold text-slate-800 mb-1">
                    {eventDate.format("dddd, MMM D")}
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="text-xl font-extrabold text-slate-900 w-[65px] flex-shrink-0">
                      {event.time}
                    </div>

                    <div className="flex flex-col">
                      <p className="text-[10px] font-extrabold text-[#7C3EFF] uppercase tracking-wider">
                        {event.category}
                      </p>
                      <p className="text-sm font-bold text-slate-700 leading-tight">
                        {event.title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-slate-400 text-sm font-medium text-center">No events found</p>
          )}
        </div>
      </div>
    </div>
  );
}