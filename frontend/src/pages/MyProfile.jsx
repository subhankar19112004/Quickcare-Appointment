

// import React, { useContext, useState } from 'react';
// import { AppContext } from '../context/AppContext';
// import { FaEdit, FaSave, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaVenusMars, FaBirthdayCake } from 'react-icons/fa';
// import { assets } from "../assets/assets_frontend/assets.js"
// import axios from 'axios';
// import { toast } from 'react-toastify';
// const MyProfile = () => {
//   const { userData, setUserData, loadingUser, token, backendUrl, loadUserProfileData } = useContext(AppContext);
//   const [isEdit, setIsEdit] = useState(false);
//   const [ image, setImage ] = useState(false);



//   // Handle safe address extraction in case address is missing after refresh
//   const address = userData?.address || { line1: "", line2: "" };

//   const updateUserProfileData = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", userData.name);
//       formData.append("phone", userData.phone);
//       formData.append("gender", userData.gender);
//       formData.append("dob", userData.dob);
//       formData.append("address", JSON.stringify(userData.address));
//       image && formData.append("image", image);

//       const { data } = await axios.post(backendUrl + "/api/user/update-profile", formData, {
//         headers: { token },
//       });
//       if (data.success) {
//         toast.success(data.message);
        
//         await loadUserProfileData();
//         setIsEdit(false);
//         setImage(false);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message || "Try again later");

//     }
//   }

//   // Simplified address updater for cleaner code
//   const updateAddress = (key, value) => {
//     setUserData(prev => ({
//       ...prev,
//       address: { ...(prev.address || {}), [key]: value }
//     }));
//   };

//   if (loadingUser) return <div className="text-center text-xl font-semibold mt-10">Loading your profile...</div>;
//   if (!userData) return <div className="text-center text-xl font-semibold mt-10">No user data found.</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl border border-gray-200 mt-10">
      
//       {/* Profile Header */}
//       <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
//         <div className="relative">
//         {
//           isEdit ? <label htmlFor='image'>
//             <div className=' inline-block relative cursor-pointer'>
//               <img className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-xl object-cover" src={ image ? URL.createObjectURL(image) : userData.image} alt="" />
//               <img className="w-10 absolute bottom-12 right-12" src={ image ? " " : assets.upload_icon } alt="" />
//             </div>
//             <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden/>
//           </label> :
//            <img 
//             src={userData.image} 
//             alt={userData.name} 
//             className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-xl object-cover"
//           />
//         }
         
//           {isEdit && <p className="absolute bottom-0 left-0 bg-indigo-500 text-white text-xs px-2 py-1 rounded-tr-md rounded-bl-md">Profile Pic</p>}
//         </div>

//         <div className="text-center md:text-left">
//           {isEdit ? (
//             <input 
//               type="text"
//               className="text-3xl font-bold border-b-2 border-indigo-400 bg-transparent focus:outline-none p-1"
//               onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
//               value={userData.name} 
//             />
//           ) : (
//             <h2 className="text-3xl font-bold text-indigo-600">{userData.name}</h2>
//           )}
//           <p className="mt-2 text-gray-600">Your Personal Info</p>
//         </div>
//       </div>

//       <hr className="mb-8 border-indigo-300" />

//       {/* Contact Information */}
//       <div className="space-y-6">
//         <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Contact Information</h3>

//         <div className="flex items-center gap-4 text-lg">
//           <FaEnvelope className="text-indigo-500" />
//           <span>{userData.email}</span>
//         </div>

//         <div className="flex items-center gap-4 text-lg">
//           <FaPhoneAlt className="text-indigo-500" />
//           {isEdit ? (
//             <input 
//               type="text"
//               className="border-b-2 border-gray-300 focus:border-indigo-500 bg-transparent outline-none"
//               onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
//               value={userData.phone} 
//             />
//           ) : (
//             <span>{userData.phone}</span>
//           )}
//         </div>

//         <div className="flex items-start gap-4 text-lg">
//           <FaMapMarkerAlt className="text-indigo-500 mt-1" />
//           {isEdit ? (
//             <div className="flex flex-col gap-2">
//               <input 
//                 type="text"
//                 className="border-b-2 border-gray-300 focus:border-indigo-500 bg-transparent outline-none"
//                 onChange={(e) => updateAddress('line1', e.target.value)}
//                 value={address.line1} 
//               />
//               <input 
//                 type="text"
//                 className="border-b-2 border-gray-300 focus:border-indigo-500 bg-transparent outline-none"
//                 onChange={(e) => updateAddress('line2', e.target.value)}
//                 value={address.line2} 
//               />
//             </div>
//           ) : (
//             <span>{address.line1}<br />{address.line2}</span>
//           )}
//         </div>
//       </div>

//       <hr className="my-8 border-indigo-300" />

//       {/* Basic Information */}
//       <div className="space-y-6">
//         <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Basic Information</h3>

