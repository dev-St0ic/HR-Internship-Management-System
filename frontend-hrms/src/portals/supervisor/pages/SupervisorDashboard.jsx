export default function SupervisorDashboard() {
  return (
    <div id="supervisor-dashboard">
      <h1 className="font-bold">Hello [Name]</h1>
      <p>Welcome!</p>

      <div className="grid grid-cols-8 grid-rows-12 gap-4 flex wrap">

        <div className="border border-gray-500/20 rounded shadow sm:col-span-2 row-span-2 mt-2 flex flex-col justify-between">
          <div className="p-3">
            <div className="flex items-center mb-2">
              <div className="bg-gray-500/20 rounded-lg w-10 h-10 mr-2"></div>
              <h1 className="text-sm sm:text-base font-medium">
                Total Interns
              </h1>
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl">12</h1>
          </div>

          <div className="border-t border-gray-500/20 px-3 py-1">
            <span className="text-sm text-gray-500">
              Under your supervision
            </span>
          </div>
        </div>

        <div className="border border-gray-500/20 rounded shadow sm col-span-2 row-span-2 h-30 mt-2 col-start-3">
          2
        </div>
        <div className="border border-gray-500/20 rounded shadow sm col-span-2 row-span-2 h-30 mt-2 col-start-5">
          3
        </div>
        <div className="border border-gray-500/20 rounded shadow sm col-span-2 row-span-2 h-30 mt-2 col-start-7">
          4
        </div>
        <div className="border border-gray-500/20 rounded shadow sm col-span-5 row-span-2 row-start-3">
          5
        </div>
        <div className="border border-gray-500/20 rounded shadow sm col-span-3 row-span-10 col-start-6 row-start-3">
          6
        </div>
        <div className="border border-gray-500/20 rounded shadow sm col-span-5 row-span-8 row-start-5">
          8
        </div>
      </div>
    </div>
  );
}
