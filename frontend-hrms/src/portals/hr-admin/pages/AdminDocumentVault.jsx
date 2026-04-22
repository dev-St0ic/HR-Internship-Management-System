export default function AdminDocumentVault() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Document Vault</h2>
        <p className="text-gray-600">Centralized document management for all interns and staff</p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-lg border-l-4 border-[#7C3EFF] bg-purple-50 p-6">
            <h3 className="font-semibold text-gray-900">Total Documents</h3>
            <p className="mt-2 text-3xl font-bold text-[#7C3EFF]">0</p>
          </div>
          <div className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-6">
            <h3 className="font-semibold text-gray-900">Pending Review</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="rounded-lg border-l-4 border-green-600 bg-green-50 p-6">
            <h3 className="font-semibold text-gray-900">Approved</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">0</p>
          </div>
          <div className="rounded-lg border-l-4 border-red-600 bg-red-50 p-6">
            <h3 className="font-semibold text-gray-900">Rejected</h3>
            <p className="mt-2 text-3xl font-bold text-red-600">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}