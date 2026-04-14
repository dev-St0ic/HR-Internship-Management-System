import AboutSection from "../components/AboutSection";
import CtaSection from "../components/CtaSection";
import EligibilitySection from "../components/EligibilitySection";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
            {/* Assuming your <LandingPageHeader /> is handling the top nav bar via AppRouter */}
            
            <main className="grow">
                <HeroSection />
                <AboutSection />
                <HowItWorksSection />
                <EligibilitySection />
                <FaqSection />
                <CtaSection />
                
            </main>
            <Footer />
        </div>
    );
}