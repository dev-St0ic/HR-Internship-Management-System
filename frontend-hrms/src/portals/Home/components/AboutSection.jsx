import aboutImg1 from "../../../assets/images/AboutImg1.jpg";
import aboutImg2 from "../../../assets/images/AboutImg2.jpg";
import aboutImg3 from "../../../assets/images/AboutImg3.jpg";
import Reveal from "../../../common/components/ui/Reveal"; // Import the animation component

export default function AboutSection() {
    return (
        <section id="about" className="py-24 px-6 bg-[#F4F4F9]">
            <div className="max-w-6xl mx-auto">
                
                {/* --- Top Stats Row --- */}
                {/* Each stat pops up one after another (0ms, 150ms, 300ms, 450ms) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 text-center text-[#130E49]">
                    <Reveal delay={0}>
                        <div className="flex flex-col items-center">
                            <h3 className="text-4xl md:text-5xl font-bold mb-3">4.8k</h3>
                            <p className="text-lg font-medium text-[#120071]">Job Completed</p>
                        </div>
                    </Reveal>
                    
                    <Reveal delay={150}>
                        <div className="flex flex-col items-center">
                            <h3 className="text-4xl md:text-5xl font-bold mb-3">12+</h3>
                            <p className="text-lg font-medium text-[#120071]">Industry Experience</p>
                        </div>
                    </Reveal>
                    
                    <Reveal delay={300}>
                        <div className="flex flex-col items-center">
                            <h3 className="text-4xl md:text-5xl font-bold mb-3">2.5k+</h3>
                            <p className="text-lg font-medium text-[#120071]">World wide clients</p>
                        </div>
                    </Reveal>
                    
                    <Reveal delay={450}>
                        <div className="flex flex-col items-center">
                            <h3 className="text-4xl md:text-5xl font-bold mb-3">120+</h3>
                            <p className="text-lg font-medium text-[#120071]">Won Awards</p>
                        </div>
                    </Reveal>
                </div>

                {/* --- Middle Text Content --- */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <Reveal delay={100}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            <span className="text-[#7C3EFF]">Virtual</span> <span className="text-[#130E49]">Internship Program</span>
                        </h2>
                    </Reveal>
                    
                    <Reveal delay={300}>
                        <p className="text-xl font-semibold text-gray-900 leading-relaxed mb-6 px-4">
                            Ollopa Corporation is a multifaceted tech and travel firm (encompassing brands 
                            like eGetinnz, FifiTours, and FifiBuy) dedicated to bridging the gap between 
                            academic theory and corporate reality.
                        </p>
                    </Reveal>
                    
                    <Reveal delay={500}>
                        <p className="text-xl font-semibold text-gray-900 leading-relaxed px-4">
                            We aren't just a company; we are an ecosystem built for students. Our Virtual 
                            Internship Program is designed to provide real-world experience across all 
                            disciplines, focusing on digital collaboration and professional excellence.
                        </p>
                    </Reveal>
                </div>

                {/* --- Bottom Images Row --- */}
                {/* Images pop in left to right (200ms, 400ms, 600ms) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Left Image */}
                    <div>
                        <Reveal delay={200}>
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200 shadow-sm border border-gray-100">
                                <img src={aboutImg1} alt="Team Meeting" className="w-full h-full object-cover" />
                            </div>
                        </Reveal>
                    </div>
                    
                    {/* Center Image */}
                    <div>
                        <Reveal delay={400}>
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200 shadow-sm border border-gray-100">
                                <img src={aboutImg2} alt="Busy Office" className="w-full h-full object-cover" />
                            </div>
                        </Reveal>
                    </div>
                    
                    {/* Right Image */}
                    <div>
                        <Reveal delay={600}>
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200 shadow-sm border border-gray-100">
                                <img src={aboutImg3} alt="High Five" className="w-full h-full object-cover" />
                            </div>
                        </Reveal>
                    </div>
                </div>

            </div>
        </section>
    );
}