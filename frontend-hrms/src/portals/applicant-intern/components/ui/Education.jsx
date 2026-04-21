import { useState } from "react";

export default function Education({ schoolInfo = {} }) {
    
    // Initialize the editable state with the mock data you provided
    const [formData, setFormData] = useState({
        university: schoolInfo.university || "",
        course: schoolInfo.course || "",
        yearLevel: schoolInfo.yearLevel || "",
        requiredHours: schoolInfo.requiredHours || "",
        expectedGraduation: schoolInfo.expectedGraduation || ""
    });

    // Handle typing in any input field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle clicking the Save button
    const handleSave = (e) => {
        e.preventDefault();
        console.log("Saving School Info:", formData);
        alert("School Information Saved Successfully!");
    };

    // Reusing the exact same styles from PersonalInformation for perfect consistency
    const inputStyle = "w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#7C3EFF] focus:ring-1 focus:ring-[#7C3EFF] text-[15px] text-gray-900 transition-all bg-white placeholder:text-gray-400";
    const labelStyle = "block text-[13px] text-gray-400 font-medium mb-1.5";

    return (
        <form onSubmit={handleSave} className="w-full animate-fade-in">
            <h3 className="text-[18px] font-bold text-gray-900 mb-6">Education</h3>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8">
                
                {/* Row 1: University (Spans both columns because school names can be long!) */}
                <div className="flex flex-col md:col-span-2">
                    <label htmlFor="university" className={labelStyle}>University</label>
                    <input 
                        type="text" id="university" name="university" 
                        value={formData.university} onChange={handleChange} 
                        placeholder="e.g. University of the Philippines" 
                        className={inputStyle} required 
                    />
                </div>

                {/* Row 2: Course | Year Level */}
                <div className="flex flex-col">
                    <label htmlFor="course" className={labelStyle}>Program/Major</label>
                    <input 
                        type="text" id="course" name="course" 
                        value={formData.course} onChange={handleChange} 
                        placeholder="e.g. BS Computer Science" 
                        className={inputStyle} required 
                    />
                </div>
                <div className="flex flex-col relative">
                    <label htmlFor="yearLevel" className={labelStyle}>Year Level</label>
                    <select 
                        id="yearLevel" name="yearLevel" 
                        value={formData.yearLevel} onChange={handleChange} 
                        className={`${inputStyle} appearance-none cursor-pointer ${formData.yearLevel ? 'text-gray-900' : 'text-gray-400'}`} 
                        required
                    >
                        <option value="" disabled hidden>-- Select --</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="5th Year">5th Year</option>
                        <option value="Graduated">Graduated</option>
                    </select>
                </div>

                {/* Row 3: Required Hours | Expected Graduation */}
                <div className="flex flex-col">
                    <label htmlFor="requiredHours" className={labelStyle}>Required Internship Hours</label>
                    <input 
                        type="number" id="requiredHours" name="requiredHours" 
                        value={formData.requiredHours} onChange={handleChange} 
                        placeholder="e.g. 300" 
                        min="1"
                        className={inputStyle} required 
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="expectedGraduation" className={labelStyle}>Expected Graduation</label>
                    <input 
                        type="date" id="expectedGraduation" name="expectedGraduation" 
                        value={formData.expectedGraduation} onChange={handleChange} 
                        className={`${inputStyle} ${formData.expectedGraduation ? 'text-gray-900' : 'text-gray-400'}`} required 
                    />
                </div>
                
            </div>

            {/* Save Button (Right Aligned) */}
            <div className="flex justify-end mt-4">
                <button 
                    type="submit" 
                    className="bg-[#7C3EFF] hover:bg-[#6A32E6] text-white font-medium py-2.5 px-8 rounded-lg transition-colors text-[14px] shadow-sm"
                >
                    Save
                </button>
            </div>
        </form>
    );
}