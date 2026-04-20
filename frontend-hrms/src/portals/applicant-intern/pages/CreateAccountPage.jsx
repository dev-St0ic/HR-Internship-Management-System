import { useState } from "react";
import CreateAccountStep1 from "../components/auth/CreateAccountStep1";
import CreateAccountStep2 from "../components/auth/CreateAccountStep2";
import Step1Img from "../../../assets/images/ForgotPassImg.png";
import Step2Img from "../../../assets/images/OtpImg.png";


export default function CreateAccountPage() {
    const [currentView, setCurrentView] = useState("step1");

    // We hold the form data at the Page level so it persists between views
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreedToTerms: false,
    });

    return (
        <div className="h-screen w-full bg-white font-lexend flex items-center justify-center p-[10px] md:p-3">
            <div className="flex w-full h-full max-w-[5000px]">
                
                {/* --- Left Side: Illustration Panel --- */}
                <div className="hidden md:flex md:w-1/2 lg:w-[55%] bg-[#F8F8FC] rounded-[2rem] items-center justify-center">
                    {currentView === "step1" && (
                        <img 
                            src={Step1Img} 
                            alt="Step 1 Illustration" 
                            className="w-full max-w-[500px] h-auto object-contain animate-fade-in" 
                        />
                    )}
                    {currentView === "step2" && (
                        <img 
                            src={Step2Img} 
                            alt="Step 2 Illustration" 
                            className="w-full max-w-[500px] h-auto object-contain animate-fade-in" 
                        />
                    )}
                </div>
                
                {/* --- Right Side: Form Panel --- */}
                <div className="w-full md:w-1/2 lg:w-[45%] flex flex-col justify-center px-8 md:px-12 lg:px-20 xl:px-24 overflow-y-auto">
                    
                    {currentView === "step1" && (
                        <CreateAccountStep1
                            formData={formData} 
                            setFormData={setFormData}
                            onNext={() => setCurrentView("step2")} 
                        />
                    )}

                    {currentView === "step2" && (
                        <CreateAccountStep2
                            formData={formData} 
                            setFormData={setFormData}
                            onBack={() => setCurrentView("step1")} 
                        />
                    )}

                </div>
            </div>
        </div>
    );
}