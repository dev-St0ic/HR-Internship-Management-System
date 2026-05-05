import { NotebookText, BookCheck, LibraryBig } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardQuickActions() {
  const buttonClass =
    "flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm text-white transition-colors hover:bg-primary-hover";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-900">Quick Actions</h1>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Link to="/supervisor/attendance" className={buttonClass}>
          <NotebookText size={17} />
          Review DTRs
        </Link>

        <Link to="/supervisor/tasks" className={buttonClass}>
          <BookCheck size={17} />
          Assign New Task
        </Link>

        <Link to="/supervisor/evaluations" className={buttonClass}>
          <LibraryBig size={17} />
          Start Evaluation
        </Link>
      </div>
    </div>
  );
}
