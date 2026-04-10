import { PencilLine, Trash2, SlidersHorizontal, Search, CirclePlus } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import CreateTaskForm from "../components/CreateTaskForm";

export default function SupervisorTasks() {
  const [isOpen, setIsOpen] = useState(false);

  const taskTable = [
    {
      tableHeaderRow : ["Task", "Intern Name", "Deadline", "Deliverable", "Status", "Actions"],
      tableTaskData : [
        {
          taskName : "Data Entry Project",
          internName : "Cara Lim",
          deadline : "July 1, 2023",
          deliverable : "Not Uploaded",
          Status : "Completed",
        },
        {
          taskName : "Marketing or Development Tasks",
          internName : "Ana Reyes",
          deadline : "July 1, 2023",
          deliverable : "report.pdf",
          Status : "Completed",
        },
        {
          taskName : "Research Assignments",
          internName : "Carlos Garcia",
          deadline : "July 1, 2023",
          deliverable : "Report.pdf",
          Status : "Pending",
        },
      ]
    }
  ]

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="search-bar ps-3 border border-gray-500/20 rounded-lg flex items-center justify-start">
            <Search size={20} />
            <input type="search" name="search" id="" placeholder="Search interns..." className="py-2 rounded-lg px-3 w-70 focus:outline-none" />
          </div>

          <div className="p-2 border border-gray-500/20 auto rounded-lg flex items-center justify-start">
            <SlidersHorizontal size={20} />
            <select className="cursor-pointer focus:outline-none hover:border-gray-500/40 w-14 appearance-none text-left px-2">
              <option selected>Filter</option>
              <option>by Ascending {`(A-Z)`}</option>
              <option>by Descending {`(Z-A)`}</option>
              <option>by Deadline</option>
              <option>by Deliverable</option>
              <option>by Status</option>
            </select>
          </div>
          
        </div>
        <div className="button">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#7C3EFF] text-white flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#6B2ECC] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3EFF]"
          >
            <CirclePlus size={20} /> Create New Task
          </button>

          {/* Modal */}
          {isOpen && <CreateTaskForm onClose={() => setIsOpen(false)} />}
        </div>
      </div>

      <div className="border border-gray-500/20 rounded mt-4 px-3 py-1 mb-4">
        {taskTable.map((table, index) => (
        <table key={index} className="table-auto w-full text-left">

          <thead className="border-b border-gray-500/10 text-sm">
            <tr className="text-gray-500">
              {table.tableHeaderRow.map((header, i) => (
              <td key={i} className="p-2">{header}</td>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-500/10 text-md text-gray-700">
            {table.tableTaskData.map((tableData, i) => (
            <tr key={i} className="hover:bg-gray-100">
              <td className="p-2">{tableData.taskName}</td>
              <td className="p-2">
                <Link to={`internprofile/${tableData.internName}`} className="hover:text-violet-600 hover:font-medium">
                  {tableData.internName}
                </Link>
                </td>
              <td className="p-2">{tableData.deadline}</td>
              <td className="p-2">{tableData.deliverable}</td>
              <td className="p-2">
                {tableData.Status === "Completed" && (
                  <div className="bg-green-200 px-2 py-1 rounded text-green-600 text-xs inline-block">
                  <p>Approved</p>
                </div>
                )}
                {tableData.Status === "Pending" && (
                  <div className="bg-yellow-200 px-2 py-1 rounded text-yellow-500 text-xs inline-block">
                  <p>Pending</p>
                </div>
                )}
              </td>
              <td className="p-2">
                <div className="flex justify-around mx-5">
                  <PencilLine width={20} height={20} /> <Trash2 width={20} height={20} />
                </div>
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