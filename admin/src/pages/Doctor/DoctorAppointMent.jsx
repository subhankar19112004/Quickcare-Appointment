import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/doctorContext';

// --- HELPER FUNCTION ---
/**
 * Parses a date string (DD-M-YYYY) and time string (hh:mm AM/PM) into a Date object.
 * This is crucial for checking if an appointment is in the past.
 * @param {string} dateStr - The date string, e.g., "28-6-2025"
 * @param {string} timeStr - The time string, e.g., "05:30 PM"
 * @returns {Date} A JavaScript Date object.
 */
const parseDateTime = (dateStr, timeStr) => {
  // Return null if data is invalid to prevent crashes
  if (!dateStr || !timeStr) return null;

  const [day, month, year] = dateStr.split('-').map(Number);
  const timeParts = timeStr.split(/[:\s]/); // Splits by colon or space
  
  let hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const modifier = timeParts[2];

  if (hours === 12) {
    hours = modifier === 'AM' ? 0 : 12;
  } else if (modifier === 'PM') {
    hours += 12;
  }

  // Check for valid numbers before creating a date
  if (isNaN(day) || isNaN(month) || isNaN(year) || isNaN(hours) || isNaN(minutes)) {
    return null;
  }
  
  // Month is 0-indexed in JavaScript Date (e.g., January is 0)
  return new Date(year, month - 1, day, hours, minutes);
};


// --- UI COMPONENTS ---

// A simple loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
  </div>
);

// A self-contained component for a single appointment card
const AppointmentCard = ({ appointment }) => {
    // A fallback avatar for patients without an image
    const FallbackAvatar = ({ name }) => (
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {name ? name.charAt(0).toUpperCase() : '?'}
        </div>
    );
    
    const appointmentDate = parseDateTime(appointment.slotDate, appointment.slotTime);
    const now = new Date();

    // Dynamically determines the status and corresponding color for the status badge
    const getStatus = () => {
        if (appointment.status === 'Cancelled') return { text: 'Cancelled', color: 'bg-red-100 text-red-800' };
        if (appointment.status === 'Completed') return { text: 'Completed', color: 'bg-green-100 text-green-800' };
        // If the appointment date is in the past and status isn't set, it's expired
        if (appointmentDate && appointmentDate < now) return { text: 'Expired', color: 'bg-yellow-100 text-yellow-800' };
        // Default status
        return { text: appointment.status || 'Scheduled', color: 'bg-blue-100 text-blue-800' };
    };

    const status = getStatus();

    // This data comes from your backend via the context
    const { name, email, image } = appointment.patientDetails || {};

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col">
            <div className="p-6 flex-grow">
                <div className="flex items-start space-x-4">
                     {image ? (
                        <img 
                            className="w-16 h-16 rounded-full object-cover shrink-0" 
                            src={image}
                            alt={name || 'Patient'}
                            // Basic error handling for broken image links
                            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex'; }}
                        />
                     ) : null}
                    {/* The fallback avatar is always in the DOM but hidden if the image loads */}
                    <FallbackAvatar name={name} />

                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{name || 'N/A'}</h3>
                        <p className="text-sm text-gray-500">{email || 'No email provided'}</p>
                    </div>
                     <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                        {status.text}
                    </span>
                </div>

                <div className="mt-4 border-t border-gray-200 pt-4 space-y-3">
                    <p className="text-gray-700 flex items-center text-sm">
                        <svg className="h-5 w-5 mr-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="font-medium">Date:</span>&nbsp;{appointment.slotDate}
                    </p>
                    <p className="text-gray-700 flex items-center text-sm">
                        <svg className="h-5 w-5 mr-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="font-medium">Time:</span>&nbsp;{appointment.slotTime}
                    </p>
                </div>
            </div>
        </div>
    );
};


// The main component to display doctor's appointments
const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (dToken) {
        setIsLoading(true);
        await getAppointments();
        setIsLoading(false);
      }
    };
    fetchAppointments();
    // Per your original code, this effect runs when dToken changes.
  }, [dToken, getAppointments]); // Added getAppointments to dependency array as it's best practice.

  // Render loading state while fetching data
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Your Appointments</h1>
          <p className="text-md text-gray-600 mt-1">Here is a list of your scheduled patient appointments.</p>
        </header>

        {/* Check if there are appointments to display */}
        {!appointments || appointments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No appointments</h3>
            <p className="mt-1 text-sm text-gray-500">You do not have any appointments scheduled at the moment.</p>
          </div>
        ) : (
          // Grid layout for the appointment cards
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map over the appointments array and render a card for each one */}
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment._id} appointment={appointment} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorAppointment;
