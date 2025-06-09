import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/adminContext';

function App() {

  const { aToken } = useContext(AdminContext);
  return aToken ? (
    <div>

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