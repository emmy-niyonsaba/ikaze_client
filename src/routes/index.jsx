// routes/index.jsx
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// // Auth Pages
// import Login from '../pages/auth/Login';
// import Register from '../pages/auth/Register';

// // Super Admin Pages
// import SuperAdminDashboard from '../pages/super-admin/Dashboard';
// import SuperAdminColleges from '../pages/super-admin/Colleges';
// import SuperAdminAdmins from '../pages/super-admin/Admins';

// // College Admin Pages
// import CollegeAdminDashboard from '../pages/college-admin/Dashboard';
// import CollegeAdminManagers from '../pages/college-admin/DepartmentManagers';

// // Department Manager Pages
// import DepartmentManagerDashboard from '../pages/department-manager/Dashboard';
// import DepartmentManagerAppointments from '../pages/department-manager/Appointments';

// // Security Manager Pages
// import SecurityManagerDashboard from '../pages/security-manager/Dashboard';
// import SecurityManagerPersonnel from '../pages/security-manager/SecurityPersonnel';

// // Security Pages
// import SecurityDashboard from '../pages/security/Dashboard';
// import SecurityCheckInOut from '../pages/security/CheckInOut';

// // User Pages
// import UserDashboard from '../pages/user/Dashboard';
// import UserBookAppointment from '../pages/user/BookAppointment';

// // Common Pages
// import Profile from '../pages/common/Profile';
// import Settings from '../pages/common/Settings';
// import Unauthorized from '../pages/common/Unauthorized';
import NotFound from '../NotFound';
import Login from '../pages/Login';
import Signup from '../pages/signUp';

// Layout wrappers for each role

const DepartmentManagerLayout = () => (
  <ProtectedRoute allowedRoles={['DEPARTMENT_MANAGER']}>
    <DashboardLayout />
  </ProtectedRoute>
);

const SecurityManagerLayout = () => (
  <ProtectedRoute allowedRoles={['SECURITY_MANAGER']}>
    <DashboardLayout />
  </ProtectedRoute>
);

const SecurityLayout = () => (
  <ProtectedRoute allowedRoles={['SECURITY']}>
    <DashboardLayout />
  </ProtectedRoute>
);

const UserLayout = () => (
  <ProtectedRoute allowedRoles={['USER']}>
    <DashboardLayout />
  </ProtectedRoute>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
      
     
{/* 
     
      

      <Route path="/security-manager" element={<SecurityManagerLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SecurityManagerDashboard />} />
        <Route path="personnel" element={<SecurityManagerPersonnel />} />
      </Route>

      <Route path="/security" element={<SecurityLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SecurityDashboard />} />
        <Route path="check" element={<SecurityCheckInOut />} />
      </Route>

      <Route path="/" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="book-appointment" element={<UserBookAppointment />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      /> */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;