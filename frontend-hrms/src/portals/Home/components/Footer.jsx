import { Link } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";

// --- Custom SVG Components ---
const TwitterIcon = ({ className = "" }) => (
    <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M22.5 2.13282C21.656 2.49955 20.763 2.74116 19.8492 2.85001C20.8095 2.28769 21.5317 1.39434 21.8803 0.337508C20.9724 0.86841 19.9807 1.24092 18.9478 1.43907C18.5129 0.983225 17.9897 0.620588 17.4103 0.373201C16.8308 0.125814 16.2071 -0.00115656 15.577 7.93801e-06C13.0261 7.93801e-06 10.9617 2.03438 10.9617 4.5422C10.9599 4.89102 10.9999 5.23881 11.0808 5.57813C9.25157 5.49238 7.4604 5.02575 5.82187 4.2081C4.18333 3.39044 2.73351 2.23977 1.56516 0.829695C1.15527 1.52069 0.938499 2.30909 0.9375 3.11251C0.9375 4.68751 1.75922 6.0797 3 6.89532C2.26487 6.87787 1.54481 6.68331 0.900938 6.32813V6.38438C0.900938 8.58751 2.49469 10.4203 4.60406 10.8375C4.2074 10.9432 3.79864 10.9968 3.38812 10.9969C3.09683 10.9974 2.8062 10.9691 2.52047 10.9125C3.10687 12.7172 4.81359 14.0297 6.83531 14.0672C5.19252 15.3333 3.1756 16.0175 1.10156 16.0125C0.733415 16.012 0.365609 15.99 0 15.9469C2.10993 17.2942 4.56255 18.0068 7.06594 18C15.5672 18 20.2116 11.0766 20.2116 5.07188C20.2116 4.87501 20.2064 4.67813 20.197 4.48595C21.0985 3.84472 21.8783 3.04787 22.5 2.13282Z" fill="currentColor"/>
    </svg>
);

const FacebookIcon = ({ className = "" }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path fillRule="evenodd" clipRule="evenodd" d="M22.5 12.0637C22.5 6.26522 17.7984 1.56366 12 1.56366C6.20156 1.56366 1.5 6.26522 1.5 12.0637C1.5 17.3043 5.33906 21.6482 10.3594 22.4366V15.0998H7.69266V12.0637H10.3594V9.75038C10.3594 7.11928 11.9273 5.66475 14.3255 5.66475C15.4744 5.66475 16.6763 5.87007 16.6763 5.87007V8.45428H15.3516C14.048 8.45428 13.6402 9.26335 13.6402 10.0949V12.0637H16.552L16.087 15.0998H13.6406V22.4376C18.6609 21.6496 22.5 17.3057 22.5 12.0637Z" fill="currentColor"/>
    </svg>
);

const YouTubeIcon = ({ className = "" }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M18.8599 3C21.069 3 22.8599 4.79086 22.8599 7V17C22.8599 19.2091 21.069 21 18.8599 21H5.14014C2.931 21 1.14014 19.2091 1.14014 17V7C1.14014 4.79086 2.931 3 5.14014 3H18.8599ZM10.4478 8.72363C9.78285 8.39118 9.00049 8.87478 9.00049 9.61816V14.3818C9.00049 15.1252 9.78285 15.6088 10.4478 15.2764L15.2114 12.8945C15.9483 12.526 15.9483 11.474 15.2114 11.1055L10.4478 8.72363Z" fill="currentColor"/>
    </svg>
);

const PinterestIcon = ({ className = "" }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12 4.39996C8.95541 4.39996 6.52632 6.69717 6.52632 9.4856C6.52632 9.67086 6.53693 9.8537 6.55763 10.0337C6.62187 10.5921 6.37986 11.174 5.86588 11.4015C5.10662 11.7377 4.20465 11.3679 4.07995 10.547C4.02726 10.2001 4 9.84575 4 9.4856C4 5.33112 7.60328 2 12 2C16.3967 2 20 5.33112 20 9.4856C20 13.6401 16.3967 16.9712 12 16.9712C11.5053 16.9712 11.0203 16.929 10.5492 16.8482L9.16595 21.1503C8.96216 21.7841 8.25608 22.1409 7.58889 21.9473C6.9217 21.7537 6.54604 21.083 6.74984 20.4492L10.7919 7.87792C10.9957 7.2441 11.7018 6.88723 12.369 7.08084C13.0362 7.27444 13.4119 7.9452 13.2081 8.57902L11.2948 14.5295C11.5253 14.557 11.7607 14.5712 12 14.5712C15.0446 14.5712 17.4737 12.274 17.4737 9.4856C17.4737 6.69717 15.0446 4.39996 12 4.39996Z" fill="currentColor"/>
    </svg>
);


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
                    
                    {/* Social Icons with Links */}
                    <div className="flex gap-5">
                        <a 
                            href="https://twitter.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-white text-white/60 transition-colors duration-200"
                            aria-label="Twitter"
                        >
                            <TwitterIcon />
                        </a>
                        <a 
                            href="https://facebook.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-white text-white/60 transition-colors duration-200"
                            aria-label="Facebook"
                        >
                            <FacebookIcon />
                        </a>
                        <a 
                            href="https://youtube.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-white text-white/60 transition-colors duration-200"
                            aria-label="YouTube"
                        >
                            <YouTubeIcon />
                        </a>
                        <a 
                            href="https://pinterest.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-white text-white/60 transition-colors duration-200"
                            aria-label="Pinterest"
                        >
                            <PinterestIcon />
                        </a>
                    </div>

                </div>

            </div>
        </footer>
    );
}