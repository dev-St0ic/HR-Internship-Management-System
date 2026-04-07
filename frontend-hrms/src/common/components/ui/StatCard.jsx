export default function StatCard({ title, value, icon, change, date }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      {/* Top Part */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="w-9 h-9 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              {icon}
            </div>
          )}
          <p className="text-sm text-gray-500">{title}</p>
        </div>
        {change && (
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {change}
          </span>
        )}
      </div>

      {/* Value */}
      <h2 className="text-3xl font-semibold text-gray-900 mt-2">{value}</h2>

      {/* Footer */}
      <p className="text-xs text-gray-400 mt-2">{date}</p>
    </div>
  );
}
