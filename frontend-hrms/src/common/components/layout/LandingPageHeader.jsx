import { Outlet, Link } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";
import { useTheme } from "../../theme/ThemeProvider";

export default function LandingPageHeader() {
    const { isDark } = useTheme();

    return (
        <div className="relative">
            <div className="fixed top-6 w-full flex justify-center z-50">
                <header className={`w-[90%] max-w-6xl rounded-full px-8 py-3 flex justify-between items-center backdrop-blur-md ${isDark ? "border border-slate-800 bg-slate-900/90 shadow-[0_18px_44px_rgba(2,6,23,0.42)]" : "bg-white/90 shadow-lg"}`}>
                    
                    {/* Left: Logo */}
                    <a href="#home" className="flex items-center gap-2">
                        <img src={Logo} alt="Ollopa Logo" className="h-12 w-auto object-contain scale-150 origin-left" />
                    </a>

                    {/* Middle: Navigation Links */}
                    <nav className={`hidden md:flex gap-8 items-center text-sm font-bold ${isDark ? "text-slate-100" : "text-gray-800"}`}>
                        <a href="#home" className="hover:text-[#7C3EFF] transition-colors">Home</a>
                        <a href="#about" className="hover:text-[#7C3EFF] transition-colors">About Program</a>
                        <a href="#how-it-works" className="hover:text-[#7C3EFF] transition-colors">How It Works</a>
                        <a href="#eligibility" className="hover:text-[#7C3EFF] transition-colors">Eligibility</a>
                        <a href="#faqs" className="hover:text-[#7C3EFF] transition-colors">FAQs</a>
                    </nav>

                    {/* Right: Login Button */}
                    <Link 
                        to="/login" 
                        className={`text-sm font-bold px-8 py-2.5 rounded-full transition-all shadow-md ${isDark ? "bg-[#7C3EFF] hover:bg-[#9062ff] text-white" : "bg-[#120071] hover:bg-[#130E49]/90 text-white"}`}
                    >
                        Login
                    </Link>
                </header>
            </div>

            <Outlet />
        </div>
    );
}