//         <div className="flex items-center gap-4 text-lg">
//           <FaVenusMars className="text-indigo-500" />
//           {isEdit ? (
//             <select 
//               className="border-b-2 border-gray-300 focus:border-indigo-500 bg-transparent outline-none"
//               onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
//               value={userData.gender}
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           ) : (
//             <span>{userData.gender}</span>
//           )}
//         </div>

//         <div className="flex items-center gap-4 text-lg">
//           <FaBirthdayCake className="text-indigo-500" />
//           {isEdit ? (
//             <input 
//               type="date"
//               className="border-b-2 border-gray-300 focus:border-indigo-500 bg-transparent outline-none"
//               onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
//               value={userData.dob} 
//             />
//           ) : (
//             <span>{userData.dob}</span>
//           )}
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="mt-10 flex justify-center md:justify-end gap-4">
//         {isEdit ? (
//           <button
//             onClick={updateUserProfileData}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold flex items-center gap-2"
//           >
//             <FaSave /> Save Changes
//           </button>
//         ) : (
//           <button
//             onClick={() => setIsEdit(true)}
//             className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center gap-2"
//           >
//             <FaEdit /> Edit Profile
//           </button>
//         )}
//       </div>

//     </div>
//   );
// }

// export default MyProfile;

import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FaEdit, FaSave, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaVenusMars, FaBirthdayCake } from 'react-icons/fa';
import { assets } from "../assets/assets_frontend/assets.js";
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, loadingUser, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);  // <-- Loading state

  const address = userData?.address || { line1: "", line2: "" };

  const updateUserProfileData = async () => {
    try {
      setIsSaving(true);   // Start loading
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      formData.append("address", JSON.stringify(userData.address));
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: {
            token
          },
        }
      );

      if (data.success) {
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSaving(false);  // Stop loading
    }
  };

  const updateAddress = (key, value) => {
    setUserData(prev => ({
      ...prev,
      address: { ...(prev.address || {}), [key]: value }
    }));
  };

  if (loadingUser) return <div className="text-center text-xl font-semibold mt-10">Loading your profile...</div>;
  if (!userData) return <div className="text-center text-xl font-semibold mt-10">No user data found.</div>;

  return (
    <div className="relative">
      {/* Full page loading spinner */}
      {isSaving && (
        <div className="fixed top-0 left-0 w-full h-full bg-transparent backdrop-blur-2xl  z-50 flex items-center justify-center">
          <div className="w-20 h-20 border-8 border-white border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl border border-gray-200 mt-10">

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <div className="relative">
            {isEdit ? (
              <label htmlFor="image">
                <div className="inline-block relative cursor-pointer">
                  <img
                    className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-xl object-cover"
                    src={image ? URL.createObjectURL(image) : userData?.image}
                    alt="profile"
                  />
                  <img className="w-10 absolute bottom-12 right-12" src={assets.upload_icon} alt="upload" />
                </div>
                <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden />
              </label>
            ) : (
              <img
                src={userData?.image}
                alt={userData?.name}
                className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-xl object-cover"
              />
            )}
            {isEdit && <p className="absolute bottom-0 left-0 bg-indigo-500 text-white text-xs px-2 py-1 rounded-tr-md rounded-bl-md">Profile Pic</p>}
          </div>

          <div className="text-center md:text-left">
            {isEdit ? (
              <input
                type="text"
                className="text-3xl font-bold border-b-2 border-indigo-400 bg-transparent focus:outline-none p-1"
                onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                value={userData.name}
              />
            ) : (
              <h2 className="text-3xl font-bold text-indigo-600">{userData.name}</h2>
            )}
            <p className="mt-2 text-gray-600">Your Personal Info</p>
          </div>
        </div>

        <hr className="mb-8 border-indigo-300" />

        {/* Contact Information */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Contact Information</h3>

          <div className="flex items-center gap-4 text-lg">
            <FaEnvelope className="text-indigo-500" />
            <span>{userData.email}</span>
          </div>

          <div className="flex items-center gap-4 text-lg">
            <FaPhoneAlt className="text-indigo-500" />
            {isEdit ? (
              <input
                type="text"
                className="border-b-2 border-gray-300 focus:border-indigo-500 bg-transparent outline-none"
                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                value={userData.phone}
              />
            ) : (
              <span>{userData.phone}</span>
            )}
          </div>

          <div className="flex items-start gap-4 text-lg">
            <FaMapMarkerAlt className="text-indigo-500 mt-1" />
            {isEdit ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  className="border-b-2 border-gray-300 focus:border-indigo-500 bg-transparent outline-none"
                  onChange={(e) => updateAddress('line1', e.target.value)}
                  value={address.line1}
                />
                <input
                  type="text"
                  className="border-b-2 border-gray-300 focus:border-indigo-500 bg-transparent outline-none"
                  onChange={(e) => updateAddress('line2', e.target.value)}
                  value={address.line2}
                />
              </div>
            ) : (
              <span>{address.line1}<br />{address.line2}</span>
            )}
          </div>
        </div>

        <hr className="my-8 border-indigo-300" />

        {/* Basic Information */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Basic Information</h3>

          <div className="flex items-center gap-4 text-lg">
            <FaVenusMars className="text-indigo-500" />
            {isEdit ? (
              <select
                className="border-b-2 border-gray-300 focus:border-indigo-500 bg-transparent outline-none"
                onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <span>{userData.gender}</span>
            )}
          </div>

          <div className="flex items-center gap-4 text-lg">
            <FaBirthdayCake className="text-indigo-500" />
            {isEdit ? (
              <input
                type="date"
                className="border-b-2 border-gray-300 focus:border-indigo-500 bg-transparent outline-none"
                onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                value={userData.dob}
              />
            ) : (
              <span>{userData.dob}</span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex justify-center md:justify-end gap-4">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold flex items-center gap-2"
            >
              <FaSave /> Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center gap-2"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
