import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
import './AttendanceUpdates.css';

const AttendanceUpdates = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});
  const employeeId = 'your-employee-id'; // Replace with the actual employee ID

  // Fetch attendance data from backend when component mounts
  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await fetch(`/api/attendance/${employeeId}`);
      const data = await response.json();
      // Convert the array of attendance data to an object for easier access
      const attendanceObject = {};
      data.forEach(item => {
        attendanceObject[item.date] = item.present ? 'present' : 'absent';
      });
      setAttendanceData(attendanceObject);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      if (attendanceData[dateString] === 'present') {
        return 'present';
      } else if (attendanceData[dateString] === 'absent') {
        return 'absent';
      }
    }
    return null;
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const handleMarkAttendance = async (status) => {
    const dateString = selectedDate.toISOString().split('T')[0];

    try {
      await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId,
          date: dateString,
          present: status === 'present',
        }),
      });

      setAttendanceData((prevData) => ({
        ...prevData,
        [dateString]: status,
      }));
    } catch (error) {
      console.error('Error marking attendance:', error);
    }

    setModalIsOpen(false);
  };

  return (
    <div className="attendance-updates">
      <h2>Attendance</h2>
      <Calendar
        value={currentDate}
        tileClassName={tileClassName}
        onClickDay={handleDayClick}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Mark Attendance"
        className="attendance-modal"
        overlayClassName="attendance-modal-overlay"
      >
        <h3>Mark Attendance for {selectedDate && selectedDate.toDateString()}</h3>
        <div className="attendance-buttons">
          <button onClick={() => handleMarkAttendance('present')}>Mark Present</button>
          <button onClick={() => handleMarkAttendance('absent')}>Mark Absent</button>
        </div>
        <button onClick={() => setModalIsOpen(false)} className="close-modal">Close</button>
      </Modal>
    </div>
  );
};

export default AttendanceUpdates;
