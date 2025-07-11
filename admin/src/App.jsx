import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/adminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorsList from './pages/Admin/DoctorsList';
import Adddoctor from './pages/Admin/Adddoctor';
import UsersList from './pages/Admin/UsersList';
import UserControllers from './pages/Admin/UserControllers'
import { DoctorContext } from './context/doctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointMent from './pages/Doctor/DoctorAppointMent';
import DoctorProfile from './pages/Doctor/DoctorProfile';

function App() {

  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return aToken || dToken ? (
    <div className=' bg-indigo-50'>


      <ToastContainer
        position="top-right"
        autoClose={1000} // Reduce the time the toast stays visible to 3 seconds
        hideProgressBar={true} // Show the progress bar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="custom-toast" // Custom toast style
        bodyClassName="custom-toast-body" // Custom body style
      />
      <Navbar />
      <div className="flex items-start ">
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path='/' element={<Dashboard />} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<Adddoctor />} />
          <Route path='/doctor-list' element={<DoctorsList />} />
          <Route path='/user-list' element={<UsersList />} />
          <Route path='/user-control' element={<UserControllers />} />

          {/* Doctor Routes */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointMent />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />




        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer
        position="top-right"
        autoClose={2000} // Reduce the time the toast stays visible to 3 seconds
        hideProgressBar={false} // Show the progress bar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="custom-toast" // Custom toast style
        bodyClassName="custom-toast-body" // Custom body style
      />
    </>
  )
}

export default App