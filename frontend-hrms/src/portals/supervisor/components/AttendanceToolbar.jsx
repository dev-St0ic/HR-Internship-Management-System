export default function AttendanceToolbar() {
  return (
    <div className="flex items-center mt-6"><div className="search-bar"><input type="search" placeholder="Search interns..." className="border border-gray-500/20 rounded-lg py-2 px-3 w-70 focus:outline-none focus:ring-2 focus:ring-[#7C3EFF]" /></div><div className="filter-options flex items-center space-x-4"><select className="border border-gray-500/20 w-23 rounded-lg ms-3 py-2 px-3 focus:outline-none hover:border-gray-500/40 cursor-pointer"><option disabled selected>Filter</option><option value="name">by Intern Name</option><option value="date">by Date</option><option value="status">by Status</option></select></div></div>
  );
}