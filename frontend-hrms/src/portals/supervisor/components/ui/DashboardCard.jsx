import { UsersRound, CalendarCheck, ScrollText } from 'lucide-react'

export default function DashboardCard() {

  const dashboardCardInfo = [
    {
      dashboardLabel : "Total Interns",
      dashboardIcon : <UsersRound className="text-[#7C3EFF]" size={20} />,
      dashboardCount : "12", 
      dashboardDesc : "Under your supervision"
    },
    {
      dashboardLabel : "DTR To Review",
      dashboardIcon : <CalendarCheck className="text-[#7C3EFF]" size={20} />,
      dashboardCount : "3", 
      dashboardDesc : "DTR Submissions" 
    },
    {
      dashboardLabel : "Overdue Tasks",
      dashboardIcon : <ScrollText className="text-[#7C3EFF]" size={20} />,
      dashboardCount : "2", 
      dashboardDesc : "Across All Interns" 
    },
    {
      dashboardLabel : "Avg. Performance",
      dashboardIcon : <ScrollText className="text-[#7C3EFF]" size={20} />,
      dashboardCount : "4.5", 
      dashboardDesc : "Based on Evaluations" 
    }
  ] 


  return (
    <>
    {dashboardCardInfo.map((dashboard, index) => (
      <div key={index} className="border border-gray-500/20 rounded shadow sm:col-span-2 row-span-2 mt-2 flex flex-col justify-between">
        <div className="p-3">
          <div className="flex items-center mb-2">
            <div className="bg-gray-500/10 rounded-lg w-10 h-10 mr-2 flex items-center justify-center">
              {dashboard.dashboardIcon}
            </div>
            <h1 className="text-sm sm:text-base">
              {dashboard.dashboardLabel}
            </h1>
          </div>

          <h1 className="font-bold text-2xl sm:text-3xl">{dashboard.dashboardCount}</h1>
        </div>

        <div className="border-t border-gray-500/20 px-3">
          <span className="text-xs text-gray-500">
            {dashboard.dashboardDesc}
          </span>
        </div>
      </div>
      ))}
    </>
  )
}