const mockUsers = {
  // --- STAFF & ADMIN (Simple Data) ---
    "admin_system": {
        id: "admin_system",
        name: "Elena (HR Admin)",
        role: "ADMIN",
        department: "Human Resources",
        email: "elena.admin@company.com"
    },
    "staff_hr": {
        id: "staff_hr",
        name: "Marcus (HR Staff)",
        role: "HR_STAFF",
        department: "Human Resources",
        email: "marcus.hr@company.com"
    },
    "supervisor": {
        id: "supervisor",
        name: "Sarah (Supervisor)",
        role: "SUPERVISOR",
        department: "Information Technology",
        email: "sarah.supervisor@company.com"
    },

    // --- INTERNS (Detailed Personal Info matching your UI) ---
    "intern_it": {
        id: "intern_it",
        role: "INTERN",
        department: "Information Technology",
        name: "Alex Santos", 
        firstName: "Alex",
        lastName: "Santos",
        phone: "09123456781",
        email: "alex.it@company.com",
        dob: "05/14/2002",
        maritalStatus: "Single",
        gender: "Male",
        nationality: "Filipino",
        address: "123 Tech Street, Brgy. San Jose",
        city: "Bacoor",
        zipCode: "4102",
        university: "Polytechnic University of the Philippines (PUP iTech)",
        course: "Diploma in Information Technology",
        hours: "500 hours",
        duration: "Feb 16, 2026 - May 30, 2026",
        year: "3rd Year",
        graduation: "July 2026"
    },
    "intern_mktg": {
        id: "intern_mktg",
        role: "INTERN",
        department: "Marketing",
        name: "Chloe Mendoza",
        firstName: "Chloe",
        lastName: "Mendoza",
        phone: "09171234567",
        email: "chloe.mktg@company.com",
        dob: "08/22/2001",
        maritalStatus: "Single",
        gender: "Female",
        nationality: "Filipino",
        address: "456 Taft Avenue",
        city: "Manila",
        zipCode: "1000",
        university: "De La Salle University",
        course: "BS Business Administration",
        hours: "300 hours",
        duration: "Feb 16, 2026 - May 30, 2026",
        year: "4th Year",
        graduation: "October 2026"
    },
    "intern_hr": {
        id: "intern_hr",
        role: "INTERN",
        department: "Human Resources",
        name: "David Reyes",
        firstName: "David",
        lastName: "Reyes",
        phone: "09209876543",
        email: "david.hr@company.com",
        dob: "11/05/2000",
        maritalStatus: "Single",
        gender: "Male",
        nationality: "Filipino",
        address: "789 Emerald Ave, Ortigas",
        city: "Pasig",
        zipCode: "1605",
        university: "University of Santo Tomas",
        course: "BS Psychology",
        hours: "400 hours",
        duration: "Feb 16, 2026 - May 30, 2026",
        year: "4th Year",
        graduation: "June 2026"
    }
};

// --- DASHBOARD STATS ---
export const dashboardStats = {
  intern: [
    {
      title: "Logged",
      value: "0h",
      icon: "ClockCheck",
      date: "March 1, 2026",
    },
    {
      title: "Remaining",
      value: "486h",
      icon: "Clock",
      date: "May 30, 2026",
    },
  ],
};

export const hrAdminDashboardData = {
  greeting: {
    name: '[Name]',
    message: 'Good Morning',
    dateLabel: 'Today:',
    dateValue: '28th March 2023',
  },
  quickActions: [
    { id: 'add_intern', label: 'Add Intern' },
    { id: 'generate_report', label: 'Generate Report' },
  ],
  metrics: [
    { title: 'Total Interns', value: '470', trend: '12%', trendType: 'up' },
    { title: 'Completed Interns', value: '1050', trend: '3%', trendType: 'up' },
    { title: 'Active Interns', value: '470', trend: '8%', trendType: 'down' },
    { title: 'Partner Universities', value: '12', trend: '12%', trendType: 'up' },
  ],
  recentActivity: [
    { label: 'New application submitted', description: 'Description', color: 'bg-sky-300' },
    { label: 'Supervisor evaluation completed', description: 'Description', color: 'bg-emerald-400' },
    { label: 'New DTR submitted', description: 'Description', color: 'bg-sky-300' },
    { label: 'MOA uploaded', description: 'Description', color: 'bg-sky-300' },
  ],
  attendanceOverview: {
    filterLabel: 'Today',
    days: [
      { day: 'Mon', levels: [58, 88, 98] },
      { day: 'Tue', levels: [58, 78, 98] },
      { day: 'Web', levels: [45, 74, 98] },
      { day: 'Thu', levels: [58, 88, 98] },
      { day: 'Fri', levels: [75, 82, 98] },
      { day: 'Sat', levels: [42, 75, 98] },
      { day: 'Sun', levels: [42, 85, 98] },
    ],
  },
};

