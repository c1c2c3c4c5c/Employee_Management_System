import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MeetingSchedule.css';

// Function to fetch meetings from the backend
const fetchMeetings = async () => {
  try {
    const response = await fetch('/api/meetings');
    if (!response.ok) throw new Error('Failed to fetch meetings');
    return await response.json();
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return [];
  }
};

// Function to add a new meeting to the backend
const addMeeting = async (meeting) => {
  try {
    const response = await fetch('/api/meetings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meeting),
    });
    if (!response.ok) throw new Error('Failed to add meeting');
    return await response.json();
  } catch (error) {
    console.error('Error adding meeting:', error);
    return null;
  }
};

const MeetingSchedule = () => {
  const [meetings, setMeetings] = useState([]);
  const [newMeeting, setNewMeeting] = useState({ title: '', description: '', date: '' });
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const getMeetings = async () => {
      const meetingsData = await fetchMeetings();
      setMeetings(meetingsData);
    };
    getMeetings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting({ ...newMeeting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMeeting.title && newMeeting.description && selectedDate) {
      const newMeetingData = { ...newMeeting, date: selectedDate.toISOString().split('T')[0] };
      const addedMeeting = await addMeeting(newMeetingData);
      if (addedMeeting) {
        setMeetings([newMeetingData, ...meetings]);
        setNewMeeting({ title: '', description: '', date: '' });
        setShowForm(false);
      }
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowForm(true);
  };

  // Count the number of meetings per date
  const getMeetingCount = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return meetings.filter(meeting => meeting.date === dateString).length;
  };

  const tileClassName = ({ date }) => {
    const count = getMeetingCount(date);
    return count ? 'meeting-day' : null;
  };

  const tileContent = ({ date }) => {
    const count = getMeetingCount(date);
    return count ? <div className="meeting-badge">{count}</div> : null;
  };

  return (
    <div className="meeting-schedule">
      <h2>Meeting Schedule</h2>
      <div className="calendar-container">
        <Calendar
          value={selectedDate}
          onClickDay={handleDateClick}
          tileClassName={tileClassName}
          tileContent={tileContent}
        />
      </div>
      {showForm && (
        <form className="meeting-form" onSubmit={handleSubmit}>
          <h3>Schedule Meeting for {selectedDate.toDateString()}</h3>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newMeeting.title}
            onChange={handleInputChange}
            placeholder="Meeting Title"
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={newMeeting.description}
            onChange={handleInputChange}
            placeholder="Meeting Description"
          />
          <button type="submit">Schedule Meeting</button>
        </form>
      )}
      <div className="meetings">
        {meetings.map((meeting, index) => (
          <div key={index} className="meeting-details">
            <h4>{meeting.title}</h4>
            <p>{meeting.description}</p>
            <p>{meeting.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingSchedule;
