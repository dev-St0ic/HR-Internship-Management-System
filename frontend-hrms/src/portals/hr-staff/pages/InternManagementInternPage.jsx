import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, NavLink, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import EmployeeAvatar from '../components/staff-management/EmployeeAvatar';
import NotificationIcon from '../components/staff-management/NotificationIcon';
import PaginationControls from '../components/staff-management/PaginationControls';
import {
  actionIconMap,
  getThemeAsset,
  hrStaffInternProfileTabIconMap,
  hrStaffInternViewSectionIconMap,
} from '../../../common/config/appIconRegistry';
import { useTheme } from '../../../common/theme/ThemeProvider';
import {
  getInternManagementInternBySlug,
  internManagementProfileTabs,
  internManagementSectionTabs,
} from '../data/internManagementData';
import '../../../assets/styles/staff-management.css';
import '../../../assets/styles/intern-management.css';

const sectionIconMap = hrStaffInternViewSectionIconMap;

const profileTabIconMap = hrStaffInternProfileTabIconMap;

const evaluationIconMap = {
  'work-quality': actionIconMap['work-quality'],
  communication: actionIconMap.communication,
  initiative: actionIconMap.initiative,
  attendance: actionIconMap.attendance,
  professionalism: actionIconMap.professionalism,
};

const ATTENDANCE_PAGE_SIZE = 7;
const TASKS_PAGE_SIZE = 7;

