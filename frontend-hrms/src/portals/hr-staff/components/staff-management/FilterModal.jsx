import React from 'react';

const FilterModal = ({ type, onClose }) => {
  // Example filter options for employees (Image 4)
  const programOptions = [
    'Computer Science',
    'Information Technology',
    'Business Administration',
    'Multimedia Arts',
    'Marketing Management',
  ];
  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal">
        <h4>Filter</h4>
        <div className="filter-section">
          <label>Program</label>
          <div className="filter-options">
            {programOptions.map(opt => (
              <div key={opt} className="filter-option">
                <input type="checkbox" id={opt} />
                <label htmlFor={opt}>{opt}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="filter-section">
          <label>Status</label>
          <div className="filter-options">
            <div className="filter-option">
              <input type="radio" id="pending" name="status" />
              <label htmlFor="pending">Pending</label>
            </div>
            <div className="filter-option">
              <input type="radio" id="approved" name="status" />
              <label htmlFor="approved">Approved</label>
            </div>
          </div>
        </div>
        <div className="filter-actions">
          <button className="filter-cancel" onClick={onClose}>Cancel</button>
          <button className="filter-apply">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