// --- APPLICATIONS ---
export const dummyApplications = [
  {
    name: 'Darlene Robertson',
    id: '345321231',
    university: 'Cebu University',
    program: 'BS Computer Science',
    date: '2026-02-15',
    status: 'Pending',
  },
  {
    name: 'Floyd Miles',
    id: '987890345',
    university: 'FEU',
    program: 'BS Business Administration',
    date: '2026-03-02',
    status: 'Pending',
  },
  {
    name: 'Carmen Reed',
    id: '453367122',
    university: 'USJR',
    program: 'BS Information Systems',
    date: '2026-03-20',
    status: 'Pending',
  },
];

// --- SYSTEM LOGS ---
export const dummyLogs = [
  {
    timestamp: '2026-04-06 | 09:12:34',
    user: 'Supervisor 1',
    role: 'Supervisor',
    action: 'Login',
    description: 'Supervisor 1 logged into the system.',
    details: 'View',
  },
  {
    timestamp: '2026-04-06 | 09:18:02',
    user: 'Intern 1',
    role: 'Intern',
    action: 'Submit Application',
    description: 'Intern 1 submitted an application.',
    details: 'View',
  },
  {
    timestamp: '2026-04-06 | 09:25:47',
    user: 'HR Staff 1',
    role: 'HR Staff',
    action: 'Update Record',
    description: 'HR Staff 1 updated intern record.',
    details: 'View',
  },
  {
    timestamp: '2026-04-06 | 09:34:21',
    user: 'Supervisor 2',
    role: 'Supervisor',
    action: 'Approve Request',
    description: 'Supervisor 2 approved a request.',
    details: 'View',
  },
];

// --- METRICS ---
export const dummyMetrics = [
  { label: 'Active Interns', value: '28', accent: 'bg-emerald-500', text: 'text-emerald-700' },
  { label: 'Incoming Interns', value: '15', accent: 'bg-amber-400', text: 'text-amber-700' },
  { label: 'Finalizing Internship', value: '5', accent: 'bg-rose-400', text: 'text-rose-700' },
];

// --- INTERNSHIP OVERVIEW ---
export const dummyInternshipOverview = [
  { label: 'Figma', incoming: 95, active: 45, finalizing: 48 },
  { label: 'Sketch', incoming: 55, active: 25, finalizing: 20 },
  { label: 'XD', incoming: 35, active: 40, finalizing: 38 },
  { label: 'Photoshop', incoming: 75, active: 45, finalizing: 18 },
  { label: 'Illustrator', incoming: 58, active: 95, finalizing: 45 },
  { label: 'AfterEffect', incoming: 62, active: 98, finalizing: 55 },
  { label: 'InDesign', incoming: 40, active: 45, finalizing: 20 },
  { label: 'Maya', incoming: 60, active: 85, finalizing: 32 },
  { label: 'Premiere', incoming: 55, active: 98, finalizing: 68 },
  { label: 'Final Cut', incoming: 98, active: 58, finalizing: 18 },
];

// --- UNIVERSITIES ---
export const dummyUniversities = [
  { name: 'PUP iTech', value: 90, color: '#22c55e' || 'bg-emerald-100' },
  { name: 'De La Salle University', value: 55, color: '#a855f7' || 'bg-purple-100' },
  { name: 'University of Santo Tomas', value: 10, color: '#38bdf8' || 'bg-sky-100' },
];

// --- CHART DATA ---
export const dummyChartDays = [
  { week: 'Week 1', values: [32, 46, 22, 40, 28, 56, 50, 74, 64, 84, 76, 99] },
  { week: 'Week 2', values: [22, 36, 52, 56, 44, 48, 62, 84, 82, 92, 90, 96] },
  { week: 'Week 3', values: [38, 60, 34, 52, 66, 76, 72, 94, 88, 80, 96, 90] },
];

