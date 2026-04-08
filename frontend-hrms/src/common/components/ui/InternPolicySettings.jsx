import { useState } from "react";
import { Calendar } from "lucide-react";

export default function InternPolicySettings() {
    // FORM STATE
    const [policyData, setPolicyData] = useState({
        startTime: "",
        endTime: "",
        gracePeriod: "",
        maxHours: "",
        workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] // Default active days
    });

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const handleChange = (e) => {
        setPolicyData({ ...policyData, [e.target.name]: e.target.value });
    };

    const toggleDay = (day) => {
        setPolicyData((prev) => {
            const newDays = prev.workingDays.includes(day)
                ? prev.workingDays.filter(d => d !== day)
                : [...prev.workingDays, day];
            return { ...prev, workingDays: newDays };
        });
    };

    return (
        <div className="pt-4">
            <div className="border border-[#A2A1A833] rounded-xl p-6 flex flex-col gap-8">
                
                {/* --- Schedule & Punctuality --- */}
                <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">Schedule & Punctuality</h3>
                    <p className="text-sm text-gray-400 mb-4">8:00 AM to 5:00 PM</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Start Time Input */}
                        <div className="relative">
                            <input 
                                type="text" 
                                name="startTime"
                                value={policyData.startTime}
                                onChange={handleChange}
                                placeholder="Start Time"
                                className="w-full border border-[#A2A1A833] rounded-lg pl-4 pr-10 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#7C3EFF] transition-colors"
                            />
                            <Calendar size={18} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                        </div>

                        {/* End Time Input */}
                        <div className="relative">
                            <input 
                                type="text" 
                                name="endTime"
                                value={policyData.endTime}
                                onChange={handleChange}
                                placeholder="End Time"
                                className="w-full border border-[#A2A1A833] rounded-lg pl-4 pr-10 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#7C3EFF] transition-colors"
                            />
                            <Calendar size={18} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* --- Grace Period --- */}
                <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">Grace Period</h3>
                    <input 
                        type="text" 
                        name="gracePeriod"
                        value={policyData.gracePeriod}
                        onChange={handleChange}
                        placeholder="15 Minutes"
                        className="w-full border border-[#A2A1A833] rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#7C3EFF] transition-colors"
                    />
                </div>

                {/* --- Maximum Hours per Day --- */}
                <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">Maximum Hours per Day</h3>
                    <input 
                        type="text" 
                        name="maxHours"
                        value={policyData.maxHours}
                        onChange={handleChange}
                        placeholder="8 Hours" 
                        className="w-full border border-[#A2A1A833] rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#7C3EFF] transition-colors"
                    />
                </div>

                {/* --- Working Days --- */}
                <div>
                    <h3 className="text-base font-bold text-gray-900 mb-4">Working Days</h3>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                        {daysOfWeek.map((day) => {
                            const isActive = policyData.workingDays.includes(day);
                            return (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => toggleDay(day)}
                                    className="flex items-center gap-2 group"
                                >
                                    <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                                        {day}
                                    </span>
                                    {/* Custom Radio Button */}
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                        ${isActive ? "border-green-500" : "border-gray-300 group-hover:border-gray-400"}`}
                                    >
                                        {isActive && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}