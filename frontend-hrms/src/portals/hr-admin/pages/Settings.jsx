import { useState } from 'react';
import { ShieldCheck, User, Lock, Bell, ChevronRight } from 'lucide-react';

// Placeholder-only UI data. Backend integration is not yet available, so these values are static.
const tabs = [
  { key: 'general', label: 'General Preferences' },
  { key: 'internPolicy', label: 'Intern Policy' },
  { key: 'rbac', label: 'RBAC' },
  { key: 'profile', label: 'Profile' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

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

              <div className="grid gap-4 md:grid-cols-2">
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
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-slate-900">Intern Policy</p>
                <p className="mt-2 text-sm text-slate-500">Manage internship eligibility and compliance requirements.</p>
              </div>
            </div>
          )}

          {activeTab === 'rbac' && (
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-slate-900">Role-based Access Control</p>
                <p className="mt-2 text-sm text-slate-500">Assign roles and access rights for your HR team.</p>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-slate-900">Profile</p>
                <p className="mt-2 text-sm text-slate-500">Update your admin account settings and contact details.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
