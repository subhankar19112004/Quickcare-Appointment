// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const UserControllers = () => {
//   const [users, setUsers] = useState([]);
//   const [aToken] = useState(localStorage.getItem('aToken'));
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   // Fetch users with pagination
//   const fetchUsers = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/admin/all-users`, {
//         headers: { aToken }
//       });

//       if (data.success) {
//         setUsers(data.users);
//       } else {
//         toast.error(data.message || 'Failed to fetch users');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || 'Something went wrong');
//     }
//   };

//   // Block/Unblock user
//   const blockUser = async (userId, blockDuration) => {
//     try {
//       const { data } = await axios.post(`${backendUrl}/api/admin/block-user`, 
//         { userId, blockDuration },
//         { headers: { aToken } }
//       );

//       if (data.success) {
//         toast.success(data.message || (blockDuration > 0 ? 'User blocked successfully' : 'User unblocked successfully'));
//         fetchUsers();  // Refresh the users list
//       } else {
//         toast.error(data.message || 'Failed to block/unblock user');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || 'Something went wrong');
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="users-list bg-white p-6 ml-2 mt-2 min-w-[80vw] rounded-lg shadow-lg h-screen overflow-hidden">
//       <h3 className="text-2xl font-semibold mb-4">Users List</h3>
//       <div className="overflow-x-auto max-h-[calc(100vh-80px)] overflow-y-auto">
//         <table className="table-auto w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="px-4 py-2 border">Name</th>
//               <th className="px-4 py-2 border">Email</th>
//               <th className="px-4 py-2 border">Status</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td className="px-4 py-2 border">{user.name}</td>
//                 <td className="px-4 py-2 border">{user.email}</td>
//                 <td className="px-4 py-2 border">
//                   {user.blockUntil ? (
//                     <span className="text-red-500">Blocked until {new Date(user.blockUntil).toLocaleDateString()}</span>
//                   ) : (
//                     <span className="text-green-500">Active</span>
//                   )}
//                 </td>
//                 <td className="px-4 py-2 border">
//                   <button 
//                     onClick={() => blockUser(user._id, user.blockUntil ? 0 : 7)} // Block for 7 days or unblock if already blocked
//                     className={`text-${user.blockUntil ? 'green' : 'red'}-500 hover:text-${user.blockUntil ? 'green' : 'red'}-700 ml-2`}
//                   >
//                     {user.blockUntil ? 'Unblock' : 'Block'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserControllers;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const UserControllers = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const [aToken] = useState(localStorage.getItem('aToken'));
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch users with pagination
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-users`, {
        headers: { aToken }
      });

      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Block/Unblock user
  const blockUser = async (userId, blockDuration) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/block-user`, 
        { userId, blockDuration },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message || (blockDuration > 0 ? 'User blocked successfully' : 'User unblocked successfully'));
        fetchUsers();  // Refresh the users list
      } else {
        toast.error(data.message || 'Failed to block/unblock user');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Add new patient (user)
  const addPatient = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-patient`,
        { name, email, password },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message || 'Patient added successfully');
        setName('');
        setEmail('');
        setPassword('');
        fetchUsers();  // Refresh the users list
        setIsModalOpen(false); // Close the modal
      } else {
        toast.error(data.message || 'Failed to add patient');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-list bg-white p-6 ml-2 mt-2 min-w-[80vw] rounded-lg shadow-lg h-screen overflow-hidden">
      <h3 className="text-2xl font-semibold mb-4">Users List</h3>

      {/* Button to open the Add Patient Modal */}
      <button 
        onClick={openModal} 
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Patient
      </button>

      {/* Add Patient Modal */}
      {isModalOpen && (
        <motion.div
          className="modal-overlay fixed inset-0 bg-transparent backdrop-blur-xs flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content bg-white p-6 rounded-lg shadow-lg w-[90vw] sm:w-[600px] lg:w-[400px] max-h-[80vh] overflow-auto"
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <h4 className="text-xl font-semibold mb-4">Add New Patient</h4>
            <form onSubmit={addPatient}>
              <div>
                <label className="block mb-2">Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="border p-2 mb-2 w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="border p-2 mb-2 w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="border p-2 mb-2 w-full"
                />
              </div>
              <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2" 
                disabled={loading}
              >
                {loading ? 'Adding Patient...' : 'Add Patient'}
              </button>
              <button 
                type="button" 
                onClick={closeModal} 
                className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2"
              >
                Cancel
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Display Users */}
      <div className="overflow-x-auto max-h-[calc(100vh-80px)] overflow-y-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  {user.blockUntil ? (
                    <span className="text-red-500">Blocked until {new Date(user.blockUntil).toLocaleDateString()}</span>
                  ) : (
                    <span className="text-green-500">Active</span>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  <button 
                    onClick={() => blockUser(user._id, user.blockUntil ? 0 : 7)} // Block for 7 days or unblock if already blocked
                    className={`text-${user.blockUntil ? 'green' : 'red'}-500 hover:text-${user.blockUntil ? 'green' : 'red'}-700 ml-2`}
                  >
                    {user.blockUntil ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserControllers;
