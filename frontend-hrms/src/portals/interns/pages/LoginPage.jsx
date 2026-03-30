import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import OtpForm from "../components/auth/OtpForm";



export default function LoginPage() {
    const [currentView, setCurrentView] = useState("login");

    return (
        <div className="h-screen w-full bg-white font-lexend flex items-center justify-center p-[10px] md:p-3">
            <div className="flex w-full h-full max-w-[5000px]">
                
                {/* LEFT SIDE: Stable Image Placeholder */}
                <div className="hidden md:block w-4/6 bg-[#efefef] rounded-[2rem]"></div>

                {/* RIGHT SIDE: Dynamic Content Area */}
                {/* Swapped sm:px-16 for md:px-8 and shifted the larger padding to lg and xl screens! */}
<div className="w-full md:w-2/5 flex flex-col justify-center px-6 md:px-8 lg:px-16 xl:px-24 overflow-y-auto">
                    
                    {/* Header Logo (Stays visible no matter what form is showing!) */}
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 bg-[#d9d9d9] rounded-full"></div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-wide">HRMS</h1>
                    </div>

                    {/* DYNAMIC FORM SWITCHER */}
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