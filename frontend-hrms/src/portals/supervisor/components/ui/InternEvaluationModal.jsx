import StarRatingUI from "../StarRatingUI";

export default function InternEvaluationModal({
  selectedIntern,
  onClose,
}) {
  if (!selectedIntern) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white w-[90%] max-w-3xl rounded-lg p-5 relative" onClick={(e) => e.stopPropagation()}>

        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
          <div className="flex flex-col">
            <h1 className="font-semibold">Evaluation for {selectedIntern.internName}</h1>
          </div>
        </div>

        {/* <div className="mt-2">
          {selectedIntern.evalData.evalLabel.map((label, i) => (
            <div key={i} className="py-3">
              <div className="flex justify-between">

                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full flex items-center justify-center">
                    {selectedIntern.evalData.evalIcon[label]}
                  </div>
                  <h1 className="text-md">{label}</h1>
                </div>

                <div className="flex items-center gap-1">
                  <StarRatingUI
                    rating={selectedIntern.evalData.evalLabelRate[label]}
                  />
                </div>

              </div>
            </div>
          ))}
        </div> */}
        
        <div className="border rounded-lg border-gray-200/70 p-2 mt-5 shadow-sm">
        
          <table className="table-fixed w-full">
            <thead className="text-gray-500 text-sm">
              <tr className="border-b border-gray-500/20">
                <td className="py-2">Criteria</td>
                <td className="py-2">Description</td>
                <td className="py-2">Rating</td>
              </tr>
            </thead>
            {selectedIntern.evalData.evalLabel.map((label, i) => (
            <tbody className="text-sm">
              <tr key={i}>
                <td  className="py-3">{label}</td>
                <td  className="py-3">{selectedIntern.evalData.evalLabelDescription[label]}</td>
                <td  className="py-3"><StarRatingUI rating={selectedIntern.evalData.evalLabelRate[label]} /></td>
              </tr>
            </tbody>
            ))}
          </table>
        </div>

        <div className="flex justify-between items-center mt-3 text-sm text-gray-400">
          <span>1 - Poor</span>
          <span>2 - Needs Improvement</span>
          <span>3 - Satisfactory</span>
          <span>4 - Good</span>
          <span>5 - Excellent</span>
        </div>

        <div className="flex justify-between items-center border border-gray-400 rounded-lg mt-2 px-2 py-1 font-semibold">
          <h1>Total Score:</h1>
          <h1>{selectedIntern.evalData.total} / 25</h1>
          <h1>{selectedIntern.evalData.totalStatus}</h1>
        </div>

        <div className="mt-5">
          <h1 className="text-sm font-semibold">Supervisor Comments</h1>
          <div className="border border-gray-300 rounded mt-2">
            <textarea className="w-full outline-none p-1 text-sm" value={selectedIntern.evalData.evalSupervisorComments} rows={3} placeholder="Provide your comment..." />
          </div>
        </div>

        {/* Summary */}
        <div className="flex justify-end gap-5 mt-4 border-t border-gray-500/20 pt-2">
          <button onClick={onClose} className="px-4 py-2 rounded-md border border-gray-200 text-sm hover:bg-white/10">
            Cancel
          </button>

          <button className="px-4 py-2 rounded-md bg-violet-600 text-white text-sm hover:bg-violet-500">
            Submit Evaluation
          </button>
        </div>

      </div>
    </div>
  );
}