export default function AdminStaffManagementPage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Staff Management</h2>
        <p className="text-gray-600">Manage HR staff members and their roles</p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-[#7C3EFF]">
            <h3 className="font-semibold text-gray-900">Total Staff</h3>
            <p className="text-3xl font-bold text-[#7C3EFF] mt-2">0</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
            <h3 className="font-semibold text-gray-900">Active</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">0</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-600">
            <h3 className="font-semibold text-gray-900">Inactive</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