function escapePdfText(value) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function buildSamplePdf(intern, documentName) {
  const lines = [
    'Intern Document Preview',
    `Document: ${documentName}`,
    `Intern: ${intern.name}`,
    `University: ${intern.university}`,
    `Department: ${intern.department}`,
    `Supervisor: ${intern.supervisorName}`,
  ];

  const contentStream = [
    'BT',
    '/F1 16 Tf',
    '50 760 Td',
    ...lines.flatMap((line, index) => [
      `${index === 0 ? '' : '0 -24 Td'} (${escapePdfText(line)}) Tj`.trim(),
    ]),
    'ET',
  ].join('\n');

  const pdfParts = [
    '%PDF-1.4',
    '1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj',
    '2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj',
    '3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 4 0 R>>>>/Contents 5 0 R>>endobj',
    '4 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj',
    `5 0 obj<</Length ${contentStream.length}>>stream\n${contentStream}\nendstream\nendobj`,
  ];

  let offset = 0;
  const objects = pdfParts.map((part) => {
    const entry = { offset, content: `${part}\n` };
    offset += entry.content.length;
    return entry;
  });

  const xrefOffset = offset;
  const xrefEntries = ['0000000000 65535 f ', ...objects.map((object) => `${String(object.offset).padStart(10, '0')} 00000 n `)];
  const pdf = `${objects.map((object) => object.content).join('')}xref\n0 ${objects.length + 1}\n${xrefEntries.join('\n')}\ntrailer<</Size ${objects.length + 1}/Root 1 0 R>>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function exportAttendanceCsv(intern, month) {
  const rows = [
    ['Intern Name', intern.name],
    ['Month', month.label],
    [],
    ['Date', 'Check In', 'Check Out', 'Break', 'Working Hours', 'Status'],
    ...month.entries.map((entry) => [
      entry.date,
      entry.checkIn,
      entry.checkOut,
      entry.breakDuration,
      entry.workingHours,
      entry.status,
    ]),
  ];

  const csvContent = rows.map((row) => row.join(',')).join('\n');
  downloadBlob(new Blob([csvContent], { type: 'text/csv;charset=utf-8' }), `${intern.name.replace(/\s+/g, '_')}_${month.label.replace(/\s+/g, '_')}.csv`);
}

function getSectionFromPathname(pathname) {
  if (pathname.includes('/attendance/monthly-dtr')) {
    return 'attendance-monthly-dtr';
  }

  if (pathname.includes('/attendance')) {
    return 'attendance';
  }

  if (pathname.includes('/tasks')) {
    return 'tasks';
  }

  if (pathname.includes('/evaluation')) {
    return 'evaluation';
  }

  return 'profile';
}

function DetailHero({ intern }) {
  return (
    <div className="intern-management-detail-hero">
      <EmployeeAvatar
        src={intern.avatar}
        alt={intern.name}
        name={intern.name}
        size={68}
        className="intern-management-detail-avatar"
      />
      <div>
        <h3>{intern.name}</h3>
        <p>{intern.email}</p>
      </div>
    </div>
  );
}

export default function InternManagementInternPage() {
  const { resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { internSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const pdfUrlCacheRef = useRef(new Map());
  const [activeMonthIndex, setActiveMonthIndex] = useState(2);
  const [attendancePage, setAttendancePage] = useState(1);
  const [monthlyDtrPage, setMonthlyDtrPage] = useState(1);
  const [taskPage, setTaskPage] = useState(1);
  const backIcon = getThemeAsset(actionIconMap.back, resolvedTheme);
  const downloadIcon = getThemeAsset(actionIconMap.download, resolvedTheme);
  const emptyStarIcon = getThemeAsset(actionIconMap['star-outline'], resolvedTheme);
  const exportAttendanceIcon = getThemeAsset(actionIconMap['export-attendance'], resolvedTheme);
  const filledStarIcon = getThemeAsset(actionIconMap['star-filled'], resolvedTheme);
  const monthlyDtrIcon = getThemeAsset(actionIconMap['monthly-dtr'], resolvedTheme);
  const viewIcon = getThemeAsset(actionIconMap.view, resolvedTheme);

  const intern = useMemo(() => getInternManagementInternBySlug(internSlug), [internSlug]);
  const activeSection = getSectionFromPathname(location.pathname);
  const activePrimarySection = activeSection.startsWith('attendance') ? 'attendance' : activeSection;
  const activeProfileTab = searchParams.get('tab') === 'documents' ? 'documents' : 'personal-information';

  useEffect(() => {
    return () => {
      pdfUrlCacheRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      pdfUrlCacheRef.current.clear();
    };
  }, []);

  useEffect(() => {
    setActiveMonthIndex(2);
  }, [internSlug]);

  useEffect(() => {
    setAttendancePage(1);
    setMonthlyDtrPage(1);
    setTaskPage(1);
  }, [internSlug, activeMonthIndex]);

  if (!intern) {
    return <Navigate to="/hr-staff/intern-management" replace />;
  }

  const activeMonth = intern.attendanceMonths[activeMonthIndex] ?? intern.attendanceMonths[intern.attendanceMonths.length - 1];
  const attendanceTotalPages = Math.max(1, Math.ceil(activeMonth.entries.length / ATTENDANCE_PAGE_SIZE));
  const paginatedAttendanceEntries = activeMonth.entries.slice(
    (attendancePage - 1) * ATTENDANCE_PAGE_SIZE,
    attendancePage * ATTENDANCE_PAGE_SIZE,
  );
  const attendanceEmptyRowCount = activeMonth.entries.length > 0
    ? Math.max(0, ATTENDANCE_PAGE_SIZE - paginatedAttendanceEntries.length)
    : 0;
  const monthlyDtrTotalPages = Math.max(1, Math.ceil(activeMonth.entries.length / ATTENDANCE_PAGE_SIZE));
  const paginatedMonthlyDtrEntries = activeMonth.entries.slice(
    (monthlyDtrPage - 1) * ATTENDANCE_PAGE_SIZE,
    monthlyDtrPage * ATTENDANCE_PAGE_SIZE,
  );
  const monthlyDtrEmptyRowCount = activeMonth.entries.length > 0
    ? Math.max(0, ATTENDANCE_PAGE_SIZE - paginatedMonthlyDtrEntries.length)
    : 0;
  const tasksTotalPages = Math.max(1, Math.ceil(intern.tasks.length / TASKS_PAGE_SIZE));
  const paginatedTasks = intern.tasks.slice(
    (taskPage - 1) * TASKS_PAGE_SIZE,
    taskPage * TASKS_PAGE_SIZE,
  );
  const taskEmptyRowCount = intern.tasks.length > 0
    ? Math.max(0, TASKS_PAGE_SIZE - paginatedTasks.length)
    : 0;

  let activeSectionLabel = 'Profile';

  if (activeSection === 'attendance-monthly-dtr') {
    activeSectionLabel = 'Attendance : Monthly DTR';
  } else if (activePrimarySection === 'attendance') {
    activeSectionLabel = 'Attendance';
  } else if (activePrimarySection === 'tasks') {
    activeSectionLabel = 'Tasks';
  } else if (activePrimarySection === 'evaluation') {
    activeSectionLabel = 'Evaluation';
  }

  const subtitleSummary = `${intern.name} : ${activeSectionLabel}`;

  const personalInfoItems = [
    { label: 'First Name', value: intern.firstName },
    { label: 'Last Name', value: intern.lastName },
    { label: 'Mobile Number', value: intern.phoneNumber },
    { label: 'Email Address', value: intern.email },
    { label: 'Date of Birth', value: intern.dateOfBirth },
    { label: 'Gender', value: intern.gender },
    { label: 'University', value: intern.university },
    { label: 'Program', value: intern.program },
    { label: 'OJT Hours', value: `${intern.requiredHours} Hours` },
    { label: 'Address', value: intern.address },
    { label: 'City', value: intern.city },
    { label: 'Zip Code', value: intern.zipCode },
  ];

  const handleOpenDocument = (document, download = false) => {
    let pdfUrl = pdfUrlCacheRef.current.get(document.id);

    if (!pdfUrl) {
      pdfUrl = URL.createObjectURL(buildSamplePdf(intern, document.name));
      pdfUrlCacheRef.current.set(document.id, pdfUrl);
    }

    if (download) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = document.name;
      link.click();
      return;
    }

    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="staff-management-layout">
      <aside className="sidebar">{/* layout handled by parent */}</aside>
      <main className="main-content intern-management-detail-page-content">
        <div className="header-row">
          <div>
            <h2>{intern.name}</h2>
            <div className="subtitle">
              <Link className="subtitle-link" to="/hr-staff/intern-management">Intern Management</Link>
              <span className="subtitle-separator"> &gt; </span>
              <span>{subtitleSummary}</span>
            </div>
          </div>
          <NotificationIcon />
        </div>

        <section className="intern-management-detail-card">
          <DetailHero intern={intern} />

          <div className="intern-management-detail-body">
            <nav className="intern-management-side-nav" aria-label="Intern detail sections">
              {internManagementSectionTabs.map((section) => (
                <NavLink
                  key={section.key}
                  to={section.key === 'profile'
                    ? `/hr-staff/intern-management/intern/${intern.slug}/profile`
                    : `/hr-staff/intern-management/intern/${intern.slug}/${section.key}`}
                  className={({ isActive }) => `intern-management-side-link ${isActive ? 'is-active' : ''}`}
                >
                  {({ isActive }) => (
                    <>
                      <img
                        src={isActive ? sectionIconMap[section.key].selected : getThemeAsset(sectionIconMap[section.key].unselected, resolvedTheme)}
                        alt=""
                        aria-hidden="true"
                      />
                      <span>{section.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="intern-management-detail-panel">
              {activePrimarySection === 'profile' && (
                <>
                  <div className="intern-management-subtabs" role="tablist" aria-label="Profile detail tabs">
                    {internManagementProfileTabs.map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        className={`intern-management-subtab ${activeProfileTab === tab.key ? 'is-active' : ''}`}
                        aria-selected={activeProfileTab === tab.key}
                        onClick={() => setSearchParams(tab.key === 'documents' ? { tab: 'documents' } : {})}
                      >
                        <img src={getThemeAsset(profileTabIconMap[tab.key], resolvedTheme)} alt="" aria-hidden="true" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {activeProfileTab === 'personal-information' ? (
                    <div className="intern-management-info-grid">
                      {personalInfoItems.map((item) => (
                        <div key={item.label} className="intern-management-info-item">
                          <span>{item.label}</span>
                          <strong>{item.value}</strong>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="intern-management-documents-grid">
                      {intern.documents.map((document) => (
                        <article key={document.id} className="intern-management-document-card">
                          <div className="intern-management-document-copy">
                            <strong>{document.name}</strong>
                            {document.followUp && <span className="intern-management-follow-up-badge">Follow Up</span>}
                          </div>
                          <div className="intern-management-row-actions">
                            <button
                              type="button"
                              className="intern-management-icon-button"
                              onClick={() => handleOpenDocument(document)}
                              aria-label={`Preview ${document.name}`}
                            >
                              <img src={viewIcon} alt="" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              className="intern-management-icon-button"
                              onClick={() => handleOpenDocument(document, true)}
                              aria-label={`Download ${document.name}`}
                            >
                              <img src={downloadIcon} alt="" aria-hidden="true" />
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeSection === 'attendance' && (
                <>
                  <div className="intern-management-table-scroll-shell">
                    <table className="intern-management-table intern-management-detail-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Check In</th>
                          <th>Check Out</th>
                          <th>Break</th>
                          <th>Working Hours</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedAttendanceEntries.map((entry) => (
                          <tr key={entry.id}>
                            <td>{entry.date}</td>
                            <td>{entry.checkIn}</td>
                            <td>{entry.checkOut}</td>
                            <td>{entry.breakDuration}</td>
                            <td>{entry.workingHours}</td>
                            <td>
                              <span className={`intern-management-status-pill is-${entry.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                {entry.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {Array.from({ length: attendanceEmptyRowCount }, (_, index) => (
                          <tr key={`attendance-empty-row-${index}`} className="intern-management-detail-placeholder-row" aria-hidden="true">
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {attendanceTotalPages > 1 && (
                    <PaginationControls
                      currentPage={attendancePage}
                      totalPages={attendanceTotalPages}
                      onPageChange={setAttendancePage}
                      className="intern-management-detail-pagination"
                    />
                  )}

                  <div className="intern-management-detail-actions">
                    <button
                      type="button"
                      className="intern-management-secondary-button"
                      onClick={() => navigate(`/hr-staff/intern-management/intern/${intern.slug}/attendance/monthly-dtr`)}
                    >
                      <img src={monthlyDtrIcon} alt="" aria-hidden="true" />
                      <span>View Monthly DTR</span>
                    </button>
                    <button
                      type="button"
                      className="intern-management-primary-button"
                      onClick={() => exportAttendanceCsv(intern, activeMonth)}
                    >
                      <img src={exportAttendanceIcon} alt="" aria-hidden="true" />
                      <span>Export Attendance</span>
                    </button>
                  </div>
                </>
              )}

              {activeSection === 'attendance-monthly-dtr' && (
                <>
                  <div className="intern-management-month-nav">
                    <button
                      type="button"
                      className="intern-management-month-arrow"
                      onClick={() => setActiveMonthIndex((current) => Math.max(0, current - 1))}
                      disabled={activeMonthIndex === 0}
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <h3>{activeMonth.label}</h3>
                    <button
                      type="button"
                      className="intern-management-month-arrow"
                      onClick={() => setActiveMonthIndex((current) => Math.min(intern.attendanceMonths.length - 1, current + 1))}
                      disabled={activeMonthIndex === intern.attendanceMonths.length - 1}
                      aria-label="Next month"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="intern-management-table-scroll-shell">
                    <table className="intern-management-table intern-management-detail-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Check In</th>
                          <th>Check Out</th>
                          <th>Break</th>
                          <th>Working Hours</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedMonthlyDtrEntries.map((entry) => (
                          <tr key={`${activeMonth.label}-${entry.id}`}>
                            <td>{entry.date}</td>
                            <td>{entry.checkIn}</td>
                            <td>{entry.checkOut}</td>
                            <td>{entry.breakDuration}</td>
                            <td>{entry.workingHours}</td>
                            <td>
                              <span className={`intern-management-status-pill is-${entry.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                {entry.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {Array.from({ length: monthlyDtrEmptyRowCount }, (_, index) => (
                          <tr key={`monthly-dtr-empty-row-${index}`} className="intern-management-detail-placeholder-row" aria-hidden="true">
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {monthlyDtrTotalPages > 1 && (
                    <PaginationControls
                      currentPage={monthlyDtrPage}
                      totalPages={monthlyDtrTotalPages}
                      onPageChange={setMonthlyDtrPage}
                      className="intern-management-detail-pagination"
                    />
                  )}

                  <div className="intern-management-month-footer">
                    <p>
                      <strong>Remaining Hours :</strong> {activeMonth.remainingHours} Hours
                    </p>
                    <button
                      type="button"
                      className="intern-management-primary-button intern-management-back-button"
                      onClick={() => navigate(`/hr-staff/intern-management/intern/${intern.slug}/attendance`)}
                    >
                      <img src={backIcon} alt="" aria-hidden="true" />
                      <span>Back</span>
                    </button>
                  </div>
                </>
              )}

              {activePrimarySection === 'tasks' && (
                <div className="intern-management-table-scroll-shell">
                  <table className="intern-management-table intern-management-detail-table">
                    <thead>
                      <tr>
                        <th>Tasks</th>
                        <th>Date Given</th>
                        <th>Deadline</th>
                        <th>Priority</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedTasks.map((task) => (
                        <tr key={task.id}>
                          <td>{task.title}</td>
                          <td>{task.dateGiven}</td>
                          <td>{task.deadline}</td>
                          <td>{task.priority}</td>
                          <td>{task.status}</td>
                        </tr>
                      ))}
                      {Array.from({ length: taskEmptyRowCount }, (_, index) => (
                        <tr key={`task-empty-row-${index}`} className="intern-management-detail-placeholder-row" aria-hidden="true">
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activePrimarySection === 'tasks' && (
                <div className="intern-management-detail-pagination-slot" aria-hidden={tasksTotalPages <= 1}>
                  {tasksTotalPages > 1 && (
                    <PaginationControls
                      currentPage={taskPage}
                      totalPages={tasksTotalPages}
                      onPageChange={setTaskPage}
                      className="intern-management-detail-pagination"
                    />
                  )}
                </div>
              )}

              {activePrimarySection === 'evaluation' && (
                <article className="intern-management-evaluation-card">
                  <div className="intern-management-evaluation-header">
                    <div>
                      <h3>Intern Performance Evaluation</h3>
                      <p>Evaluated By: {intern.evaluation.evaluatorName}</p>
                    </div>
                    <span className="intern-management-status-pill is-completed">{intern.evaluation.status}</span>
                  </div>

                  <div className="intern-management-evaluation-rows">
                    {intern.evaluation.criteria.map((criterion) => (
                      <div key={criterion.key} className="intern-management-evaluation-row">
                        <div className="intern-management-evaluation-label">
                          <img src={getThemeAsset(evaluationIconMap[criterion.key], resolvedTheme)} alt="" aria-hidden="true" />
                          <span>{criterion.label}</span>
                        </div>
                        <div className="intern-management-stars" aria-label={`${criterion.rating} out of 5`}>
                          {Array.from({ length: 5 }, (_, starIndex) => (
                            <img
                              key={`${criterion.key}-${starIndex + 1}`}
                              src={starIndex < criterion.rating ? filledStarIcon : emptyStarIcon}
                              alt=""
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="intern-management-comments-box">
                    <strong>Supervisor Comments</strong>
                    <p>{intern.evaluation.comment}</p>
                  </div>

                  <div className="intern-management-evaluation-footer">
                    <strong>Total: {intern.evaluation.totalScore}/25</strong>
                    <span>{intern.evaluation.scoreLabel}</span>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}