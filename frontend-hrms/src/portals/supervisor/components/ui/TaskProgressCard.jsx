import ProgressCircle from "../../../../common/components/ui/ProgressCircle";

export default function TaskProgressCard({
  progress,
  inProgress,
  overdue,
  total,
}) {
  return (
    <div className="w-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-5">
        <ProgressCircle value={progress} />

        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {progress}% Completed
          </h3>

          <p className="mt-1 text-xs">
            <span className="text-yellow-500">{inProgress} In Progress</span> |{" "}
            <span className="text-red-500">{overdue} Overdue</span> |{" "}
            <span className="text-primary">{total} Total</span>
          </p>
        </div>
      </div>
    </div>
  );
}
