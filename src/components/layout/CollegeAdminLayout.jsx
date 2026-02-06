
import ProtectedRoute from '../auth/ProtectedRoute';
import DashboardLayout from './DashboardLayout';
const CollegeAdminLayout = () => (
  <ProtectedRoute allowedRoles={['COLLEGE_ADMIN']}>
    <DashboardLayout />
  </ProtectedRoute>
);

export default CollegeAdminLayout