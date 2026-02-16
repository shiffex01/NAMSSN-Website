import React from 'react';
import AdminDashboard from './AdminDashboard';
import { Outlet } from 'react-router-dom';

function AdminPage() {
    return (
        <Outlet>
        <AdminDashboard/>
        </Outlet>
        
    );
}

export default AdminPage;