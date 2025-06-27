import React, { useContext } from 'react'
import { AdminContext } from '../context/adminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets.js'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className='min-h-screen bg-white border-r border-transparent'>
      {
        aToken && <ul className='text-[#515151] mt-5'>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 hover:bg-violet-100 px-3 transition-colors duration-100 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] text-gray-800 border-r-4 border-violet-400' : 'text-gray-800'}`
            }
            style={{ textDecoration: 'none' }}  // This removes the default underline
            to={'/admin-dashboard'}>
            <img src={assets.home_icon} />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 hover:bg-violet-100 transition-colors duration-100 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] text-gray-800 border-r-4 border-violet-400' : 'text-gray-800'}`
            }
            style={{ textDecoration: 'none' }}  // This removes the default underline
            to={'/all-appointments'}>
            <img src={assets.appointment_icon} />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 hover:bg-violet-100 transition-colors duration-100 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] text-gray-800 border-r-4 border-violet-400' : 'text-gray-800'}`
            }
            style={{ textDecoration: 'none' }}  // This removes the default underline
            to={'/add-doctor'}>
            <img src={assets.add_icon} />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 hover:bg-violet-100 transition-colors duration-100 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] text-gray-800 border-r-4 border-violet-400' : 'text-gray-800'}`
            }
            style={{ textDecoration: 'none' }}  // This removes the default underline
            to={'/doctor-list'}>
            <img src={assets.people_icon} />
            <p>Doctors List</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 hover:bg-violet-100 transition-colors duration-100 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] text-gray-800 border-r-4 border-violet-400' : 'text-gray-800'}`
            }
            style={{ textDecoration: 'none' }}  // This removes the default underline
            to={'/user-list'}>
            <img src={assets.people_icon} />
            <p>Users List</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 hover:bg-violet-100 transition-colors duration-100 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] text-gray-800 border-r-4 border-violet-400' : 'text-gray-800'}`
            }
            style={{ textDecoration: 'none' }}  // This removes the default underline
            to={'/user-control'}>
            <img src={assets.people_icon} />
            <p>Users controls</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
