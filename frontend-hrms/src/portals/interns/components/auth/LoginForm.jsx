import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ onForgotPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Logging in...");
        navigate("/intern");
    };

    return (
        <div>
            <div className="animate-fade-in">
                
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-[#7C3EFF] rounded-full flex items-center justify-center text-white shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <h1 className="text-[26px] font-bold text-[#111827] tracking-wide">HRIMS</h1>
                </div>

                <h2 className="text-[28px] md:text-[32px] font-bold text-gray-900 mb-2">
                    Welcome 👋
                </h2>
                <p className="text-[15px] text-gray-400 mb-10">Please login here</p>

                <form onSubmit={handleLogin} className="flex flex-col">
                    
                    {/* --- Email Input  --- */}
                    <div className="mb-4 border border-[#D0D5DD] rounded-lg px-4 py-2.5 focus-within:border-[#7C3EFF] focus-within:ring-1 focus-within:ring-[#7C3EFF] transition-all bg-white">
                        <label className="block text-[11px] text-[#7C3EFF] mb-0.5 font-medium">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="companyemail@gmail.com" 
                            className="w-full text-[15px] outline-none text-gray-900 bg-transparent placeholder-gray-400 font-medium"
                            required
                        />
                    </div>

                    {/* --- Password Input --- */}
                    <div className="mb-6 border border-[#D0D5DD] rounded-lg px-4 py-2.5 focus-within:border-[#7C3EFF] focus-within:ring-1 focus-within:ring-[#7C3EFF] transition-all bg-white relative">
                        <label className="block text-[11px] text-[#7C3EFF] mb-0.5 font-medium">Password</label>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••••••" 
                            className="w-full text-[15px] outline-none text-gray-900 bg-transparent placeholder-gray-400 font-medium tracking-widest pr-10"
                            required
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#7C3EFF] transition-colors"
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                            )}
                        </button>
                    </div>

                    {/* --- Options Row --- */}
                    <div className="flex items-center justify-between mb-8">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-[18px] h-[18px] rounded border-gray-300 cursor-pointer accent-[#7C3EFF]" />
                            <span className="text-sm text-gray-700 font-medium">Remember Me</span>
                        </label>
                        
                        <button 
                            type="button" 
                            onClick={onForgotPassword}
                            className="text-sm text-[#7C3EFF] hover:text-[#5B29CC] font-medium transition-colors"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* --- Login Button --- */}
                    <button type="submit" className="w-full bg-[#7C3EFF] hover:bg-[#6A32E6] text-white font-medium py-[14px] rounded-lg transition-colors text-[15px]">
                        Login
                    </button>
                    
                </form>
            </div>
        </div>
    );
}