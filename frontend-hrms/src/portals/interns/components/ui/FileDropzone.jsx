export default function FileDropzone({ 

    label, 
    fileName, 
    setFileName, 
    accept = ".pdf", 
    required = true
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
            {/* The Label above the box */}
            <span className="text-sm  text-gray-900 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </span>
            
            {/* The Dashed Box */}
            <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-white hover:bg-gray-50 transition-colors overflow-hidden">
                
                {fileName ? (
                    // WHAT SHOWS WHEN A FILE IS UPLOADED
                    <div className="flex flex-col items-center justify-center p-4 text-center z-10">
                        <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className="text-sm font-medium text-gray-900 truncate max-w-[200px] px-2">{fileName}</span>
                        <span className="text-xs text-gray-500 mt-1">Click to change file</span>
                    </div>
                ) : (
                    // WHAT SHOWS WHEN EMPTY
                    <div className="flex flex-col items-center justify-center p-4 z-10">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mb-3">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                            </svg>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">Drag & Drop or choose file to upload</p>
                        <p className="text-[11px] text-gray-400">Supported formats : pdf</p>
                    </div>
                )}

                {/* The Invisible Input */}
                <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                    accept={accept}
                    onChange={handleFileChange}
                    required={required}
                />
            </label>
        </div>
    );
}