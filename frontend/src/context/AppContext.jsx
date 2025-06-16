import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [doctors, setDoctors] = useState([]);

  // Sync token to localStorage always
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Load profile when token changes
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
      setLoadingUser(false);
    }
  }, [token]);

  const loadUserProfileData = async () => {
    try {
      setLoadingUser(true);
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Try again later");
    } finally {
      setLoadingUser(false);
    }
  };

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Try again later");
    }
  };

  // Load doctors data on first mount
  useEffect(() => {
    getDoctorsData();
  }, []);

  const value = {
    doctors,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadingUser,
    loadUserProfileData,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
