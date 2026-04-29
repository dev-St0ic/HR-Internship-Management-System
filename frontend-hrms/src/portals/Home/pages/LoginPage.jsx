import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import OtpForm from "../components/auth/OtpForm";
import LoginIllustration from "../components/auth/LoginIllustration";
import SuccessModal from "../components/auth/SuccessModal";

export default function LoginPage() {
    const [currentView, setCurrentView] = useState("login");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSuccessClose = () => {
        setShowSuccessModal(false);
        setCurrentView("login");
    }

    const getSlideIndex = () => {
        if (currentView === "login") return 0;
        if (currentView === "forgot") return 1;
        if (currentView === "otp") return 2;
        return 0;
    };

    const slideIndex = getSlideIndex();

    return (
        <div className="h-screen w-full bg-white font-lexend flex items-center justify-center p-[10px] md:p-3">
            <div className="flex w-full h-full max-w-[5000px]">
                
                {showSuccessModal && <SuccessModal onClose={handleSuccessClose} />}

                {/* --- Left Side: Static Illustration Panel --- */}
                <div className="hidden md:flex md:w-1/2 lg:w-[55%] bg-[#F8F8FC] rounded-[2rem] items-center justify-center overflow-hidden">
                    <LoginIllustration />
                </div>
                
                {/* --- Right Side: Sliding Form Panel --- */}
                {/* ADDED: h-full so the wrapper stretches to the bottom */}
                <div className="w-full md:w-1/2 lg:w-[45%] flex flex-col overflow-hidden relative h-full">
                    
                    {/* The Sliding Track */}
                    {/* ADDED: h-full so the track matches the wrapper height */}
                    <div 
                        className="flex w-full h-full transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                    >
                        
                        {/* 1. Login Form Container */}
                        {/* ADDED: h-full flex flex-col justify-center to vertically center the form */}
                        <div className="w-full h-full flex-shrink-0 flex flex-col justify-center px-8 md:px-12 lg:px-20 xl:px-24 overflow-y-auto">
                            <fieldset disabled={currentView !== "login"} className="border-none p-1 m-0 w-full">
                                <LoginForm onForgotPassword={() => setCurrentView("forgot")} />
                            </fieldset>
                        </div>

                        {/* 2. Forgot Password Container */}
                        <div className="w-full h-full flex-shrink-0 flex flex-col justify-center px-8 md:px-12 lg:px-20 xl:px-24 overflow-y-auto">
                            <fieldset disabled={currentView !== "forgot"} className="border-none p-1 m-0 w-full">
                                <ForgotPasswordForm
                                    onBackToLogin={() => setCurrentView("login")} 
                                    onSendOtp={() => setCurrentView("otp")}
                                />
                            </fieldset>
                        </div>

                        {/* 3. OTP Container */}
                        <div className="w-full h-full flex-shrink-0 flex flex-col justify-center px-8 md:px-12 lg:px-20 xl:px-24 overflow-y-auto">
                            <fieldset disabled={currentView !== "otp"} className="border-none p-1 m-0 w-full">
                                <OtpForm 
                                    onBack={() => setCurrentView("forgot")}
                                    onSuccess={() => setShowSuccessModal(true)}
                                />
                            </fieldset>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}