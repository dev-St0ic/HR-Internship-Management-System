import { useState, useEffect } from "react";
import { Upload } from "lucide-react";

export default function Documents({ initialDocuments = [] }) {
    
    // Start them all as null
    const [uploadedFiles, setUploadedFiles] = useState({
        resume: null,
        moa: null,
        endorsement: null,
        schoolId: null,
        certificate: null
    });

    // Watch the initialDocuments array. As soon as the mock data loads, update the files!
    useEffect(() => {
        if (initialDocuments.length > 0) {
            const getMockFile = (docName) => {
                const doc = initialDocuments.find(d => d.name === docName);
                if (doc && doc.status === 'uploaded') {
                    return { name: `${docName.replace(/\s+/g, '_')}_uploaded.pdf` };
                }
                return null;
            };

            setUploadedFiles({
                resume: getMockFile('Resume'),
                moa: getMockFile('MOA'),
                endorsement: getMockFile('Endorsement Letter'),
                schoolId: getMockFile('School ID'),
                certificate: getMockFile('Certificate of Acceptance')
            });
        }
    }, [initialDocuments]); // This array means "run this code whenever initialDocuments changes"

    // Handle when a user actually uploads a real new file
    const handleFileChange = (e, docType) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFiles(prev => ({
                ...prev,
                [docType]: file
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting Documents:", uploadedFiles);
        alert("Application Submitted Successfully!");
    };

    const UploadBox = ({ id, label, docType }) => {
        const file = uploadedFiles[docType];

        return (
            <div className="flex flex-col">
                <label className="block text-[13px] text-gray-400 font-medium mb-1.5">{label}</label>
                
                <div className="relative border-2 border-dashed border-[#7C3EFF]/40 rounded-xl p-8 flex flex-col items-center justify-center bg-white hover:bg-[#F4F0FF] transition-all cursor-pointer group">
                    
                    <input 
                        type="file" 
                        id={id} 
                        accept=".pdf, .jpg, .jpeg" 
                        onChange={(e) => handleFileChange(e, docType)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {file ? (
                        <div className="text-center animate-fade-in">
                            <div className="w-11 h-11 bg-[#10B981] rounded-xl flex items-center justify-center mx-auto mb-3 text-white shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <p className="text-[13px] font-medium text-gray-900 truncate max-w-[200px]">{file.name}</p>
                            <p className="text-[11px] text-gray-500 mt-1">Click to replace file</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="w-11 h-11 bg-[#7C3EFF] rounded-xl flex items-center justify-center mx-auto mb-3 text-white shadow-sm group-hover:-translate-y-1 transition-transform duration-300">
                                <Upload size={20} strokeWidth={2} />
                            </div>
                            <p className="text-[13px] text-gray-600 font-medium">Drag & Drop or <span className="text-gray-900">choose file</span> to upload</p>
                            <p className="text-[11px] text-gray-400 mt-1.5">Supported formats : Jpeg, pdf</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="w-full animate-fade-in">
            <h3 className="text-[18px] font-bold text-gray-900 mb-6">Required Documents</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
                <UploadBox id="doc-resume" label="Resume" docType="resume" />
                <UploadBox id="doc-moa" label="MOA" docType="moa" />
                <UploadBox id="doc-endorsement" label="Endorsement Letter" docType="endorsement" />
                <UploadBox id="doc-school-id" label="School ID" docType="schoolId" />
                <UploadBox id="doc-certificate" label="Certificate of Acceptance" docType="certificate" />
            </div>

            <div className="flex justify-end mt-6">
                <button 
                    type="submit" 
                    className="bg-[#7C3EFF] hover:bg-[#6A32E6] text-white font-medium py-3 px-8 rounded-lg transition-colors text-[14px] shadow-sm"
                >
                    Submit Application
                </button>
            </div>
        </form>
    );
}