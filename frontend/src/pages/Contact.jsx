import React from 'react'

import { assets } from "../assets/assets_frontend/assets.js";

const Contact = () => {
  return (
    <div>

      <div className=' text-center text-2xl pt-10 text-gray-500'>
        <p>
          CONNTACT <span className=' text-gray-700 font-semibold'>US</span>
        </p>
      </div>

      <div className=' my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm ' >
        <img className='w-full max-w-[360px] ' src={assets.contact_image}/>

        <div className=' flex flex-col justify-center items-start gap-6  '>
          <p className=' font-semibold text-lg text-gray-600 '>OUR OFFICE</p>
          <p className=' text-gray-500 font-mono '>750017 Vani Vihar Station
          <br/>
          Plot A-277, Bhubaneswar, ODISHA</p>
          <p className=' text-gray-500 font-mono '>Tel: +91 96969 32301 <br/> Email: aion@quickcare.com</p>
          <p className=' font-semibold text-lg text-gray-600'>Careers at QUICKCARE</p>
          <p className=' text-gray-500'>Learn more about our teams and jon openings.</p>
          <button className=' border  border-black text-black font-light px-8 py-4 hover:bg-black hover:text-white transition-colors duration-500 '>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact