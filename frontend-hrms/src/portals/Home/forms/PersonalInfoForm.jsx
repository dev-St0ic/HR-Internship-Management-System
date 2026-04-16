import { useState } from "react";

export default function PersonalInfoForm() {
    
    const [isGenderEmpty, setIsGenderEmpty] = useState(true);
    const [isNatEmpty, setIsNatEmpty] = useState(true);
    const [isCityEmpty, setIsCityEmpty] = useState(true);
    const [errors, setErrors] = useState({ mobile: "", email: "", zip: "" });

    const baseInput = "w-full border border-gray-200 rounded-lg px-4 py-3.5 text-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors bg-white";

    const inputClass = `${baseInput} text-gray-900`;

    const validateZip = (e) => {
        e.target.value = e.target.value.replace(/\D/g, "");
        if (e.target.value.length != 4 && e.target.value.length != 5) {
            setErrors((prev) => ({ ...prev, zip: "Must be a valid 4 or 5-digit number" }));
        } else {
            setErrors((prev) => ({ ...prev, zip: "" }));
        }
    };


    const validateMobile = (e) => {
        e.target.value = e.target.value.replace(/\D/g, "");
        if (e.target.value.length > 0 && e.target.value.length < 11) {
            setErrors((prev) => ({ ...prev, mobile: "Must be a valid 11-digit number" }));
        } else {
            setErrors((prev) => ({ ...prev, mobile: "" }));
        }
    };

    const validateEmail = (e) => {
        const value = e.target.value;
        if (value && !value.includes("@")) {
            setErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }));
        }else {
            setErrors((prev) => ({ ...prev, email: null }));
        }
    }

    const getSelectClass = (isEmpty) => {
        return `${baseInput} appearance-none ${isEmpty ? "text-gray-400" : "text-gray-900"}`;
        
    };

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-2">
            
            {/* ROW 1 */}
            <input type="text" placeholder="First Name" className={inputClass} required/>
            <input type="text" placeholder="Middle Name" className={inputClass} />

            {/* ROW 2 */}
            <input type="text" placeholder="Last Name" className={inputClass} required/>
            
            <input 
                type="text" 
                placeholder="Date of Birth" 
                className={inputClass}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.value === "" ? (e.target.type = "text") : null)}
                required
            />

            {/* ROW 3 */}
            <div className="flex flex-col gap-1">
                <input 
                    type="tel" 
                    placeholder="Mobile Number" 
                    className={`${inputClass} ${errors.mobile ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`} 
                    onChange={validateMobile}
                    required
                />
                {errors.mobile && <span className="text-xs text-red-500 px-1">{errors.mobile}</span>}
            </div>

            <div className="flex flex-col gap-1">
                <input 
                    type="email"
                    placeholder="Email Address" 
                    className={`${inputClass} ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    onChange={validateEmail}
                    required
                />  
                {errors.email && <span className="text-xs text-red-500 px-1">{errors.email}</span>}
            </div>


            {/* ROW 4 */}
            <div className="relative">
                <select required
                    className={getSelectClass(isGenderEmpty)} 
                    defaultValue=""
                    
                    onChange={() => setIsGenderEmpty(false)} 
                >
                    <option value="" disabled hidden>Gender</option>
                    <option value="male" className="text-gray-900">Male</option>
                    <option value="female" className="text-gray-900">Female</option>
                    <option value="other" className="text-gray-900">Prefer not to say</option>
                    
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>

            <div className="relative">
                <select required
                    className={getSelectClass(isNatEmpty)} 
                    defaultValue=""
                    onChange={() => setIsNatEmpty(false)}
                >
                    <option value="" disabled hidden>Nationality</option>
                    <option value="filipino" className="text-gray-900">Filipino</option>
                    <option value="foreigner" className="text-gray-900">Foreign National</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>

            {/* ROW 5 */}
            <input type="text" placeholder="Address, Region, Province, Barangay" className={inputClass} required/>
            <input type="text" placeholder="Street Name, Building, House No." className={inputClass} required />

            {/* ROW 6 */}
            <div className="relative">
                <select 
                    className={getSelectClass(isCityEmpty)} 
                    defaultValue=""
                    onChange={() => setIsCityEmpty(false)}
                >
                    <option value="" disabled hidden>City</option>
                    <option value="makati" className="text-gray-900">Makati City</option>
                    <option value="manila" className="text-gray-900">City of Manila</option>
                    <option value="quezon" className="text-gray-900">Quezon City</option>
                    <option value="taguig" className="text-gray-900">Taguig City</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
        
            <div>
                <input type="text" required
                placeholder="ZIP Code"
                className={`${inputClass} ${errors.mobile ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`} 
                onChange={validateZip} 
                
                />
                {errors.zip && <span className="text-xs text-red-500 px-1">{errors.zip}</span>}
            </div>

        </div>
    );
}