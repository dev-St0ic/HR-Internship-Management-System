import { useState } from "react";
import { CirclePlus } from "lucide-react";

export default function FileUpload({ onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition
        ${isDragging ? "border-[#7C3EFF] bg-purple-50" : "border-purple-400"}
      `}
    >
      <div className="bg-[#7C3EFF] text-white p-3 rounded-full mb-3">
        <CirclePlus size={20} />
      </div>

      {fileName ? (
        <p className="text-sm text-gray-700 font-medium">{fileName}</p>
      ) : (
        <>
          <p className="text-sm text-gray-600">
            Drag & Drop or{" "}
            <span className="text-[#7C3EFF] font-medium underline">
              choose file
            </span>{" "}
            to upload
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Supported formats: .docs, .pdf
          </p>
        </>
      )}

      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  );
}