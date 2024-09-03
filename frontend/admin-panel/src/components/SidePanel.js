import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './icons';
// import ProfileIcon from '../icons/profile.svg';
// import EmployeeIcon from '../icons/employee.svg';
// import TaskIcon from '../icons/task.svg';
// import MeetingIcon from '../icons/meeting.svg';
// import NotificationIcon from '../icons/notification.svg';
// import AccountIcon from '../icons/account.svg';
// import ReportingIcon from '../icons/report.svg';
// import LogoutIcon from '../icons/logout.svg';
// import DashIcon from '../icons/dashboard.svg';
import './SidePanel.css';

// Function to fetch menu items from the backend
const fetchMenuItems = async () => {
    try {
        const response = await fetch('/api/menu-items');
        if (!response.ok) throw new Error('Failed to fetch menu items');
        return await response.json();
    } catch (error) {
        console.error('Error fetching menu items:', error);
        return [];
    }
};

const SidePanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadMenuItems = async () => {
            const items = await fetchMenuItems();
            setMenuItems(items);
        };
        loadMenuItems();
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navigateTo = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    return (
        <div>
            {!isOpen && (
                <div className="icon-bar">
                    <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                        ☰
                    </button>
                    {menuItems.map((item) => (
                        <div key={item.path} className="icon-btn">
                            <div className="side-panel-item" onClick={() => navigateTo(item.path)}>
                                <img src={item.icon} alt={`${item.title} Icon`} className="side-panel-icon" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {isOpen && (
                <div className={`side-panel ${isOpen ? 'open' : ''}`}>
                    <button className="close-btn" onClick={toggleSidebar}>
                        &times;
                    </button>
                    <div className='side-panel-in'>
                        {menuItems.map((item) => (
                            <div key={item.path} className="side-panel-item" onClick={() => navigateTo(item.path)}>
                                <img src={item.icon} alt={`${item.title} Icon`} className="side-panel-icon" />
                                {item.title}
                            </div>
                        ))}
                    </div>
                    <footer>
                        Copyright © 2024 Dharmakit Networks Pvt. Ltd. |
                        <a href="/terms-of-service">Terms of Service</a> |
                        <a href="/privacy-policy">Privacy Policy</a>
                    </footer>
                </div>
            )}
        </div>
    );
};

export default SidePanel;
