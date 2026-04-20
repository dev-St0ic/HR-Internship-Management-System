import DragDropUpload from '../DragDropUpload';

export default function TaskWorkspace({ selectedTask, uploadedFile, onClearUpload, onUpload }) {
  return (
    <div className="col-span-2 space-y-5"><div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"><h2 className="text-xl font-bold">{selectedTask.title}</h2><p className="text-gray-500 mt-2">{selectedTask.description}</p><div className="mt-5"><h3 className="font-semibold mb-3">Upload Report</h3><DragDropUpload onUpload={onUpload} />{uploadedFile ? <div className="mt-3 flex justify-between items-center bg-gray-200 p-2 rounded"><span>{uploadedFile.name}</span><button onClick={onClearUpload} className="text-red-500">✕</button></div> : null}<button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg">Submit Work</button></div></div></div>
  );
}