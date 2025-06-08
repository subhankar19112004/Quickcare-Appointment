import React from 'react'
import { assets } from "../assets/assets_frontend/assets.js"

const Header = () => {
  return (
    <div className=' flex flex-col md:flex-row flex-wrap bg-violet-500 rounded-lg px-6 md:px-10 lg:px-20'>

        {/* left Side ------- */}
        <div className='md:w-1/2 relative hidden md:block  '>
            <img className='w-full absolute right-6  bottom-0 h-auto rounded-lg' src={assets.header_img}/>
        </div>

        {/* ------- right Side */}
        <div className=' md:w-1/2 -mr-6 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-2xl md:text-3xl lg:text-4xl text-white font-sans  font-semibold leading-tight md:leading-tight lg:leading-tight'>
                Booking Appointments <br/> Made Easy with <span className='text-red-600'>Quickcare</span>
            </p>
            <div className='flex flex-col md:flex-row  items-center gap-3 text-white text-sm font-light'>
                <img className='w-28 ' src={assets.group_profiles}/>
                <p>Explore our trusted network of doctors <br className='hidden md:block'/> and easily book your appointment hassle-free.</p>
            </div>
            <a className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' href='#speciality'>Book Appointment 
            <img className='w-4' src={assets.arrow_icon}/> </a>

        </div>
    </div>
  )
}

export default Header