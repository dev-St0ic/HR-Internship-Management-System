import { useState } from "react";
import FileDropzone from "../ui/FileDropzone";


export default function RequiredDocsForm() {
    
    const [resume, setResume] = useState("");
    const [moa, setMoa] = useState("");
    const [endorsement, setEndorsement] = useState("");
    const [schoolId, setSchoolId] = useState("");
    const [assessment, setAssessment] = useState("");

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mt-2">
            
            <FileDropzone 
                label="Resume" 
                fileName={resume} 
                setFileName={setResume} 
                required={true} 
            />
            
            <FileDropzone 
                label="MOA" 
                fileName={moa} 
                setFileName={setMoa} 
                required={true} 
            />
            
            <FileDropzone 
                label="Endorsement Letter" 
                fileName={endorsement} 
                setFileName={setEndorsement} 
                required={true} 
            />
            
            <FileDropzone 
                label="School ID" 
                fileName={schoolId} 
                setFileName={setSchoolId} 
                required={true} 
            />
            
            <FileDropzone 
                label="Upload Enrollment Assessment" 
                fileName={assessment} 
                setFileName={setAssessment} 
                required={true} 
            />

        </div>
    );
}