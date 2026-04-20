export const personalInfoFields = [
  { type: 'input', inputType: 'text', placeholder: 'First Name', required: true },
  { type: 'input', inputType: 'text', placeholder: 'Middle Name' },
  { type: 'input', inputType: 'text', placeholder: 'Last Name', required: true },
  { type: 'input', inputType: 'text', placeholder: 'Date of Birth', required: true, toggleDate: true },
  { type: 'input', inputType: 'tel', placeholder: 'Mobile Number', required: true, errorKey: 'mobile', validator: 'mobile' },
  { type: 'input', inputType: 'email', placeholder: 'Email Address', required: true, errorKey: 'email', validator: 'email' },
  { type: 'select', name: 'gender', placeholder: 'Gender', required: true, options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Prefer not to say' }] },
  { type: 'select', name: 'nationality', placeholder: 'Nationality', required: true, options: [{ value: 'filipino', label: 'Filipino' }, { value: 'foreigner', label: 'Foreign National' }] },
  { type: 'input', inputType: 'text', placeholder: 'Address, Region, Province, Barangay', required: true },
  { type: 'input', inputType: 'text', placeholder: 'Street Name, Building, House No.', required: true },
  { type: 'select', name: 'city', placeholder: 'City', options: [{ value: 'makati', label: 'Makati City' }, { value: 'manila', label: 'City of Manila' }, { value: 'quezon', label: 'Quezon City' }, { value: 'taguig', label: 'Taguig City' }] },
  { type: 'input', inputType: 'text', placeholder: 'ZIP Code', required: true, errorKey: 'zip', validator: 'zip' },
];