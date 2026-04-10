import { useState } from "react";
import { BriefcaseBusiness, Eye, Mail, Pencil, SlidersHorizontal } from "lucide-react"
import TaskProgressCard from "../components/TaskProgressCard";

export default function UserTaskInformation() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="border border-gray-500/20 shadow-sm h-100 rounded-lg p-5 h-auto">
        <div className="flex justify-start items-center gap-3 border-b pb-5 border-gray-500/20 mb-5">
          <div className="bg-violet-600 size-17 rounded-lg"></div>
          <div className="flex-row items-center text-gray-800">
            <h1 className="font-semibold text-lg text-black">Cara Lim</h1>
            <h2 className="text-sm flex items-center gap-1"><BriefcaseBusiness size="17" />Project Manager</h2>
            <span className="text-sm flex items-center gap-1"><Mail size="17" />caralim@gmail.com</span>
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <TaskProgressCard />

          <div className="flex items-center justify-between gap-2">
            <div className="relative p-2 border border-gray-500/20 rounded-lg hover:bg-gray-100/50 flex items-center">
              <select className="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                <option>by Ascending (A-Z)</option>
                <option>by Descending (Z-A)</option>
                <option>by Deadline</option>
                <option>by Deliverable</option>
                <option>by Status</option>
              </select>
              <SlidersHorizontal size={20} />
            </div>

            <div className="border border-gray-500/20 gap-2 rounded-lg flex items-center">
              <div className="">
                <select name="" id="" className="w-20 p-2 outline-none cursor-pointer hover:bg-gray-100/50">
                  <option value="">Today</option>
                  <option value="">This Week</option>
                  <option value="">30 Days</option>
                  <option value="">3 Months</option>
                  <option value="">One Year</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-5 border border-gray-200 rounded-lg h-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="border-b border-gray-200 text-sm font-bold text-gray-500">
                <td className="p-2">No.</td>
                <td className="p-2">Task Name</td>
                <td className="p-2">Start Date</td>
                <td className="p-2">Due Date</td>
                <td className="p-2">Finish Date</td>
                <td className="p-2">Status</td>
                <td className="p-2">Action</td>
              </tr>
            </thead>
            <tbody>

              <tr className="cursor-pointer hover:bg-gray-100 text-sm text-start text-gray-800" onClick={() => setOpen(!open)}>
                <td className="p-2">1</td>
                <td className="p-2">Data Entry Projects</td>
                <td className="p-2">July 01, 2026</td>
                <td className="p-2">July 05, 2026</td>
                <td className="p-2">July 03, 2026</td>
                <td className="p-2">
                  <span className="bg-green-500/20 p-1 rounded-sm text-xs text-green-500">Completed</span>
                </td>
                <td className="p-2 text-center">
                  <div
                    className={`inline-block transform transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  >
                    <span className="text-gray-500">v</span>
                  </div>
                </td>
              </tr>

              {/* Expanded Row */}
              {open && (
                <tr>
                  <td colSpan={7} className="border border-gray-200 text-gray-800 text-sm p-4 bg-gray-50">
                    {/* Your expanded content here */}
                    <div className="text-gray-700">
                      <h1 className="text-md">Task 1</h1>
                      <p className="text-xs">Encode Inventory Data</p>
                      
                      <p className="mt-5 text-sm font-medium">Deliverables</p>
                      <div className="flex items-center justify-between">
                        <div className="border border-gray-400/20 text-xs flex items-center justify-between gap-4 p-1">
                          <span>Submitted Documents.pdf</span>
                          <Eye size={17}/>
                        </div>
                        <a href="#" className="text-violet-600"><Pencil size={20} /></a>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}