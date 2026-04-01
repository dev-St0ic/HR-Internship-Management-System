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
            <h2 className="text-[28px] md:text-3xl font-bold text-gray-900 mb-2">Welcome</h2>
            <p className="text-sm text-gray-400 mb-8">Please login here</p>

            <form onSubmit={handleLogin} className="flex flex-col">
                
                <div className="mb-4 border border-gray-300 rounded-lg px-4 py-2 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all bg-white">
                    <label className="block text-[11px] text-gray-400 mb-0.5">Email Address</label>
                    <input 
                        type="email" 
                        placeholder="companyemail@gmail.com" 
                        className="w-full text-sm outline-none text-gray-900 bg-transparent placeholder-gray-400"
                        required
                    />
                </div>

                <div className="mb-5 border border-gray-300 rounded-lg px-4 py-2 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all bg-white relative">
                    <label className="block text-[11px] text-gray-400 mb-0.5">Password</label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••••••" 
                        className="w-full text-sm outline-none text-gray-900 bg-transparent placeholder-gray-400 pr-10"
                        required
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                        )}
                    </button>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded text- border-gray-300 focus:ring-black cursor-pointer accent-gray-400" />
                        <span className="text-sm text-gray-700 group-hover:text-black transition-colors">Remember Me</span>
                    </label>
                    
                    <button 
                        type="button" 
                        onClick={onForgotPassword}
                        className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        Forgot Password?
                    </button>
                </div>

                <button type="submit" className="w-full bg-[#b3b3b3] hover:bg-gray-400 text-white font-medium py-3.5 rounded-lg transition-colors">
                    Login
                </button>
                
            </form>
        </div>
        </div>
    );
}