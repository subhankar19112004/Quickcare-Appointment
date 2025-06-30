import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const DoctorContext = createContext();



const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [ dToken, setDToken ] = useState(localStorage.getItem('dToken')? localStorage.getItem('dToken') : '');
    const [ appointments, setAppointments ] = useState([]);


    // const getAppointments = async () => {
    //     try {
    //         const { data } = await axios.get(backendUrl + '/api/doctor/appointments',  {headers:{dToken}});
    //         if(data.success) {
                
    //             setAppointments(data.appointments.reverse());
    //             toast.success(data.message);
    //             console.log(data?.appointments);
    //         } else{
    //             console.log(data.message);
    //             toast.error(data.message || 'Failed to fetch appointments');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error.response?.data?.message || 'Try again later');
    //     }
    // }
    const getAppointments = async () => {
    try {
        const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dToken } });

        if (data.success) {
            let appointmentsArray = []; // Initialize an empty array

            if (Array.isArray(data.appointments)) {
                // If the API returns an array, use it directly.
                appointmentsArray = data.appointments;
            } else if (data.appointments) {
                // If it returns a non-null object (our single appointment case),
                // wrap it in an array.
                appointmentsArray = [data.appointments];
            }
            
            // Now, appointmentsArray is guaranteed to be an array.
            // We can safely reverse it and set the state.
            setAppointments(appointmentsArray.reverse()); 
            toast.success(data.message);
            console.log("Processed appointments:", appointmentsArray);

        } else {
            console.log(data.message);
            toast.error(data.message || 'Failed to fetch appointments');
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || 'Try again later');
    }
}
    const value = {
        dToken,
        setDToken,
        backendUrl,
        getAppointments,
        appointments,
        setAppointments
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider