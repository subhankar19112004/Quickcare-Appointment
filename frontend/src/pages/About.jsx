import React from 'react';
import { assets } from "../assets/assets_frontend/assets.js"
const About = () => {
  return (
    <div>


      <div className=' text-center text-2xl pt-10 text-gray-500'>
        <p> ABOUT <span className=' text-gray-700 font-medium'>US</span></p>
      </div>

      <div className=' my-10 flex flex-col md:flex-row gap-12'>
        <img className=' w-full max-w-[380px]' src={assets.about_image} alt='About us' />
        <div className=' flex flex-col gap-6 justify-center md:w-2/4 text-sm text-gray-600 '>
          <p>
            Welcome to Quickcare, your reliable ally in effortlessly managing your healthcare needs with convenience and efficiency. At Quickcare, we recognize the difficulties individuals encounter when scheduling doctor appointments and handling their health records.
          </p>
          <p>
            Quickcare is dedicated to excellence in healthcare technology. We consistently work to refine our platform, incorporating the latest innovations to enhance user experience and provide exceptional services. Whether you're booking your first appointment or managing ongoing care, Quickcare is here to guide and support you every step of the way
          </p>

          <b className=' text-gray-800'>Our Vision</b>
          <p>At Quickcare, our vision is to create a seamless healthcare experience for every user. We strive to bridge the gap between patients and healthcare providers, ensuring that you can easily access the care you need, exactly when you need it.
          </p>
        </div>
      </div>

      <div className=' text-xl my-4 '>
        <p className='uppercase'>Why <span className=' text-gray-700 font-semibold '>Chose Us</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20 gap-4'>
        <div className=' border rounded-md px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-violet-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Streamlined Appointment Scheduling That fits Into Your Busy Lifestyle</p>
        </div>

        <div className=' border rounded-md px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-violet-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
            <b>CONVIENCE:</b>
            <p>Access To A Network Of Trusted Healthcare Proffesionals In Your Area.</p>
        </div>

        <div className=' border rounded-md px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-violet-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
           <b>PERSONALIZATION:</b>
           <p>Tailored Recomendations And Remainders To Help You Stay On Top Of Your Health.</p>
        </div>
      </div>



    </div>
  )
}

export default About