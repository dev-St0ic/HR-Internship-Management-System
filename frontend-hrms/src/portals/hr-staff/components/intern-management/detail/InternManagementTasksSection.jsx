import { taskTableColumns } from '../../../utils/intern-management/detail/constants';
import InternManagementDetailTable from './InternManagementDetailTable';

export default function InternManagementTasksSection({ tasks, emptyRowCount, currentPage, totalPages, onPageChange }) {
  return <InternManagementDetailTable columns={taskTableColumns} rows={tasks} emptyRowCount={emptyRowCount} totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} usePaginationSlot renderRow={(task) => <tr key={task.id}><td>{task.title}</td><td>{task.dateGiven}</td><td>{task.deadline}</td><td>{task.priority}</td><td>{task.status}</td></tr>} />;
}