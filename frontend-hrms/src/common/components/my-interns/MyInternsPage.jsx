import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Trash } from "lucide-react";

import SearchInput from "../ui/SearchInput";
import FilterButton from "../ui/FilterButton";

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
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState([]);
  const [selectedInterns, setSelectedInterns] = useState([]);
  const [universitySearch, setUniversitySearch] = useState("");
  const [internSearch, setInternSearch] = useState("");

  // Load interns from mock DB
  useEffect(() => {
    const db = JSON.parse(localStorage.getItem("hrims_users_db") || "{}");

    let interns = Object.values(db).filter((user) => user.role === "INTERN");

    //For supervisor only. To see the interns under this supervisor
    if (currentUser?.role === "SUPERVISOR") {
      interns = interns.filter(
        (intern) => intern.supervisorId === currentUser.id,
      );
    }

    setInternList(interns);
  }, [currentUser]);

  //For filter function
  const filteredInterns = internList.filter((intern) => {
    const matchesSearch =
      (intern.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (intern.id || "").toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(intern.department);

    const matchesUniversity =
      selectedUniversity.length === 0 ||
      selectedUniversity.includes(intern.university);

    const matchesIntern =
      selectedInterns.length === 0 || selectedInterns.includes(intern.id);

    return (
      matchesSearch && matchesDepartment && matchesUniversity && matchesIntern
    );
  });

  //View Row
  const handleView = (intern) => {
    navigate("/intern/profile", { state: { intern } });
  };

  //Delete Button
  const handleDelete = (id) => {
    const updated = internList.filter((intern) => intern.id !== id);
    setInternList(updated);
  };

  const toggleDepartment = (department) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((item) => item !== department)
        : [...prev, department],
    );
  };

  const toggleUniversity = (university) => {
    setSelectedUniversity((prev) =>
      prev.includes(university)
        ? prev.filter((item) => item !== university)
        : [...prev, university],
    );
  };

  const toggleIntern = (internId) => {
    setSelectedInterns((prev) =>
      prev.includes(internId)
        ? prev.filter((id) => id !== internId)
        : [...prev, internId],
    );
  };

  const departments = [
    ...new Set(internList.map((intern) => intern.department)),
  ];
  const universities = [
    ...new Set(internList.map((intern) => intern.university)),
  ];

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

            <FilterButton
              title="Filter Button"
              onCancel={() => {
                setSelectedDepartments([]);
                setSelectedUniversity([]);
                setSelectedInterns([]);
                setUniversitySearch("");
                setInternSearch("");
              }}
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Interns
                </label>

                {/* Search Input */}
                <input
                  type="text"
                  value={internSearch}
                  onChange={(e) => setInternSearch(e.target.value)}
                  placeholder="Search intern..."
                  className="mb-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                />

                {/* Selected Interns */}
                <input
                  readOnly
                  value={internList
                    .filter((intern) => selectedInterns.includes(intern.id))
                    .map((intern) => intern.name)
                    .join(", ")}
                  placeholder="Selected interns..."
                  className="mb-3 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs outline-none"
                />

                {/* Results only appear while typing */}
                {internSearch.trim() && (
                  <div className="max-h-32 space-y-2 overflow-y-auto no-scrollbar pr-1">
                    {internList
                      .filter((intern) =>
                        intern.name
                          .toLowerCase()
                          .includes(internSearch.toLowerCase()),
                      )
                      .map((intern) => (
                        <label
                          key={intern.id}
                          className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
                        >
                          <input
                            type="checkbox"
                            checked={selectedInterns.includes(intern.id)}
                            onChange={() => toggleIntern(intern.id)}
                            className="h-4 w-4 accent-primary"
                          />
                          {intern.name}
                        </label>
                      ))}
                  </div>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Department
                </label>

                <div className="max-h-32 space-y-2 overflow-y-auto no-scrollbar pr-1">
                  {departments.map((department) => (
                    <label
                      key={department}
                      className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDepartments.includes(department)}
                        onChange={() => toggleDepartment(department)}
                        className="h-4 w-4 accent-primary"
                      />
                      {department}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  University
                </label>

                {/* Search Input */}
                <input
                  type="text"
                  value={universitySearch}
                  onChange={(e) => setUniversitySearch(e.target.value)}
                  placeholder="Search university..."
                  className="mb-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                />

                {/* Selected Universities */}
                <input
                  readOnly
                  value={selectedUniversity.join(", ")}
                  placeholder="Selected universities..."
                  className="mb-3 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs outline-none"
                />

                {/* Results only appear when typing */}
                {universitySearch.trim() && (
                  <div className="max-h-32 space-y-2 overflow-y-auto no-scrollbar pr-1">
                    {universities
                      .filter((university) =>
                        university
                          .toLowerCase()
                          .includes(universitySearch.toLowerCase()),
                      )
                      .map((university) => (
                        <label
                          key={university}
                          className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
                        >
                          <input
                            type="checkbox"
                            checked={selectedUniversity.includes(university)}
                            onChange={() => toggleUniversity(university)}
                            className="h-4 w-4 accent-primary"
                          />
                          {university}
                        </label>
                      ))}
                  </div>
                )}
              </div>
            </FilterButton>
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
          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-gray-600 border-b border-gray-200 shadow-sm">
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
                  <tr
                    key={intern.id}
                    onClick={() => handleView(intern)}
                    className=" hover:bg-purple-100 cursor-pointer transition border-b border-gray-200 shadow-sm"
                  >
                    <td className="px-3 py-3">{intern.name}</td>
                    <td className="px-3">{intern.id}</td>
                    <td className="px-3">{intern.university}</td>
                    <td className="px-3">{intern.department}</td>
                    <td className="px-3">
                      {intern.duration
                        ? intern.duration.split(" - ")[0]
                        : "N/A"}
                    </td>
                    <td className="px-3">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(intern.id);
                          }}
                          className="p-2 rounded hover:bg-purple-500 hover:text-white"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
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
