import ProtectedRoute from '../auth/ProtectedRoute';
import DashboardLayout from './DashboardLayout';



const DepartmentManagerLayout = () => (
  <ProtectedRoute allowedRoles={['DEPARTMENT_MANAGER']}>
    <DashboardLayout />
  </ProtectedRoute>
);

export default DepartmentManagerLayout