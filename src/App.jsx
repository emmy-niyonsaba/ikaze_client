import { useState, useEffect } from 'react'

import { BrowserRouter,Route,Router,Routes , Navigate} from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/signUp'
import Navbar from './Navbar'
import Footer from './Footer'
import Manager from './pages/Manager'
import Appointment from './pages/Appointment'
import Schedule from './pages/Schedule'
import Statistic from './pages/statistic'
import Check from './pages/Check'
import About from './pages/About'
import ProtectedRoutes from "./components/ProtectedRoutes"
import DashboardLayout from "./components/DashboardLayout"
import Dashboard  from "./dashboard/Dashboard"
import Profile  from "./dashboard/Profile"
import Appointments  from "./dashboard/Appointments"
import AppointmentDetails from "./dashboard/AppointmentDetails"
import Report  from "./dashboard/Report"
import NotFound from './NotFound'
import BookAppointment from './dashboard/BookAppointment'
import EditAppointmentPage from './pages/EditAppointmentPage'
import MyAppointments from "./pages/MyAppointments"
import AppointmentCheckPage from "./pages/AppointmentCheckPage"


import SecurityDashboard from './security/SecurityDashboard'
import SecurityAppointmentsPage from './security/SecurityAppointmentsPage'
import SecurityReportsPage from './security/SecurityReportsPage'
import SecurityProfilePage from './security/SecurityProfilePage'
import SecurityVerifyPage from './security/SecurityVerifyPage'
import SecurityLayout from "./components/SecurityLayout"
import ProtectedRoute from './components/auth/ProtectedRoute'
import SuperAdminLayout from './components/layout/SuperAdminLayout'
import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard'
import SuperAdminColleges from './pages/super-admin/SuperAdminColleges'
import Admins from './pages/super-admin/Admins'
import CreateCollege from './pages/super-admin/CreateCollege'
import CommonProfile from "./pages/common/CommProfile"
import CollegeAdminLayout from './components/layout/CollegeAdminLayout'
import CollegeAdminDashboard from './pages/college-admin/CollegeAdminDashboard'
import CollegeAdminManagers from './pages/college-admin/CollegeAdminManagers'
import DepartmentManagers from './pages/college-admin/DepartmentManagers'
import AddDepartmentManager from './pages/college-admin/AddDepartmentManager'
import Departments from './pages/college-admin/Departments'
import CreateDepartment from './pages/college-admin/CreateDepartment'
import DepartmentManagerLayout from './components/layout/DepartmentManagerLayout'
import DepartmentManagerDashboard from './pages/department-manager/DepartmentManagerDashboard'
import DepartmentManagerAppointments from './pages/department-manager/DepartmentManagerAppointments'
import DepartmentManagerApprovals from './pages/department-manager/Approvals'
import AddAdmin from './pages/super-admin/AddAdmin'
function App() {
  const token = useAuthStore((s) => s.token);
  const fetchProfile = useAuthStore((s) => s.fetchProfile);

  useEffect(() => {
    if (token) {
      // try to fetch the current user profile on app load
      fetchProfile().catch(() => {
        /* fetchProfile handles redirect on 401 */
      });
    }
  }, [token]);




  return (
    <>
<BrowserRouter>
    
<Routes>


  <Route path='/' element={ <Navbar/>}>
      <Route index element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='signUp' element={<SignUp/>}/>
      {/* <Route path='booking' element={<BookAppointment/>}/> */}
      <Route path='appointments' element={<MyAppointments/>}/>
      <Route path='appointments/edit/:id' element={<EditAppointmentPage/>}/>
      <Route path='schedule' element={<Schedule/>}/>
      <Route path='statstic' element={<Statistic/>}/>
      <Route path='check' element={<Check/>}/>
      <Route path='about' element={<About/>}/>

      <Route path="appointments/:ref/verify" element={<AppointmentCheckPage/>}/>
      <Route path='*' element={<NotFound/>} />

  </Route>


   <Route path='security-dashboard' element={<SecurityLayout/>}>
          <Route index element={<SecurityDashboard/>}/>
          <Route path='verify-entry' element={<SecurityVerifyPage/>}/>
          <Route path='appointments' element={<SecurityAppointmentsPage/>}/>
          <Route path='reports' element={<SecurityReportsPage/>}/>
          <Route path='profile' element={<SecurityProfilePage/>}/>
          
   </Route>
   
   {/* USER DASHBOARD */}
  <Route path='/dashboard' element={<ProtectedRoutes><DashboardLayout/></ProtectedRoutes>}>
    <Route index  element={<Dashboard/>}/>
    <Route path="profile"  element={<Profile/>}/>
    <Route path="profile/:id" element={<Profile/>}/>
    <Route path="appointments"  element={<Appointments/>} />
    <Route path="book-appointment"  element={<BookAppointment/>} />
    <Route path="appointment/:id" element={<AppointmentDetails/>} />
    <Route path="report"  element={<Report/>}/>
    <Route path='*' element={<NotFound/>} />
  </Route>
  

   <Route path="/college-admin" element={<CollegeAdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<CollegeAdminDashboard />} />
        <Route path="managers" element={<CollegeAdminManagers />} />
        <Route path="profile" element={<CommonProfile/> } />
        <Route path="department-managers" element={<DepartmentManagers/> } />
        <Route path="department-managers/new" element={<AddDepartmentManager/> } />
        <Route path="departments" element={<Departments/> } />
        <Route path="departments/new" element={<CreateDepartment/> } />

   </Route>

      <Route path="/department-manager" element={<DepartmentManagerLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DepartmentManagerDashboard />} />
        <Route path="appointments" element={<DepartmentManagerAppointments />} />
        <Route path="approvals" element={<DepartmentManagerApprovals />} />
        <Route path="profile" element={<CommonProfile/> } />

      </Route>


   <Route path="/super-admin" element={<SuperAdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SuperAdminDashboard/>} />
        <Route path="colleges" element={<SuperAdminColleges />} />
        <Route path="colleges/new" element={<CreateCollege/>} />
        <Route path="admins" element={<Admins/>} />
        <Route path="admins/new" element={<AddAdmin/>} />
        <Route path="profile" element={<CommonProfile/> } />

   </Route>
 
</Routes>

</BrowserRouter>
   
    </>
  )
}

export default App
