import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* --left Side ----------------- */}
            <div>
                <img className='w-40 mb-5' src={assets.logo} alt="QuickCare Logo" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                  QuickCare is a user-friendly online platform that revolutionizes the way patients book doctor appointments. With QuickCare, users can easily search for doctors by specialty, location, or name, and book appointments at their convenience.
                </p>
            </div>
        {/* ----------- Center --------- */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
        {/* -------------- Right Side --  */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>
                        <a href="mailto:aion@quickcare.com" className="hover:text-blue-500">aion@quickcare.com</a>
                    </li>
                    <li>
                        <a href="tel:+919696932301" className="hover:text-blue-500">+91 96969 32301</a>
                    </li>
                </ul>
            </div>
        </div>
        {/* -------copyright text------- */}
        <div>
            <hr className='text-violet-600' />
            <p className='py-5 text-sm text-blue-600 text-center'>© 2025 QuickCare. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer
