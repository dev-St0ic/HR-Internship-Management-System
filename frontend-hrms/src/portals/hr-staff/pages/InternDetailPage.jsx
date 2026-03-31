import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function InternDetailPage({ internId }) {
  const [activeTab, setActiveTab] = useState('personal');

  // Sample Data ONLY, replace kung meron na actual data
  const intern = {
    name: 'Intern Name',
    email: 'companyemail@gmail.com',
    avatar: 'https://via.placeholder.com/80',
    firstName: 'First Name',
    lastName: 'Last Name',
    mobileNumber: '0912345682',
    emailAddress: 'companyemail@gmail.com',
    dateOfBirth: 'Date',
    gender: 'Gender',
    university: 'University',
    program: 'Program',
    ojtHours: 'Hours',
    address: 'address',
    city: 'City',
    zipCode: '0000',
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <span>Operation</span>
        <ChevronRight size={16} />
        <span className="text-gray-900 font-medium">{intern.name}</span>
        <ChevronRight size={16} />
        <span>Profile</span>
      </div>

      {/* Header Section */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
            <div>
              <h1 className="text-2xl font-bold">{intern.name}</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <span>✉</span>
                {intern.email}
              </p>
            </div>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center gap-2">
            <span>✎</span>
            Edit Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mt-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('personal')}
            className={`pb-3 px-2 font-medium ${
              activeTab === 'personal'
                ? 'border-b-2 border-gray-900 text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="flex items-center gap-2">
              👤 Personal Information
            </span>
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`pb-3 px-2 font-medium ${
              activeTab === 'documents'
                ? 'border-b-2 border-gray-900 text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="flex items-center gap-2">
              📄 Documents
            </span>
          </button>
          <button
            onClick={() => setActiveTab('access')}
            className={`pb-3 px-2 font-medium ${
              activeTab === 'access'
                ? 'border-b-2 border-gray-900 text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="flex items-center gap-2">
              🔐 Account Access
            </span>
          </button>
        </div>

        {/* Tabs Content */}
        {activeTab === 'personal' && (
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">First Name</label>
              <p className="text-gray-900">{intern.firstName}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Last Name</label>
              <p className="text-gray-900">{intern.lastName}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Mobile Number</label>
              <p className="text-gray-900">{intern.mobileNumber}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Email Address</label>
              <p className="text-gray-900">{intern.emailAddress}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Date of Birth</label>
              <p className="text-gray-900">{intern.dateOfBirth}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Gender</label>
              <p className="text-gray-900">{intern.gender}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">University</label>
              <p className="text-gray-900">{intern.university}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Program</label>
              <p className="text-gray-900">{intern.program}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">OJT Hours</label>
              <p className="text-gray-900">{intern.ojtHours}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Address</label>
              <p className="text-gray-900">{intern.address}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">City</label>
              <p className="text-gray-900">{intern.city}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Zip Code</label>
              <p className="text-gray-900">{intern.zipCode}</p>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="mt-6 text-center text-gray-500">
            <p>Documents section - Coming soon</p>
          </div>
        )}

        {activeTab === 'access' && (
          <div className="mt-6 text-center text-gray-500">
            <p>Account Access section - Coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
