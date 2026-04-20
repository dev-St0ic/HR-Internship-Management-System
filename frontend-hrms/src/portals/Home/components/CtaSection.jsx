import { Link } from "react-router-dom";

export default function CtaSection() {

    
    return (
        <section className="py-24 px-6 bg-[#EEECF9]">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D4B] mb-4">
                    Ready to become an <span className="text-[#7C3EFF]">Intern at Ollopa?</span>
                </h2>
                
                {/* Subtext */}
                <p className="text-[18px] font-semibold text-[#120071]/80 max-w-3xl mx-auto leading-relaxed mb-8">
                    Join hundreds of student leaders who are already making an impact on their campuses.<br className="hidden md:block" />
                    Start your journey with Ollopa today!
                </p>
                
                {/* Apply Now Button */}
                <Link 
                    to="/create-account"
                    className="inline-block bg-[#120071] hover:bg-[#0B1D4B]/90 text-white font-bold text-[15px] px-10 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    Apply Now
                </Link>

            </div>
        </section>
    );
}