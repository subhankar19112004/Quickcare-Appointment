import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const Specialitymenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800 ' id='speciality'>
      <h1 className=' text-3xl font-medium '>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center lg:w-auto mx-13 text-sm '>Browse through our wide range of highly trusted doctors with ease, and effortlessly schedule your appointment without any hassle, 
      ensuring a smooth and seamless experience from start to finish.</p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
        {specialityData.map ((item, index) => (
          <Link onClick={() => scrollTo(0, 0)} className='flex flex-col items-center text-xs cursor-pointer shrink-0 hover:translate-y-[-10px] transition-all duration-700 ' to={`/doctors/${item.speciality}`} key={index}>
            <img  className='w-16 sm:w-24 mb-2' src={item.image}/>
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>

  )
}

export default Specialitymenu