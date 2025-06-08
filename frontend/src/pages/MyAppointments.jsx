
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { doctors } = useContext(AppContext)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Appointments</h2>

      <div className="space-y-6">
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row bg-white/40 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300"
          >
            {/* Doctor's Image */}
            <div className="w-24 h-24 mx-auto md:mx-0 mb-4 md:mb-0">
              <img
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-cover rounded-full border-2 border-gray-300"
              />
            </div>

            {/* Doctor's Information */}
            <div className="flex-1 text-gray-900">
              <p className="text-xl font-semibold text-black">{item?.name}</p>
              <p className="text-sm text-gray-800">{item?.speciality}</p>
              <p className="text-sm mt-2 text-gray-800">Address:</p>
              <p className="text-sm text-gray-700">{item?.address?.line1}</p>
              <p className="text-sm text-gray-700">{item?.address?.line2}</p>
              <p className="text-sm mt-2 text-gray-800">
                <span className="font-semibold">Date & Time:</span> 25, July, 2025 | 11:00 AM
              </p>
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col justify-between ml-0 md:ml-6 space-y-2 mt-4 md:mt-0">
              <button className="relative overflow-hidden bg-transparent text-gray-950 py-2 px-6 rounded-full border border-gray-500 group">
                <span className="absolute inset-0 w-full h-full bg-green-200 transform scale-x-0 origin-left transition-all duration-500 group-hover:scale-x-100"></span>
                <span className="relative group-hover:text-gray-800">Pay Online</span>
              </button>
              <button className="relative overflow-hidden bg-transparent text-black py-2 px-6 rounded-full border border-gray-500 group">
                <span className="absolute inset-0 w-full h-full bg-red-300 transform scale-x-0 origin-left transition-all duration-500 group-hover:scale-x-100"></span>
                <span className="relative group-hover:text-gray-800">Cancel Appointment</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
