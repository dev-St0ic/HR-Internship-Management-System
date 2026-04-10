import React from "react";

const TaskProgressCard = ({
  completed = 12,
  total = 100,
  pending = 3,
  overdue = 1,
}) => {
  const percentage = Math.round((completed / total) * 100);

  const radius = 35; // slightly smaller
  const stroke = 7;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl shadow-sm w-fit bg-white">

      {/* Circular Progress */}
      <div className="relative">
        <svg height={85} width={85}>
          {/* Background circle */}
          <circle
            stroke="#E5E7EB"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={42.5}
            cy={42.5}
          />

          {/* Progress circle */}
          <circle
            stroke="#7C3AED"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={42.5}
            cy={42.5}
            transform="rotate(-90 42.5 42.5)"
          />

          {/* Red accent */}
          <circle
            stroke="#F87171"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.85}
            r={normalizedRadius}
            cx={42.5}
            cy={42.5}
            transform="rotate(-90 42.5 42.5)"
          />
        </svg>
      </div>

      {/* Text Section */}
      <div>
        <h2 className="text-base font-semibold text-gray-800">
          {percentage}% Completed
        </h2>

        <p className="text-xs mt-1">
          <span className="text-yellow-500">{pending} Pending</span>{" "}
          <span className="text-gray-400">|</span>{" "}
          <span className="text-red-500">{overdue} Overdue</span>{" "}
          <span className="text-gray-400">|</span>{" "}
          <span className="text-blue-500">{total} Total</span>
        </p>
      </div>
    </div>
  );
};

export default TaskProgressCard;