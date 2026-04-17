export default function NotificationItem({ title, message, time }) {
    return (
        
        <div className="flex justify-between items-center p-5 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors">
            
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full shrink-0 bg-[#7C3EFF80]"></div>

                <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-0.5">
                        {title}
                    </h4>
                    <p className="text-sm text-gray-400">
                        {message}
                    </p>
                </div>
            </div>

            <span className="text-sm text-gray-400 whitespace-nowrap">
                {time}
            </span>
            
        </div>
    );
}