import { Link } from "react-router-dom";

export default function ApplyButton() {

    return (
        <>
            <Link 
                    to="/application-form" 
                    className="px-10 py-3 bg-[#b8b8b8] hover:bg-gray-400 text-white rounded-full font-medium transition-colors shadow-sm"
                >
                    Apply Now
            </Link>
        </>
    );
}