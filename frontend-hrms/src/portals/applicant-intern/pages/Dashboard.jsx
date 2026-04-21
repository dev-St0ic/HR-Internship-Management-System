import Header from "../../../common/components/layout/Header";
import GreetingHeader from "../../../common/components/ui/GreetingHeader";
import CalendarPanel from "../../interns/components/ui/CalendarPanel";
import ApplicationTaskList from "../components/ui/ApplicationTaskList";
import Calendar from "../components/ui/Calendar";
import DashboardStepper from "../components/ui/DashboardStepper";
import { mockApplicationData } from "../../../common/config/mockApplicationData";

export default function Dashboard(){

    const { personalInfo, schoolInfo, applicationProgress, documents } = mockApplicationData;

    return(
        <>
            <Header title="Dashboard" subtitle="Track application progress" userRole="applicant"/>
            <GreetingHeader name={`${personalInfo.firstName} ${personalInfo.lastName}`} />

                {/* Added px-6 md:px-8 and pb-8 here to push the cards inward from the screen edges! */}
                <div className="flex flex-col h-full px-6 md:px-8 pb-8">
                    
                    <div className="flex flex-col lg:flex-row gap-6 mt-8">
                        <div className="flex-[2] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-8">Internship Application</h3>
                            
                            {/* 1. The Stepper (with built-in status banner) */}
                            <DashboardStepper 
                                currentStep={applicationProgress.currentStep}   
                                status={applicationProgress.statusType}
                                statusMessage={applicationProgress.statusMessage} 
                            />
                            
                            {/* 2. The Task List (Accordion & Tasks) */}
                            <ApplicationTaskList 
                                documentsList={documents}
                                progress={applicationProgress.progressPercentage}
                            />
                        </div>
                        
                        {/* Empty box to hold space until we build the Calendar component */}
                        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 h-fit">
                            <Calendar />
                        </div>
                    
                    </div>
                    
                </div>
            
        </>
    );
}