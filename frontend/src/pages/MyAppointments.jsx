import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('-');
    return dateArray[0] + ' ' + months[Number(dateArray[1] - 1)] + ' ' + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message || 'No appointments found.');
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || 'Try again later');
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      setAppointments((prev) => prev.filter((item) => item._id !== appointmentId));
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      );

      if (data?.success) {
        toast.success(data?.message || 'Appointment cancelled successfully');
      } else {
        getUserAppointments();
        toast.error(data?.message || 'Failed to cancel appointment');
      }
    } catch (error) {
      getUserAppointments();
      console.log(error);
      toast.error(error?.message || 'Try again later');
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    } else {
      setAppointments([]);
      toast.error('Please login to view your appointments');
      navigate('/login');
    }
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Appointments</h2>

      {appointments.length > 0 ? (
        <div className="space-y-8">
          {appointments.map((item, index) => {
            const isCancelled = item.cancelled;
            const isCompleted = item.status === 'Completed';

            return (
              <div
                key={index}
                className="relative bg-white/60 backdrop-blur-lg shadow-lg border border-gray-300 rounded-xl p-6 flex flex-col lg:flex-row items-center gap-6 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Status Tag */}
                <div className="absolute top-4 right-4">
                  {isCancelled ? (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">Cancelled</span>
                  ) : isCompleted ? (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">Completed</span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">Upcoming</span>
                  )}
                </div>

                {/* Patient */}
                <div className="flex flex-col items-center text-center">
                  <img
                    src={item?.userData?.image}
                    alt={item?.userData?.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-400"
                  />
                  <p className="mt-2 font-medium">{item?.userData?.name}</p>
                </div>

                {/* Arrow */}
                <div className="text-xl text-gray-600 hidden sm:block">
                  <FaArrowRight className="text-3xl sm:text-4xl md:mx-6 mx-2 rotate-90 sm:rotate-0" />
                </div>

                {/* Doctor */}
                <div className="flex flex-col items-center text-center">
                  <img
                    src={item?.docData?.image}
                    alt={item?.docData?.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-400"
                  />
                  <p className="mt-2 font-medium">{item?.docData?.name}</p>
                  <p className="text-sm text-gray-700">{item?.docData?.speciality}</p>
                </div>

                {/* Details */}
                <div className="flex-1 text-gray-900 text-sm md:text-base mt-6 lg:mt-0 w-full">
                  <div className="grid sm:grid-cols-2 gap-2 text-left">
                    <div>
                      <p><span className="font-semibold">Patient Email:</span> {item?.userData?.email}</p>
                      <p><span className="font-semibold">Phone:</span> {item?.userData?.phone}</p>
                    </div>
                    <div>
                      <p><span className="font-semibold">Doctor Exp:</span> {item?.docData?.experience} yrs</p>
                      <p><span className="font-semibold">Clinic:</span> {item?.docData?.address?.line1}</p>
                      <p className="text-xs">{item?.docData?.address?.line2}</p>
                    </div>
                    <div>
                      <p><span className="font-semibold">Date:</span> {slotDateFormat(item?.slotDate)}</p>
                      <p><span className="font-semibold">Time:</span> {item?.slotTime}</p>
                    </div>
                    <div>
                      <p><span className="font-semibold">Amount:</span> ₹{item?.amount}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <button
                    className={`relative overflow-hidden py-2 px-4 rounded-full border group ${
                      isCancelled || isCompleted
                        ? 'text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100'
                        : 'text-gray-900 border-gray-500'
                    }`}
                    disabled={isCancelled || isCompleted}
                  >
                    <span
                      className={`absolute inset-0 scale-x-0 origin-left transition-transform duration-300 ${
                        !(isCancelled || isCompleted) && 'bg-green-200 group-hover:scale-x-100'
                      }`}
                    ></span>
                    <span className="relative z-10 group-hover:text-black">Pay Online</span>
                  </button>

                  <button
                    onClick={() => cancelAppointment(item?._id)}
                    disabled={isCancelled || isCompleted}
                    className={`relative overflow-hidden py-2 px-4 rounded-full border group ${
                      isCancelled || isCompleted
                        ? 'text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100'
                        : 'text-gray-900 border-gray-500'
                    }`}
                  >
                    <span
                      className={`absolute inset-0 scale-x-0 origin-left transition-transform duration-300 ${
                        !(isCancelled || isCompleted) && 'bg-red-300 group-hover:scale-x-100'
                      }`}
                    ></span>
                    <span className="relative z-10 group-hover:text-black">Cancel Appointment</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-600">No appointments found.</p>
      )}
    </div>
  );
};

export default MyAppointments;
