import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrashAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [aToken, setAToken] = useState(localStorage.getItem('aToken'));
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [viewUser, setViewUser] = useState(null); // For viewing user profile
  const [editUser, setEditUser] = useState(null); // For editing user profile
  const [deleteUserId, setDeleteUserId] = useState(null); // For deleting user
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Show delete confirmation modal
  const [previewImage, setPreviewImage] = useState(null); // For profile picture preview

  // Fetch users with pagination
  const fetchUsers = async (page = 1) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-users?page=${page}`, {
        headers: { aToken }
      });

      if (data.success) {
        setUsers(data.users);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } else {
        toast.error(data.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Handle pagination
  const handlePagination = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    fetchUsers(newPage);
  };

  // Delete user
  const deleteUser = async () => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/admin/delete-user/${deleteUserId}`, {
        headers: { aToken }
      });

      if (data.success) {
        toast.success(data.message || 'User deleted successfully');
        setShowDeleteModal(false);
        fetchUsers(currentPage);
      } else {
        toast.error(data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  // View user profile
  const viewUserProfile = async (userId) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/view-user/${userId}`, {
        headers: { aToken }
      });

      if (data.success) {
        setViewUser(data.user); // Set the user data to view
      } else {
        toast.error(data.message || 'Failed to fetch user profile');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Edit user profile
  const editUserProfile = async (userId) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/view-user/${userId}`, {
        headers: { aToken }
      });

      if (data.success) {
        setEditUser(data.user); // Set the user data to edit
        setPreviewImage(data.user.profilePic || null); // Set the preview image from existing profile pic
      } else {
        toast.error(data.message || 'Failed to fetch user profile');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Handle form submission for updating user profile
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const { _id, name, email, ...updatedData } = editUser;

      const updatedFields = Object.keys(updatedData).reduce((acc, key) => {
        if (updatedData[key] !== editUser[key]) {
          acc[key] = updatedData[key];
        }
        return acc;
      }, {});

      if (Object.keys(updatedFields).length === 0) {
        toast.info('No changes were made');
        return;
      }

      const formData = new FormData();
      formData.append('name', editUser.name);
      formData.append('email', editUser.email);
      formData.append('phone', editUser.phone);
      formData.append('dob', editUser.dob);
      formData.append('gender', editUser.gender);
      if (editUser.profilePic) {
        formData.append('profilePic', editUser.profilePic);
      }

      const { data } = await axios.put(`${backendUrl}/api/admin/update-user/${_id}`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          aToken 
        }
      });

      if (data.success) {
        toast.success('User updated successfully');
        setEditUser(null); // Close the edit modal
        fetchUsers(currentPage); // Refresh the users list
      } else {
        toast.error(data.message || 'Failed to update user');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Handle image preview on file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreviewImage(URL.createObjectURL(file)); // Set the preview image
    setEditUser({ ...editUser, profilePic: file }); // Store the file for submission
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  return (
    <div className="users-list bg-white p-6 ml-2 mt-2 min-w-[80vw] rounded-lg shadow-lg h-screen overflow-hidden">
      <h3 className="text-2xl font-semibold mb-4">Users List</h3>
      <div className="overflow-x-auto max-h-[calc(100vh-80px)] overflow-y-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Total Spent</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">₹{user.totalCost || 0}</td>
                <td className="px-4 py-2 border">
                  <button onClick={() => viewUserProfile(user._id)} className="text-blue-500 hover:text-blue-700 mr-2">
                    <FaEye />
                  </button>
                  <button onClick={() => editUserProfile(user._id)} className="text-yellow-500 hover:text-yellow-700 mr-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => { setDeleteUserId(user._id); setShowDeleteModal(true); }} className="text-red-500 hover:text-red-700">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination mt-4 text-center">
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 1}
          className="px-4 py-2 bg-gray-300 rounded-md mr-2 disabled:opacity-50"
        >
          <FaArrowLeft />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 1}
          className="px-4 py-2 bg-gray-300 rounded-md ml-2 disabled:opacity-50"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Modal: View User Profile */}
      {viewUser && (
        <motion.div
          className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content bg-white p-6 rounded-lg w-3/4 max-w-4xl h-[50vh] overflow-auto"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              {/* Profile Picture */}
              <div className="mr-6">
                <img
                  src={viewUser.image || 'default-avatar.jpg'}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover shadow-lg"
                />
              </div>
              {/* Profile Details */}
              <div>
                <h2 className="text-3xl font-semibold mb-2">{viewUser.name}</h2>
                <p className="text-lg text-gray-700 mb-2"><strong>Email:</strong> {viewUser.email}</p>
                <p className="text-lg text-gray-700 mb-2"><strong>User ID:</strong> {viewUser._id}</p>
                <p className="text-lg text-gray-700 mb-2"><strong>Total Spent:</strong> ₹{viewUser.totalCost || 0}</p>
              </div>
            </div>

            <div className="border-t mt-6 pt-4">
              <h3 className="text-2xl font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p><strong>Phone:</strong> {viewUser.phone || 'Not Provided'}</p>
                  <p><strong>Date of Birth:</strong> {viewUser.dob || 'Not Provided'}</p>
                </div>
                <div>
                  <p><strong>Gender:</strong> {viewUser.gender || 'Not Provided'}</p>
                </div>
              </div>
            </div>

            <div className="border-t mt-6 pt-4">
              <h3 className="text-2xl font-semibold mb-4">Appointments</h3>
              <ul className="space-y-4">
                {viewUser.appointments && viewUser.appointments.length > 0 ? (
                  viewUser.appointments.map((appointment, index) => (
                    <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-md">
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Date:</span>
                        <span>{appointment.slotDate}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Time:</span>
                        <span>{appointment.slotTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Amount:</span>
                        <span>₹{appointment.amount}</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-4 bg-gray-50 rounded-lg shadow-md">No appointments found</li>
                )}
              </ul>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setViewUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Modal: Edit User Profile */}
      {editUser && (
        <motion.div
          className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content bg-white p-6 rounded-lg"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">Edit User Profile</h2>
            <form onSubmit={handleEditSubmit}>
              <label className="block mb-2">Phone:</label>
              <input
                type="text"
                value={editUser.phone || ''}
                onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                className="mb-4 p-2 border rounded w-full"
              />
              <label className="block mb-2">Date of Birth:</label>
              <input
                type="date"
                value={editUser.dob || ''}
                onChange={(e) => setEditUser({ ...editUser, dob: e.target.value })}
                className="mb-4 p-2 border rounded w-full"
              />
              <label className="block mb-2">Gender:</label>
              <select
                value={editUser.gender || ''}
                onChange={(e) => setEditUser({ ...editUser, gender: e.target.value })}
                className="mb-4 p-2 border rounded w-full"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              {/* Profile Picture Preview */}
              <label className="block mb-2">Profile Picture:</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="mb-4 p-2 border rounded w-full"
              />
              {previewImage && (
                <div className="mb-4">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
              )}

              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setEditUser(null)} type="button" className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Modal: Delete Confirmation */}
      {showDeleteModal && (
        <motion.div
          className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content bg-white p-6 rounded-lg"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this user?</h2>
            <button onClick={deleteUser} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Yes, Delete</button>
            <button onClick={() => setShowDeleteModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default UsersList;
