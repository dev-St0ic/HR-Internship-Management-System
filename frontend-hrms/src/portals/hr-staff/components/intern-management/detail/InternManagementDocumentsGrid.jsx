export default function InternManagementDocumentsGrid({ documents, viewIcon, downloadIcon, onOpenDocument }) {
  return (
    <div className="intern-management-documents-grid">
      {documents.map((document) => (
        <article key={document.id} className="intern-management-document-card">
          <div className="intern-management-document-copy"><strong>{document.name}</strong>{document.followUp ? <span className="intern-management-follow-up-badge">Follow Up</span> : null}</div>
          <div className="intern-management-row-actions">
            <button type="button" className="intern-management-icon-button" onClick={() => onOpenDocument(document)} aria-label={`Preview ${document.name}`}><img src={viewIcon} alt="" aria-hidden="true" /></button>
            <button type="button" className="intern-management-icon-button" onClick={() => onOpenDocument(document, true)} aria-label={`Download ${document.name}`}><img src={downloadIcon} alt="" aria-hidden="true" /></button>
          </div>
        </article>
      ))}
    </div>
  );
}