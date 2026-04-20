import InternManagementDocumentsGrid from './InternManagementDocumentsGrid';
import InternManagementPersonalInfoGrid from './InternManagementPersonalInfoGrid';
import InternManagementProfileTabs from './InternManagementProfileTabs';

export default function InternManagementProfileSection({ activeProfileTab, resolvedTheme, personalInfoItems, documents, viewIcon, downloadIcon, onSelectProfileTab, onOpenDocument }) {
  return (
    <>
      <InternManagementProfileTabs activeProfileTab={activeProfileTab} resolvedTheme={resolvedTheme} onSelectProfileTab={onSelectProfileTab} />
      {activeProfileTab === 'personal-information' ? <InternManagementPersonalInfoGrid items={personalInfoItems} /> : <InternManagementDocumentsGrid documents={documents} viewIcon={viewIcon} downloadIcon={downloadIcon} onOpenDocument={onOpenDocument} />}
    </>
  );
}