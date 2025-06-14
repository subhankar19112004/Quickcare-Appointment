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

function App() {

  const { aToken } = useContext(AdminContext);
  return aToken ? (
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
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllAppointments/>} />
          <Route path='/add-doctor' element={<Adddoctor/>} />
          <Route path='/doctor-list' element={<DoctorsList/>} />

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