

import React, { useState } from 'react'
import { assets } from "../assets/assets_frontend/assets.js"
import { FaEdit, FaSave } from "react-icons/fa"; // React Icons for Edit and Save buttons

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: 'richardjameswap@gmail.com',
    phone: '+91 96969 78952',
    address: {
      line1: "57th Cross, Richmond",
      line2: "Bangalore, Karnataka"
    },
    gender: "Male",
    dob: "1990-01-01",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl hover:shadow-none transition-all duration-300">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:space-x-6 mb-6">
        <img 
          src={userData.image} 
          alt={userData.name} 
          className="w-32 h-32 sm:w-24 sm:h-24 rounded-full border-4 border-indigo-500 shadow-lg"
        />
        <div className="mt-4 sm:mt-0 text-center sm:text-left">
          {
            isEdit ? 
              <input 
                type="text"
                className="text-xl font-semibold border-b-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                value={userData.name} 
              />
              :
              <p className="text-xl font-semibold">{userData.name}</p>
          }
        </div>
      </div>

      <hr className="mb-6" />

      {/* Contact Information */}
      <div>
        <p className="text-xl font-semibold text-gray-700 mb-4">CONTACT INFORMATION</p>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Email ID:</p>
            <p>{userData.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone:</p>
            {
              isEdit ? 
                <input 
                  type='text'
                  className="border-b-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  value={userData.phone} 
                />
                : 
                <p>{userData.phone}</p>
            }
          </div>
          <div>
            <p className="font-medium">Address:</p>
            {
              isEdit ? 
                <>
                  <input 
                    type="text" 
                    className="w-full sm:w-auto mb-2 border-b-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                    value={userData.address.line1} 
                  />
                  <input 
                    type="text" 
                    className="w-full sm:w-auto mb-2 border-b-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                    value={userData.address.line2} 
                  />
                </>
                : 
                <p>{userData.address.line1}<br />{userData.address.line2}</p>
            }
          </div>
        </div>
      </div>

      <hr className="my-6" />

      {/* Basic Information */}
      <div>
        <p className="text-xl font-semibold text-gray-700 mb-4">BASIC INFORMATION</p>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Gender:</p>
            {
              isEdit ? 
                <select 
                  className="w-full sm:w-auto border-b-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                  value={userData.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                : 
                <p>{userData.gender}</p>
            }
          </div>

          <div>
            <p className="font-medium">Date of Birth:</p>
            {
              isEdit ? 
                <input 
                  type="date" 
                  className="w-full sm:w-auto border-b-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                  value={userData.dob} 
                />
                : 
                <p>{userData.dob}</p>
            }
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center sm:justify-end space-x-4">
        {
          isEdit ? 
            <button 
              onClick={() => setIsEdit(false)} 
              className="bg-indigo-600 text-white p-2 rounded-md flex items-center space-x-2 transition-all duration-200 hover:bg-indigo-700 active:transform active:scale-95"
            >
              <FaSave /> <span>Save Information</span>
            </button>
            : 
            <button 
              onClick={() => setIsEdit(true)} 
              className="bg-green-500 text-white p-2 rounded-md flex items-center space-x-2 transition-all duration-200 hover:bg-green-600 active:transform active:scale-95"
            >
              <FaEdit /> <span>Edit</span>
            </button>
        }
      </div>
    </div>
  );
}

export default MyProfile;
