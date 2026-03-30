import React from 'react';

export default function FormStepper({ currentStep }) {
    
    const steps = [
        { id: 1, label: "Profile" },
        { id: 2, label: "Education" },
        { id: 3, label: "Documents" },
    ];

    return (
        
        <div className="flex items-start justify-center max-w-xl mx-auto mb-10 px-4">
            
            {steps.map((step, index) => {

                const isCompleted = currentStep > step.id;
                const isActive = currentStep === step.id;

                return (
                    <React.Fragment key={step.id}>

                        <div className="flex flex-col items-center w-24 flex-shrink-0 relative">
                            
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium z-10 transition-colors duration-300 ${
                                isCompleted 
                                    ? "bg-black text-white border-3 border-black" 
                                    : isActive
                                        ? "bg-white text-black border-3 border-black"
                                        : "bg-white text-gray-500 border-3 border-gray-400" 
                            }`}>
                                {isCompleted ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                ) : (
                                    `0${step.id}`
                                )}
                            </div>

                            <span className={`text-sm mt-2 transition-colors duration-300 ${
                                isActive || isCompleted ? "font-bold text-black" : "font-semibold text-gray-500"
                            }`}>
                                {step.label}
                            </span>
                        </div>

                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-[2px] mt-4 transition-colors duration-300 ${
                                currentStep > step.id ? "bg-black" : "bg-gray-300"
                            }`}></div>
                        )}

                    </React.Fragment>
                );
            })}

        </div>
    );
}