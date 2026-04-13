import { UserCheck, ClockAlert, UserX, Timer, SlidersHorizontal, Search } from "lucide-react";

export default function SupervisorAttendance() {
  return (
    <>
      <div className="grid grid-cols-8 gap-4 flex wrap">
        <div className="border border-gray-500/20 rounded shadow sm:col-span-2 row-span-2 mt-2 flex flex-col justify-between">
          <div className="p-3">
            <div className="flex items-center mb-2">
              <div className="bg-gray-500/10 rounded-lg w-10 h-10 mr-2 flex items-center justify-center">
                <UserCheck className="text-[#7C3EFF]" size={20} />
              </div>
              <h1 className="text-sm sm:text-base">
                Present Today
              </h1>
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl">12</h1>
          </div>

          <div className="border-t border-gray-500/20 px-3">
            <span className="text-xs text-gray-500">
              Out of 100 Interns
            </span>
          </div>
        </div>

        <div className="border border-gray-500/20 rounded shadow sm:col-span-2 row-span-2 mt-2 flex flex-col justify-between col-start-3">
          <div className="p-3">
            <div className="flex items-center mb-2">
              <div className="bg-gray-500/10 rounded-lg w-10 h-10 mr-2 flex items-center justify-center">
                <ClockAlert className="text-[#7C3EFF]" size={20} />
              </div>
              <h1 className="text-sm sm:text-base">
                Late Today
              </h1>
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl">3</h1>
          </div>

          <div className="border-t border-gray-500/20 px-3">
            <span className="text-xs text-gray-500">
              Timed In after 09:15 AM
            </span>
          </div>
        </div>

        <div className="border border-gray-500/20 rounded shadow sm col-span-2 row-span-2 mt-2 flex flex-col justify-between col-start-5">
          <div className="p-3">
            <div className="flex items-center mb-2">
              <div className="bg-gray-500/10 rounded-lg w-10 h-10 mr-2 flex items-center justify-center">
                <UserX className="text-[#7C3EFF]" size={20} />
              </div>
              <h1 className="text-sm sm:text-base">
                Absent Today
              </h1>
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl">2</h1>
          </div>

          <div className="border-t border-gray-500/20 px-3">
            <span className="text-xs text-gray-500">
              No Time Record
            </span>
          </div>
        </div>
        <div className="border border-gray-500/20 rounded shadow sm col-span-2 row-span-2 mt-2 flex flex-col justify-between col-start-7">
          <div className="p-3">
            <div className="flex items-center mb-2">
              <div className="bg-gray-500/10 rounded-lg w-10 h-10 mr-2 flex items-center justify-center">
                <Timer className="text-[#7C3EFF]" size={20} />
              </div>
              <h1 className="text-sm sm:text-base">
                Total Hours Today
              </h1>
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl">4.5</h1>
          </div>

          <div className="border-t border-gray-500/20 px-3">
            <span className="text-xs text-gray-500">
              Sum of all Intern's Hours
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center w-full max-w-md bg-purple border border-[#A2A1A81A] rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-500" />
          <input type="text" placeholder="Search interns..." className="w-full outline-none text-sm font-medium text-[#16151C33]" />
        </div>

        <div className="filter-options flex items-center space-x-4">
          <select id="" className="border border-gray-500/20 w-23 rounded-lg ms-3 py-2 px-3 focus:outline-none hover:border-gray-500/40 cursor-pointer">
            <option disabled selected>Filter</option>
            <option value="2023-10-01">by Intern Name</option>
            <option value="2023-10-02">by Date</option>
            <option value="2023-10-03">by Status</option>
          </select>
        </div>
      </div>

      <div className="border border-gray-500/20 rounded mt-4 px-3 py-1">
        <table className="table-fixed w-full text-left">

          <thead className="border-b border-gray-500/10 text-sm">
            <tr className="text-gray-500">
              <td className="p-2">Intern Name</td>
              <td className="p-2">Time In</td>
              <td className="p-2">Time Out</td>
              <td className="p-2">Hours</td>
              <td className="p-2">Date</td>
              <td className="p-2">Status</td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-500/10 text-md text-gray-700">

            <tr className="hover:bg-gray-100">
              <td className="p-2">John Doe</td>
              <td className="p-2">09:00 AM</td>
              <td className="p-2">05:00 PM</td>
              <td className="p-2">8.0</td>
              <td className="p-2">2023-10-01</td>
              <td className="p-2">
                <div className="bg-[#3FC28A1A] px-2 py-1 rounded text-[#3FC28A] text-xs inline-block">
                  <p>Approved</p>
                </div>
              </td>
            </tr>

            <tr className="hover:bg-gray-100">
              <td className="p-2">Jane Smith</td>
              <td className="p-2">09:30 AM</td>
              <td className="p-2">05:00 PM</td>
              <td className="p-2">7.5</td>
              <td className="p-2">2023-10-01</td>
              <td className="p-2">
                <div className="bg-[#3FC28A1A] px-2 py-1 rounded text-[#3FC28A] text-xs inline-block">
                  <p>Approved</p>
                </div>
              </td>
            </tr>

            <tr className="hover:bg-gray-100">
              <td className="p-2">Jane Smith</td>
              <td className="p-2">09:30 AM</td>
              <td className="p-2">05:00 PM</td>
              <td className="p-2">7.5</td>
              <td className="p-2">2023-10-01</td>
              <td className="p-2">
                <div className="bg-[#3FC28A1A] px-2 py-1 rounded text-[#3FC28A] text-xs inline-block">
                  <p>Approved</p>
                </div>
              </td>
            </tr>

            <tr className="hover:bg-gray-100">
              <td className="p-2">Jane Smith</td>
              <td className="p-2">09:30 AM</td>
              <td className="p-2">05:00 PM</td>
              <td className="p-2">7.5</td>
              <td className="p-2">2023-10-01</td>
              <td className="p-2">
                <div className="bg-[#3FC28A1A] px-2 py-1 rounded text-[#3FC28A] text-xs inline-block">
                  <p>Approved</p>
                </div>
              </td>
            </tr>

            <tr className="hover:bg-gray-100">
              <td className="p-2">Jane Smith</td>
              <td className="p-2">09:30 AM</td>
              <td className="p-2">05:00 PM</td>
              <td className="p-2">7.5</td>
              <td className="p-2">2023-10-01</td>
              <td className="p-2">
                <div className="bg-[#3FC28A1A] px-2 py-1 rounded text-[#3FC28A] text-xs inline-block">
                  <p>Approved</p>
                </div>
              </td>
            </tr>

            <tr className="hover:bg-gray-100">
              <td className="p-2">Jane Smith</td>
              <td className="p-2">09:30 AM</td>
              <td className="p-2">05:00 PM</td>
              <td className="p-2">7.5</td>
              <td className="p-2">2023-10-01</td>
              <td className="p-2">
                <div className="bg-[#3FC28A1A] px-2 py-1 rounded text-[#3FC28A] text-xs inline-block">
                  <p>Approved</p>
                </div>
              </td>
            </tr>

          </tbody>

        </table>
      </div>
    </>
  );
}