import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Eye, Trash } from "lucide-react";

import SearchInput from "../ui/SearchInput";

export default function MyInternsPage() {
  const navigate = useNavigate();

  //This will get the role directly from mockAuth
  const { currentUser } = useAuth();

  const roleMap = {
    INTERN: "intern",
    SUPERVISOR: "supervisor",
    HR_STAFF: "hr-staff",
    ADMIN: "hr-admin",
  };

  const role = roleMap[currentUser?.role] || "";

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("interns");
  const [internList, setInternList] = useState([]);

  // Load interns from mock DB
  useEffect(() => {
    const db = JSON.parse(localStorage.getItem("hrims_users_db") || "{}");

    const interns = Object.values(db).filter((user) => user.role === "INTERN");

    setInternList(interns);
  }, []);

  //For filter function
  const filteredInterns = internList.filter(
    (intern) =>
      (intern.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (intern.id || "").toLowerCase().includes(search.toLowerCase()),
  );

  //View Button
  const handleView = (intern) => {
    navigate("/intern/profile", { state: { intern } });
  };

  //Delete Button
  const handleDelete = (id) => {
    const updated = internList.filter((intern) => intern.id !== id);
    setInternList(updated);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          {/* Search Input */}
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search interns..."
          />
          {/* Right Controls */}
          <div className="flex gap-2">
            {role === "hr-admin" && (
              <button className="px-4 py-2 bg-purple-500 text-white rounded-md">
                Export
              </button>
            )}

            <button className="px-4 py-2 bg-white border border-gray-200 rounded-md">
              Filter
            </button>
          </div>
        </div>

        {/* HR Staff Tabs */}
        {role === "hr-staff" && (
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setActiveTab("interns")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "interns"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Interns
            </button>

            <button
              onClick={() => setActiveTab("attendance")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "attendance"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Attendance Request
            </button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="px-3">Intern Name</th>
                <th className="px-3">Intern ID</th>
                <th className="px-3">University</th>
                <th className="px-3">Department</th>
                <th className="px-3">Started At</th>
                <th className="px-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredInterns.length > 0 ? (
                filteredInterns.map((intern) => (
                  <tr key={intern.id} className=" hover:bg-gray-100">
                    <td className="px-3 py-3">{intern.name}</td>
                    <td className="px-3">{intern.id}</td>
                    <td className="px-3">{intern.university}</td>
                    <td className="px-3">{intern.department}</td>
                    <td className="px-3">
                      {intern.duration
                        ? intern.duration.split(" - ")[0]
                        : "N/A"}
                    </td>
                    <td className="px-3 flex gap-0.5">
                      <button
                        onClick={() => handleView(intern)}
                        className="px-2 py-1 items-center rounded hover:bg-purple-500 hover:text-white"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(intern.id)}
                        className="px-2 py-1 rounded hover:bg-purple-500 hover:text-white"
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No interns found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
