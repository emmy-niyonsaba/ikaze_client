import ProtectedRoute from '../auth/ProtectedRoute';
import DashboardLayout from './DashboardLayout';
const SuperAdminLayout = () => (
  <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
    <DashboardLayout />
  </ProtectedRoute>
);

export default SuperAdminLayout