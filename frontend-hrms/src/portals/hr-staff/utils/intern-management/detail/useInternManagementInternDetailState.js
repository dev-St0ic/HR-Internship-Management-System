import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { actionIconMap, getThemeAsset } from '../../../../../common/config/appIconRegistry';
import { useTheme } from '../../../../../common/theme/ThemeProvider';
import { getInternManagementInternBySlug } from '../../../data/internManagementData';
import { ATTENDANCE_PAGE_SIZE, TASKS_PAGE_SIZE } from './constants';
import { buildPersonalInfoItems, getActiveProfileTab, getSectionFromPathname, getSectionLabel } from './helpers';
import { exportAttendanceCsv } from './pdf';
import { useInternManagementInternPdfCache } from './useInternManagementInternPdfCache';

export function useInternManagementInternDetailState() {
  const { resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { internSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeMonthIndex, setActiveMonthIndex] = useState(0);
  const [attendancePage, setAttendancePage] = useState(1);
  const [monthlyDtrPage, setMonthlyDtrPage] = useState(1);
  const [taskPage, setTaskPage] = useState(1);
  const intern = getInternManagementInternBySlug(internSlug);
  const activeSection = getSectionFromPathname(location.pathname);
  const activePrimarySection = activeSection.startsWith('attendance') ? 'attendance' : activeSection;
  const activeProfileTab = getActiveProfileTab(searchParams.get('tab'));
  const { handleOpenDocument } = useInternManagementInternPdfCache(intern);
  const activeMonth = intern?.attendanceMonths[activeMonthIndex] ?? intern?.attendanceMonths[intern?.attendanceMonths.length - 1] ?? null;
  const icons = { backIcon: getThemeAsset(actionIconMap.back, resolvedTheme), downloadIcon: getThemeAsset(actionIconMap.download, resolvedTheme), emptyStarIcon: getThemeAsset(actionIconMap['star-outline'], resolvedTheme), exportAttendanceIcon: getThemeAsset(actionIconMap['export-attendance'], resolvedTheme), filledStarIcon: getThemeAsset(actionIconMap['star-filled'], resolvedTheme), monthlyDtrIcon: getThemeAsset(actionIconMap['monthly-dtr'], resolvedTheme), viewIcon: getThemeAsset(actionIconMap.view, resolvedTheme) };

  useEffect(() => { setActiveMonthIndex(Math.max(0, (intern?.attendanceMonths.length ?? 1) - 1)); }, [internSlug, intern?.attendanceMonths.length]);
  useEffect(() => { setAttendancePage(1); setMonthlyDtrPage(1); setTaskPage(1); }, [internSlug, activeMonthIndex]);

  const attendanceTotalPages = Math.max(1, Math.ceil((activeMonth?.entries.length ?? 0) / ATTENDANCE_PAGE_SIZE));
  const monthlyDtrTotalPages = Math.max(1, Math.ceil((activeMonth?.entries.length ?? 0) / ATTENDANCE_PAGE_SIZE));
  const tasksTotalPages = Math.max(1, Math.ceil((intern?.tasks.length ?? 0) / TASKS_PAGE_SIZE));
  const paginatedAttendanceEntries = activeMonth?.entries.slice((attendancePage - 1) * ATTENDANCE_PAGE_SIZE, attendancePage * ATTENDANCE_PAGE_SIZE) ?? [];
  const paginatedMonthlyDtrEntries = activeMonth?.entries.slice((monthlyDtrPage - 1) * ATTENDANCE_PAGE_SIZE, monthlyDtrPage * ATTENDANCE_PAGE_SIZE) ?? [];
  const paginatedTasks = intern?.tasks.slice((taskPage - 1) * TASKS_PAGE_SIZE, taskPage * TASKS_PAGE_SIZE) ?? [];
  const attendanceEmptyRowCount = activeMonth?.entries.length ? Math.max(0, ATTENDANCE_PAGE_SIZE - paginatedAttendanceEntries.length) : 0;
  const monthlyDtrEmptyRowCount = activeMonth?.entries.length ? Math.max(0, ATTENDANCE_PAGE_SIZE - paginatedMonthlyDtrEntries.length) : 0;
  const taskEmptyRowCount = intern?.tasks.length ? Math.max(0, TASKS_PAGE_SIZE - paginatedTasks.length) : 0;

  return {
    intern, navigate, resolvedTheme, activeSection, activePrimarySection, activeProfileTab, activeMonthIndex, setActiveMonthIndex, attendancePage, setAttendancePage, monthlyDtrPage, setMonthlyDtrPage, taskPage, setTaskPage, activeMonth, attendanceTotalPages, monthlyDtrTotalPages, tasksTotalPages, paginatedAttendanceEntries, paginatedMonthlyDtrEntries, paginatedTasks, attendanceEmptyRowCount, monthlyDtrEmptyRowCount, taskEmptyRowCount, subtitleSummary: intern ? `${intern.name} : ${getSectionLabel(activeSection)}` : '', personalInfoItems: intern ? buildPersonalInfoItems(intern) : [], handleOpenDocument, handleSelectProfileTab: (tabKey) => setSearchParams(tabKey === 'documents' ? { tab: 'documents' } : {}), handleExportAttendance: () => intern && activeMonth && exportAttendanceCsv(intern, activeMonth), ...icons,
  };
}