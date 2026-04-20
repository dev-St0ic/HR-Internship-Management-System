import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../../common/components/layout/Header';
import { mockTasks } from '../components/mockTasks';
import TasksBackButton from '../components/tasks/TasksBackButton';
import TasksListPanel from '../components/tasks/TasksListPanel';
import TasksSidebar from '../components/tasks/TasksSidebar';
import TaskWorkspace from '../components/tasks/TaskWorkspace';

export default function Tasks() {
  const location = useLocation();

  const [selectedTaskId, setSelectedTaskId] = useState(location.state?.selectedTaskId ?? mockTasks[0]?.id);
  const [viewMode, setViewMode] = useState('list');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [extraComments, setExtraComments] = useState([]);

  const selectedTask = mockTasks.find((task) => task.id === selectedTaskId);
  const allComments = [...(selectedTask.comments || []), ...extraComments];

  if (!selectedTask) return null;

  const handlePostComment = () => {
    if (!commentText.trim()) return;
    setExtraComments((prev) => [...prev, { id: Date.now(), author: 'You', message: commentText }]);
    setCommentText('');
  };

  return (
    <>
      <Header title="Task" subtitle="Task Management" />
      {viewMode === 'detail' ? <TasksBackButton onClick={() => setViewMode('list')} /> : null}
      <div className="grid grid-cols-3 gap-6 mt-4">
        {viewMode === 'list' ? <TasksListPanel selectedTaskId={selectedTaskId} tasks={mockTasks} onSelect={setSelectedTaskId} /> : <TaskWorkspace selectedTask={selectedTask} uploadedFile={uploadedFile} onClearUpload={() => setUploadedFile(null)} onUpload={setUploadedFile} />}
        <TasksSidebar allComments={allComments} commentText={commentText} onCommentChange={setCommentText} onPostComment={handlePostComment} onShowDetail={() => setViewMode('detail')} selectedTask={selectedTask} viewMode={viewMode} />
      </div>
    </>
  );
}
