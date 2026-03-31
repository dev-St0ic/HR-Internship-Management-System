import { Link } from "react-router-dom";
import ApplyButton from "../components/ui/ApplyButton";

export default function LandingPage() {
    return (
        <div className="w-full font-roboto">
            
           
            <section className="min-h-screen bg-[#ebebeb] flex flex-col items-center justify-center pt-24 px-5 text-center">
                
                <h1 className="text-4xl md:text-5xl text-[#333333] leading-tight mb-6">
                    Your Career, <span className="font-bold">Anywhere.</span><br />
                    Experience the Virtual Edge with <span className="font-bold">Ollopa</span>
                </h1>
                
                <p className="max-w-[700px] text-base text-[#333333] mb-10 leading-6">
                    Join the Ollopa Virtual Internship Program—a 100% remote experience designed <br className="hidden md:block"/>
                    for the next generation of forward-thinking professionals.
                </p>

            
                <ApplyButton />
                
            </section>

        </div>
    );
}