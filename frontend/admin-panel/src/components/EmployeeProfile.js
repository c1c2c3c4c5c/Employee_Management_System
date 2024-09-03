import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Modal from 'react-modal';
import './EmployeeProfile.css';

ChartJS.register(ArcElement, Tooltip, Legend);

// Function to fetch employee data from the backend
const fetchEmployee = async (id) => {
  try {
    const response = await fetch(`/api/employee/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching employee:', error);
    return null;
  }
};

// Function to fetch certificate data
const fetchCertificates = async (employeeId) => {
  try {
    const response = await fetch(`/api/employee/${employeeId}/certificates`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
};

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCertificateModalOpen, setCertificateModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const loadEmployeeData = async () => {
      const employeeData = await fetchEmployee(id);
      setEmployee(employeeData);

      if (employeeData) {
        const certificatesData = await fetchCertificates(employeeData.id);
        setCertificates(certificatesData);
      }
    };

    loadEmployeeData();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  const taskCompletionData = {
    labels: ['Completed', 'Missed', 'Late Submission'],
    datasets: [
      {
        label: 'Task Completion',
        data: [65, 20, 15], // Static data for demonstration
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  const attendanceData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [22, 8], // Static data for demonstration
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const handleCertificateClick = (certificateUrl) => {
    setSelectedCertificate(certificateUrl);
    setCertificateModalOpen(true);
  };

  const handleModalClose = () => {
    setCertificateModalOpen(false);
    setSelectedCertificate(null);
  };

  return (
    <div className="employee-profile">
      <button className="close-btn" onClick={() => navigate('/')}>
        X
      </button>
      <div className="profile-header">
        <img src={employee.ProfilePic} alt={employee.fullName} className="profile-pic" />
        <div className="employee-info">
          <h2>{employee.fullName}</h2>
          <p>Birthday: {employee.birthday}</p>
          <p>Email: {employee.email}</p>
          <button
            className="view-certificate-btn"
            onClick={() => handleCertificateClick(certificates[0]?.url || '')}
          >
            View Certificates
          </button>
        </div>
      </div>
      <div className="chart-section">
        <div className="attendance-section">
          <h3>Attendance Analysis</h3>
          <button className="download-report-btn">Download Attendance Report</button>
          <Pie data={attendanceData} />
        </div>
        <div className="task-section">
          <h3>Task Completion</h3>
          <Pie data={taskCompletionData} />
        </div>
      </div>
      <div className="rating-section">
        <h3>Employee Rating</h3>
        <p>Rating: 4.5 / 5</p>
      </div>
      <div className="notice-period-section">
        <button className="notice-period-btn">Notice Period</button>
      </div>

      <Modal
        isOpen={isCertificateModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Certificate Preview"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Certificate Preview</h2>
        <embed src={selectedCertificate} width="100%" height="400px" />
        <div className="modal-buttons">
          <button onClick={handleModalClose}>Close</button>
          <button onClick={() => window.print()}>Print</button>
          <button onClick={() => window.location.href = selectedCertificate}>Download</button>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeProfile;
