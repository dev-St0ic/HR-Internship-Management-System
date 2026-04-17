import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import FormStepper from "../components/FormStepper";
import RequiredDocsForm from "../forms/RequiredDocsForm";
import PersonalInfoForm from "../forms/PersonalInfoForm";
import SchoolInformationForm from "../forms/SchoolInfromationForm";

export default function ApplicationForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate(); // Initialize navigate

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Stop the page from reloading
        
        if (currentStep < 3) {
            // If we aren't on the last step, just go to the next page
            setCurrentStep((prev) => prev + 1);
        } else {
            // If we ARE on the last step (Step 3), this is the final submit!
            // TEMP: Here is where you will eventually save the form data to your database
            
            // Redirect the user to the Applicant Dashboard
            navigate("/applicant");
        }
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
                
                {/* 1. We put the handler on the FORM itself */}
                <form onSubmit={handleFormSubmit} className="flex-1 flex flex-col">
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
                            <button type="button" onClick={handleBack} className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Back
                            </button>
                        )}
                        
                        {/* 2. Removed the onSubmit from here, type="submit" triggers the form's onSubmit */}
                        <button type="submit" className="px-8 py-2 bg-[#7C3EFF] text-white rounded-md text-md font-medium hover:bg-gray-800 transition-colors">
                            {currentStep === 3 ? "Submit Application" : "Next"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}