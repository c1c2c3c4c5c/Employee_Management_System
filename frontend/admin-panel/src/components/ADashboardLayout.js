import React, { useEffect, useState } from 'react';
import PersonalInformation from './PersonalInformation';
import AttendanceUpdates from './AttendanceUpdates';
import Newsletter from './Newsletter';
import './ADashboardLayout.css';
import SidePanel from './SidePanel';

// You can use this for handling API calls
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const ADashboardLayout = () => {
    const [personalInfo, setPersonalInfo] = useState({});
    const [newsletter, setNewsletter] = useState([]);

    useEffect(() => {
        // Fetch personal information and newsletter data when the component mounts
        const fetchPersonalInfo = async () => {
            const data = await fetchData('/api/personalInformation');
            setPersonalInfo(data);
        };

        const fetchNewsletter = async () => {
            const data = await fetchData('/api/getNewsLetter');
            setNewsletter(data);
        };

        fetchPersonalInfo();
        fetchNewsletter();
    }, []);

    return (
        <div className="dashboard-container">
            <SidePanel />
            <div className="dashboard-layout">
                <div className="dashboard-section personal-info">
                    <PersonalInformation info={personalInfo} />
                </div>
                <div className="dashboard-section attendance-updates">
                    <AttendanceUpdates />
                </div>
                <div className="dashboard-section newsletter">
                    <Newsletter articles={newsletter} />
                </div>
            </div>
        </div>
    );
};

export default ADashboardLayout;
