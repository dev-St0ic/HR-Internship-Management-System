export default function AdminRecruitmentPage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recruitment Management</h2>
        <p className="text-gray-600">Manage recruitment applications and interviews</p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-[#7C3EFF]">
            <h3 className="font-semibold text-gray-900">Pending Applications</h3>
            <p className="text-3xl font-bold text-[#7C3EFF] mt-2">0</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
            <h3 className="font-semibold text-gray-900">Interview Scheduled</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
            <h3 className="font-semibold text-gray-900">Accepted</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
