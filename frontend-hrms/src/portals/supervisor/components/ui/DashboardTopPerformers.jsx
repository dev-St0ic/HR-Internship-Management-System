export default function DashboardTopPerformers() {
  return (
    <div className="border border-gray-500/20 rounded shadow sm col-span-3 row-span-8 col-start-6 row-start-3 p-5">
          <div className="header border-b border-gray-500/20 mb-5 pb-3">
            <h1 className="font-medium text-xl">Top Performers</h1>
          </div>
          <div className="row flex flex-col gap-3">
            <div className="item flex items-center gap-3">
              <img src="./image.png" className="avatar w-10 h-10 rounded-full bg-[#7C3EFF]"></img>
              <div className="content">
                <h1 className="font-medium text-sm">John Doe</h1>
                <span className="text-sm text-gray-500">IT Department</span>
              </div>
            </div>

            <div className="item flex items-center gap-3">    
              <img src="./image.png" className="avatar w-10 h-10 rounded-full bg-[#7C3EFF]"></img>
              <div className="content">
                <h1 className="font-medium text-sm">Jane Smith</h1>
                <span className="text-sm text-gray-500">AI Department</span>
              </div>
            </div>

            <div className="item flex items-center gap-3">    
              <img src="./image.png" className="avatar w-10 h-10 rounded-full bg-[#7C3EFF]"></img>
              <div className="content">
                <h1 className="font-medium text-sm">Jane Doe</h1>
                <span className="text-sm text-gray-500">HR Department</span>
              </div>
            </div>

            <div className="item flex items-center gap-3">    
              <img src="./image.png" className="avatar w-10 h-10 rounded-full bg-[#7C3EFF]"></img>
              <div className="content">
                <h1 className="font-medium text-sm">Jane Doe</h1>
                <span className="text-sm text-gray-500">HR Department</span>
              </div>
            </div>

            <div className="item flex items-center gap-3">    
              <img src="./image.png" className="avatar w-10 h-10 rounded-full bg-[#7C3EFF]"></img>
              <div className="content">
                <h1 className="font-medium text-sm">Jane Doe</h1>
                <span className="text-sm text-gray-500">Marketing Manager</span>
              </div>
            </div>

            <div className="item flex items-center gap-3">    
              <img src="./image.png" className="avatar w-10 h-10 rounded-full bg-[#7C3EFF]"></img>
              <div className="content">
                <h1 className="font-medium text-sm">Jane Doe</h1>
                <span className="text-sm text-gray-500">Special Project</span>
              </div>
            </div>

          </div>
        </div>
  );
}