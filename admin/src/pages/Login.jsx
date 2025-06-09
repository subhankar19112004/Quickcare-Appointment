import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets_admin/assets.js"
import { AdminContext } from '../context/adminContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('admin@quickcare.com');
    const [password, setPassword] = useState('Admin@123');
    const { setAToken, backendUrl } = useContext(AdminContext);


const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
        // Log the data for debugging
        console.log('Email:', email, 'Password:', password);
        
        if (state === 'Admin') {
            const { data } = await axios.post(backendUrl + '/api/admin/login', 
                { email, password }, 
                {
                    headers: {
                        'Content-Type': 'application/json',  // Ensure the correct content type
                    },
                }
            );
            if (data.success) {
                localStorage.setItem('aToken', data.token);
                setAToken(data.token);
                toast.success('Login successful!');  // Display success message
            } else {
                // Display the message from the server response in the toast
                toast.error(data.message || 'Login failed!');  // Show the error message from the backend
            }
        }
    } catch (error) {
        // Log the error for debugging
        console.log('Error:', error.response ? error.response.data : error.message);

        // Access the error message from the response and display in toast
        const errorMessage = error.response && error.response.data && error.response.data.message;
        toast.error(errorMessage || 'Something went wrong! Please try again.');  // Display the error message from the backend
    }
};



    return (
        <form onSubmit={onSubmitHandler} className=' min-h-[80vh] flex items-center'>
            <div className=' flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-transparent rounded-xl text=[#5E5E5E] text-sm shadow-lg '>
                <p className=' text-2xl  font-semibold m-auto'>
                    <span className=' text-violet-400 font-serif'>{state}</span>
                    {" "}Login
                </p>
                <div className='w-full'>
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className=' border border-gray-200 rounded w-full p-2 mt-1'
                        type="text"
                        required
                        placeholder='Enter email'
                    />
                </div>
                <div className=' w-full'>
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                        className=' border border-gray-200 rounded w-full p-2 mt-1'
                        type="password"
                        required
                        placeholder='Enter password' />
                </div>
                <div>
                </div>
                <button className=' bg-violet-400 text-white w-full py-2 rounded-md text-base' type='submit'>Login</button>
                {
                    state === "Admin"
                        ? <p>Doctor Login <span className=' text-violet-700 cursor-pointer' onClick={() => setState("Doctor")}>here</span> </p>
                        : <p>Admin Login <span className=' text-violet-700 cursor-pointer' onClick={() => setState("Admin")}>here</span> </p>
                }
            </div>
        </form>
    )
}

export default Login

