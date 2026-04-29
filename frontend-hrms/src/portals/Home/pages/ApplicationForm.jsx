import { useState } from "react";
import FormStepper from "../components/FormStepper";
import { Link, useNavigate } from "react-router-dom"; 
import RequiredDocsForm from "../forms/RequiredDocsForm";
import PersonalInfoForm from "../forms/PersonalInfoForm";
import SchoolInformationForm from "../forms/SchoolInfromationForm";

export default function ApplicationForm() {
    const [currentStep, setCurrentStep] = useState(1);
    
    const navigate = useNavigate(); 

    const handleNext = (e) => {
        e.preventDefault();
        
        if (currentStep < 3) {
            setCurrentStep((prev) => prev + 1);
        } else {
            navigate("/applicant");
        }
    };

    const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 overflow-x-hidden">

            <FormStepper currentStep={currentStep}/>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10 min-h-[400px] flex flex-col overflow-hidden relative">

                <h2 className="text-lg font-bold text-gray-900 mb-6 transition-all">
                    {currentStep === 1 && "Personal Information"}
                    {currentStep === 2 && "School Information"}
                    {currentStep === 3 && "Required Documents"}
                </h2>
                
                <form onSubmit={handleNext} className="flex-1 flex flex-col">
                    
                    <div className="flex-1 relative overflow-hidden">
                        
                        <div 
                            className="flex w-full transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}
                        >
                            
                            {/* THE FIX: Wrapping each form in a disabled fieldset when it is not active */}
                            <div className="w-full flex-shrink-0 p-1">
                                <fieldset disabled={currentStep !== 1} className="border-none p-0 m-0 min-w-0 w-full h-full">
                                    <PersonalInfoForm />
                                </fieldset>
                            </div>

                            <div className="w-full flex-shrink-0 p-1">
                                <fieldset disabled={currentStep !== 2} className="border-none p-0 m-0 min-w-0 w-full h-full">
                                    <SchoolInformationForm />
                                </fieldset>
                            </div>

                            <div className="w-full flex-shrink-0 p-1">
                                <fieldset disabled={currentStep !== 3} className="border-none p-0 m-0 min-w-0 w-full h-full">
                                    <RequiredDocsForm />
                                </fieldset>
                            </div>

                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-10">
                        
                        {currentStep === 1 ? (
                            <Link to={"/"}>
                                <button type="button" className="px-6 py-2 border border-gray-300 rounded-md text-md font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                    Cancel
                                </button>
                            </Link>
                            
                        ) : (
                            <button type="button" onClick={handleBack} className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                Back
                            </button>
                        )}
                        
                        <button type="submit" className="px-8 py-2 bg-[#7C3EFF] text-white rounded-md text-md font-medium hover:bg-gray-800 transition-colors">
                            {currentStep === 3 ? "Submit Application" : "Next"}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}