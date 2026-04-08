import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import OtpForm from "../components/auth/OtpForm";
import LoginIllustration from "../components/auth/LoginIllustration";



export default function LoginPage() {
    const [currentView, setCurrentView] = useState("login");

    return (
        <div className="h-screen w-full bg-white font-lexend flex items-center justify-center p-[10px] md:p-3">
            <div className="flex w-full h-full max-w-[5000px]">
                
                <div className="hidden md:flex md:w-1/2 lg:w-[55%] bg-[#F8F8FC] rounded-[2rem] items-center justify-center">
                    <LoginIllustration />
                </div>
                    <div className="w-full md:w-2/5 flex flex-col justify-center px-6 md:px-8 lg:px-16 xl:px-24 overflow-y-auto">
                    
                    

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
                            />
                    )}

                </div>
            </div>
        </div>
    );
}