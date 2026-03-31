export default function ForgotPasswordForm({ onBackToLogin, onSendOtp }) {
    
    const handleReset = (e) => {
        e.preventDefault();
        onSendOtp();
    };

    return (
        <div className="animate-fade-in">

            <button 
                type="button" 
                onClick={onBackToLogin}
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8 text-sm font-medium"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Back
            </button>

            <h2 className="text-[28px] md:text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
            <p className="text-sm text-gray-400 mb-8">Enter your registered email address. we’ll send you a code to reset your password.</p>

            <form onSubmit={handleReset} className="flex flex-col">
                <div className="mb-8 border border-gray-300 rounded-lg px-4 py-2 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all bg-white">
                    <label className="block text-[11px] text-gray-400 mb-0.5">Email Address</label>
                    <input 
                        type="email" 
                        placeholder="companyemail@gmail.com" 
                        className="w-full text-sm outline-none text-gray-900 bg-transparent placeholder-gray-400"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-[#b3b3b3] hover:bg-gray-400 text-white font-medium py-3.5 rounded-lg transition-colors mb-4">
                    Send OTP
                </button>

                
            </form>
        </div>
    );
}