// import React from 'react'
// import { AdminContext } from '../../context/adminContext';
// import { useContext } from 'react';
// import { useEffect } from 'react';
// import { AppContext } from '../../context/AppContext';
// import { assets } from "../../assets/assets_admin/assets.js"

// const AllAppointments = () => {
//   const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
//   const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
//   useEffect(() => {
//     if (aToken) getAllAppointments();
//   }, [aToken]);
//   return (
//     <div className=' w-full max-w-6xl m-5'>
//       <p className=' mb-3 text-lg font-medium '>All Appointments</p>
//       <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[70vh] overflow-y-scroll '>
//         <div className=' hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Actions</p>
//         </div>
//         {
//           appointments.map((item, index) => (
//             <div className=' flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center grid-flow-col py-3 px-6 border-b hover:bg-gray-50' key={index}>
//               <p className=' text-gray-500 max-sm:hidden'>
//                 {index + 1}
//               </p>
//               <div className='flex items-center gap-2'>
//                 <img className='w-9 rounded-full ' src={item?.userData?.image} alt={item?.userData?.name} />
//                 <p>{item?.userData?.name}</p>
//               </div>
//               <p className=' max-sm:hidden'>{calculateAge(item?.userData?.dob)}</p>
//               <p>{slotDateFormat(item?.slotDate)}, {item?.slotTime}</p>
//               <div className='flex items-center gap-2'>
//                 <img className='w-9 rounded-full bg-gray-200 ' src={item?.docData?.image} alt={item?.docData?.name} />
//                 <p>{item?.docData?.name}</p>
//               </div>
//               <p>{currency} {item?.amount}</p>
//               {item?.cancelled ? 
//               <p className=' text-red-500 text-xs font-medium'>Cancelled</p> : 
//               <img onClick={() => cancelAppointment(item?._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}

//             </div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default AllAppointments

// import React, { useState, useContext } from 'react';
// import { AdminContext } from '../../context/adminContext';
// import { AppContext } from '../../context/AppContext';
// import { assets } from "../../assets/assets_admin/assets.js";
// import { useEffect } from 'react';

// const AllAppointments = () => {
//   const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
//   const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

//   const [showModal, setShowModal] = useState(false);
//   const [appointmentToCancel, setAppointmentToCancel] = useState(null);

//   const handleCancelClick = (appointmentId) => {
//     setAppointmentToCancel(appointmentId);
//     setShowModal(true);
//   };

//   const handleConfirmCancel = () => {
//     if (appointmentToCancel) {
//       cancelAppointment(appointmentToCancel);
//       setShowModal(false);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   useEffect(() => {
//     if (aToken) getAllAppointments();
//   }, [aToken]);

//   return (
//     <div className="w-full max-w-6xl m-5">
//       <p className="mb-3 text-lg font-medium">All Appointments</p>
      
//       {/* Show modal for confirmation */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-80">
//             <p className="font-semibold text-center mb-4">Are you sure you want to cancel this appointment?</p>
//             <div className="flex justify-between">
//               <button onClick={handleConfirmCancel} className="bg-red-500 text-white py-2 px-4 rounded">Confirm</button>
//               <button onClick={handleCloseModal} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[70vh] overflow-y-scroll">
//         <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Actions</p>
//         </div>

//         {/* If there are no appointments */}
//         {appointments.length === 0 ? (
//           <div className="flex flex-col items-center py-6">
//             <img className="w-16 h-16" src={assets.error_icon} alt="No Appointments" />
//             <p className="text-gray-500 text-sm mt-2">No appointments available at the moment.</p>
//           </div>
//         ) : (
//           appointments.map((item, index) => (
//             <div
//               className="flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center grid-flow-col py-3 px-6 border-b hover:bg-gray-50"
//               key={index}
//             >
//               <p className="text-gray-500 max-sm:hidden">{index + 1}</p>
//               <div className="flex items-center gap-2">
//                 <img className="w-9 rounded-full" src={item?.userData?.image} alt={item?.userData?.name} />
//                 <p>{item?.userData?.name}</p>
//               </div>
//               <p className="max-sm:hidden">{calculateAge(item?.userData?.dob)}</p>
//               <p>{slotDateFormat(item?.slotDate)}, {item?.slotTime}</p>
//               <div className="flex items-center gap-2">
//                 <img className="w-9 rounded-full bg-gray-200" src={item?.docData?.image} alt={item?.docData?.name} />
//                 <p>{item?.docData?.name}</p>
//               </div>
//               <p>{currency} {item?.amount}</p>
//               {item?.cancelled ? (
//                 <p className="text-red-500 text-xs font-medium">Cancelled</p>
//               ) : (
//                 <img onClick={() => handleCancelClick(item?._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;

import React, { useState } from 'react'
import { AdminContext } from '../../context/adminContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from "../../assets/assets_admin/assets.js"

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (selectedAppointment) {
      cancelAppointment(selectedAppointment._id);
    }
    setShowCancelModal(false);
  };

  const NoAppointmentsSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" fill="#f8f9fa"></circle>
      <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
      <line x1="9" y1="9" x2="9.01" y2="9"></line>
      <line x1="15" y1="9" x2="15.01" y2="9"></line>
      <path d="M3 12h18"></path>
      <path d="M12 3v3"></path>
      <path d="M12 21v-3"></path>
    </svg>
  );

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      
      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 border border-gray-800 backdrop-blur-xs bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-200 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Confirm Cancellation</h3>
              <button 
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-900">
                Are you sure you want to cancel the appointment of {selectedAppointment?.userData?.name} with {selectedAppointment?.docData?.name} on {slotDateFormat(selectedAppointment?.slotDate)} at {selectedAppointment?.slotTime}?
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                No, Keep It
              </button>
              <button
                onClick={confirmCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[70vh] overflow-y-scroll'>
        {appointments.length > 0 ? (
          <>
            <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
              <p>#</p>
              <p>Patient</p>
              <p>Age</p>
              <p>Date & time</p>
              <p>Doctor</p>
              <p>Fees</p>
              <p>Actions</p>
            </div>
            {appointments.map((item, index) => (
              <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center grid-flow-col py-3 px-6 border-b hover:bg-gray-50' key={index}>
                <p className='text-gray-500 max-sm:hidden'>
                  {index + 1}
                </p>
                <div className='flex items-center gap-2'>
                  <img className='w-9 rounded-full' src={item?.userData?.image} alt={item?.userData?.name} />
                  <p>{item?.userData?.name}</p>
                </div>
                <p className='max-sm:hidden'>{calculateAge(item?.userData?.dob)}</p>
                <p>{slotDateFormat(item?.slotDate)}, {item?.slotTime}</p>
                <div className='flex items-center gap-2'>
                  <img className='w-9 rounded-full bg-gray-200' src={item?.docData?.image} alt={item?.docData?.name} />
                  <p>{item?.docData?.name}</p>
                </div>
                <p>{currency} {item?.amount}</p>
                {item?.cancelled ? 
                  <p className='text-red-500 text-xs font-medium'>Cancelled</p> : 
                  <img 
                    onClick={() => handleCancelClick(item)} 
                    className='w-10 cursor-pointer hover:opacity-70 transition-opacity' 
                    src={assets.cancel_icon} 
                    alt="Cancel appointment" 
                  />
                }
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <NoAppointmentsSVG />
            <p className="mt-4 text-gray-500 text-lg">No appointments available</p>
            <p className="text-gray-400 text-sm">When appointments are booked, they will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllAppointments