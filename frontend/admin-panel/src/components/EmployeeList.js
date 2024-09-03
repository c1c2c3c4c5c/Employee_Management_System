import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EmployeeList.css';
import ProfilePic from '../icons/image.svg';

// Function to fetch employee data from the backend
const fetchEmployees = async () => {
  try {
    const response = await fetch('/api/getEmployees');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
};

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };

    loadEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <input
        type="text"
        placeholder="Search employees..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="employee-grid">
        {filteredEmployees.length === 0 ? (
          <p>No employees found</p>
        ) : (
          filteredEmployees.map((employee) => (
            <Link
              key={employee.id}
              to={`/employee/${employee.id}`}
              className="employee-card"
            >
              <img
                src={employee.ProfilePic || ProfilePic}
                alt={employee.fullName}
                className="employee-pic"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = ProfilePic;
                }}
              />
              <h4>{employee.fullName}</h4>
              <p>{employee.email}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
