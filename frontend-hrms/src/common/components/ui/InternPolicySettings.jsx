import { useState } from "react";
import { initialPolicyData, daysOfWeek } from "./intern-policy/constants";
import PolicyTextInput from "./intern-policy/PolicyTextInput";
import WorkingDaysSelector from "./intern-policy/WorkingDaysSelector";

export default function InternPolicySettings() {
    const [policyData, setPolicyData] = useState(initialPolicyData);

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
                        <PolicyTextInput name="startTime" value={policyData.startTime} onChange={handleChange} placeholder="Start Time" withCalendarIcon />
                        <PolicyTextInput name="endTime" value={policyData.endTime} onChange={handleChange} placeholder="End Time" withCalendarIcon />
                    </div>
                </div>

                {/* --- Grace Period --- */}
                <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">Grace Period</h3>
                    <PolicyTextInput name="gracePeriod" value={policyData.gracePeriod} onChange={handleChange} placeholder="15 Minutes" />
                </div>

                {/* --- Maximum Hours per Day --- */}
                <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">Maximum Hours per Day</h3>
                    <PolicyTextInput name="maxHours" value={policyData.maxHours} onChange={handleChange} placeholder="8 Hours" />
                </div>

                {/* --- Working Days --- */}
                <div>
                    <h3 className="text-base font-bold text-gray-900 mb-4">Working Days</h3>
                    <WorkingDaysSelector days={daysOfWeek} workingDays={policyData.workingDays} onToggle={toggleDay} />
                </div>

            </div>
        </div>
    );
}