import dayjs from "dayjs";
import {
  LocalizationProvider,
  DateCalendar,
  PickersDay,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";

export default function CalendarPanel({
  tasks = [],
  selectedDate = dayjs(),
  onSelectDate = () => {},
}) {
  const navigate = useNavigate();

  //This is the function for highlighting the event
  const renderDay = (day, selectedDate, props) => {
    if (!day) return null;

    const dateStr = dayjs(day).format("YYYY-MM-DD");
    const selectedStr = selectedDate?.format("YYYY-MM-DD");
    const todayStr = dayjs().format("YYYY-MM-DD");

    const hasTask = tasks.some((t) => t.deadline === dateStr);
    const isSelected = dateStr === selectedStr;
    const isToday = dateStr === todayStr;

    return (
      <PickersDay
        {...props}
        day={day}
        selected={false} // disable MUI default
        sx={{
          borderRadius: "50%",
          transition: "all 0.2s ease",

          // Selected date (strong purple)
          ...(isSelected && {
            backgroundColor: "#7C3EFF",
            color: "white",
          }),

          // Task dates (light purple)
          ...(hasTask &&
            !isSelected && {
              backgroundColor: "#E9D5FF",
              color: "#6B21A8",
            }),

          // Today (soft highlight)
          ...(isToday &&
            !isSelected && {
              border: "1px solid #7C3EFF",
            }),

          "&:hover": {
            backgroundColor: "#DDD6FE",
          },
        }}
      />
    );
  };

  const selectedDateStr = selectedDate.format("YYYY-MM-DD");

  // 1. Tasks for selected date
  const selectedTasks = tasks.filter(
    (task) => task.deadline === selectedDateStr,
  );

  // 2. Upcoming tasks (excluding selected date)
  const upcomingTasks = tasks
    .filter((task) => task.deadline && task.deadline !== selectedDateStr)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .reduce((acc, task) => {
      if (!acc[task.deadline]) {
        acc[task.deadline] = [];
      }
      acc[task.deadline].push(task);
      return acc;
    }, {});

  return (
    <>
      {/* Mini Calendar on the right side */}
      <div className="card-panel">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">My Schedule</h2>
          <button
            onClick={() => navigate("/intern/calendar")}
            className="bg-[#7C3EFF] text-white p-3 rounded-lg"
          >
            <CalendarDays size={20} />
          </button>
        </div>

        {/* Calendar */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={(newValue) => {
              if (newValue) onSelectDate(dayjs(newValue));
            }}
            slots={{
              day: (props) => renderDay(props.day, selectedDate, props),
            }}
          />
        </LocalizationProvider>

        {/* Events */}
        <div className="border-t pt-4 max-h-72 overflow-y-auto pr-2 space-y-6">
          {/* 🔹 Selected Date Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3">
              {selectedDate.format("dddd, DD MMMM YYYY")}
            </h3>

            {selectedTasks.length > 0 ? (
              <div className="space-y-4">
                {selectedTasks.map((task) => {
                  const today = dayjs().format("YYYY-MM-DD");

                  const isCompleted = task.status === "Completed";
                  const isOverdue =
                    task.status === "Overdue" ||
                    (task.status !== "Completed" && task.deadline < today);

                  const styles = isCompleted
                    ? { text: "text-green-600" }
                    : isOverdue
                      ? { text: "text-red-600" }
                      : { text: "text-yellow-600" };

                  return (
                    <div
                      key={task.id}
                      onClick={() =>
                        navigate("/intern/tasks", {
                          state: { selectedTaskId: task.id },
                        })
                      }
                      className="flex gap-4 cursor-pointer hover:bg-gray-50 hover:shadow-sm p-2 rounded-md transition"
                    >
                      <div className="w-14 text-sm font-bold">Due</div>
                      <div className="w-0.5 rounded-full bg-primary"></div>

                      <div>
                        <p className={`text-xs font-medium ${styles.text}`}>
                          {task.status}
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                          {task.taskName}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No tasks for this date.</p>
            )}
          </div>

          {/* Upcoming Section */}
          {Object.keys(upcomingTasks).length > 0 && (
            <div>
              <h3 className="text-base font-semibold mb-3">Other Tasks:</h3>

              <div className="space-y-5">
                {Object.entries(upcomingTasks).map(([date, dateTasks]) => (
                  <div key={date}>
                    <h4 className="text-sm font-medium mb-3">
                      {dayjs(date).format("dddd, DD MMMM YYYY")}
                    </h4>

                    <div className="space-y-4">
                      {dateTasks.map((task) => {
                        const today = dayjs().format("YYYY-MM-DD");

                        const isCompleted = task.status === "Completed";
                        const isOverdue =
                          task.status === "Overdue" ||
                          (task.status !== "Completed" &&
                            task.deadline < today);

                        const styles = isCompleted
                          ? { text: "text-green-600" }
                          : isOverdue
                            ? { text: "text-red-600" }
                            : {
                                text: "text-yellow-600",
                              };

                        return (
                          <div
                            key={task.id}
                            onClick={() =>
                              navigate("/intern/tasks", {
                                state: { selectedTaskId: task.id },
                              })
                            }
                            className="flex gap-4 cursor-pointer hover:bg-gray-50 hover:shadow-sm p-2 rounded-md transition"
                          >
                            <div className="w-14 text-sm font-bold">Due</div>
                            <div className="w-0.5 rounded-full bg-primary"></div>

                            <div>
                              <p
                                className={`text-xs font-medium ${styles.text}`}
                              >
                                {task.status}
                              </p>
                              <p className="text-sm font-bold text-gray-800">
                                {task.taskName}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
