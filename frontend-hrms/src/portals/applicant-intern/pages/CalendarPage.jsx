import Header from "../../../common/components/layout/Header";
import BigCalendar from "../components/ui/BigCalendar";
import Calendar from "../components/ui/Calendar";

export default function ApplicantCalendarPage() {
    return (
        <div className="flex flex-col h-full bg-[#F8F9FA]">
            {/* Header mapped to the Applicant portal */}
            <Header title="Calendar" subtitle="Your schedule & deadlines" userRole="applicant" />
            
            <div className="p-6 md:p-8">
                {/* Responsive Grid: Stacks on mobile, splits 2/3 and 1/3 on large screens */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* --- Left Side: Big Calendar --- */}
                    <div className="lg:col-span-2">
                        <BigCalendar />
                    </div>

                    {/* --- Right Side: Mini Calendar --- */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <Calendar />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}