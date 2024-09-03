import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ADashboardLayout from './components/ADashboardLayout.js';
import SidePanel from './components/SidePanel';
import Profile from './components/Profile.js';
import EmployeeProfile from './components/EmployeeProfile.js';
import TaskAllocation from './components/TaskAllocation.js';
import MeetingSchedule from './components/MeetingSchedule';
import NotificationsPanel from './components/NotificationsPanel.js';
import AccountCreation from './components/AccountCreation.js'
import EmployeeList from './components/EmployeeList';
import Reporting from './components/Reporting.js';
import Logout from './components/Logout';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <SidePanel />

                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<ADashboardLayout />} />
                        <Route path="/dashboard" element={<ADashboardLayout />} />
                        <Route path="/profile" element={<Profile />} />
                        {/* <Route path="/employee-profile" element={<EmployeeProfile />} /> */}
                        <Route path="/employee/:id" element={<EmployeeProfile></EmployeeProfile>} />
                        <Route path="/task-allocation" element={<TaskAllocation />} />
                        <Route path="/meeting-schedule" element={<MeetingSchedule />} />
                        <Route path="/notifications-panel" element={<NotificationsPanel />} />
                        <Route path="/account-creation" element={<AccountCreation />} />
                        <Route path="/employee-list" element={<EmployeeList />} />
                        <Route path="/reporting" element={<Reporting />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

