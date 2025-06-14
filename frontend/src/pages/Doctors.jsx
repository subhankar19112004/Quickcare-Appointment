import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [ showFilter, setShowFilter ] = useState(false);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors);
    }
  }

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist</p>
      <div className=' flex flex-col sm:flex-row items-start gap-5 mt-5'>
      <button className={ ` py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-indigo-100 text-black" : "bg-white text-gray-600" }` } onClick={() => setShowFilter(prev => !prev)} >Filters</button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex" }` } >
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={` w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer ${speciality === 'Gynecologist' ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
          <p onClick={() => speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')} className={` w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer ${speciality === 'General Physician' ? "bg-indigo-100 text-black" : ""}`}>General Physician</p>
          <p onClick={() => speciality === 'Pediatrician' ? navigate('/doctors') : navigate('/doctors/Pediatrician')} className={` w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer ${speciality === 'Pediatrician' ? "bg-indigo-100 text-black" : ""}`}>Pediatrician</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={` w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer ${speciality === 'Dermatologist' ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={` w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer ${speciality === 'Neurologist' ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={` w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-4'>
          {
            filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50 ' src={item.image} alt={item.name} />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-green-500'>
                    <p className={`w-2 h-2 rounded-full ${item?.available === true ? "bg-green-500" : "bg-red-500 "}`}></p><p className={`${item?.available === true ? "text-green-500" : "text-red-500"}`}>{item?.available === true ? "Available" : "Unavailable"}</p>
                  </div>
                  <p className=' text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-sm text-gray-600'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors;