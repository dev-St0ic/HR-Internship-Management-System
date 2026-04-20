import { useState } from 'react';

import Header from '../../../common/components/layout/Header';
import ProfileDocumentsPanel from '../components/profile/ProfileDocumentsPanel';
import ProfileInfoGrid from '../components/profile/ProfileInfoGrid';
import ProfileSummaryCard from '../components/profile/ProfileSummaryCard';
import ProfileTabs from '../components/profile/ProfileTabs';
import { documentFiles, personalInformation, profileTabs, profileUser, schoolInformation } from '../data/profileData';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <>
      <Header title="Profile" subtitle="Profile Overview" />
      <div className="p-6">
        <div className="bg-white rounded-xl shadow p-6">
          <ProfileSummaryCard user={profileUser} />
          <ProfileTabs activeTab={activeTab} onChange={setActiveTab} tabs={profileTabs} />
          <div className="mt-6">
            {activeTab === 'personal' ? <ProfileInfoGrid items={personalInformation} /> : null}
            {activeTab === 'school' ? <ProfileInfoGrid items={schoolInformation} /> : null}
            {activeTab === 'documents' ? <ProfileDocumentsPanel files={documentFiles} /> : null}
          </div>
        </div>
      </div>
    </>
  );
}
