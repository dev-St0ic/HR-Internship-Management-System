import { NotebookText, BookCheck, LibraryBig } from 'lucide-react'

export default function DashboardQuickActions() {
  return (
    <div className="border border-gray-500/20 rounded shadow sm col-span-5 row-span-2 row-start-3 p-5">
          <h1 className="font-medium text-lg">Quick Actions</h1>
          <div className="button ms-3 flex flex-wrap gap-3 mt-2 justify-between">

            <button className="bg-gray-500/10 text-[#7C3EFF] py-2 px-4 rounded hover:bg-gray-500/20 cursor-pointer transition-colors text-md flex items-center">
              <NotebookText className="w-5 me-1" /> Review DTRs
            </button>

            <button className="bg-[#7C3EFF] text-white py-2 px-4 rounded hover:bg-[#6a30d5] cursor-pointer transition-colors text-md flex items-center">
              <BookCheck className="w-5 me-1" /> Assign New Tasks
            </button>

            <button className="bg-[#7C3EFF] text-white py-2 px-4 rounded hover:bg-[#6a30d5] cursor-pointer transition-colors text-md flex items-center">
              <LibraryBig className="w-5 me-1" /> Start Evaluation
            </button>

          </div>
        </div>
  )
}