import { useState } from "react";

export default function PersonalInformation({ personalInfo = {} }) {
    
    // Initialize the editable state with mock data
    // We convert gender and nationality values to lowercase to match the select option values.
    const [formData, setFormData] = useState({
        firstName: personalInfo.firstName || "",
        middleName: personalInfo.middleName || "", // Middle name for the right side of the first row
        lastName: personalInfo.lastName || "",
        dateOfBirth: personalInfo.dateOfBirth || "",
        mobileNumber: personalInfo.contactNumber || "",
        emailAddress: personalInfo.email || "",
        gender: personalInfo.gender?.toLowerCase() || "", // Convert Male to male
        nationality: personalInfo.nationality?.toLowerCase() || "", // Convert Filipino to filipino
        addressRegion: personalInfo.address || "",
        streetName: personalInfo.street || "",
        city: personalInfo.city?.toLowerCase() || "", // e.g. cityville
        zipCode: personalInfo.zipcode || ""
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
        console.log("Saving Personal Info:", formData);
        // Add your Laravel API save logic here
        alert("Personal Information Saved Successfully!");
    };

    // Reusable styles for consistency
    const inputStyle = "w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#7C3EFF] focus:ring-1 focus:ring-[#7C3EFF] text-[15px] text-gray-900 transition-all bg-white placeholder:text-gray-400";
    const labelStyle = "block text-[13px] text-gray-400 font-medium mb-1.5";

    return (
        <form onSubmit={handleSave} className="w-full animate-fade-in">
            <h3 className="text-[18px] font-bold text-gray-900 mb-6">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8">
                
                {/* Row 1: First Name | Middle Name */}
                <div className="flex flex-col">
                    <label htmlFor="firstName" className={labelStyle}>First Name</label>
                    <input 
                        type="text" id="firstName" name="firstName" 
                        value={formData.firstName} onChange={handleChange} 
                        className={inputStyle} required 
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="middleName" className={labelStyle}>Middle Name</label>
                    <input 
                        type="text" id="middleName" name="middleName" 
                        value={formData.middleName} onChange={handleChange} 
                        className={inputStyle} 
                    />
                </div>

                {/* Row 2: Last Name | Date of Birth */}
                <div className="flex flex-col">
                    <label htmlFor="lastName" className={labelStyle}>Last Name</label>
                    <input 
                        type="text" id="lastName" name="lastName" 
                        value={formData.lastName} onChange={handleChange} 
                        className={inputStyle} required 
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="dateOfBirth" className={labelStyle}>Date of Birth</label>
                    <input 
                        type="date" id="dateOfBirth" name="dateOfBirth" 
                        value={formData.dateOfBirth} onChange={handleChange} 
                        className={`${inputStyle} ${formData.dateOfBirth ? 'text-gray-900' : 'text-gray-400'}`} required 
                    />
                </div>

                {/* Row 3: Mobile Number | Email Address */}
                <div className="flex flex-col">
                    <label htmlFor="mobileNumber" className={labelStyle}>Mobile Number</label>
                    <input 
                        type="tel" id="mobileNumber" name="mobileNumber" 
                        value={formData.mobileNumber} onChange={handleChange} 
                        className={inputStyle} required 
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="emailAddress" className={labelStyle}>Email Address</label>
                    <input 
                        type="email" id="emailAddress" name="emailAddress" 
                        value={formData.emailAddress} onChange={handleChange} 
                        className={inputStyle} required 
                    />
                </div>

                {/* Row 4: Gender | Nationality */}
                <div className="flex flex-col relative">
                    <label htmlFor="gender" className={labelStyle}>Gender</label>
                    <select 
                        id="gender" name="gender" 
                        value={formData.gender} onChange={handleChange} 
                        className={`${inputStyle} appearance-none cursor-pointer ${formData.gender ? 'text-gray-900' : 'text-gray-400'}`} 
                        required
                    >
                        <option value="" disabled hidden>-- Select --</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Prefer not to say</option>
                    </select>
                </div>
                <div className="flex flex-col relative">
                    <label htmlFor="nationality" className={labelStyle}>Nationality</label>
                    <select 
                        id="nationality" name="nationality" 
                        value={formData.nationality} onChange={handleChange} 
                        className={`${inputStyle} appearance-none cursor-pointer ${formData.nationality ? 'text-gray-900' : 'text-gray-400'}`} 
                        required
                    >
                        <option value="" disabled hidden>-- Select --</option>
                        <option value="filipino">Filipino</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Row 5: Address | Street Name */}
                <div className="flex flex-col">
                    <label htmlFor="addressRegion" className={labelStyle}>Address, Region, Province, Barangay</label>
                    <input 
                        type="text" id="addressRegion" name="addressRegion" 
                        value={formData.addressRegion} onChange={handleChange} 
                        className={inputStyle} required 
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="streetName" className={labelStyle}>Street Name, Building, House No.</label>
                    <input 
                        type="text" id="streetName" name="streetName" 
                        value={formData.streetName} onChange={handleChange} 
                        className={inputStyle} required 
                    />
                </div>

                {/* Row 6: City | ZIP Code */}
                <div className="flex flex-col relative">
                    <label htmlFor="city" className={labelStyle}>City</label>
                    <select 
                        id="city" name="city" 
                        value={formData.city} onChange={handleChange} 
                        className={`${inputStyle} appearance-none cursor-pointer ${formData.city ? 'text-gray-900' : 'text-gray-400'}`} 
                        required
                    >
                        <option value="" disabled hidden>-- Select --</option>
                        <option value="manila">Manila</option>
                        <option value="makati">Makati</option>
                        <option value="quezon_city">Quezon City</option>
                        <option value="cityville">Antipolo City</option> 
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="zipCode" className={labelStyle}>ZIP Code</label>
                    <input 
                        type="text" id="zipCode" name="zipCode" 
                        value={formData.zipCode} onChange={handleChange} 
                        className={inputStyle} required 
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