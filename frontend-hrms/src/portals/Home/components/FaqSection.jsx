import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import faqImg from "../../../assets/images/FaqImg.jpg";
import Reveal from "../../../common/components/ui/Reveal";

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "Is the internship truly 100% remote?",
            answer: "Yes! You will never be required to report to a physical office. All meetings, tasks, and collaborations happen via our digital workspace (Discord/Zoom/Google Meet), allowing you to work from anywhere in the Philippines."
        },
        { question: "What equipment do I need to start?", answer: "A reliable computer/laptop and a stable internet connection are required." },
        { question: "Does Ollopa provide a Certificate of Completion (COC)?", answer: "Yes, all interns who successfully finish the program requirements receive a COC." },
        { question: "Is there a minimum number of hours required per day?", answer: "This depends on your specific university requirements and agreement during onboarding." },
        { question: "Are there opportunities for leadership?", answer: "Absolutely. We encourage interns to take initiative and step into project leadership roles." }
    ];

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faqs" className="py-24 px-6 bg-[#F4F4F9]">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                
                {/* LEFT SIDE: Title & Image */}
                <div className="w-full lg:w-[45%]">
                    <Reveal delay={0}>
                        <span className="inline-block px-5 py-1.5 rounded-full border border-gray-300 text-[13px] font-bold text-[#130E49] mb-6">
                            FAQs
                        </span>
                    </Reveal>
                    
                    <Reveal delay={150}>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#130E49] mb-10 leading-[1.2]">
                            Got Questions?<br/>We've Got You Covered.
                        </h2>
                    </Reveal>
                    
                    <Reveal delay={300}>
                        <div className="rounded-[2.5rem] overflow-hidden bg-gray-200 aspect-[4/3] shadow-md border border-gray-100">
                            <img src={faqImg} alt="Interns working on couch" className="w-full h-full object-cover" />
                        </div>
                    </Reveal>
                </div>

                {/* RIGHT SIDE: Accordion */}
                <div className="w-full lg:w-[55%] flex flex-col gap-4 mt-8 lg:mt-0">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        
                        return (
                            <Reveal key={index} delay={200 + (index * 150)}>
                                <div 
                                    className={`rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-[#DCD8F3]' : 'bg-[#EAE8F5]'}`}
                                >
                                    <button 
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                                    >
                                        <span className="font-bold text-lg text-[#130E49] pr-8">
                                            {faq.question}
                                        </span>

                                        <div className={`text-[#130E49] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                            <ChevronDown size={20} strokeWidth={2.5} />
                                        </div>
                                    </button>
                                    
                                    <div 
                                        className={`grid transition-all duration-300 ease-in-out ${
                                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-6 pb-6 text-md text-gray-700 leading-relaxed font-medium pr-12">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Reveal>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}