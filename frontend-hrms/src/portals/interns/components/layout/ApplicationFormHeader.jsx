import { Link, Outlet } from "react-router-dom";

export default function ApplicationFormHeader() {

    return(
        <div className="min-h-screen bg-[#fafafa] font-lexend">

            <header className="w-full bg-[#e6e6e6] py-8 px-6 md:px-24 flex items-center gap-5">
                
                    <div className="w-10 h-10 bg-[#a3a3a3] rounded-full flex-shrink-0"></div>
                        
                        <div className="flex flex-col">
                        <h1 className="text-[22px] md:text-2xl font-semibold text-black leading-tight">
                            Ollopa Internship Application Form
                        </h1>
                        <p className="text-gray-600 text-sm mt-1">
                            Please fill out all required fields to submit your application.
                        </p>

                    

                    </div>
                </header>



        <main>
            <Outlet />
        </main>
        </div>
    
    );
}