// --- INTERNS ---
export const dummyInterns = [
  {
    id: '345321231',
    name: 'John Doe',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    mobileNumber: '09123456789',
    emailAddress: 'john.doe@example.com',
    dateOfBirth: '1999-03-15',
    gender: 'Male',
    university: 'CIT-U',
    program: 'BS Computer Science',
    ojtHours: '250',
    address: '123 Example St.',
    city: 'Cebu City',
    zipCode: '6000',
    department: 'IT Department',
    startDate: 'February 27, 2026',
  },
  {
    id: '987890345',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    mobileNumber: '09123456788',
    emailAddress: 'jane.doe@example.com',
    dateOfBirth: '2000-05-02',
    gender: 'Female',
    university: 'FEU',
    program: 'BS Business Administration',
    ojtHours: '230',
    address: '456 Example Ave.',
    city: 'Manila',
    zipCode: '1000',
    department: 'HR Department',
    startDate: 'December 14, 2025',
  },
];

// --- FOLDERS ---
export const dummyFolders = [
  { title: 'MOA', files: 25, color: 'bg-amber-100', icon: 'briefcase' },
  { title: 'NDA', files: 25, color: 'bg-emerald-100', icon: 'shield' },
  { title: 'Endorsement Letter', files: 25, color: 'bg-rose-100', icon: 'file-text' },
];

// --- DOCUMENTS ---
export const dummyDocuments = [
  { id: 1, title: 'MOA.pdf', type: 'MOA', uploaded: '2025-12-10' },
  { id: 2, title: 'Certificate of Acceptance.pdf', type: 'Acceptance', uploaded: '2025-12-12' },
  { id: 3, title: 'NDA Letter.pdf', type: 'NDA', uploaded: '2025-12-14' },
  { id: 4, title: 'ID.pdf', type: 'ID', uploaded: '2025-12-15' },
  { id: 5, title: 'Resume.pdf', type: 'Resume', uploaded: '2025-12-16' },
  { id: 6, title: 'Endorsement Letter.pdf', type: 'Endorsement', uploaded: '2025-12-18' },
];

// --- ATTENDANCE DATA ---
export const dummyAttendanceData = [
  { date: 'July 01, 2023', checkIn: '09:28 AM', checkOut: '07:00 PM', break: '00:30 Min', total: '09:02 Hrs', status: 'On Time' },
  { date: 'July 02, 2023', checkIn: '09:20 AM', checkOut: '07:00 PM', break: '00:20 Min', total: '09:20 Hrs', status: 'On Time' },
];

// --- DEPARTMENTS ---
export const dummyDepartments = [
  {
    title: 'IT Department',
    count: 3,
    members: [
      { name: 'John Doe', role: 'IT Intern' },
      { name: 'Jane Doe', role: 'HR Intern' },
      { name: 'Jonathan Doe', role: 'IT Intern' },
    ],
  },
  {
    title: 'Sales Department',
    count: 3,
    members: [
      { name: 'Darrell Steward', role: 'Sr. Sales Manager' },
      { name: 'Courtney Henry', role: 'BDM' },
      { name: 'Kathryn Murphy', role: 'BDE' },
    ],
  },
  {
    title: 'Project Manager Department',
    count: 2,
    members: [
      { name: 'Ronald Richards', role: 'Sr. Project Manager' },
      { name: 'Savannah Nguyen', role: 'Project Manager' },
    ],
  },
  {
    title: 'Marketing Department',
    count: 2,
    members: [
      { name: 'Brooklyn Simmons', role: 'Sr. Marketing Manager' },
      { name: 'Kristin Watson', role: 'Marketing Coordinator' },
    ],
  },
];

// --- CALENDAR EVENTS ---
export const calendarEvents = [
  {
    id: 1,
    date: "2026-04-09",
    title: "Meeting",
    time: "9:30 AM",
    category: "UI/UX",
  },
  {
    id: 2,
    date: "2026-04-11",
    title: "Deadline",
    time: "12:00 NN",
    category: "Daily task",
  },
  {
    id: 3,
    date: "2026-04-14",
    title: "Submit DTR",
    time: "2:00 PM",
    category: "Interns",
  },
  {
    id: 4,
    date: "2026-04-15",
    title: "Meating with Supervisor",
    time: "4:00 PM",
    category: "Front End Devs",
  },
];

// It writes the data above into the browser so the app can use it.
export const initializeMockDatabase = () => {
    localStorage.setItem("hrims_users_db", JSON.stringify(mockUsers));

    if (!localStorage.getItem("hrims_evaluations_db")) {
    localStorage.setItem("hrims_evaluations_db", JSON.stringify([]));
    }
    console.log("✅ Mock Database Updated with Profile Data!");
};
