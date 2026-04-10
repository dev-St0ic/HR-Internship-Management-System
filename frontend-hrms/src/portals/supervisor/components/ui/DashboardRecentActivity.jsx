export default function DashboardRecentActivity() {

  const recentActivityData = [
    {
      userName : "Ana Reyes",
      userStatus : "Timed In",
      userProfile : "./image.png"
    },
    {
      userName : "Juan Dela Cruz",
      userStatus : "Timed In Late",
      userProfile : "./image.png"
    },
    {
      userName : "Pedro Santos",
      userStatus : "tasks Completed",
      userProfile : "./image.png"
    },
    {
      userName : "Carlos Garcia",
      userStatus : "Timed Out Early",
      userProfile : "./image.png"
    },
    {
      userName : "Maria Lopez",
      userStatus : "Timed Out",
      userProfile : "./image.png"
    },
    {
      userName : "Sofia Cruz",
      userStatus : "Tasks Completed",
      userProfile : "./image.png"
    },
  ]

  return (
    <div className="border border-gray-500/20 rounded shadow sm col-span-5 row-span-6 row-start-5 p-5 mb-5">
          <div className="header border-b border-gray-500/20 mb-5 pb-3">
            <h1 className="font-medium text-xl">Recent Activity</h1>
          </div>
          <div className="row flex flex-col gap-3">
            {recentActivityData.map((recentActivity, index) => (
            <div key={index} className="item flex items-center gap-3">
              <img src={recentActivity.userProfile} className="avatar w-10 h-10 rounded-full bg-[#7C3EFF]"></img>
              <div className="content">
                <h1 className="font-medium text-sm">{recentActivity.userName}</h1>
                <span className="text-sm text-gray-500">{recentActivity.userStatus}</span>
              </div>
            </div>
            ))}
          </div>
        </div>
  );
}