import { Link } from "react-router-dom";
import heroBg from "../../../assets/images/HeroPageBg.png";
import heroImg1 from "../../../assets/images/HeroImg1.jpg";
import heroImg2 from "../../../assets/images/HeroImg2.jpg";
import heroImg3 from "../../../assets/images/HeroImg3.jpg";
import Reveal from "../../../common/components/ui/Reveal"; // Make sure this path is correct!

export default function HeroSection() {
    return (
        <section 
            id="home"
            className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-b from-teal-50/50 via-purple-100/50 to-blue-100/50"
            style={{backgroundImage: `url(${heroBg})`}}>
            
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                
                {/* 1. Title pops up immediately */}
                <Reveal>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Your Career, <span className="text-[#7C3EFF]">Anywhere</span>.<br />
                        Experience the Virtual Edge with <span className="text-[#7C3EFF]">Ollopa</span>
                    </h1>
                </Reveal>

                {/* 2. Subtitle pops up 200ms later */}
                <Reveal delay={200}>
                    <p className="text-base md:text-2xl text-gray-800 font-medium max-w-2xl mb-8">
                        Join the Ollopa Virtual Internship Program—a 100% remote experience designed 
                        for the next generation of forward-thinking professionals.
                    </p>
                </Reveal>

                {/* 3. Button pops up 400ms later */}
                <Reveal delay={400}>
                    <div className="mb-16">
                        <Link 
                            to="/create-account"
                            className="px-8 py-3 rounded-full font-medium text-white bg-[#120071] hover:bg-[#130E49]/90 transition shadow-lg inline-block"
                        >
                            Apply Now
                        </Link>
                    </div>
                </Reveal>

                {/* 3 Image Layout */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full max-w-5xl">
                    
                    {/* Left Image: Pops up at 600ms */}
                    <div className="w-full md:w-1/3">
                        <Reveal delay={600}>
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-gray-200 shadow-xl w-full">
                                <img src={heroImg1} alt="Meeting" className="w-full h-full object-cover" />
                            </div>
                        </Reveal>
                    </div>
                    
                    {/* Center Image: Pops up at 800ms */}
                    <div className="w-full md:w-1/3 translate-y-0 md:translate-y-12">
                        <Reveal delay={800}>
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-[#120071] p-6 shadow-xl w-full flex flex-col justify-between">
                                <h3 className="text-white md:text-lg font-bold text-center mb-4 leading-tight">
                                    Launch Your Career with<br/>Our Internship Program
                                </h3>
                                <div className="w-full h-[75%] rounded-[2rem] overflow-hidden bg-gray-200">
                                    <img src={heroImg2} alt="Working at desk" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Image: Pops up at 1000ms */}
                    <div className="w-full md:w-1/3">
                        <Reveal delay={1000}>
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-gray-200 shadow-xl w-full">
                                <img src={heroImg3} alt="Collaboration" className="w-full h-full object-cover" />
                            </div>
                        </Reveal>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}