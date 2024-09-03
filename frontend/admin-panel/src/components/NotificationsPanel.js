import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './NotificationsPanel.css';

// Function to fetch notifications from the backend
const fetchNotifications = async () => {
  try {
    const response = await fetch('/api/notifications');
    if (!response.ok) throw new Error('Failed to fetch notifications');
    return await response.json();
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

// Function to post a new notification to the backend
const postNotification = async (notification) => {
  try {
    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification),
    });
    if (!response.ok) throw new Error('Failed to post notification');
    return await response.json();
  } catch (error) {
    console.error('Error posting notification:', error);
    return null;
  }
};

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotificationTitle, setNewNotificationTitle] = useState('');
  const [newNotificationContent, setNewNotificationContent] = useState('');

  useEffect(() => {
    const getNotifications = async () => {
      const notificationsData = await fetchNotifications();
      // Filter notifications to only show those from the last 3 days
      const filteredNotifications = notificationsData.filter(notification => {
        const notificationDate = new Date(notification.date);
        const currentDate = new Date();
        const timeDifference = currentDate - notificationDate;
        const daysDifference = timeDifference / (1000 * 3600 * 24);
        return daysDifference <= 3;
      });
      setNotifications(filteredNotifications);
    };
    getNotifications();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewNotificationTitle('');
    setNewNotificationContent('');
  };

  const handlePostNotification = async () => {
    const newNotification = {
      title: newNotificationTitle,
      content: newNotificationContent,
      date: new Date().toISOString(),
    };
    const addedNotification = await postNotification(newNotification);
    if (addedNotification) {
      setNotifications([addedNotification, ...notifications]);
      handleCloseModal();
    }
  };

  return (
    <div className="notifications-panel">
      <h2>Notifications</h2>
      <ul className="notification-list">
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">
            <h4>{notification.title}</h4>
            <p>{notification.content}</p>
            <small>{new Date(notification.date).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
      <button className="post-notification-btn" onClick={handleOpenModal}>
        Post Notification
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Post Notification"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Post Notification</h2>
        <form className="notification-form">
          <label>
            Title:
            <input
              type="text"
              value={newNotificationTitle}
              onChange={(e) => setNewNotificationTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Content:
            <textarea
              value={newNotificationContent}
              onChange={(e) => setNewNotificationContent(e.target.value)}
              required
            />
          </label>
          <button type="button" className="post-btn" onClick={handlePostNotification}>
            Post
          </button>
        </form>
        <button className="close-btn" onClick={handleCloseModal}>X</button>
      </Modal>
    </div>
  );
};

export default NotificationsPanel;
