import { useState, useRef } from "react";

export default function OtpForm({ onBack, email = "companyemail@gmail.com", onSuccess }) {
    
    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const inputRefs = useRef([]);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 4) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = (e) => {
        e.preventDefault();
        const finalCode = otp.join("");
        console.log("Verifying OTP:", finalCode);
        
        onSuccess(); 
    };

    const isComplete = otp.every((digit) => digit !== "");

    

    return (
        <div className="animate-fade-in flex flex-col">
            
            <button 
                type="button" 
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8 text-sm font-medium w-max"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Back
            </button>

            <div className="w-full flex flex-col items-center md:items-start text-center md:text-left">
                
                <h2 className="text-[28px] md:text-3xl font-bold text-gray-900 mb-2">Enter OTP</h2>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                    We have shared a code with your registered email address <br className="hidden md:block" />
                    <span className="text-gray-500">{email}</span>
                </p>

                <form onSubmit={handleVerify} className="flex flex-col w-max">
                    
                    <div className="flex gap-2 sm:gap-3 lg:gap-4 mb-8">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                value={digit}
                                onChange={(e) => handleChange(index, e)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                
                                className="w-10 h-12 sm:w-11 sm:h-14 lg:w-14 lg:h-16 shrink-0 border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-900 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-white"
                                required
                            />
                        ))}
                    </div>

                    <button 
                        type="submit" 
                        disabled={!isComplete} 
                        className={`w-full font-medium py-3.5 rounded-lg transition-colors ${
                            isComplete 
                                ? "bg-[#7C3EFF] hover:bg-[#5b2ebd] text-white" 
                                : "bg-[#b3b3b3] text-white cursor-not-allowed"
                        }`}
                    >
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
}