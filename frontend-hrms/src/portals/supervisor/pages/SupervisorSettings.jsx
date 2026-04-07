import { useState } from "react";
import { Settings, User } from "lucide-react";

export default function SupervisorSettings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="border border-gray-500/20 rounded-lg p-4">

      <div className="border-b border-gray-300">
        <ul className="flex text-sm font-medium text-gray-500">

          <li className="mr-2">
            <button
              onClick={() => setActiveTab("general")}
              className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${activeTab === "general"
                ? "text-violet-600 border-violet-600"
                : "border-transparent hover:text-violet-600 hover:border-violet-600"
                }`}
            >
              <Settings className="mr-2" size={18} />
              General Preferences
            </button>
          </li>

          <li className="mr-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${activeTab === "profile"
                ? "text-violet-600 border-violet-600"
                : "border-transparent hover:text-violet-600 hover:border-violet-600"
                }`}
            >
              <User className="mr-2" size={18} />
              Profile
            </button>
          </li>

        </ul>
      </div>

      <div className="border border-gray-500/20 rounded-lg p-5 mt-5">

        {activeTab === "general" && (
          <div className="divide-y divide-gray-300">

            <div className='flex justify-between items-center py-5'>
              <div>
                <h1 className="font-semibold">Appearance</h1>
                <span className="text-gray-500">Customize how your theme looks</span>
              </div>
              <select className="bg-[#A2A1A81A] p-2 rounded-lg border-0">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>

            <div className='flex justify-between items-center py-5'>
              <div>
                <h1 className="font-semibold">Date and Time Format</h1>
                <span className="text-gray-500">Select your localization</span>
              </div>
              <select className="bg-[#A2A1A81A] p-2 rounded-lg border-0">
                <option>YYYY-MM-DD | HH:MM:SS</option>
                <option>DD-MM-YY | SS:MM:HH</option>
              </select>
            </div>

            <div className='flex justify-between items-center border-b border-gray-300 py-5'>
              <div>
                <h1 className="font-semibold">Two-Factor Authentication</h1>
                <span className="text-gray-500">Keep your account secure with 2FA via mail</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-16 h-8 bg-slate-300 rounded-full peer-checked:bg-[#1BCB3E] transition-colors"></div>
                <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-8"></span>
              </label>
            </div>

            <div className='flex justify-between items-center border-b border-gray-300 py-5'>
              <div>
                <h1 className="font-semibold">Mobile Push Notifications</h1>
                <span className="text-gray-500">Receive push notification</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-16 h-8 bg-slate-300 rounded-full peer-checked:bg-[#1BCB3E] transition-colors"></div>
                <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-8"></span>
              </label>
            </div>

            <div className='flex justify-between items-center border-b border-gray-300 py-5'>
              <div>
                <h1 className="font-semibold">Desktop Notification</h1>
                <span className="text-gray-500">Receive push notifications in desktop</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-16 h-8 bg-slate-300 rounded-full peer-checked:bg-[#1BCB3E] transition-colors"></div>
                <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-8"></span>
              </label>
            </div>

            <div className='flex justify-between items-center border-b border-gray-300 py-5'>
              <div>
                <h1 className="font-semibold">Email Notifications</h1>
                <span className="text-gray-500">Receive email notification</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-16 h-8 bg-slate-300 rounded-full peer-checked:bg-[#1BCB3E] transition-colors"></div>
                <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-8"></span>
              </label>
            </div>

          </div>
        )}

        {activeTab === "profile" && (
          <div className="divide-y divide-gray-300">
            <div className='items-center py-5'>
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Account Settings</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label class="block text-sm text-gray-500 mb-1">User Name</label>
                  <input type="text" placeholder="User Name"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2" />
                </div>
                <div>
                  <label class="block text-sm text-gray-500 mb-1">Email Address</label>
                  <input type="email" placeholder="Supervisor@email.com"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                </div>
                <div>
                  <label class="block text-sm text-gray-500 mb-1">Password</label>
                  <input type="password" placeholder="Password"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                </div>
                <div>
                  <label class="block text-sm text-gray-500 mb-1">New Password</label>
                  <input type="password" placeholder="New Password"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2" />
                </div>
              </div>
            </div>

            <div className="border-gray-30 py-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm text-gray-500 mb-1">First Name</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Last Name</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Mobile Number</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Gender</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
                  <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>

              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600">
                  Cancel
                </button>
                <button className="px-4 py-2 text-white rounded-lg bg-[#7C3EFF]">
                  Save Changes
                </button>
              </div>

            </div>
          </div>

        )}

      </div>
    </div>
  );
}