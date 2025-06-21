import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [aToken, setAToken] = useState(localStorage.getItem('aToken'));  // Assuming the token is stored in localStorage
  const backendUrl = import.meta.env.VITE_BACKEND_URL;  // Replace with your backend URL

  // Fetch dashboard data from the backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/admin/dashboard', {
          headers: { aToken }
        });

        if (data.success) {
          setDashboardData(data.dashData);
        } else {
          toast.error(data.message || 'Failed to fetch dashboard data');
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Something went wrong');
      }
    };

    fetchDashboardData();
  }, [aToken]);

  // Fallback handling for null/undefined data
  const appointmentsByMonth = dashboardData?.appointmentsByMonth || Array(12).fill(0);
  const feesByMonth = dashboardData?.feesByMonth || Array(12).fill(0);
  const usersByMonth = dashboardData?.usersByMonth || Array(12).fill(0);

  // Graph Data
  const appointmentsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Appointments Booked',
        data: appointmentsByMonth,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        hoverRadius: 6,
        hoverBackgroundColor: 'rgb(75, 192, 192)',
        animation: {
          duration: 1500, // Smooth animation duration
          easing: 'easeInOutQuart', // Smooth easing for transitions
        },
      },
    ],
  };

  const feesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: feesByMonth,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 4,
        hoverRadius: 6,
        hoverBackgroundColor: 'rgb(255, 99, 132)',
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart',
        },
      },
    ],
  };

  const usersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Users Registered',
        data: usersByMonth,
        fill: true,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        hoverRadius: 6,
        hoverBackgroundColor: 'rgb(153, 102, 255)',
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart',
        },
      },
    ],
  };

  const revenuePieData = {
    labels: ['Paid Appointments', 'Unpaid Appointments'],
    datasets: [
      {
        label: 'Appointments',
        data: [
          Array.isArray(dashboardData?.appointments) ? dashboardData.appointments.filter(a => a.payment).length : 0,
          Array.isArray(dashboardData?.appointments) ? dashboardData.appointments.filter(a => !a.payment).length : 0,
        ],
        backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
        borderColor: ['rgb(255, 255, 255)', 'rgb(255, 255, 255)'],
        borderWidth: 2,
        animation: {
          duration: 1500, // Smooth animation
          easing: 'easeInOutQuart',
        },
      },
    ],
  };

  // Show loading if data is not fetched yet
  if (!dashboardData) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="dashboard flex flex-col h-[90vh] min-w-[80vw] overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Dashboard Overview</h2>
        
        {/* Statistics Section */}
        <div className="statistics grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="stat-card bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">Doctors</h3>
            <p className="text-3xl">{dashboardData.doctors}</p>
          </div>
          <div className="stat-card bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">Appointments</h3>
            <p className="text-3xl">{dashboardData.appointments}</p>
          </div>
          <div className="stat-card bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">Users</h3>
            <p className="text-3xl">{dashboardData.users}</p>
          </div>
          <div className="stat-card bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">Revenue</h3>
            <p className="text-3xl">₹{dashboardData.revenue}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="chart-container grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 overflow-y-auto">
          <div className="chart bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center mb-4">Appointments Trend</h3>
            <Line data={appointmentsData} options={{ responsive: true }} />
          </div>

          <div className="chart bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center mb-4">Revenue Trend</h3>
            <Line data={feesData} options={{ responsive: true }} />
          </div>

          <div className="chart bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center mb-4">User Growth</h3>
            <Line data={usersData} options={{ responsive: true }} />
          </div>

          <div className="chart bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center mb-4">Revenue vs Unpaid (Pie)</h3>
            <Pie data={revenuePieData} options={{ responsive: true }} />
          </div>
        </div>
        
        {/* Latest Appointments */}
        <div className="latest-appointments bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Latest Appointments</h3>
          <ul>
            {dashboardData.latestAppointments.map((appointment, index) => (
              <li key={index} className="py-2 border-b">
                <strong>{appointment.userData.name}</strong> - {appointment.slotDate} at {appointment.slotTime} - ₹{appointment.amount}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
