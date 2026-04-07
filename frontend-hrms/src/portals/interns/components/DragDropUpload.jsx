import { Upload } from "lucide-react";
import { useState } from "react";

export default function DragDropUpload({ label }) {
  const [files, setFiles] = useState([null]);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (selectedFile) => {
    setFiles(selectedFile);
  };

  return (
    <div className="space-y-2">
      {/* Label */}
      <p className="text-sm font-medium">{label}</p>

      {/* Drop Zone */}
      <div
        className={`border-2 border-dotted rounded-lg p-6 text-center cursor-pointer transition
            ${dragActive ? "bg-gray-100 border-gray-400" : "border-violet-400"}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        onClick={() => document.getElementById(label).click()}
      >
        {/* Icon */}
        <div className="flex justify-center mb-2">
          <div className="bg-violet-500 text-white p-2 rounded">
            <Upload size={18} />
          </div>
        </div>

        {/* Text */}
        <p className="text-sm">
          Drag & drop or <span className="underline">choose file</span>
        </p>
        <p className="text-xs text-gray-400">Supported formats: JPG, PDF</p>

        {/* File name */}
        {files && <p className="mt-2 text-sm text-green-600">{files.name}</p>}

        {/* Hidden File Input */}
        <input
          id={label}
          type="file"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
    </div>
  );
}
