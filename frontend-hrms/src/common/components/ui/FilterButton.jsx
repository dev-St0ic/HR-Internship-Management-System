import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

export default function FilterButton({
  title = "Filter",
  children,
  onApply,
  onCancel,
  buttonLabel = "Filter",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    onCancel?.();
    setIsOpen(false);
  };

  const handleApply = () => {
    onApply?.();
    setIsOpen(false);
  };

  return (
    <>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <SlidersHorizontal size={16} />
        {buttonLabel}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>

            {/* Page specific content */}
            <div className="space-y-4">{children}</div>

            {/* Footer Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 rounded-lg border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleApply}
                className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
