export default function SupervisorNotifications() {
  return (
    <>
      <div className="mt-5 p-5 border border-gray-500/20 rounded-lg">

        <div className="flex justify-between items-center border-b border-gray-500/20 px-2 py-3 hover:bg-gray-100 rounded-lg transition-colors duration-300 cursor-pointer">
          <div className="item flex items-center gap-3">
            <img src="./image.png" className="avatar size-10 rounded-full bg-[#7C3EFF]"></img>
            <div className="content">
              <h1 className="font-medium text-sm">Notification 1</h1>
              <span className="text-sm text-gray-500">Action</span>
            </div>
          </div>
          <div className="date mt-5">
            <span className="text-sm text-gray-500">Just  Now</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center border-b border-gray-500/20 px-2 py-3 hover:bg-gray-100 rounded-lg transition-colors duration-300 cursor-pointer">
          <div className="item flex items-center gap-3">
            <img src="./image.png" className="avatar size-10 rounded-full bg-[#7C3EFF]"></img>
            <div className="content">
              <h1 className="font-medium text-sm">Notification 2</h1>
              <span className="text-sm text-gray-500">Action</span>
            </div>
          </div>
          <div className="date mt-5">
            <span className="text-sm text-gray-500">10:00 AM</span>
          </div>
        </div>

        <div className="flex justify-between items-center border-b border-gray-500/20 px-2 py-3 hover:bg-gray-100 rounded-lg transition-colors duration-300 cursor-pointer">
          <div className="item flex items-center gap-3">
            <img src="./image.png" className="avatar size-10 rounded-full bg-[#7C3EFF]"></img>
            <div className="content">
              <h1 className="font-medium text-sm">Notification 3</h1>
              <span className="text-sm text-gray-500">Action</span>
            </div>
          </div>
          <div className="date mt-5">
            <span className="text-sm text-gray-500">Yesterday</span>
          </div>
        </div>

        <div className="flex justify-between items-center border-b border-gray-500/20 px-2 py-3 hover:bg-gray-100 rounded-lg transition-colors duration-300 cursor-pointer">
          <div className="item flex items-center gap-3">
            <img src="./image.png" className="avatar size-10 rounded-full bg-[#7C3EFF]"></img>
            <div className="content">
              <h1 className="font-medium text-sm">Notification 4</h1>
              <span className="text-sm text-gray-500">Action</span>
            </div>
          </div>
          <div className="date mt-5">
            <span className="text-sm text-gray-500">March 25, 2026</span>
          </div>
        </div>
        
      </div>
    </>
  )
};