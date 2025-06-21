import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken') : '');
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers:{aToken}});
            if(data.success) {
                setDoctors(data?.doctors);
                console.log(data?.doctors);
            } else{
                console.log(data.message);
                toast.error(data.message || 'Failed to fetch doctors');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Try again later');
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {headers:{aToken}});
            if(data.success) {
                toast.success(data.message || 'Availability changed successfully');
                getAllDoctors();
            } else{
                console.log(data.message);
                toast.error(data.message || 'Failed to change availability');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Try again later');
        }
    }

    const getAllAppointments = async () => {
        try {
           
            const { data } = await axios.get(backendUrl + '/api/admin/all-appointments',  {headers:{aToken}});
            if(data.success) {
                setAppointments(data?.appointments);
                console.log(data?.appointments);
            } else{
                console.log(data.message);
                toast.error(data.message || 'Failed to fetch appointments');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Try again later');
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId}, {headers:{aToken}});
            if(data.success) {
                toast.success(data.message || 'Appointment cancelled successfully');
                getAllAppointments();
            } else{
                console.log(data.message);
                toast.error(data.message || 'Failed to cancel appointment');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Try again later');
        }
    }

    const value = {
        aToken,
        setAToken,
        backendUrl,
        getAllDoctors,
        doctors,
        changeAvailability,
        getAllAppointments,
        appointments,
        setAppointments,
        cancelAppointment
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;