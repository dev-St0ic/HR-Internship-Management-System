import { useState } from "react";
import CreateAccountStep1 from "../components/auth/CreateAccountStep1";
import CreateAccountStep2 from "../components/auth/CreateAccountStep2";
import Step1Img from "../../../assets/images/ForgotPassImg.png"; 

export default function CreateAccountPage() {
    const [currentView, setCurrentView] = useState("step1");

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
        <div className="h-screen w-full bg-white font-lexend flex items-center justify-center p-[10px] md:p-3 overflow-hidden">
            <div className="flex w-full h-full max-w-[5000px]">
                
                {/* --- Left Side: Static Illustration Panel --- */}
                {/* Now it just holds one solid image, acting as a clean visual anchor */}
                <div className="hidden md:flex md:w-1/2 lg:w-[55%] bg-[#F8F8FC] rounded-[2rem] items-center justify-center relative overflow-hidden">
                    <img 
                        src={Step1Img} 
                        alt="Create Account Illustration" 
                        className="w-full max-w-[500px] h-auto object-contain" 
                    />
                </div>
                
                {/* --- Right Side: Form Panel --- */}
                <div className="w-full md:w-1/2 lg:w-[45%] relative overflow-hidden">
                    
                    {/* The sliding "track" for the forms remains buttery smooth! */}
                    <div 
                        className={`flex w-full h-full transition-transform duration-500 ease-in-out ${
                            currentView === "step1" ? "translate-x-0" : "-translate-x-full"
                        }`}
                    >
                        
                        {/* Step 1 Container */}
                        <div className="w-full h-full flex-shrink-0 flex flex-col justify-center px-8 md:px-12 lg:px-20 xl:px-24 overflow-y-auto">
                            <CreateAccountStep1
                                formData={formData} 
                                setFormData={setFormData}
                                onNext={() => setCurrentView("step2")} 
                            />
                        </div>

                        {/* Step 2 Container */}
                        <div className="w-full h-full flex-shrink-0 flex flex-col justify-center px-8 md:px-12 lg:px-20 xl:px-24 overflow-y-auto">
                            <CreateAccountStep2
                                formData={formData} 
                                setFormData={setFormData}
                                onBack={() => setCurrentView("step1")} 
                            />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}