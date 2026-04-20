import { evaluationCriteriaLabels, evaluationStatusOptions } from './constants';
import { attendanceTemplate, documentTemplates, evaluationTemplates, extraTaskTemplatesByIntern, monthlyLabels, taskTemplates } from './templateData';
import { formatLongDate, formatMonthDate } from './helpers';

export function buildAttendanceMonths(index) {
  return monthlyLabels.map((label, monthIndex) => ({
    label,
    remainingHours: String(Math.max(40, 210 - index * 3 - monthIndex * 18)),
    entries: attendanceTemplate.map((entry, entryIndex) => ({
      id: `${monthIndex + 1}-${entry.day}`,
      date: formatMonthDate(monthIndex + 4, entry.day + (entryIndex % 2)),
      checkIn: entry.checkIn,
      checkOut: entry.checkOut,
      breakDuration: entry.breakDuration,
      workingHours: entry.workingHours,
      status: entry.status,
    })),
  }));
}

export const buildDocuments = (index) => documentTemplates.map((document, documentIndex) => ({
  id: `${document.key}-${documentIndex + 1}`,
  name: document.name,
  followUp: documentIndex === 0 && index % 2 === 0,
}));

export function buildTasks(startedAt, index, internName) {
  const startedAtDate = new Date(startedAt);
  return [...taskTemplates, ...(extraTaskTemplatesByIntern[internName] ?? [])].map((task, taskIndex) => {
    const givenDate = new Date(startedAtDate);
    const deadlineDate = new Date(startedAtDate);
    givenDate.setDate(givenDate.getDate() + taskIndex * 3);
    deadlineDate.setDate(deadlineDate.getDate() + taskIndex * 7 + 5);

    return {
      id: `${task.title.toLowerCase().replace(/\s+/g, '-')}-${taskIndex + 1}`,
      title: task.title,
      dateGiven: formatLongDate(givenDate.toISOString()),
      deadline: formatLongDate(deadlineDate.toISOString()),
      priority: task.priority,
      status: task.status,
    };
  });
}

export function buildEvaluation(index) {
  const template = evaluationTemplates[index % evaluationTemplates.length];
  const criteria = evaluationCriteriaLabels.map((label, criteriaIndex) => ({ key: label.toLowerCase().replace(/\s+/g, '-'), label, rating: template.criteria[criteriaIndex] }));
  const totalScore = criteria.reduce((total, item) => total + item.rating, 0);
  return { evaluatorName: template.evaluatorName, status: evaluationStatusOptions[index % evaluationStatusOptions.length], comment: template.comment, totalScore, scoreLabel: totalScore >= 22 ? 'GOOD' : 'FAIR', criteria };
}