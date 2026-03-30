import { useState } from "react";

export default function SchoolInformationForm() {
    
    const [isYearLevelEmpty, setIsYearLevelEmpty] = useState(true);

    const baseInput = "w-full border border-gray-200 rounded-lg px-4 py-3.5 text-base placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors bg-white";
    const inputClass = `${baseInput} text-gray-900`;

    const getSelectClass = (isEmpty) => {
        return `${baseInput} appearance-none ${isEmpty ? "text-gray-400" : "text-gray-900"}`;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-2">
            
            <div className="md:col-span-2">
                <input type="text" placeholder="University" className={inputClass} required />
            </div>

            <input type="text" placeholder="Program/Major" className={inputClass} required />
            
            <div className="relative">
                <select 
                    className={getSelectClass(isYearLevelEmpty)} 
                    defaultValue=""
                    onChange={() => setIsYearLevelEmpty(false)}
                    required
                >
                    <option value="" disabled hidden>Year Level</option>
                    <option value="1" className="text-gray-900">1st Year</option>
                    <option value="2" className="text-gray-900">2nd Year</option>
                    <option value="3" className="text-gray-900">3rd Year</option>
                    <option value="4" className="text-gray-900">4th Year</option>
                    <option value="5" className="text-gray-900">5th Year</option>
                    <option value="irregular" className="text-gray-900">Irregular</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>

            <input type="number" placeholder="Required Internship hours" className={inputClass} required min="1" />
            
            <input 
                type="text" 
                placeholder="Expected Graduation" 
                className={inputClass}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.value === "" ? (e.target.type = "text") : null)}
                required 
            />

        </div>
    );
}