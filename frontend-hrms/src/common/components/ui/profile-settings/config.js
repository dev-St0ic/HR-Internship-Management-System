export function getInitialProfileSettingsData(userRole) {
  const baseData = { password: '••••••••••••••', newPassword: '', firstName: 'John', lastName: 'Doe', mobileNumber: '09123456789', gender: 'Male', dateOfBirth: '01/01/2000' };
  switch (userRole) {
    case 'intern': return { ...baseData, userName: 'Intern User', email: 'intern@gmail.com' };
    case 'hr-staff': return { ...baseData, userName: 'HR Staff', email: 'hrstaff@gmail.com' };
    case 'admin':
    case 'hr-admin': return { ...baseData, userName: 'HR Admin', email: 'hradmin@gmail.com' };
    case 'supervisor': return { ...baseData, userName: 'Supervisor', email: 'supervisor@gmail.com' };
    default: return { ...baseData, userName: 'System User', email: 'user@email.com' };
  }
}

export const accountSettingsFields = [
  { label: 'User Name', name: 'userName', type: 'text' },
  { label: 'Email Address', name: 'email', type: 'email' },
  { label: 'New Password', name: 'newPassword', type: 'password' },
];

export const personalInfoFields = [
  { label: 'First Name', name: 'firstName', type: 'text' },
  { label: 'Last Name', name: 'lastName', type: 'text' },
  { label: 'Mobile Number', name: 'mobileNumber', type: 'text' },
  { label: 'Gender', name: 'gender', type: 'select', options: ['Gender', 'Male', 'Female', 'Other'] },
  { label: 'Date of Birth', name: 'dateOfBirth', type: 'text' },
];