import { NotebookText, BookCheck, LibraryBig } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DashboardQuickActions() {
  return (
    <div className="border border-gray-500/20 rounded shadow sm col-span-5 row-span-2 row-start-3 p-5">
          <h1 className="font-medium text-lg">Quick Actions</h1>
          <div className="button ms-3 flex flex-wrap gap-3 mt-2 justify-between">

            <Link to="/supervisor/attendance" className="bg-gray-500/10 text-[#7C3EFF] py-2 px-4 rounded hover:bg-gray-500/20 cursor-pointer transition-colors text-md flex items-center">
              <NotebookText className="w-5 me-1" /> Review DTRs
            </Link>

            <Link to="/supervisor/tasks" className="bg-[#7C3EFF] text-white py-2 px-4 rounded hover:bg-[#6a30d5] cursor-pointer transition-colors text-md flex items-center">
              <BookCheck className="w-5 me-1" /> Assign New Tasks
            </Link>
{/* oks na */}
            <Link to="/supervisor/evaluations" className="bg-[#7C3EFF] text-white py-2 px-4 rounded hover:bg-[#6a30d5] cursor-pointer transition-colors text-md flex items-center">
              <LibraryBig className="w-5 me-1" /> Start Evaluation
            </Link>

          </div>
        </div>
  )
}