import { Upload } from "lucide-react";
import { useState, useRef } from "react";

export default function DragDropUpload({
  label = "Upload File",
  onUpload,
  accept = "*",
  multiple = false,
}) {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (fileList) => {
    if (!fileList || fileList.length === 0) return;

    const selectedFiles = multiple ? Array.from(fileList) : [fileList[0]];

    setFiles(selectedFiles);

    if (onUpload) {
      onUpload(multiple ? selectedFiles : selectedFiles[0]);
    }
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
          handleFile(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current.click()}
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
        <p className="text-xs text-gray-400">
          Supported formats: {accept === "*" ? "All files" : accept}
        </p>

        {/* File Preview */}
        {files.length > 0 && (
          <div className="mt-3 space-y-1">
            {files.map((f, index) => (
              <p key={index} className="text-sm text-green-600">
                {f.name}
              </p>
            ))}
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFile(e.target.files)}
        />
      </div>
    </div>
  );
}
