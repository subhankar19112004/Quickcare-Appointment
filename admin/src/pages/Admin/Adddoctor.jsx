
import { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets.js'
import { AdminContext } from '../../context/adminContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';


const Adddoctor = () => {

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [about, setAbout] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

const onSubmitHandler = async (event) => {
  event.preventDefault();
  try {
    if(!docImg) {
      return toast.error(`Please upload doctor's profile image`);
    }

     const address = JSON.stringify({
        line1: address1,  // assuming you have address1 and address2 in the state
        line2: address2
    });

    const formData = new FormData();
    formData.append('image', docImg);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('experience', experience);
    formData.append('fees', fees);
    formData.append('speciality', speciality);
    formData.append('degree', degree);
    formData.append('address', address);
    formData.append('about', about);

    // Debugging: Show all form data entries
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await axios.post(
      `${backendUrl}/api/admin/add-doctor`,
      formData,
      {
        headers: {
          'atoken': aToken, // Must match exactly what backend expects
          // Don't set Content-Type manually for FormData - browser will set it automatically
          // with the correct boundary parameter
        }
      }
    );

    if (response.data && response.data.message) {
      toast.success(response.data.message); // Show the success message from the response
      // Reset form here if needed
      setDocImg(false);
      setName('');
      setEmail('');
      setPassword('');
      setExperience('1 Year');
      setFees('');
      setSpeciality('General Physician');
      setDegree('');
      setAddress1('');
      setAddress2('');
      setAbout('');
    } else {
      toast.error('Failed to add doctor: Unknown error');
    } 
  } catch (error) {
    console.error('Full error:', error);
    console.error('Error response:', error.response?.data);
    toast.error(error.response?.data?.message || 'Failed to add doctor');
  }
};

  return (
    <form onSubmit={onSubmitHandler} className="max-w-6xl w-full mx-auto p-8 bg-white rounded-lg shadow-lg h-screen overflow-y-auto">
      <p className="text-3xl text-center font-semibold text-gray-700 mb-8">Add New Doctor</p>
      <hr className='mx-[25%] w-[50%] mb-8' /> {/* Separator line */}

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center mb-8 mt-4">
        <label htmlFor="doc-img" className="cursor-pointer">
          <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 mb-4" />
        </label>
        <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
        <p className="text-center text-gray-600">Upload doctor picture</p>
      </div>

      {/* Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="text-gray-600">Doctor Name</label>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter doctor name" required className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>

          <div>
            <label className="text-gray-600">Doctor Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter doctor email" required className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>

          <div>
            <label className="text-gray-600">Doctor Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter doctor password" required className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>

          <div>
            <label className="text-gray-600">Doctor Experience</label>
            <select onChange={(e) => setExperience(e.target.value)} value={experience} className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="4 Years">4 Years</option>
              <option value="5 Years">5 Years</option>
              <option value="6 Years">6 Years</option>
              <option value="7 Years">7 Years</option>
              <option value="8 Years">8 Years</option>
              <option value="9 Years">9 Years</option>
              <option value="10+ Years">10+ Years</option>
            </select>
          </div>

          <div>
            <label className="text-gray-600">Fees</label>
            <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder="Enter doctor fees" required className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-gray-600">Specialty</label>
            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
              <option value="Gynecologist">Gynecologist</option>
              <option value="General Physician">General Physician</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Orthopedic Surgeon">Orthopedic</option>
              <option value="Urologist">Urologist</option>
              <option value="Psychiatrist">Psychiatrist</option>
              <option value="Ophthalmologist">Ophthalmologist</option>
              <option value="Endocrinologist">Endocrinologist</option>
              <option value="Nephrologist">Nephrologist</option>
              <option value="Hematologist">others</option>
            </select>
          </div>

          <div>
            <label className="text-gray-600">Education</label>
            <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder="Enter your highest degree" required className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>

          <div>
            <label className="text-gray-600">Address</label>
            <input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" placeholder="Address Line 1" required className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
            <input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" placeholder="Address Line 2" required className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mt-2" />
          </div>
        </div>
      </div>

      {/* About Doctor Section */}
      <div className="mb-8">
        <label className="text-gray-600 ">About Doctor</label>
        <textarea onChange={(e) => setAbout(e.target.value)} value={about} placeholder="Write about the doctor..." rows="5" required className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"></textarea>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full py-4 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-serif duration-300">
        Save Profile
      </button>
    </form>
  );
}

export default Adddoctor;
