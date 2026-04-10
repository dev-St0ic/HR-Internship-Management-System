import { UserCheck, ClockAlert, UserX, Timer, SlidersHorizontal, Search  } from "lucide-react";

export default function SupervisorAttendance() {

  const attendanceCard = [
    {
      icons: <UserCheck className="text-[#7C3EFF]" size={20}/>,
      label: "Present Today",
      count: 12,
      shortDesc: "Out of 100 Interns"
    },
    {
      icons: <ClockAlert className="text-[#7C3EFF]" size={20}/>,
      label: "Late Today",
      count: 3,
      shortDesc: "Timed In after 09:15 AM"
    },
    {
      icons: <UserX className="text-[#7C3EFF]" size={20}/>,
      label: "Absent Today",
      count: 2,
      shortDesc: "No Time Record"
    },
    {
      icons: <Timer className="text-[#7C3EFF]" size={20}/>,
      label: "Total Hours Today",
      count: 64 + " " + "hours",
      shortDesc: "Sum of all Intern's Hours"
    },
  ]

  const attendanceTable = [
    {
      tableHeaderRow : ["Intern Name", "Time In", "Time Out", "Hours", "Date", "Status"],
      tableData : [
        {
          internName : "Cara Lim",
          timeIn : "09:02 AM",
          timeOut : "06:00 PM",
          totalHours : 8.0,
          statusDate : "July 01, 2023",
          internStatus : "Approved"
        },
        {
          internName : "Ana Reyes",
          timeIn : "08:55 AM",
          timeOut : "06:05 PM",
          totalHours : 8.2,
          statusDate : "July 01, 2023",
          internStatus : "Approved"
        },
        {
          internName : "Carlos Garcia",
          timeIn : "09:15 AM",
          timeOut : "06:00 PM",
          totalHours : 7.8,
          statusDate : "July 01, 2023",
          internStatus : "Approved"
        },
      ]
    }
  ]

  return (
    <>
      <div className="grid grid-cols-8 gap-4 flex wrap">
        {attendanceCard.map((attendance, index) => (
        <div key={index} className="border border-gray-500/20 rounded shadow sm:col-span-2 row-span-2 mt-2 flex flex-col justify-between">
          <div className="p-3">
            <div className="flex items-center mb-2">
              <div className="bg-gray-500/10 rounded-lg w-10 h-10 mr-2 flex items-center justify-center">
                {attendance.icons}
              </div>
              <h1 className="text-sm sm:text-base">
                {attendance.label}
              </h1>
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl">{attendance.count}</h1>
          </div>

          <div className="border-t border-gray-500/20 px-3">
            <span className="text-xs text-gray-500">
              {attendance.shortDesc}
            </span>
          </div>
        </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 mt-6">
        <div className="search-bar ps-3 border border-gray-500/20 rounded-lg flex items-center justify-start">
          <Search size={20} />
          <input type="search" name="search" id="" placeholder="Search interns..." className="py-2 rounded-lg px-3 w-70 focus:outline-none" />
        </div>

        <div className="p-2 border border-gray-500/20 auto rounded-lg flex items-center justify-start">
          <SlidersHorizontal size={20} />
          <select className="cursor-pointer focus:outline-none hover:border-gray-500/40 w-12 appearance-none text-left pl-2">
            <option disabled selected>Filter</option>
            <option value="2023-10-01">by Intern Name</option>
            <option value="2023-10-02">by Date</option>
            <option value="2023-10-03">by Status</option>
          </select>
        </div>

      </div>

      <div className="border border-gray-500/20 rounded mt-4 px-3 py-1 mb-5">
        {attendanceTable.map((table, index) => (
        <table key={index} className="table-fixed w-full text-left text-sm">
          <thead className="border-b border-gray-500/10 text-sm">
            <tr className="text-gray-500">
              {table.tableHeaderRow.map((tableHeader, i) => (
              <td key={i} className="p-2">{tableHeader}</td>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-500/10 text-md text-gray-800">
            {table.tableData.map((internData, i) => (
            <tr key={i} className="hover:bg-gray-100">
              <td className="p-2">{internData.internName}</td>
              <td className="p-2">{internData.timeIn}</td>
              <td className="p-2">{internData.timeOut}</td>
              <td className="p-2">{internData.totalHours}</td>
              <td className="p-2">{internData.statusDate}</td>
              <td className="p-2">
                {internData.internStatus === "Approved" && (
                  <div className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs inline-block">
                  <p>{internData.internStatus}</p>
                </div>
                )}
              </td>
            </tr>
            ))}
            
          </tbody>

        </table>  
        ))}
      </div>
    </>
  );
}