import { ChevronRight } from "lucide-react";

export default function InternRow({ intern, onClick }) {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    intern.name,
  )}&background=f3f4f6&color=374151`;

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition hover:bg-gray-50"
    >
      <div className="flex items-center gap-3">
        <img
          src={avatarUrl}
          alt={intern.name}
          className="h-9 w-9 rounded-full object-cover"
        />

        <div>
          <p className="text-sm font-medium text-gray-900">{intern.name}</p>
          <p className="text-sx text-gray-400">
            {intern.course || intern.department}
          </p>
        </div>
      </div>
      <span className="text-gray-400">
        <ChevronRight size={16} />
      </span>
    </div>
  );
}
