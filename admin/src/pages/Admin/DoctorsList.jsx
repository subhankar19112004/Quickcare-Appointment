import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/adminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);
  useEffect(() => {
    if(aToken) {
      getAllDoctors();
      
    }
    
  }, [aToken])
  return (
    <div className=' m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-2xl font-bold'>All Doctors <span className='text-green-500'>({doctors.length})</span> </h1>
      <div className=' w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item, index) => (
            <div className=' border border-indigo-200 rounded-xl  max-w-56 overflow-hidden cursor-pointer group ' key={index}>
              <img className=' bg-indigo-50 group-hover:bg-indigo-100 transition-all duration-300' src={item?.image} alt={item?.name}/>
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item?.name}</p>
                <p className='text-zinc-600 text-sm'>{item?.speciality}</p>
                <div className=' mt-2 flex items-center gap-2 text-sm'>
                  <input
                    type='checkbox'
                    onChange={(e) => changeAvailability(item?._id, e.target.checked)}
                    checked={item?.available}
                  />
                  <p className={item?.available ? "text-green-500" : "text-red-500"}>{item?.available ? "Available" : "Unavailable"}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList;