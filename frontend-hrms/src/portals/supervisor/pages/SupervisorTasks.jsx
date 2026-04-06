import { PencilLine, Trash2 } from "lucide-react"
import { useState } from "react";

export default function SupervisorTasks() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="search-bar">
            <input type="search" name="search" id="" placeholder="Search interns..." className="border border-gray-500/20 rounded-lg py-2 px-3 w-70 focus:outline-none focus:ring-2 focus:ring-[#7C3EFF]" />
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
        <div className="button">
          <button onClick={() => setIsOpen(true)} className="bg-[#7C3EFF] text-white px-4 py-2 rounded-lg hover:bg-[#6B2ECC] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C3EFF]">
            + Create New Task
          </button>

          {/* modals for create new task */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
                <div className="flex justify-between border-b border-gray-500/10 pb-4 items-center mb-4">
                  <h2 className="text-lg font-semibold">Create New Task</h2>
                </div>
                <div className="space-y-3 mb-6">
                  <h1 className="font-medium">Select Interns</h1>
                  <select className="w-full border border-gray-500/30 p-2 rounded cursor-pointer appearance-none">
                    <option value="" selected disabled>Select Interns...</option>
                    <option value="cara">Cara Lim</option>
                    <option value="john">John Doe</option>
                    <option value="anna">Anna Cruz</option>
                  </select>
                  <h1 className="font-medium">Task Title</h1>
                  <input
                    type="text"
                    placeholder="Enter Task title"
                    className="w-full border border-gray-500/30 p-2 rounded"
                  />
                  <h1 className="font-medium">Deliverable</h1>
                  <input
                    type="file"
                    className="w-full border border-gray-500/30 p-2 rounded"
                  />
                  <h1 className="font-medium">Deadline</h1>
                  <input
                    type="Date"
                    placeholder="Enter Task title"
                    className="w-full border border-gray-500/30 p-2 rounded"
                  />
                </div>

                <div className="flex justify-end mt-4 gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 cursor-pointer rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 cursor-pointer rounded bg-[#7C3EFF] text-white hover:bg-[#6B2ECC]">
                    Assign Tasks
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border border-gray-500/20 rounded mt-4 px-3 py-1 mb-4">
        <table className="table-auto w-full text-left">

          <thead className="border-b border-gray-500/10 text-sm">
            <tr className="text-gray-500">
              <td className="p-2">Task</td>
              <td className="p-2">Intern Name</td>
              <td className="p-2">Deadline</td>
              <td className="p-2">Deliverable</td>
              <td className="p-2">Status</td>
              <td className="p-2">Actions</td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-500/10 text-md text-gray-700">

            <tr className="hover:bg-gray-100">
              <td className="p-2">Data Entry Projects</td>
              <td className="p-2">Cara Lim</td>
              <td className="p-2">April 01, 2026</td>
              <td className="p-2">Report.pdf</td>
              <td className="p-2">
                <div className="bg-green-700 px-2 py-1 rounded text-white text-xs inline-block">
                  <p>Approved</p>
                </div>
              </td>
              <td className="p-2">
                <div className="flex justify-around mx-5">
                  <PencilLine width={20} height={20} /> <Trash2 width={20} height={20} />
                </div>
              </td>
            </tr>

            <tr>
              <td className="p-2">Marketing or Development Tasks</td>
              <td className="p-2">Ethan Lee</td>
              <td className="p-2">April 15, 2026</td>
              <td className="p-2">Presentation.pptx</td>
              <td className="p-2">
                <div className="bg-yellow-500 px-2 py-1 rounded text-white text-xs inline-block">
                  <p>Pending</p>
                </div>
              </td>
              <td className="p-2">
                <div className="flex justify-around mx-5">
                  <PencilLine width={20} height={20} /> <Trash2 width={20} height={20} />
                </div>
              </td>
            </tr>

            <tr>
              <td className="p-2">HR Documentation Support</td>
              <td className="p-2">Mia Chen</td>
              <td className="p-2">April 30, 2026</td>
              <td className="p-2">CampaignPlan.docx</td>
              <td className="p-2">
                <div className="bg-green-700 px-2 py-1 rounded text-white text-xs inline-block">
                  <p>Completed</p>
                </div>
              </td>
              <td className="p-2">
                <div className="flex justify-around mx-5">
                  <PencilLine width={20} height={20} /> <Trash2 width={20} height={20} />
                </div>
              </td>
            </tr>

            <tr className="hover:bg-gray-100">
              <td className="p-2">Data Entry Projects</td>
              <td className="p-2">Cara Lim</td>
              <td className="p-2">April 01, 2026</td>
              <td className="p-2">Report.pdf</td>
              <td className="p-2">
                <div className="bg-green-700 px-2 py-1 rounded text-white text-xs inline-block">
                  <p>Approved</p>
                </div>
              </td>
              <td className="p-2">
                <div className="flex justify-around mx-5">
                  <PencilLine width={20} height={20} /> <Trash2 width={20} height={20} />
                </div>
              </td>
            </tr>

            <tr>
              <td className="p-2">Marketing or Development Tasks</td>
              <td className="p-2">Ethan Lee</td>
              <td className="p-2">April 15, 2026</td>
              <td className="p-2">Presentation.pptx</td>
              <td className="p-2">
                <div className="bg-yellow-500 px-2 py-1 rounded text-white text-xs inline-block">
                  <p>Pending</p>
                </div>
              </td>
              <td className="p-2">
                <div className="flex justify-around mx-5">
                  <PencilLine width={20} height={20} /> <Trash2 width={20} height={20} />
                </div>
              </td>
            </tr>

            <tr>
              <td className="p-2">HR Documentation Support</td>
              <td className="p-2">Mia Chen</td>
              <td className="p-2">April 30, 2026</td>
              <td className="p-2">CampaignPlan.docx</td>
              <td className="p-2">
                <div className="bg-green-700 px-2 py-1 rounded text-white text-xs inline-block">
                  <p>Completed</p>
                </div>
              </td>
              <td className="p-2">
                <div className="flex justify-around mx-5">
                  <PencilLine width={20} height={20} /> <Trash2 width={20} height={20} />
                </div>
              </td>
            </tr>

            <tr className="hover:bg-gray-100">
              <td className="p-2">Data Entry Projects</td>
              <td className="p-2">Cara Lim</td>
              <td className="p-2">April 01, 2026</td>
              <td className="p-2">Report.pdf</td>
              <td className="p-2">
                <div className="bg-green-700 px-2 py-1 rounded text-white text-xs inline-block">
                  <p>Approved</p>
                </div>
              </td>
              <td className="p-2">
                <div className="flex justify-around mx-5">
                  <PencilLine width={20} height={20} /> <Trash2 width={20} height={20} />
                </div>
              </td>
            </tr>

            <tr>
              <td className="p-2">Marketing or Development Tasks</td>
              <td className="p-2">Ethan Lee</td>
              <td className="p-2">April 15, 2026</td>
              <td className="p-2">Presentation.pptx</td>
              <td className="p-2">
                <div className="bg-yellow-500 px-2 py-1 rounded text-white text-xs inline-block">
                  <p>Pending</p>
                </div>
              </td>
              <td className="p-2">
                <div className="flex justify-around mx-5">
                  <PencilLine width={20} height={20} /> <Trash2 width={20} height={20} />
                </div>
              </td>
            </tr>

            <tr>
              <td className="p-2">HR Documentation Support</td>
              <td className="p-2">Mia Chen</td>
              <td className="p-2">April 30, 2026</td>
              <td className="p-2">CampaignPlan.docx</td>
              <td className="p-2">
                <div className="bg-green-700 px-2 py-1 rounded text-white text-xs inline-block">
                  <p>Completed</p>
                </div>
              </td>
              <td className="p-2">
                <div className="flex justify-around mx-5">
                  <PencilLine width={20} height={20} /> <Trash2 width={20} height={20} />
                </div>
              </td>
            </tr>

            <tr className="hover:bg-gray-100">
              <td className="p-2">Data Entry Projects</td>
              <td className="p-2">Cara Lim</td>
              <td className="p-2">April 01, 2026</td>
              <td className="p-2">Report.pdf</td>
              <td className="p-2">
                <div className="bg-green-700 px-2 py-1 rounded text-white text-xs inline-block">
                  <p>Approved</p>
                </div>
              </td>
              <td className="p-2">
                <div className="flex justify-around mx-5">
                  <PencilLine width={20} height={20} /> <Trash2 width={20} height={20} />
                </div>
              </td>
            </tr>

            <tr>
              <td className="p-2">Marketing or Development Tasks</td>
              <td className="p-2">Ethan Lee</td>
              <td className="p-2">April 15, 2026</td>
              <td className="p-2">Presentation.pptx</td>
              <td className="p-2">
                <div className="bg-yellow-500 px-2 py-1 rounded text-white text-xs inline-block">
                  <p>Pending</p>
                </div>
              </td>
              <td className="p-2">
                <div className="flex justify-around mx-5">
                  <PencilLine width={20} height={20} /> <Trash2 width={20} height={20} />
                </div>
              </td>
            </tr>

            <tr>
              <td className="p-2">HR Documentation Support</td>
              <td className="p-2">Mia Chen</td>
              <td className="p-2">April 30, 2026</td>
              <td className="p-2">CampaignPlan.docx</td>
              <td className="p-2">
                <div className="bg-green-700 px-2 py-1 rounded text-white text-xs inline-block">
                  <p>Completed</p>
                </div>
              </td>
              <td className="p-2">
                <div className="flex justify-around mx-5">
                  <PencilLine width={20} height={20} /> <Trash2 width={20} height={20} />
                </div>
              </td>
            </tr>
            
            
          </tbody>

        </table>  
      </div>
    </>
  );
}