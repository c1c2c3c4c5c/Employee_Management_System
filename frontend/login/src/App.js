import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ADashboardLayout from '../EMS_PROJECT/frontend/admin-panel/src/components/DashboardLayout'; 
import EDashboardLayout from '../EMS_PROJECT/frontend/dash/src/components/DashboardLayout'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin/dashboard" element={<ADashboardLayout />} />
                <Route path="/employee/dashboard" element={<EDashboardLayout />} />
            </Routes>
        </Router>
    );
};

export default App;
