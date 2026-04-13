import { Search, SlidersHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function SupervisorMyInterns() {
  return (
    <div className="p-6 min-h-screen">

      <div className="flex items-center justify-between gap-3 mb-4">

        <div className="flex items-center w-full max-w-md bg-purple border border-[#A2A1A81A] rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-600  mr-2" />
          <input
            type="text"
            placeholder="Search interns..."
            className="w-full outline-none text-sm font-medium text-[#16151C33]"
          />
        </div>

        <div className="filter-options flex items-center space-x-4">  
            <select id="" className="border border-gray-500/20 w-23 rounded-lg ms-3 py-2 px-3 focus:outline-none hover:border-gray-500/40 cursor-pointer">
              <option disabled selected>Filter</option>
              <option value="2023-10-01">by Intern Name</option>
              <option value="2023-10-03">by Department</option>
              <option value="2023-10-02">by Date</option>
              <option value="2023-10-03">by Status</option>
            </select>
          </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="table-auto w-full text-md text-gray-600">

          <thead className="text-gray-400 text-xs border-b">
            <tr>
              <th className="px-6 py-4 text-left">Intern Name</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">University</th>
              <th className="px-6 py-4 text-left">Program</th>
              <th className="px-6 py-4 text-left">Start Date</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-gray-50 font-medium">
              <td className="px-6 py-4 flex items-center">
                <img src="../../cara.png" className="size-10 bg-[#7152F3] rounded-full mr-2" />
                <NavLink to="internprofiles" className="hover:text-violet-600 hover:font-medium">
                  Cara Lim
                </NavLink>
              </td>
              <td className="px-6 py-4">Web Development</td>
              <td className="px-6 py-4">PUP</td>
              <td className="px-6 py-4">BSIT</td>
              <td className="px-6 py-4">July 1, 2023</td>
              <td className="px-6 py-4">
                <span className="bg-[#7152F31A] text-[#7152F3] text-xs px-3 font- py-1 rounded-md">
                  Active
                </span>
              </td>
            </tr>
          </tbody>

        </table>
      </div>

    </div>
  );
}