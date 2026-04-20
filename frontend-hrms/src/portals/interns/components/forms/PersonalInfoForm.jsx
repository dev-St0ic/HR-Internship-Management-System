import { useState } from 'react';

import PersonalInfoSelectField from './personal-info/PersonalInfoSelectField';
import { personalInfoFields } from './personal-info/personalInfoFields';

export default function PersonalInfoForm() {
    const [emptySelects, setEmptySelects] = useState({ gender: true, nationality: true, city: true });
    const [errors, setErrors] = useState({ mobile: '', email: '', zip: '' });

    const baseInput = 'w-full border border-gray-200 rounded-lg px-4 py-3.5 text-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors bg-white';
    const inputClass = `${baseInput} text-gray-900`;
    const validators = {
        zip: (value) => (!value || value.length === 4 || value.length === 5 ? '' : 'Must be a valid 4 or 5-digit number'),
        mobile: (value) => (value.length > 0 && value.length < 11 ? 'Must be a valid 11-digit number' : ''),
        email: (value) => (value && !value.includes('@') ? 'Please enter a valid email address.' : ''),
    };

    const handleFieldChange = (event, validator) => {
        const nextValue = ['mobile', 'zip'].includes(validator) ? event.target.value.replace(/\D/g, '') : event.target.value;
        event.target.value = nextValue;
        if (validator) setErrors((prev) => ({ ...prev, [validator]: validators[validator](nextValue) }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-2">{personalInfoFields.map((field) => field.type === 'select' ? <PersonalInfoSelectField key={field.name} baseInput={baseInput} field={field} isEmpty={emptySelects[field.name]} onChange={(name) => setEmptySelects((prev) => ({ ...prev, [name]: false }))} /> : <div key={field.placeholder} className={field.errorKey ? 'flex flex-col gap-1' : ''}><input type={field.inputType} placeholder={field.placeholder} className={`${inputClass} ${field.errorKey && errors[field.errorKey] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`} onChange={(event) => handleFieldChange(event, field.validator)} onFocus={field.toggleDate ? (event) => { event.target.type = 'date'; } : undefined} onBlur={field.toggleDate ? (event) => { if (event.target.value === '') event.target.type = 'text'; } : undefined} required={field.required} />{field.errorKey && errors[field.errorKey] ? <span className="text-xs text-red-500 px-1">{errors[field.errorKey]}</span> : null}</div>)}</div>
    );
}