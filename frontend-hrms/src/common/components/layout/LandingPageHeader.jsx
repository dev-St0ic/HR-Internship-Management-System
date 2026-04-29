import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";

export default function LandingPageHeader() {
    // 1. State to track the currently active section
    const [activeSection, setActiveSection] = useState("home");

    // 2. Observer to watch the sections as the user scrolls
    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                // This triggers the update when a section crosses the middle 50% of the screen
                rootMargin: "-50% 0px -50% 0px" 
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

        // Cleanup observer on unmount
        return () => observer.disconnect();
    }, []);

    // Helper function to apply the purple color to the active link
    const getLinkClass = (sectionId) => {
        const isActive = activeSection === sectionId;
        return `transition-colors duration-300 ${
            isActive ? "text-[#7C3EFF]" : "hover:text-[#7C3EFF]"
        }`;
    };

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
                        <a href="#home" className={getLinkClass("home")}>Home</a>
                        <a href="#about" className={getLinkClass("about")}>About Program</a>
                        <a href="#how-it-works" className={getLinkClass("how-it-works")}>How It Works</a>
                        <a href="#eligibility" className={getLinkClass("eligibility")}>Eligibility</a>
                        <a href="#faqs" className={getLinkClass("faqs")}>FAQs</a>
                    </nav>

                    {/* Right: Login Button */}
                    <Link 
                        to="/login" 
                        className="bg-[#120071] hover:bg-[#0B1D4B]/90 text-white text-sm font-bold px-8 py-2.5 rounded-full transition-all shadow-md"
                    >
                        Login
                    </Link>
                </header>
            </div>

            <Outlet />
        </div>
    );
}