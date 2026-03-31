import { Search, Filter, Bell } from 'lucide-react';

const StaffHeader = () => {
  return (
    <header className="border-b border-slate-200">
      <div className="px-8 py-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Operations</h1>
          <p className="text-sm text-gray-500">Daily Workflow & Tracking</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 bg-gray-100 rounded-lg px-4 py-2">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>

          <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            <Filter size={18} />
            <span>Filter</span>
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default StaffHeader;
