import { useState, useEffect } from "react";
import { EyeOff, Eye, Lock } from "lucide-react";

export default function ProfileSettings({ role }) {
    const [showPassword, setShowPassword] = useState(false);
    
    const getInitialData = (userRole) => {
        const baseData = {
            password: "••••••••••••••",
            newPassword: "",
            firstName: "John",
            lastName: "Doe",
            mobileNumber: "09123456789",
            gender: "Male",
            dateOfBirth: "01/01/2000"
        };

        // Data that changes based on role
        switch (userRole) {
            case "intern":
                return { ...baseData, userName: "Intern User", email: "intern@gmail.com" };
            case "hr-staff":
                return { ...baseData, userName: "HR Staff", email: "hrstaff@gmail.com" };
            case "admin":
            case "hr-admin":
                return { ...baseData, userName: "HR Admin", email: "hradmin@gmail.com" };
            case "supervisor":
                return { ...baseData, userName: "Supervisor", email: "supervisor@gmail.com" };
            default:
                return { ...baseData, userName: "System User", email: "user@email.com" };
        }
    };

    const [formData, setFormData] = useState(() => getInitialData(role));

    useEffect(() => {
        setFormData(getInitialData(role));
    }, [role]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        console.log("Saving changes:", formData);
    };

    return (
        <form onSubmit={handleSaveChanges} className="flex flex-col gap-8 pt-4">
            
            {/* --- Account Settings Section (EDITABLE) --- */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Account Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                    
                    {/* User Name */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">User Name</label>
                        <input 
                            type="text" 
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className="w-full border border-[#A2A1A833] rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#7C3EFF] transition-colors"
                        />
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-[#A2A1A833] rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#7C3EFF] transition-colors"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-[#A2A1A833] rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#7C3EFF] transition-colors"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">New Password</label>
                        <input 
                            type="password" 
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full border border-[#A2A1A833] rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#7C3EFF] transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* --- Personal Information Section (LOCKED) --- */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                    <Lock size={14} className="text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mb-4 -mt-2">Please contact HR to update your personal information.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                    
                    {/* First Name */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">First Name</label>
                        <input 
                            type="text" 
                            value={formData.firstName}
                            disabled
                            className="w-full border border-[#A2A1A833] bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Last Name</label>
                        <input 
                            type="text" 
                            value={formData.lastName}
                            disabled
                            className="w-full border border-[#A2A1A833] bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Mobile Number</label>
                        <input 
                            type="text" 
                            value={formData.mobileNumber}
                            disabled
                            className="w-full border border-[#A2A1A833] bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Gender</label>
                        <select 
                            value={formData.gender}
                            disabled
                            className="w-full border border-[#A2A1A833] bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed appearance-none"
                        >
                            <option value="Gender">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Date of Birth</label>
                        <input 
                            type="text" 
                            value={formData.dateOfBirth}
                            disabled
                            className="w-full border border-[#A2A1A833] bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>

            {/* --- Action Buttons --- */}
            <div className="flex justify-end gap-4 mt-6">
                <button 
                    type="button"
                    className="px-6 py-2 rounded-lg text-sm font-medium text-[#7C3EFF] bg-[#7C3EFF]/10 hover:bg-[#7C3EFF]/20 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-[#7C3EFF] hover:bg-[#7C3EFF]/90 transition-colors shadow-sm"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
}