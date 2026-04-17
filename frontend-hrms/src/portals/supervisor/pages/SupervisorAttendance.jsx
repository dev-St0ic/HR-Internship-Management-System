import { useState, useRef, useEffect } from "react";
import { UserCheck, ClockAlert, UserX, Timer, SlidersHorizontal } from "lucide-react";

// Intern List Data
const initialInternData = [
  { id: 1, name: "John Doe", timeIn: "09:00 AM", timeOut: "05:00 PM", hours: "8.0", date: "2023-10-01", status: "Approved" },
  { id: 2, name: "Jane Smith", timeIn: "09:30 AM", timeOut: "05:00 PM", hours: "7.5", date: "2023-10-01", status: "Approved" },
  { id: 3, name: "Mark Reyes", timeIn: "08:45 AM", timeOut: "05:00 PM", hours: "8.2", date: "2023-10-01", status: "Pending" },
  { id: 4, name: "Ana Lim", timeIn: "09:00 AM", timeOut: "05:00 PM", hours: "8.0", date: "2023-10-02", status: "Approved" },
  { id: 5, name: "Juan Dela Cruz", timeIn: "10:00 AM", timeOut: "05:00 PM", hours: "7.0", date: "2023-10-02", status: "Pending" },
];

export default function SupervisorAttendance() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // filter dropdown container
  const filterRef = useRef(null);
  
  const [filteredData, setFilteredData] = useState(initialInternData);
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState({
    approved: false,
    pending: false,
  });
  const [globalSearch, setGlobalSearch] = useState("");

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const applyFilters = () => {
    let result = initialInternData;

    if (globalSearch) {
      result = result.filter((intern) =>
        intern.name.toLowerCase().includes(globalSearch.toLowerCase())
      );
    }
    if (filterName) {
      result = result.filter((intern) =>
        intern.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }
    if (filterDate) {
      result = result.filter((intern) => intern.date === filterDate);
    }
    if (filterStatus.approved || filterStatus.pending) {
      result = result.filter((intern) => {
        if (filterStatus.approved && intern.status === "Approved") return true;
        if (filterStatus.pending && intern.status === "Pending") return true;
        return false;
      });
    }

    setFilteredData(result);
    setIsFilterOpen(false);
  };

  const handleGlobalSearch = (e) => {
    setGlobalSearch(e.target.value);
  };

  const handleClearFilters = () => {
    setFilterName("");
    setFilterDate("");
    setFilterStatus({ approved: false, pending: false });
    setFilteredData(initialInternData);
    setIsFilterOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-8 gap-4 flex wrap">
        <div className="border border-gray-500/20 rounded shadow sm:col-span-2 row-span-2 mt-2 flex flex-col justify-between">
          <div className="p-3">
            <div className="flex items-center mb-2">
              <div className="bg-gray-500/10 rounded-lg w-10 h-10 mr-2 flex items-center justify-center">
                <UserCheck className="text-[#7C3EFF]" size={20} />
              </div>
              <h1 className="text-sm sm:text-base">Present Today</h1>
            </div>
            <h1 className="font-bold text-2xl sm:text-3xl">12</h1>
          </div>
          <div className="border-t border-gray-500/20 px-3">
            <span className="text-xs text-gray-500">Out of 100 Interns</span>
          </div>
        </div>

        <div className="border border-gray-500/20 rounded shadow sm:col-span-2 row-span-2 mt-2 flex flex-col justify-between col-start-3">
          <div className="p-3">
            <div className="flex items-center mb-2">
              <div className="bg-gray-500/10 rounded-lg w-10 h-10 mr-2 flex items-center justify-center">
                <ClockAlert className="text-[#7C3EFF]" size={20} />
              </div>
              <h1 className="text-sm sm:text-base">Late Today</h1>
            </div>
            <h1 className="font-bold text-2xl sm:text-3xl">3</h1>
          </div>
          <div className="border-t border-gray-500/20 px-3">
            <span className="text-xs text-gray-500">Timed In after 09:15 AM</span>
          </div>
        </div>

        <div className="border border-gray-500/20 rounded shadow sm col-span-2 row-span-2 mt-2 flex flex-col justify-between col-start-5">
          <div className="p-3">
            <div className="flex items-center mb-2">
              <div className="bg-gray-500/10 rounded-lg w-10 h-10 mr-2 flex items-center justify-center">
                <UserX className="text-[#7C3EFF]" size={20} />
              </div>
              <h1 className="text-sm sm:text-base">Absent Today</h1>
            </div>
            <h1 className="font-bold text-2xl sm:text-3xl">2</h1>
          </div>
          <div className="border-t border-gray-500/20 px-3">
            <span className="text-xs text-gray-500">No Time Record</span>
          </div>
        </div>

        <div className="border border-gray-500/20 rounded shadow sm col-span-2 row-span-2 mt-2 flex flex-col justify-between col-start-7">
          <div className="p-3">
            <div className="flex items-center mb-2">
              <div className="bg-gray-500/10 rounded-lg w-10 h-10 mr-2 flex items-center justify-center">
                <Timer className="text-[#7C3EFF]" size={20} />
              </div>
              <h1 className="text-sm sm:text-base">Total Hours Today</h1>
            </div>
            <h1 className="font-bold text-2xl sm:text-3xl">4.5</h1>
          </div>
          <div className="border-t border-gray-500/20 px-3">
            <span className="text-xs text-gray-500">Sum of all Intern's Hours</span>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-6 gap-3 relative">
        <div className="search-bar flex gap-2">
          <input
            type="search"
            placeholder="Search interns..."
            value={globalSearch}
            onChange={handleGlobalSearch}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
            className="border border-gray-500/20 rounded-lg py-2 px-3 w-70 focus:outline-none focus:ring-2 focus:ring-[#7C3EFF]"
          />
        </div>
        
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 border border-gray-500/20 rounded-lg py-2 px-4 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7C3EFF] transition-colors shadow-sm"
          >
            <SlidersHorizontal size={16} />
            <span>Filter</span>
            {(filterName || filterDate || filterStatus.approved || filterStatus.pending) && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3EFF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#7C3EFF]"></span>
              </span>
            )}
          </button>

          {isFilterOpen && (
            <div className="absolute top-12 left-0 w-[300px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 z-50 p-5">
              <h3 className="font-bold text-lg mb-4 text-gray-900">Filter</h3>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Intern Name</label>
                <input 
                  type="text" 
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  placeholder="Enter name..." 
                  className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#7C3EFF]/50 text-sm" 
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={filterStatus.approved}
                      onChange={(e) => setFilterStatus({...filterStatus, approved: e.target.checked})}
                      className="w-4 h-4 accent-[#7C3EFF] rounded cursor-pointer" 
                    />
                    <span className="text-sm text-gray-700">Approved</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={filterStatus.pending}
                      onChange={(e) => setFilterStatus({...filterStatus, pending: e.target.checked})}
                      className="w-4 h-4 accent-[#7C3EFF] rounded cursor-pointer" 
                    />
                    <span className="text-sm text-gray-700">Pending</span>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
                <input 
                  type="date" 
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#7C3EFF]/50 text-sm text-gray-600" 
                />
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={handleClearFilters} 
                  className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Clear
                </button>
                <button 
                  onClick={applyFilters} 
                  className="flex-1 py-2.5 px-4 bg-[#7C3EFF] text-white rounded-lg hover:bg-[#6b35db] transition-colors text-sm font-medium shadow-md shadow-[#7C3EFF]/20"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border border-gray-500/20 rounded mt-4 px-3 py-1 overflow-x-auto">
        <table className="table-fixed min-w-full text-left">
          <thead className="border-b border-gray-500/10 text-sm">
            <tr className="text-gray-500">
              <td className="p-2 w-1/4">Intern Name</td>
              <td className="p-2">Time In</td>
              <td className="p-2">Time Out</td>
              <td className="p-2">Hours</td>
              <td className="p-2">Date</td>
              <td className="p-2">Status</td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-500/10 text-md text-gray-700">
            {filteredData.length > 0 ? (
              filteredData.map((intern) => (
                <tr key={intern.id} className="hover:bg-gray-100">
                  <td className="p-2 font-medium">{intern.name}</td>
                  <td className="p-2">{intern.timeIn}</td>
                  <td className="p-2">{intern.timeOut}</td>
                  <td className="p-2">{intern.hours}</td>
                  <td className="p-2">{intern.date}</td>
                  <td className="p-2">
                    <div className={`px-2 py-1 rounded text-white text-xs inline-block ${
                      intern.status === "Approved" ? "bg-green-600" : "bg-yellow-500"
                    }`}>
                      <p>{intern.status}</p>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No interns found matching those filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}