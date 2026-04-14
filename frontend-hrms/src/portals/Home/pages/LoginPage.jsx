import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import OtpForm from "../components/auth/OtpForm";
import LoginIllustration from "../components/auth/LoginIllustration";
import ForgotPasswordImg from "../../../assets/images/ForgotPassImg.png";
import OtpImg from "../../../assets/images/OtpImg.png";
import SuccessModal from "../components/auth/SuccessModal";



export default function LoginPage() {
    const [currentView, setCurrentView] = useState("login");

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSuccessClose = () => {
        setShowSuccessModal(false);
        setCurrentView("login");
    }

    return (
        <div className="h-screen w-full bg-white font-lexend flex items-center justify-center p-[10px] md:p-3">
            <div className="flex w-full h-full max-w-[5000px]">
                
                {showSuccessModal && <SuccessModal onClose={handleSuccessClose} />}

                <div className="hidden md:flex md:w-1/2 lg:w-[55%] bg-[#F8F8FC] rounded-[2rem] items-center justify-center">
                    {currentView === "login" && (
                        <LoginIllustration />
                    )}  
                    {currentView === "forgot" && (
                        <img 
                            src={ForgotPasswordImg} 
                            alt="Forgot Password Illustration" 
                            className="w-full max-w-[500px] h-auto object-contain animate-fade-in" 
                        />
                    )}
                    {currentView === "otp" && (
                        <img 
                            src={OtpImg}
                            alt="OTP Illustration" 
                            className="w-full max-w-[500px] h-auto object-contain animate-fade-in" 
                        />
                    )}
                </div>
                
                {/* --- Right Side: Form Panel --- */}
                <div className="w-full md:w-1/2 lg:w-[45%] flex flex-col justify-center px-8 md:px-12 lg:px-20 xl:px-24 overflow-y-auto">
                    
                    {currentView === "login" && (
                        <LoginForm onForgotPassword={() => setCurrentView("forgot")} />
                    )}

                    {currentView === "forgot" && (
                        <ForgotPasswordForm
                            onBackToLogin={() => setCurrentView("login")} 
                            onSendOtp={() => setCurrentView("otp")}
                        />
                    )}

                    {currentView === "otp" && (
                        <OtpForm 
                            onBack={() => setCurrentView("forgot")}
                            onSuccess={() => setShowSuccessModal(true)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}