export default function FileDropzone({
  label = "Upload File",
  fileName,
  setFileName,
  accept = ".pdf",
  required = false,
  supportedText = "Supported formats: PDF",
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  return (
    <div className="flex flex-col">
      <span className="mb-2 text-sm text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </span>

      <label className="relative flex h-32 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-200 bg-white transition-colors hover:bg-gray-50">
        {fileName ? (
          <div className="z-10 flex flex-col items-center justify-center p-4 text-center">
            <svg
              className="mb-2 h-8 w-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span className="max-w-[200px] truncate px-2 text-sm font-medium text-gray-900">
              {fileName}
            </span>

            <span className="mt-1 text-xs text-gray-500">
              Click to change file
            </span>
          </div>
        ) : (
          <div className="z-10 flex flex-col items-center justify-center p-4 text-center">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#7C3EFF]">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>

            <p className="mb-1 text-sm text-gray-700">
              Drag & Drop or choose file to upload
            </p>

            <p className="text-[11px] text-gray-400">{supportedText}</p>
          </div>
        )}

        <input
          type="file"
          className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
          accept={accept}
          onChange={handleFileChange}
          required={required}
        />
      </label>
    </div>
  );
}
