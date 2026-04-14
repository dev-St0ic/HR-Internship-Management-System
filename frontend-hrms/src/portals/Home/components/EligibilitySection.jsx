import { GraduationCap, BookOpen, ClipboardEdit, Award } from "lucide-react";

export default function EligibilitySection() {
    return (
        <section id="eligibility" className="py-24 px-6 bg-[#F4F4F9]">
            <div className="max-w-5xl mx-auto">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#130E49] mb-4">
                        Who Can Apply
                    </h2>
                    <p className="text-[15px] md:text-base font-semibold text-[#130E49]/80 max-w-3xl mx-auto leading-relaxed px-4">
                        This internship program is open to students and individuals who are eager to gain practical experience and develop their skills in a professional environment.
                    </p>
                </div>

                {/* Staggered 2-Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    
                    {/* LEFT COLUMN */}
                    <div className="flex flex-col gap-5">
                        
                        {/* Card 1: Students */}
                        <div className="bg-white p-8 md:p-10 shadow-sm transition-transform hover:-translate-y-1 duration-300 rounded-tl-[3rem]">
                            <GraduationCap className="text-[#7C3EFF] w-12 h-12 mb-6" strokeWidth={1.2} />
                            <h3 className="text-xl font-bold text-[#130E49] mb-3">Students</h3>
                            <p className="text-[15px] text-gray-600 leading-relaxed font-medium">
                                This program is open to currently enrolled students and fresh graduates who are looking to gain real-world experience and prepare for their future careers.
                            </p>
                        </div>

                        {/* Card 3: Willing to Learn */}
                        <div className="bg-white p-8 md:p-10 shadow-sm transition-transform hover:-translate-y-1 duration-300 rounded-bl-[3rem]">
                            <ClipboardEdit className="text-[#7C3EFF] w-12 h-12 mb-6" strokeWidth={1.2} />
                            <h3 className="text-xl font-bold text-[#130E49] mb-3">Willing to Learn and Adapt</h3>
                            <p className="text-[15px] text-gray-600 leading-relaxed font-medium">
                                We welcome individuals who are eager to learn, open to feedback, and ready to adapt to a professional work environment.
                            </p>
                        </div>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="flex flex-col gap-5 md:mt-5">
                        
                        {/* Card 2: Basic Knowledge */}
                        <div className="bg-white p-8 md:p-10 shadow-sm transition-transform hover:-translate-y-1 duration-300 rounded-tr-[3rem]">
                            <BookOpen className="text-[#7C3EFF] w-12 h-12 mb-6" strokeWidth={1.2} />
                            <h3 className="text-xl font-bold text-[#130E49] mb-3">Basic Knowledge in the Field</h3>
                            <p className="text-[15px] text-gray-600 leading-relaxed font-medium">
                                Applicants should have foundational knowledge or skills related to their chosen role, allowing them to actively participate and contribute during the internship.
                            </p>
                        </div>

                        {/* Card 4: Responsible and Committed */}
                        <div className="bg-white p-8 md:p-10 shadow-sm transition-transform hover:-translate-y-1 duration-300 rounded-br-[3rem]">
                            <Award className="text-[#7C3EFF] w-12 h-12 mb-6" strokeWidth={1.2} />
                            <h3 className="text-xl font-bold text-[#130E49] mb-3">Responsible and Committed</h3>
                            <p className="text-[15px] text-gray-600 leading-relaxed font-medium">
                                Applicants must be dependable, committed to completing tasks, and able to manage their time effectively to meet deadlines.
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}