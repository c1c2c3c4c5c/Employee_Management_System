import React, { useState, useEffect } from 'react';
import './Reporting.css';

// Function to fetch reports data from the backend
const fetchReports = async () => {
  try {
    const response = await fetch('/api/reports');
    if (!response.ok) throw new Error('Failed to fetch reports data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching reports data:', error);
    return [];
  }
};

const Reporting = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      const data = await fetchReports();
      setReports(data);
    };

    loadReports();

    // Adjust side panel width dynamically
    const sidePanelWidth = document.querySelector('.side-panel')?.offsetWidth || 250;
    document.documentElement.style.setProperty('--side-panel-width', `${sidePanelWidth}px`);
  }, []);

  return (
    <div className="reporting">
      <h2>Reports</h2>
      <div className="report-list">
        {reports.map((report, index) => (
          <div key={index} className="report-item">
            <h4>{report.title}</h4>
            <p>{report.description}</p>
            <p><strong>Submitted by:</strong> {report.submitter}</p>
            <p className="status"><strong>Status:</strong> {report.status}</p>
            <div className="action-buttons">
              <button className="action-button">Review</button>
              <button className="action-button secondary">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reporting;
