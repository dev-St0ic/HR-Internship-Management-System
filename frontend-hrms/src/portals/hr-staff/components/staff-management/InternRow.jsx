import React from 'react';

const InternRow = ({ intern }) => (
  <tr>
    <td>{intern.name}</td>
    <td>{intern.date}</td>
    <td>{intern.ojtHours}</td>
    <td>{intern.rendered}</td>
    <td>
      <button className="action-btn" title="View"><span role="img" aria-label="view">👁️</span></button>
      <button className="action-btn" title="Edit"><span role="img" aria-label="edit">✏️</span></button>
    </td>
  </tr>
);

export default InternRow;
