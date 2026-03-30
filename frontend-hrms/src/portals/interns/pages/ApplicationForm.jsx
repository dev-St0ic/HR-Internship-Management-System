import { useState } from "react";
import FormStepper from "../components/ui/FormStepper";
import { Link } from "react-router-dom";
import PersonalInfoForm from "../components/forms/PersonalInfoForm";
import SchoolInformationForm from "../components/forms/SchoolInfromationForm";
import RequiredDocsForm from "../components/Forms/RequiredDocsForm";



export default function ApplicationForm() {

    

    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = (e) => {
        e.preventDefault();
        setCurrentStep((prev) => Math.min(prev + 1, 3));
    };
    const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">

            <FormStepper currentStep={currentStep}/>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10 min-h-[400px] flex flex-col">

                <h2 className="text-lg font-bold text-gray-900 mb-6">
                    {currentStep === 1 && "Personal Information"}
                    {currentStep === 2 && "School Information"}
                    {currentStep === 3 && "Required Documents"}
                </h2>
                
                <form onSubmit={handleNext} className="flex-1 flex flex-col">
                    <div className="flex-1">
                        {currentStep === 1 && <PersonalInfoForm />}
                        {currentStep === 2 && <SchoolInformationForm />}
                        {currentStep === 3 && <RequiredDocsForm />}
                    </div>

                    <div className="flex justify-end gap-4 mt-10">
                        
                        {currentStep === 1 ? (
                            <Link to={"/"}>
                                <button type="button" className="px-6 py-2 border border-gray-300 rounded-md text-md font-medium text-gray-700 hover:bg-gray-50">
                                    Cancel
                            </button>
                            </Link>
                            
                        ) : (
                            <button type="button" onClick={handleBack} className="px-6 py-2 border border-gray-300 rounded-md text-sm font-m text-gray-700 hover:bg-gray-50">
                                Back
                            </button>
                        )}
                        
                        <button type="submit" onSubmit={handleNext} className="px-8 py-2 bg-black text-white rounded-md text-md font-medium hover:bg-gray-800 transition-colors">
                            {currentStep === 3 ? "Submit Application" : "Next"}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}