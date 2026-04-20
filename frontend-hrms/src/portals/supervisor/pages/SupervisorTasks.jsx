import { useState } from 'react';

import CreateTaskModal from '../components/CreateTaskModal';
import SupervisorTasksTable from '../components/SupervisorTasksTable';
import SupervisorTasksToolbar from '../components/SupervisorTasksToolbar';
import { supervisorTasks, taskInternOptions } from '../data/taskData';

export default function SupervisorTasks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SupervisorTasksToolbar onOpenModal={() => setIsOpen(true)} />
      <CreateTaskModal isOpen={isOpen} internOptions={taskInternOptions} onClose={() => setIsOpen(false)} />
      <SupervisorTasksTable tasks={supervisorTasks} />
    </>
  );
}