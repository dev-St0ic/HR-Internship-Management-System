import { UsersRound, CalendarCheck, ScrollText } from 'lucide-react'

export default function DashboardCard() {
  return (
    <>
      <div className="border border-gray-500/20 rounded shadow sm:col-span-2 row-span-2 mt-2 flex flex-col justify-between">
          <div className="p-3">
            <div className="flex items-center mb-2">
              <div className="bg-gray-500/10 rounded-lg w-10 h-10 mr-2 flex items-center justify-center">
                <UsersRound className="text-[#7C3EFF]" size={20} />
              </div>
              <h1 className="text-sm sm:text-base">
                Total Interns
              </h1>
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl">12</h1>
          </div>

          <div className="border-t border-gray-500/20 px-3">
            <span className="text-xs text-gray-500">
              Under your supervision
            </span>
          </div>
        </div>

        <div className="border border-gray-500/20 rounded shadow sm:col-span-2 row-span-2 mt-2 flex flex-col justify-between col-start-3">
          <div className="p-3">
            <div className="flex items-center mb-2">
              <div className="bg-gray-500/10 rounded-lg w-10 h-10 mr-2 flex items-center justify-center">
                <CalendarCheck className="text-[#7C3EFF]" size={20} />
              </div>
              <h1 className="text-sm sm:text-base">
                DTR To Review
              </h1>
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl">3</h1>
          </div>

          <div className="border-t border-gray-500/20 px-3">
            <span className="text-xs text-gray-500">
              DTR Submissions
            </span>
          </div>
        </div>

        <div className="border border-gray-500/20 rounded shadow sm col-span-2 row-span-2 mt-2 flex flex-col justify-between col-start-5">
          <div className="p-3">
            <div className="flex items-center mb-2">
              <div className="bg-gray-500/10 rounded-lg w-10 h-10 mr-2 flex items-center justify-center">
                <ScrollText className="text-[#7C3EFF]" size={20} />
              </div>
              <h1 className="text-sm sm:text-base">
                Overdue Tasks
              </h1>
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl">2</h1>
          </div>

          <div className="border-t border-gray-500/20 px-3">
            <span className="text-xs text-gray-500">
              Across All Interns
            </span>
          </div>
        </div>
        <div className="border border-gray-500/20 rounded shadow sm col-span-2 row-span-2 mt-2 flex flex-col justify-between col-start-7">
          <div className="p-3">
            <div className="flex items-center mb-2">
              <div className="bg-gray-500/10 rounded-lg w-10 h-10 mr-2 flex items-center justify-center">
                <ScrollText className="text-[#7C3EFF]" size={20} />
              </div>
              <h1 className="text-sm sm:text-base">
                Avg. Performance
              </h1>
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl">4.5</h1>
          </div>

          <div className="border-t border-gray-500/20 px-3">
            <span className="text-xs text-gray-500">
              Based on Evaluations
            </span>
          </div>
        </div>
    </>
  )
}