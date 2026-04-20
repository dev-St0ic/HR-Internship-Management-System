import { Link } from 'react-router-dom';

export default function CreateAccountStep1({ formData, setFormData, onNext }) {
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(); 
    };

    return (
        <div>
            <div className="animate-fade-in">
                
                {/* --- Header & Logo --- */}
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-[#7C3EFF] rounded-full flex items-center justify-center text-white shrink-0">
                        <img src="/image.png" alt="" />
                    </div>
                    <h1 className="text-[26px] font-bold text-[#111827] tracking-wide">HRIMS</h1>
                </div>

                <h2 className="text-[28px] md:text-[32px] font-bold text-gray-900 mb-2">
                    Welcome 👋
                </h2>
                <p className="text-[15px] text-gray-400 mb-8">Create account</p>

                <form onSubmit={handleSubmit} className="flex flex-col">
                    
                    {/* --- First Name Input --- */}
                    <div className="mb-4 border border-[#D0D5DD] rounded-lg px-4 py-2.5 focus-within:border-[#7C3EFF] focus-within:ring-1 focus-within:ring-[#7C3EFF] transition-all bg-white">
                        <label className="block text-[11px] text-[#7C3EFF] mb-0.5 font-medium">First Name</label>
                        <input 
                            type="text" name="firstName" 
                            value={formData.firstName} onChange={handleChange}
                            placeholder="Enter your first name" 
                            className="w-full text-[15px] outline-none text-gray-900 bg-transparent placeholder-gray-400 font-medium"
                            required
                        />
                    </div>

                    {/* --- Middle Name Input --- */}
                    <div className="mb-4 border border-[#D0D5DD] rounded-lg px-4 py-2.5 focus-within:border-[#7C3EFF] focus-within:ring-1 focus-within:ring-[#7C3EFF] transition-all bg-white">
                        <label className="block text-[11px] text-[#7C3EFF] mb-0.5 font-medium">Middle Name</label>
                        <input 
                            type="text" name="middleName" 
                            value={formData.middleName} onChange={handleChange}
                            placeholder="Enter your middle name (Optional)" 
                            className="w-full text-[15px] outline-none text-gray-900 bg-transparent placeholder-gray-400 font-medium"
                        />
                    </div>

                    {/* --- Last Name Input --- */}
                    <div className="mb-6 border border-[#D0D5DD] rounded-lg px-4 py-2.5 focus-within:border-[#7C3EFF] focus-within:ring-1 focus-within:ring-[#7C3EFF] transition-all bg-white">
                        <label className="block text-[11px] text-[#7C3EFF] mb-0.5 font-medium">Last Name</label>
                        <input 
                            type="text" name="lastName" 
                            value={formData.lastName} onChange={handleChange}
                            placeholder="Enter your last name" 
                            className="w-full text-[15px] outline-none text-gray-900 bg-transparent placeholder-gray-400 font-medium"
                            required
                        />
                    </div>

                    {/* --- Stepper Dots --- */}
                    <div className="flex justify-center gap-2 mb-8">
                        <div className="w-2 h-2 rounded-full bg-[#7C3EFF]"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    </div>

                    {/* --- Continue Button --- */}
                    <button type="submit" className="w-full bg-[#7C3EFF] hover:bg-[#6A32E6] text-white font-medium py-[14px] rounded-lg transition-colors text-[15px]">
                        Continue
                    </button>

                    <p className="text-center text-[14px] text-gray-600 mt-6">
                        Already have an account? <Link to="/login" className="font-bold text-[#7C3EFF] hover:text-[#5B29CC] hover:underline transition-colors">Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}