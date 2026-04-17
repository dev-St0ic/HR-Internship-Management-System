import { Outlet, Link } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";

export default function LandingPageHeader() {
    return (
        <div className="relative">
            <div className="fixed top-6 w-full flex justify-center z-50">
                <header className="w-[90%] max-w-6xl bg-white/90 backdrop-blur-md shadow-lg rounded-full px-8 py-3 flex justify-between items-center">
                    
                    {/* Left: Logo */}
                    <a href="#home" className="flex items-center gap-2">
                        <img src={Logo} alt="Ollopa Logo" className="h-12 w-auto object-contain scale-150 origin-left" />
                    </a>

                    {/* Middle: Navigation Links */}
                    <nav className="hidden md:flex gap-8 items-center text-sm font-bold text-gray-800">
                        <a href="#home" className="hover:text-[#7C3EFF] transition-colors">Home</a>
                        <a href="#about" className="hover:text-[#7C3EFF] transition-colors">About Program</a>
                        <a href="#how-it-works" className="hover:text-[#7C3EFF] transition-colors">How It Works</a>
                        <a href="#eligibility" className="hover:text-[#7C3EFF] transition-colors">Eligibility</a>
                        <a href="#faqs" className="hover:text-[#7C3EFF] transition-colors">FAQs</a>
                    </nav>

                    {/* Right: Login Button */}
                    <Link 
                        to="/login" 
                        className="bg-[#120071] hover:bg-[#130E49]/90 text-white text-sm font-bold px-8 py-2.5 rounded-full transition-all shadow-md"
                    >
                        Login
                    </Link>
                </header>
            </div>

            <Outlet />
        </div>
    );
}