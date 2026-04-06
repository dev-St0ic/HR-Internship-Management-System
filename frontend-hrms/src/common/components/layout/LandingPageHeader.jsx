import { Link, Outlet } from "react-router-dom";

export default function LandingPageHeader() {
    return (
        
        <div className="min-h-screen font-roboto">
            
            
            <header className="fixed top-8 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 z-50">
                <nav className="flex items-center justify-between bg-white rounded-full px-8 py-3.5 shadow-sm">
                    
                    <Link 
                        to="/" 
                        className="w-[80px] h-[32px] bg-[#d9d9d9] rounded-full hover:opacity-80 transition-opacity" 
                        aria-label="Home"
                    ></Link>

                    <ul className="hidden md:flex items-center gap-8 text-base text-[#333333]">
                        <li><Link to="/" className="hover:text-[#b8b8b8] transition-colors">Home</Link></li>
                        <li><Link to="/about" className="hover:text-[#b8b8b8] transition-colors">About Program</Link></li>
                        <li><Link to="/how-it-works" className="hover:text-[#b8b8b8] transition-colors">How It Works</Link></li>
                        <li><Link to="/eligibility" className="hover:text-[#b8b8b8] transition-colors">Eligibility</Link></li>
                        <li><Link to="/faqs" className="hover:text-[#b8b8b8] transition-colors">FAQs</Link></li>
                    </ul>

                    <Link 
                        to="/login" 
                        className="px-8 py-2 text-base text-white bg-[#b8b8b8] hover:bg-gray-400 rounded-full transition-colors font-medium"
                    >
                        Login
                    </Link>
                </nav>
            </header>

            <main className="flex-1 w-full">
                <Outlet />
            </main>
            
        </div>
    );
}