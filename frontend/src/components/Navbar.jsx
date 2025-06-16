import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_frontend/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx';


const Navbar = () => {

    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken, userData } = useContext(AppContext);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div className=' items-center flex justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img onClick={() => navigate('/')} className='w-44 p-[-30px] cursor-pointer' src={assets.logo} />
            <ul className=' hidden md:flex items-start gap-5 font-medium'>
                <NavLink className=" hover:text-white" to={'/'}>
                    <li className='py-1 hover:text-black '>HOME</li>
                    <hr className=' text-gray-300 bg-violet-500 border-none outline-none h-0.5 w-3/5 m-auto hidden' />
                </NavLink>

                <NavLink className=" hover:text-white" to={'/doctors'}>
                    <li className='py-1 hover:text-black '>ALL DOCTORS</li>
                    <hr className=' bg-violet-500 text-gray-300 border-none outline-none h-0.5 w-3/5 m-auto hidden' />
                </NavLink>

                <NavLink className=" hover:text-white" to={'/about'}>
                    <li className='py-1 hover:text-black '>ABOUT</li>
                    <hr className=' text-gray-300 bg-violet-500 border-none outline-none h-0.5 w-3/5 m-auto hidden' />
                </NavLink>

                <NavLink className=" hover:text-white" to={'/help'}>
                    <li className='py-1 hover:text-black '>CONTACT</li>
                    <hr className=' text-gray-300 bg-violet-500 border-none outline-none h-0.5 w-3/5 m-auto hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center  transition-all duration-300 gap-4'>
                {
                    token && userData ?
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-8 rounded-full ' src={userData?.image} />
                            <img className='w-2.5' src={assets.dropdown_icon} />
                            <div className='absolute  top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-45 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('/my-profile')} className=' hover:text-black cursor-pointer  transition-all duration-300 hover:bg-stone-200 border rounded-md px-0.5 border-transparent'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointments')} className=' hover:text-black cursor-pointer  transition-all duration-300 hover:bg-stone-200 border rounded-md px-0.5 border-transparent'>My Appointments</p>
                                    <p onClick={() => logout()} className=' hover:text-black cursor-pointer  transition-all duration-300 hover:bg-stone-200 border rounded-md px-0.5 border-transparent'>Logout</p>
                                </div>
                            </div>
                        </div>
                        : <button onClick={() => navigate('/login')} className=' bg-violet-500 text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>

                }
                <img src={assets.menu_icon} className='w-6 md:hidden cursor-pointer' onClick={() => setShowMenu(true)} />

                {/* mobile menu  */}
                <div className={`${showMenu ? 'fixed w-full' : ' h-0 w-0 '} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white `}>
                    <div className=' flex items-center justify-between px-5 py-6'>
                        <img className=' w-36 ' src={assets.logo} alt="" />
                        <img className=' w-6 cursor-pointer' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium '>
                        <NavLink className='px-4 py-2 rounded inline-block hover:bg-violet-200 transition-colors duration-300' onClick={() => setShowMenu(false)} to={'/'}><p>Home</p></NavLink>
                        <NavLink className='px-4 py-2 rounded inline-block hover:bg-violet-200 transition-colors duration-300' onClick={() => setShowMenu(false)} to={'/doctors'}><p>All Doctors</p></NavLink>
                        <NavLink className='px-4 py-2 rounded inline-block hover:bg-violet-200 transition-colors duration-300' onClick={() => setShowMenu(false)} to={'/about'}><p>About us</p></NavLink>
                        <NavLink className='px-4 py-2 rounded inline-block hover:bg-violet-200 transition-colors duration-300' onClick={() => setShowMenu(false)} to={'/help'}><p>Need help?</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
