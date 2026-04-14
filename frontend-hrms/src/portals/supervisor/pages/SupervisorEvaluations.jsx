import { Search, SlidersHorizontal, Star, MessageCircle, Target, NotebookPen, PenTool } from "lucide-react";
import StarRatingUI from "../components/StarRatingUI.jsx";

export default function SupervisorEvaluations() {
  return (
    <>
      <div className="border rounded border-gray-500/20 h-full p-4 mb-4">
        <div className="flex justify-between">
          <div className="border border-gray-500/20 w-auto rounded-lg p-2 flex items-center gap-2">
            <Search size={16} className="text-gray-500" />
            <input type="text" placeholder="Search Interns..." className="border-0 focus:outline-none" />
          </div>
          <div className="border border-gray-500/20 rounded-lg flex items-center gap-2 px-3 py-1 cursor-pointer">
            <SlidersHorizontal size={16} className="" />
            <span>Filter</span>
          </div>
        </div>
        
        <div className="grid grid-cols-6 grid-rows-6 gap-4 mb-4 mt-6">

          <div className="col-span-3 row-span-3 col-start-1 row-start-1 border border-gray-500/20 rounded-lg p-4">
            <div className="flex justify-between items-center border-b border-gray-500/20 pb-2">
              <div className="flex flex-col">
                <span className="text-md font-semibold">Ana Reyes</span>
                <span className="text-gray-500 text-xs">Feb 2026</span>
              </div>
              <div className="flex items-center">
                <span className="bg-green-100 text-green-500 text-xs font-medium px-2.5 py-1 rounded">Completed</span>
              </div>
            </div>

            <div className="py-3">
              <div className="py-2 flex justify-between">
                <div className="flex justify-start items-center gap-2">
                  <div className="size-8 bg-violet-500/80 rounded-full flex items-center justify-center">
                    <Star size={20} className="text-violet-600" fill="currentColor" />
                  </div>
                  <h1 className="text-md">Work Quality</h1>
                </div>
                <div className="star flex items-center gap-1">
                  <StarRatingUI rating={5} totalStars={5} />
                </div>
              </div>
              <div className="py-2 flex justify-between">
                <div className="flex justify-start items-center gap-2">
                  <div className="size-8 bg-blue-500/50 rounded-full flex items-center justify-center">
                    <MessageCircle size={20} className="text-blue-600" fill="currentColor" />
                  </div>
                  <h1 className="text-md">Communication</h1>
                </div>
                <div className="star flex items-center gap-1">
                  <StarRatingUI rating={4} totalStars={5} />
                </div>
              </div>
              <div className="py-2 flex justify-between">
                <div className="flex justify-start items-center gap-2">
                  <div className="size-8 bg-red-500/50 rounded-full flex items-center justify-center">
                    <Target size={20} className="text-red-500" />
                  </div>
                  <h1 className="text-md">Initiative</h1>
                </div>
                <div className="star flex items-center gap-1">
                  <StarRatingUI rating={4} totalStars={5} />
                </div>
              </div>
              <div className="py-2 flex justify-between">
                <div className="flex justify-start items-center gap-2">
                  <div className="size-8 bg-green-500/50 rounded-full flex items-center justify-center">
                    <NotebookPen size={20} className="text-green-600" />
                  </div>
                  <h1 className="text-md">Attendance</h1>
                </div>
                <div className="star flex items-center gap-1">
                  <StarRatingUI rating={4} totalStars={5} />
                </div>
              </div>
              <div className="py-2 flex justify-between">
                <div className="flex justify-start items-center gap-2">
                  <div className="size-8 bg-yellow-500/50 rounded-full flex items-center justify-center">
                    <PenTool size={20} className="text-yellow-500" />
                  </div>
                  <h1 className="text-md">Professionalism</h1>
                </div>
                <div className="star flex items-center gap-1">
                  <StarRatingUI rating={5} totalStars={5} />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-4 border-t border-gray-500/20 pt-2">
              <h1 className="font-semibold text-md">Total: 22/25</h1>
              <h1 className="font-bold text-md uppercase text-yellow-500">good</h1>
            </div>
          </div>

          <div className="col-span-3 row-span-3 col-start-4 row-start-1 border border-gray-500/20 rounded-lg p-4">
            <div className="flex justify-between items-center border-b border-gray-500/20 pb-2">
              <div className="flex flex-col">
                <span className="text-md font-semibold">Cara Lim</span>
                <span className="text-gray-500 text-xs">Feb 2026</span>
              </div>
              <div className="flex items-center">
                <span className="bg-green-100 text-green-500 text-xs font-medium px-2.5 py-1 rounded">Completed</span>
              </div>
            </div>
            
            <div className="py-3">
              <div className="py-2 flex justify-between">
                <div className="flex justify-start items-center gap-2">
                  <div className="size-8 bg-violet-500/80 rounded-full flex items-center justify-center">
                    <Star size={20} className="text-violet-600" fill="currentColor" />
                  </div>
                  <h1 className="text-md">Work Quality</h1>
                </div>
                <div className="star flex items-center gap-1">
                  <StarRatingUI rating={5} totalStars={5} />
                </div>
              </div>
              <div className="py-2 flex justify-between">
                <div className="flex justify-start items-center gap-2">
                  <div className="size-8 bg-blue-500/50 rounded-full flex items-center justify-center">
                    <MessageCircle size={20} className="text-blue-600" fill="currentColor" />
                  </div>
                  <h1 className="text-md">Communication</h1>
                </div>
                <div className="star flex items-center gap-1">
                  <StarRatingUI rating={4} totalStars={5} />
                </div>
              </div>
              <div className="py-2 flex justify-between">
                <div className="flex justify-start items-center gap-2">
                  <div className="size-8 bg-red-500/50 rounded-full flex items-center justify-center">
                    <Target size={20} className="text-red-500" />
                  </div>
                  <h1 className="text-md">Initiative</h1>
                </div>
                <div className="star flex items-center gap-1">
                  <StarRatingUI rating={4} totalStars={5} />
                </div>
              </div>
              <div className="py-2 flex justify-between">
                <div className="flex justify-start items-center gap-2">
                  <div className="size-8 bg-green-500/50 rounded-full flex items-center justify-center">
                    <NotebookPen size={20} className="text-green-600" />
                  </div>
                  <h1 className="text-md">Attendance</h1>
                </div>
                <div className="star flex items-center gap-1">
                  <StarRatingUI rating={4} totalStars={5} />
                </div>
              </div>
              <div className="py-2 flex justify-between">
                <div className="flex justify-start items-center gap-2">
                  <div className="size-8 bg-yellow-500/50 rounded-full flex items-center justify-center">
                    <PenTool size={20} className="text-yellow-500" />
                  </div>
                  <h1 className="text-md">Professionalism</h1>
                </div>
                <div className="star flex items-center gap-1">
                  <StarRatingUI rating={5} totalStars={5} />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-4 border-t border-gray-500/20 pt-2">
              <h1 className="font-semibold text-md">Total: 24/25</h1>
              <h1 className="font-bold text-md uppercase text-yellow-500">excellent</h1>
            </div>
          </div>
          
          <div className="col-span-3 row-span-3 row-start-4 border border-gray-500/20 rounded-lg p-4">
            <div className="flex justify-between items-center border-b border-gray-500/20 pb-2">
              <div className="flex flex-col">
                <span className="text-md font-semibold">Juan Dela Cruz</span>
                <span className="text-gray-500 text-xs">Feb 2026</span>
              </div>
              <div className="flex items-center">
                <span className="bg-yellow-100 text-yellow-500 text-xs font-medium px-2.5 py-1 rounded">Pending</span>
              </div>
            </div>
            <div className="flex justify-center items-center h-32">
              <h1 className="text-gray-500 text-sm">Evaluation not yet submitted</h1>
            </div>
          </div>

          <div className="col-span-3 row-span-3 col-start-4 row-start-4 border border-gray-500/20 rounded-lg p-4">
            <div className="flex justify-between items-center border-b border-gray-500/20 pb-2">
              <div className="flex flex-col">
                <span className="text-md font-semibold">Maria Lopez</span>
                <span className="text-gray-500 text-xs">Mar  2026</span>
              </div>
              <div className="flex items-center">
                <span className="bg-yellow-100 text-yellow-500 text-xs font-medium px-2.5 py-1 rounded">Pending</span>
              </div>
            </div>
            <div className="flex justify-center items-center h-32">
              <h1 className="text-gray-500 text-sm">Evaluation not yet submitted</h1>
            </div>  
          </div>
          
        </div>
    
      </div>
    </>
  );
}