export const mockApplicationData = {

    // User Info
    personalInfo: {
        firstName: "Mikel",
        middleName: "Gordovez",
        lastName: "Dela isla",
        role: "applicant",
        email: "mikel.delaisla@gmail.com",
        dateOfBirth: "1998-05-15",
        contactNumber: "+639123456789",
        address: "123 Main St, Cityville",
        street: "Main St",
        city: "Antipolo City",
        zipcode: "12345",
        gender: "Male",
        nationality: "Filipino",
    },

    //School Info
    schoolInfo: {
        university: "University of the Philippines",
        course: "BS Computer Science",
        yearLevel: "4th Year",
        requiredHours: 320,
        expectedGraduation: "2026-03-30",
    },

    // Applicant tracker State

    applicationProgress: {
        currentStep: 3,
        progressPercentage: 60,
        status: 'warning',
        statusMessage: '2 Documents Missing'
    },

    // Required Documents
    documents: [
        { id: 1, name: 'Resume', status: 'uploaded' },
        { id: 2, name: 'Endorsement Letter', status: 'uploaded' },
        { id: 3, name: 'MOA', status: 'uploaded' },
        { id: 4, name: 'School ID', status: 'missing' },
        { id: 5, name: 'Certificate of Acceptance', status: 'missing' },
    ]




}