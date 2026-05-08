import FilterButton from "../ui/FilterButton";

export default function MyInternsFilter({
  teams = [],
  departments = [],
  courses = [],
  selectedTeams = [],
  selectedDepartments = [],
  selectedCourses = [],
  setSelectedTeams,
  setSelectedDepartments,
  setSelectedCourses,
  toggleTeam,
  toggleDepartment,
  toggleCourse,
}) {
  return (
    <FilterButton
      title="Filter Teams"
      onCancel={() => {
        setSelectedTeams([]);
        setSelectedDepartments([]);
        setSelectedCourses([]);
      }}
    >
      {/* Team Filter */}
      <FilterGroup
        title="Teams"
        items={teams}
        selectedItems={selectedTeams}
        onToggle={toggleTeam}
      />

      {/* Department Filter */}
      <FilterGroup
        title="Department"
        items={departments}
        selectedItems={selectedDepartments}
        onToggle={toggleDepartment}
      />

      {/* Course Filter */}
      <FilterGroup
        title="Course"
        items={courses}
        selectedItems={selectedCourses}
        onToggle={toggleCourse}
      />
    </FilterButton>
  );
}

function FilterGroup({ title, items = [], selectedItems = [], onToggle }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900">
        {title}
      </label>
      <div className="max-h-32 spcae-y-2 overflow-y-auto no-scrollbar pr-1">
        {items.length > 0 ? (
          items.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => onToggle(item)}
                className="h-4 w-4 accent-primary"
              />
              {item}
            </label>
          ))
        ) : (
          <p className="text-sx text-gray-400">No option available.</p>
        )}
      </div>
    </div>
  );
}
