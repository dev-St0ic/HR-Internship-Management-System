import { useState, useEffect } from 'react';
import { ShieldCheck, User, Lock, Bell, ChevronRight } from 'lucide-react';
import { Switch } from '@mui/material'

// Dummy data for tabs
const dummyTabs = [
  { key: 'general', label: 'General Preferences' },
  { key: 'internPolicy', label: 'Intern Policy' },
  { key: 'rbac', label: 'RBAC' },
  { key: 'profile', label: 'Profile' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [tabs, setTabs] = useState(dummyTabs);

  // Commented out API call for tabs
  // useEffect(() => {
  //   fetch('/api/settings-tabs')
  //     .then(res => res.json())
  //     .then(data => setTabs(data))
  //     .catch(err => console.error('Error fetching tabs:', err));
  // }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500">All System Settings</p>
          {/*<p className="mt-2 text-sm text-amber-600">Placeholder values only — backend integration is pending.</p>*/}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                activeTab === tab.key
                  ? 'bg-violet-100 text-violet-700 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* GEneral Preferences */}
        <div className="mt-6 space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Appearance</p>
                    <p className="mt-1 text-sm text-slate-500">Customize how your theme looks on your device</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">Light (placeholder)</div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Date and Time Format</p>
                    <p className="mt-1 text-sm text-slate-500">Select your localization</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">YYYY-MM-DD | HH:MM:SS (example)</div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Two-factor Authentication</p>
                      <p className="mt-1 text-sm text-slate-500">Keep your account secure by enabling 2FA via mail</p>
                    </div>
                    <div className="relative inline-flex h-7 w-12 items-center rounded-full bg-slate-200">
                      <span className="absolute left-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200" />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Mobile Push Notifications</p>
                      <p className="mt-1 text-sm text-slate-500">Receive push notification on your device</p>
                    </div>
                    <div className="relative inline-flex h-7 w-12 items-center rounded-full bg-slate-200">
                      <span className="absolute left-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200" />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Desktop Notification</p>
                      <p className="mt-1 text-sm text-slate-500">Receive push notification in desktop</p>
                    </div>
                    <div className="relative inline-flex h-7 w-12 items-center rounded-full bg-slate-200">
                      <span className="absolute left-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200" />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Email Notifications</p>
                      <p className="mt-1 text-sm text-slate-500">Receive email notification for important updates</p>
                    </div>
                    <div className="relative inline-flex h-7 w-12 items-center rounded-full bg-slate-200">
                      <span className="absolute left-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'internPolicy' && (
            <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
              <p className="text-sm text-slate-500">All System Settings</p>
            </div>

            {/* Schedule & Punctuality */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <p className="text-lg font-semibold text-slate-900">Schedule & Punctuality</p>
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex flex-col">
                  <label className="text-sm text-slate-700">Start Time</label>
                  <input type="time" defaultValue="08:00" className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-slate-700">End Time</label>
                  <input type="time" defaultValue="17:00" className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                </div>
              </div>
            </div>

            {/* Grace Period */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
              <p className="text-lg font-semibold text-slate-900">Grace Period</p>
              <input type="number" defaultValue={15} className="rounded-xl border border-slate-300 px-3 py-2 text-sm w-24" />
              <p className="text-sm text-slate-500">Minutes</p>
            </div>

            {/* Maximum Hrs per day */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
              <p className="text-lg font-semibold text-slate-900">Maximum Hours per Day</p>
              <input type="number" defaultValue={8} className="rounded-xl border border-slate-300 px-3 py-2 text-sm w-24" />
              <p className="text-sm text-slate-500">Hours</p>
            </div>

            {/* Working Days */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <p className="text-lg font-semibold text-slate-900">Working Days</p>
              <div className="flex flex-wrap gap-2">
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, idx) => (
                  <button
                    key={day}
                    className={`px-4 py-2 rounded-xl text-sm font-medium ${
                      idx < 5 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
          )}

          {activeTab === 'rbac' && (
             <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
                <p className="text-sm text-slate-500">All System Settings</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-lg font-semibold text-slate-900">Roles and Permission Management</p>
                <p className="mt-2 text-sm text-slate-500">
                  Control access rights for different HR functions.
                </p>

                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-slate-700">
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">View</th>
                        <th className="px-4 py-2">Create</th>
                        <th className="px-4 py-2">Edit</th>
                        <th className="px-4 py-2">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {['Attendance', 'Intern Records', 'Settings', 'Reports'].map((category) => (
                        <tr key={category}>
                          <td className="px-4 py-3 font-medium text-slate-900">{category}</td>
                          {['View', 'Create', 'Edit', 'Delete'].map((perm) => (
                            <td key={perm} className="px-4 py-3">
                              <Switch
                                defaultChecked
                                color="success" // green pag active
                                size="medium"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
                <p className="text-sm text-slate-500">All System Settings</p>
              </div>

              {/* Account Settings */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <p className="text-lg font-semibold text-slate-900">Account Settings</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="text-sm text-slate-700">User Name</label>
                    <input type="text" defaultValue="User Name" className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-slate-700">Email Address</label>
                    <input type="email" defaultValue="HRAdmin@email.com" className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-slate-700">Password</label>
                    <input type="password" defaultValue="••••••••" className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-slate-700">New Password</label>
                    <input type="password" placeholder="Enter new password" className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <p className="text-lg font-semibold text-slate-900">Personal Information</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="text-sm text-slate-700">First Name</label>
                    <input type="text" defaultValue="First Name" className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-slate-700">Last Name</label>
                    <input type="text" defaultValue="Last Name" className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-slate-700">Mobile Number</label>
                    <input type="tel" defaultValue="0912345682" className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-slate-700">Gender</label>
                    <select className="rounded-xl border border-slate-300 px-3 py-2 text-sm">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-slate-700">Date of Birth</label>
                    <input type="date" className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-3">
                <button className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                  Cancel
                </button>
                <button className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                  Save Changes
                </button>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}
