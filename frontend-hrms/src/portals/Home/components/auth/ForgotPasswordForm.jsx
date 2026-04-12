export default function ForgotPasswordForm({ onBackToLogin, onSendOtp }) {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Sending OTP...");
        onSendOtp(); // This triggers the switch to the OTP view
    };

    return (
        <div className="animate-fade-in">
            
            {/* --- Back Button --- */}
            <button 
                onClick={onBackToLogin} 
                className="flex items-center gap-1.5 text-gray-500 hover:text-[#111827] mb-8 transition-colors text-[15px] font-medium"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Back
            </button>

            {/* --- Header & Subtext --- */}
            <h2 className="text-[28px] md:text-[32px] font-bold text-[#111827] mb-3">
                Forgot Password
            </h2>
            <p className="text-[14px] text-[#A0A0A0] mb-8 leading-relaxed max-w-[90%]">
                Enter your registered email address, we'll send you a code to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col">
                
                {/* --- Email Input (Purple Focus) --- */}
                <div className="mb-6 border border-[#D0D5DD] rounded-lg px-4 py-2.5 focus-within:border-[#7C3EFF] focus-within:ring-1 focus-within:ring-[#7C3EFF] transition-all bg-white">
                    <label className="block text-[11px] text-[#7C3EFF] mb-0.5 font-medium">Email Address</label>
                    <input 
                        type="email" 
                        placeholder="companyemail@gmail.com" 
                        className="w-full text-[15px] outline-none text-gray-900 bg-transparent placeholder-gray-400 font-medium"
                        required
                    />
                </div>

                {/* --- Send OTP Button --- */}
                <button type="submit" className="w-full bg-[#7C3EFF] hover:bg-[#6A32E6] text-white font-medium py-[14px] rounded-lg transition-colors text-[15px]">
                    Send OTP
                </button>
                
            </form>
        </div>
    );
}