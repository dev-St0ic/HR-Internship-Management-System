export default function SuccessModal({ onClose }) {
    return (
        // The outer div acts as the dark, blurred overlay
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 animate-fade-in">
            
            {/* The white modal box */}
            <div className="bg-white rounded-3xl p-8 md:p-10 w-full max-w-[400px] flex flex-col items-center text-center shadow-2xl transform transition-all duration-300 scale-100">
                
                <div className="text-[64px] leading-none mb-6">
                    🎉
                </div>
                
                {/* Heading */}
                <h3 className="text-[22px] font-bold text-[#111827] mb-2 leading-tight">
                    Password Updated<br/>Successfully
                </h3>
                
                {/* Subtext */}
                <p className="text-[13px] text-[#A0A0A0] mb-8 px-4">
                    Your password has been updated successfully
                </p>
                
                {/* Back to Login Button */}
                <button
                    onClick={onClose}
                    className="w-full bg-[#7C3EFF] hover:bg-[#6A32E6] text-white font-medium py-[14px] rounded-xl transition-colors text-[15px]"
                >
                    Back to Login
                </button>
                
            </div>
        </div>
    );
}