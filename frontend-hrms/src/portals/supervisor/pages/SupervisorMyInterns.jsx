import { Search, SlidersHorizontal } from "lucide-react";

export default function SupervisorMyInterns() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* TOP BAR */}
      <div className="flex items-center gap-3 mb-4">
        
        {/* SEARCH INPUT */}
        <div className="flex items-center w-full max-w-md bg-purple border border-purple-600 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-purple-600  mr-2" />
          <input
            type="text"
            placeholder="Search interns..."
            className="w-full outline-none text-sm font-medium text-purple-600 placeholder-purple-600"
          />
        </div>

        {/* FILTER BUTTON */}
        <button className="flex items-center gap-2 px-4 py-2 bg-purple border border-purple-600 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50">
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-gray-600">
          
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
              <td className="px-6 py-4">Juan Dela Cruz</td>
              <td className="px-6 py-4">IT (All Dept)</td>
              <td className="px-6 py-4">University</td>
              <td className="px-6 py-4">Program</td>
              <td className="px-6 py-4">Date</td>
              <td className="px-6 py-4">
                <span className="bg-purple-500 text-white-1000 text-xs px-3 font- py-1 rounded-md">
                  Active
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 font-medium">
              <td className="px-6 py-4">Ana Reyes</td>
              <td className="px-6 py-4">Marketing</td>
              <td className="px-6 py-4">University</td>
              <td className="px-6 py-4">Program</td>
              <td className="px-6 py-4">Date</td>
              <td className="px-6 py-4">
                <span className="bg-purple-500 text-white-1000 text-xs px-3 py-1 rounded-md">
                  Active
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 font-medium">
              <td className="px-6 py-4">Carlos Garcia</td>
              <td className="px-6 py-4">Multimedia</td>
              <td className="px-6 py-4">University</td>
              <td className="px-6 py-4">Program</td>
              <td className="px-6 py-4">Date</td>
              <td className="px-6 py-4">
               <span className="bg-purple-500 text-white-100 text-xs px-3 py-1 rounded-md">
                  Active
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 font-medium">
              <td className="px-6 py-4">Maria Lopez</td>
              <td className="px-6 py-4">Special Project</td>
              <td className="px-6 py-4">University</td>
              <td className="px-6 py-4">Program</td>
              <td className="px-6 py-4">Date</td>
              <td className="px-6 py-4">
                <span className="bg-purple-500 text-white-1000 text-xs px-3 py-1 rounded-md">
                  Active
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 font-medium">
              <td className="px-6 py-4">Pedro Santos</td>
              <td className="px-6 py-4">Finance</td>
              <td className="px-6 py-4">University</td>
              <td className="px-6 py-4">Program</td>
              <td className="px-6 py-4">Date</td>
              <td className="px-6 py-4">
                <span className="bg-purple-500 text-white-1000 text-xs px-3 py-1 rounded-md">
                  Active
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 font-medium">
              <td className="px-6 py-4">Cara Lim</td>
              <td className="px-6 py-4">Web Development</td>
              <td className="px-6 py-4">University</td>
              <td className="px-6 py-4">Program</td>
              <td className="px-6 py-4">Date</td>
              <td className="px-6 py-4">
                <span className="bg-purple-500 text-white-1000 text-xs px-3 py-1 rounded-md">
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