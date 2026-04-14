import { useState } from "react";
import ToggleSwitch from "../ui/ToggleSwitch"; 

export default function RBACSettings() {
    const modules = ["Attendance", "Intern Records", "Settings", "Reports"];
    const actions = ["View", "Create", "Edit", "Delete"];

    const [selectedRole, setSelectedRole] = useState("");

    // Initialize all permissions to 'true' (ON) for demonstration
    const [permissions, setPermissions] = useState(() => {
        const initialState = {};
        modules.forEach(module => {
            initialState[module] = { View: true, Create: true, Edit: true, Delete: true };
        });
        return initialState;
    });

    const handleToggle = (module, action) => {
        setPermissions(prev => ({
            ...prev,
            [module]: {
                ...prev[module],
                [action]: !prev[module][action]
            }
        }));
    };

    return (
        <div className="pt-4">
            <div className="border border-[#A2A1A833] rounded-xl p-6">
                
                <h3 className="text-base font-bold text-gray-900 mb-1">Roles and Permission Management</h3>
                <p className="text-sm text-gray-400 mb-6">Control users permissions</p>
                
                <select 
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full border border-[#A2A1A833] rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-[#7C3EFF] focus:ring-1 focus:ring-[#7C3EFF] transition-colors appearance-none bg-white"
                >
                    <option value="" disabled>Role</option>
                    <option value="hr-staff">HR Staff</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="intern">Intern</option>
                </select>

                <div className="mt-8 overflow-x-auto">
                    <div className="min-w-150px"> 
                        
                        <div className="grid grid-cols-5 gap-4 mb-6">
                            <div className="col-span-1"></div> 
                            {actions.map(action => (
                                <div key={action} className="text-center font-bold text-gray-900 text-sm">
                                    {action}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-6">
                            {modules.map(module => (
                                <div key={module} className="grid grid-cols-5 gap-4 items-center">
                                
                                    <div className="font-bold text-gray-900 text-sm">
                                        {module}
                                    </div>
                                    
                                    {actions.map(action => (
                                        <div key={`${module}-${action}`} className="flex justify-center">
                                            <ToggleSwitch 
                                                checked={permissions[module][action]}
                                                onChange={() => handleToggle(module, action)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}