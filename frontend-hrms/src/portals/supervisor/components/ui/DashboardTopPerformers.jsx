export default function DashboardTopPerformers() {

  const topPerformersData = [
    {
      userName : "Cara Lim",
      userRole : "Web Development",
      userProfile : "./image.png"
    },
    {
      userName : "Ana Reyes",
      userRole : "Marketing",
      userProfile : "./image.png"
    },
    {
      userName : "Diego Flores",
      userRole : "Multimedia",
      userProfile : "./image.png"
    },
    {
      userName : "Elena Gomez",
      userRole : "Special Project",
      userProfile : "./image.png"
    },
    {
      userName : "Isabelle Reyes",
      userRole : "IT (All Dept.)",
      userProfile : "./image.png"
    },
    {
      userName : "Rafael Aquino",
      userRole : "Finance",
      userProfile : "./image.png"
    },
    {
      userName : "Maria Lopez",
      userRole : "Special Project",
      userProfile : "./image.png"
    },
    {
      userName : "Leo Villanueva",
      userRole : "Multimedia",
      userProfile : "./image.png"
    },
  ]


  return (
    <div className="border border-gray-500/20 rounded shadow sm col-span-3 row-span-8 col-start-6 row-start-3 p-5 mb-5">
          <div className="header border-b border-gray-500/20 mb-5 pb-3">
            <h1 className="font-medium text-xl">Top Performers</h1>
          </div>
          {topPerformersData.map((topPerformers, index) => (
          <div className="row flex flex-col mt-3">
            <div key={index} className="item flex items-center gap-3">
              <img src={topPerformers.userProfile} className="avatar w-10 h-10 rounded-full bg-[#7C3EFF]"></img>
              <div className="content">
                <h1 className="font-medium text-sm">{topPerformers.userName}</h1>
                <span className="text-sm text-gray-500">{topPerformers.userRole}</span>
              </div>
            </div>
          </div>
          ))}
        </div>
  );
}