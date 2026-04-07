import { Search, SlidersHorizontal } from "lucide-react";

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

        <select className="bg-gray-500/20 p-2 rounded-md border-0">
                <option>Filter</option>
                <option>Filter</option>
              </select>
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
                <img src="../../image.png" className="size-10 bg-[#7152F3] rounded-full mr-2" />
                Juan Dela Cruz
                </td>
              <td className="px-6 py-4">IT (All Dept)</td>
              <td className="px-6 py-4">University</td>
              <td className="px-6 py-4">Program</td>
              <td className="px-6 py-4">Date</td>
              <td className="px-6 py-4">
                <span className="bg-[#7152F31A] text-[#7152F3] text-xs px-3 font- py-1 rounded-md">
                  Active
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 font-medium">
              <td className="px-6 py-4 flex items-center">
                <img src="../../image.png" className="size-10 bg-[#7152F3] rounded-full mr-2" />
                Juan Dela Cruz
                </td>
              <td className="px-6 py-4">Marketing</td>
              <td className="px-6 py-4">University</td>
              <td className="px-6 py-4">Program</td>
              <td className="px-6 py-4">Date</td>
              <td className="px-6 py-4">
                <span className="bg-[#7152F31A] text-[#7152F3] text-xs px-3 font- py-1 rounded-md">
                  Active
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 font-medium">
              <td className="px-6 py-4 flex items-center">
                <img src="../../image.png" className="size-10 bg-[#7152F3] rounded-full mr-2" />
                Juan Dela Cruz
                </td>
              <td className="px-6 py-4">Multimedia</td>
              <td className="px-6 py-4">University</td>
              <td className="px-6 py-4">Program</td>
              <td className="px-6 py-4">Date</td>
              <td className="px-6 py-4">
               <span className="bg-[#7152F31A] text-[#7152F3] text-xs px-3 font- py-1 rounded-md">
                  Active
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 font-medium">
              <td className="px-6 py-4 flex items-center">
                <img src="../../image.png" className="size-10 bg-[#7152F3] rounded-full mr-2" />
                Juan Dela Cruz
                </td>
              <td className="px-6 py-4">Special Project</td>
              <td className="px-6 py-4">University</td>
              <td className="px-6 py-4">Program</td>
              <td className="px-6 py-4">Date</td>
              <td className="px-6 py-4">
                <span className="bg-[#7152F31A] text-[#7152F3] text-xs px-3 font- py-1 rounded-md">
                  Active
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 font-medium">
              <td className="px-6 py-4 flex items-center">
                <img src="../../image.png" className="size-10 bg-[#7152F3] rounded-full mr-2" />
                Juan Dela Cruz
                </td>
              <td className="px-6 py-4">Finance</td>
              <td className="px-6 py-4">University</td>
              <td className="px-6 py-4">Program</td>
              <td className="px-6 py-4">Date</td>
              <td className="px-6 py-4">
                <span className="bg-[#7152F31A] text-[#7152F3] text-xs px-3 font- py-1 rounded-md">
                  Active
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 font-medium">
              <td className="px-6 py-4 flex items-center">
                <img src="../../image.png" className="size-10 bg-[#7152F3] rounded-full mr-2" />
                Juan Dela Cruz
                </td>
              <td className="px-6 py-4">Web Development</td>
              <td className="px-6 py-4">University</td>
              <td className="px-6 py-4">Program</td>
              <td className="px-6 py-4">Date</td>
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