import { useState } from "react";
import dayjs from "dayjs";
import {
    LocalizationProvider,
    DateCalendar,
    PickersDay,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const navigate = useNavigate();

    // Cleaned up function: only highlights "Today" now
    const renderDay = (day, _value, DayComponentProps) => {
        if (!day) return null;

        const dateStr = dayjs(day).format("YYYY-MM-DD");
        const todayStr = dayjs().format("YYYY-MM-DD");
        const isToday = dateStr === todayStr;

        return (
            <PickersDay
                {...DayComponentProps}
                day={day}
                selected={false} // disables MUI default blue circle
                sx={{
                    "& .MuiPickersDay-root.Mui-selected": {
                        backgroundColor: "transparent !important",
                        color: "inherit !important",
                    },
                    borderRadius: "50%",
                    transition: "all 0.2s ease",
                    
                    // Only apply the purple background if it is today
                    ...(isToday && {
                        backgroundColor: "#C4B5FD",
                    }),
                }}
            />
        );
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">My Schedule</h2>
                <button
                    onClick={() => navigate("/applicant/calendar")}
                    className="bg-[#7C3EFF] text-white p-3 rounded-lg hover:bg-[#6A32E6] transition-colors shadow-sm"
                >
                    <CalendarDays size={20} />
                </button>
            </div>

            {/* Calendar Widget */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={selectedDate}
                    onChange={(newValue) => {
                        if (newValue) setSelectedDate(dayjs(newValue));
                    }}
                    slots={{
                        day: (props) => renderDay(props.day, selectedDate, props),
                    }}
                />
            </LocalizationProvider>
        </div>
    );
}