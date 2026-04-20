import { Link } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";
import { footerSocialLinks } from "./footer/footerSocialLinks";


export default function Footer() {
    return (
        <footer className="bg-[#120071] text-white pt-20 pb-8 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-6 mb-16 items-center">
                    
                    <div className="md:col-span-6 flex justify-center md:justify-start relative h-12 items-center w-full">
                        <img 
                            src={Logo} 
                            alt="Ollopa Corporation Logo" 
                            className="absolute h-60 w-auto max-w-none object-contain md:left-0" 
                        />
                    </div>

                    <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="font-bold text-[15px] mb-4">Office</h4>
                        <p className="text-[13px] text-white/70 leading-loose">
                            Blk 70 Lot 18 Haring Silangan St.<br/>
                            Lagro Subd., Brgy. Greater
                        </p>
                    </div>

                    <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="font-bold text-[15px] mb-4">Contact</h4>
                        <p className="text-[13px] text-white/70 leading-loose">0906-292-0881</p>
                        <p className="text-[13px] text-white/70 leading-loose mt-1">ollopainternship@email.com</p>
                    </div>

                </div>

                {/* --- Bottom Section: Copyright & Socials --- */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-[13px] text-white/60">
                    
                    {/* Copyright */}
                    <p className="mb-4 md:mb-0">2026. All Rights Reserved</p>
                    
                    {/* Links */}
                    <div className="flex gap-8 mb-4 md:mb-0">
                        <Link to="/terms" className="hover:text-white transition-colors duration-200">Terms & Conditions</Link>
                        <Link to="/privacy" className="hover:text-white transition-colors duration-200">Privacy</Link>
                    </div>
                    
                    <div className="flex gap-5">
                        {footerSocialLinks.map(({ label, href, Icon }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-white text-white/60 transition-colors duration-200" aria-label={label}>
                                <Icon />
                            </a>
                        ))}
                    </div>

                </div>

            </div>
        </footer>
    );
}