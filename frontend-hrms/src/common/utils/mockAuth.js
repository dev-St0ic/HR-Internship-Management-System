const mockUsers = {
  // --- STAFF & ADMIN (Simple Data) ---
  admin_system: {
    id: "admin_system",
    name: "Elena (HR Admin)",
    role: "ADMIN",
    department: "Human Resources",
    email: "elena.admin@company.com",
  },
  staff_hr: {
    id: "staff_hr",
    name: "Marcus (HR Staff)",
    role: "HR_STAFF",
    department: "Human Resources",
    email: "marcus.hr@company.com",
  },
  supervisor: {
    id: "supervisor",
    name: "Sarah (Supervisor)",
    role: "SUPERVISOR",
    department: "Information Technology",
    email: "sarah.supervisor@company.com",
  },

  // --- INTERNS (Detailed Personal Info matching your UI) ---
  intern_it: {
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
    graduation: "July 2026",
  },
  intern_mktg: {
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
    graduation: "October 2026",
  },
  intern_hr: {
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
    graduation: "June 2026",
  },
};

// It writes the data above into the browser so the app can use it.
export const initializeMockDatabase = () => {
  localStorage.setItem("hrims_users_db", JSON.stringify(mockUsers));

  if (!localStorage.getItem("hrims_evaluations_db")) {
    localStorage.setItem("hrims_evaluations_db", JSON.stringify([]));
  }
  console.log("✅ Mock Database Updated with Profile Data!");
};
