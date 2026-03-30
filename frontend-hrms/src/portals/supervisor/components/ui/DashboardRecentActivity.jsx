export default function DashboardRecentActivity() {
  return (
    <div className="border border-gray-500/20 rounded shadow sm col-span-5 row-span-6 row-start-5 p-5">
          <div className="header border-b border-gray-500/20 mb-5 pb-3">
            <h1 className="font-medium text-xl">Recent Activity</h1>
          </div>
          <div className="row flex flex-col gap-3">

            <div className="item flex items-center gap-3">
              <img src="./image.png" className="avatar w-10 h-10 rounded-full bg-[#7C3EFF]"></img>
              <div className="content">
                <h1 className="font-medium text-sm">John Doe</h1>
                <span className="text-sm text-gray-500">Applied for leave</span>
              </div>
            </div>

            <div className="item flex items-center gap-3">    
              <img src="./image.png" className="avatar w-10 h-10 rounded-full bg-[#7C3EFF]"></img>
              <div className="content">
                <h1 className="font-medium text-sm">Jane Smith</h1>
                <span className="text-sm text-gray-500">Submitted timesheet</span>
              </div>
            </div>

            <div className="item flex items-center gap-3">    
              <img src="./image.png" className="avatar w-10 h-10 rounded-full bg-[#7C3EFF]"></img>
              <div className="content">
                <h1 className="font-medium text-sm">Jane Smith</h1>
                <span className="text-sm text-gray-500">Submitted timesheet</span>
              </div>
            </div>

            <div className="item flex items-center gap-3">    
              <img src="./image.png" className="avatar w-10 h-10 rounded-full bg-[#7C3EFF]"></img>
              <div className="content">
                <h1 className="font-medium text-sm">Jane Smith</h1>
                <span className="text-sm text-gray-500">Submitted timesheet</span>
              </div>
            </div>

            <div className="item flex items-center gap-3">    
              <img src="./image.png" className="avatar w-10 h-10 rounded-full bg-[#7C3EFF]"></img>
              <div className="content">
                <h1 className="font-medium text-sm">Jane Smith</h1>
                <span className="text-sm text-gray-500">Submitted timesheet</span>
              </div>
            </div>

            <div className="item flex items-center gap-3">    
              <img src="./image.png" className="avatar w-10 h-10 rounded-full bg-[#7C3EFF]"></img>
              <div className="content">
                <h1 className="font-medium text-sm">Jane Smith</h1>
                <span className="text-sm text-gray-500">Submitted timesheet</span>
              </div>
            </div>
          </div>
        </div>
  );
}