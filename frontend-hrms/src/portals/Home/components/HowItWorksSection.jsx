import Reveal from "../../../common/components/ui/Reveal";

export default function HowItWorksSection() {
    const steps = [
        { id: 1, title: "Application Submission", desc: "Submit your application form with your details and preferred internship role." },
        { id: 2, title: "Screening Process", desc: "Applications are reviewed, and shortlisted candidates may undergo a brief interview." },
        { id: 3, title: "Onboarding and Orientation", desc: "Accepted applicants will attend orientation to understand the program, roles, and expectations." },
        { id: 4, title: "Project Assignment and Training", desc: "Interns are assigned to projects and receive hands-on training with mentor guidance." },
        { id: 5, title: "Performance Evaluation and Feedback", desc: "Progress is monitored, and feedback is provided to support improvement." },
        { id: 6, title: "Completion and Certification", desc: "Interns who complete the program receive a Certificate of Completion." },
    ];

    return (
        <section id="how-it-works" className="py-24 px-6 bg-[#EEECF9]">
            <div className="max-w-5xl mx-auto">
                
                {/* Title pops up first */}
                <Reveal>
                    <h2 className="text-4xl md:text-4xl font-bold text-center text-[#130E49] mb-20">
                        How It Works
                    </h2>
                </Reveal>
                
                <div className="relative flex flex-col items-center">
                    {/* The static center line */}
                    <div className="absolute top-4 bottom-4 w-1 bg-[#7AE3CF] left-8 md:left-1/2 md:-translate-x-1/2"></div>

                    {steps.map((step, index) => {
                        const isLeft = index % 2 === 0;
                        
                        return (
                            <div key={step.id} className={`relative flex w-full mb-8 md:mb-12 ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-start items-center`}>
                                
                                {/* The Purple Timeline Circle (Kept static to preserve absolute centering) */}
                                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 h-12 w-12 rounded-full bg-[#7C3EFF] text-white flex items-center justify-center font-black text-xl z-10 shadow-sm border-[3px] border-[#7AE3CF]">
                                    {step.id}
                                </div>

                                {/* The Content Card (Wrapped in Reveal to slide up!) */}
                                <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                                    <Reveal delay={150}>
                                        <div className="bg-[#7C3EFF] text-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition-transform duration-300">
                                            <h4 className="font-semibold text-xl mb-2">{step.title}</h4>
                                            <p className="text-md text-white/90 leading-relaxed font-sm">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </Reveal>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}