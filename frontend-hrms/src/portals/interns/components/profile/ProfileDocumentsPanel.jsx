import { Download, Eye } from 'lucide-react';

import DragDropUpload from '../DragDropUpload';

export default function ProfileDocumentsPanel({ files }) {
  return (
    <div className="space-y-4"><div className="grid grid-cols-2 gap-4">{files.map((file) => <div key={file} className="flex justify-between items-center border border-gray-100 px-4 py-3 rounded-lg"><span className="text-sm">{file}</span><div className="flex gap-2"><button className="p-1 hover:bg-gray-100 rounded"><Eye size={16} /></button><button className="p-1 hover:bg-gray-100 rounded"><Download size={16} /></button></div></div>)}</div><DragDropUpload label="Upload Missing Files" /></div>
  );
}