import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import reviewModel from "../models/reviewModel.js"; // New review model
import settingsModel from "../models/settingsModel.js";
import Razorpay from "razorpay";


const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Add Patient (New API)
const addPatient = async (req, res) => {
    try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false
      })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Email is not valid",
        success: false
      })
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message: "Password is not strong enough",
        success: false
      })
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword
    }
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: "User registered successfully",
      token: token,
      success: true
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
      success: false
    })
  }
};

// Add Review (New API)
const addReview = async (req, res) => {
    try {
        const { doctorId, userId, review, rating } = req.body;

        if (!review || !rating || !doctorId || !userId) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const newReview = new reviewModel({ doctorId, userId, review, rating });
        await newReview.save();

        res.status(200).json({
            message: "Review added successfully",
            data: newReview
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};

// List Reviews for Doctors (New API)
const listReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find();
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};

// Razorpay Payment (New API)
const createPayment = async (req, res) => {
    try {
        const { amount, appointmentId } = req.body;

        if (!amount || !appointmentId) {
            return res.status(400).json({
                message: "Amount and appointmentId are required",
                success: false
            });
        }

        const options = {
            amount: amount * 199,  // Amount in paise
            currency: "INR",
            receipt: `receipt_${appointmentId}`
        };

        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                return res.status(500).json({ message: "Error creating payment", success: false });
            }

            res.status(200).json({
                success: true,
                orderId: order.id,
                amount: order.amount
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};

// Handle Payment Success (New API)
const handlePaymentSuccess = async (req, res) => {
    try {
        const { paymentId, appointmentId } = req.body;

        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found", success: false });
        }

        appointment.payment = true;
        await appointment.save();

        res.status(200).json({
            message: "Payment successful",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};

// Refund Request (New API)
const refundPayment = async (req, res) => {
    try {
        const { paymentId, appointmentId } = req.body;

        // Logic to handle refund using Razorpay API (simplified)
        razorpayInstance.payments.refund(paymentId, (err, refund) => {
            if (err) {
                return res.status(500).json({ message: "Error processing refund", success: false });
            }

            res.status(200).json({ message: "Refund processed", success: true });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};
// Update user status to active or inactive
const updateUserStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;

    // Ensure the status is valid (active/inactive)
    if (status !== 'active' && status !== 'inactive') {
      return res.status(400).json({ message: 'Invalid status value', success: false });
    }

    // Find and update the user
    const user = await userModel.findByIdAndUpdate(userId, { status }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    res.status(200).json({
      message: `User status updated to ${status}`,
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
};


// Content Management (New API)
const updateContent = async (req, res) => {
    try {
        const { aboutUs, privacyPolicy, termsOfService } = req.body;

        const existingContent = await settingsModel.findOne();
        if (existingContent) {
            existingContent.aboutUs = aboutUs || existingContent.aboutUs;
            existingContent.privacyPolicy = privacyPolicy || existingContent.privacyPolicy;
            existingContent.termsOfService = termsOfService || existingContent.termsOfService;
            await existingContent.save();
        } else {
            const newContent = new settingsModel({ aboutUs, privacyPolicy, termsOfService });
            await newContent.save();
        }

        res.status(200).json({ message: "Content updated successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};

// Controller to update settings
const updateSettings = async (req, res) => {
    try {
        const { websiteLogo, websiteTitle, contactInfo, smtpConfig, timeZone, currency } = req.body;

        // Find if the settings exist, otherwise create a new one
        const existingSettings = await settingsModel.findOne();
        if (existingSettings) {
            existingSettings.websiteLogo = websiteLogo || existingSettings.websiteLogo;
            existingSettings.websiteTitle = websiteTitle || existingSettings.websiteTitle;
            existingSettings.contactInfo = contactInfo || existingSettings.contactInfo;
            existingSettings.smtpConfig = smtpConfig || existingSettings.smtpConfig;
            existingSettings.timeZone = timeZone || existingSettings.timeZone;
            existingSettings.currency = currency || existingSettings.currency;
            await existingSettings.save();
        } else {
            const newSettings = new settingsModel({ 
                websiteLogo,
                websiteTitle,
                contactInfo,
                smtpConfig,
                timeZone,
                currency
            });
            await newSettings.save();
        }

        res.status(200).json({
            message: "Settings updated successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};



// API for adding doctors
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      degree,
      speciality,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !degree ||
      !speciality ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res.status(400).json({
        message: "All fields are required",

        success: false,
      });
    }

    // validating email format
    if (validator.isEmail(email) === false) {
      return res.status(400).json({
        message: "Email is not valid",
      });
    }

    //password validator
    if (validator.isStrongPassword(password) === false) {
      return res.status(400).json({
        message: "Password is not strong enough",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      degree,
      speciality,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      image: imageUrl,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    console.log(
      {
        name,
        email,
        password,
        degree,
        speciality,
        experience,
        about,
        fees,
        address,
      },
      imageFile
    );
    res.status(200).json({
      message: "Doctor Added successfully",
      data: newDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

//API for the admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

// Api to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({
      success: true,
      totalDoctors: doctors.length,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

// API to get all appointments
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({
      success: true,
      totalAppointments: appointments.length,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
      success: false,
    });
  }
};

//API to cancel the appointment from admin panel
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const docData = await doctorModel.findById(docId);
    let slots_booked = docData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (slot) => slot !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, {
      slots_booked,
    });
    res.status(200).json({
      message: "Appointment cancelled successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
      success: false,
    });
  }
};

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const appointments = await appointmentModel.find({});
    const users = await userModel.find({});

    // Initialize arrays to hold monthly data
    const appointmentsByMonth = Array(12).fill(0); // Initialize 12 months
    const feesByMonth = Array(12).fill(0); // Initialize fees for each month

    // Helper function to convert DD-MM-YYYY to YYYY-MM-DD
    const convertToDate = (dateString) => {
      const [day, month, year] = dateString.split("-");
      return new Date(
        `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      );
    };

    // Aggregate appointments and revenue (fees) by month
    appointments.forEach((appointment) => {
      const slotDate = convertToDate(appointment.slotDate); // Convert the date format
      const month = slotDate.getMonth(); // Get month (0-11)
      console.log(
        `Appointment Month: ${month}, Amount: ${appointment.amount}, Slot Date: ${slotDate}`
      ); // Debug: Log each appointment's month and amount
      appointmentsByMonth[month]++;
      feesByMonth[month] += appointment.amount; // Sum up the fees
    });

    console.log("Appointments by Month:", appointmentsByMonth); // Debug: Log the aggregated appointments
    console.log("Fees by Month:", feesByMonth); // Debug: Log the aggregated fees

    // Calculate total revenue from all appointments
    const revenue = appointments.reduce((acc, curr) => acc + curr.amount, 0);

    console.log("Total Revenue:", revenue); // Debug: Log total revenue calculation

    // Users increase over the months
    const usersByMonth = Array(12).fill(0); // Initialize 12 months for user growth
    users.forEach((user) => {
      const month = new Date(user.createdAt).getMonth();
      usersByMonth[month]++;
    });

    console.log("Users by Month:", usersByMonth); // Debug: Log the aggregated users

    // Prepare the dashboard data
    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      users: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
      revenue,
      appointmentsByMonth,
      feesByMonth,
      usersByMonth,
    };

    res.json({
      success: true,
      dashData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};
// API to get all users list with appointments, total cost, and pagination
const allUsersWithAppointments = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // pagination parameters

    // Calculate the skip and limit for pagination
    const skip = (page - 1) * limit;
    const users = await userModel.find().skip(skip).limit(limit);

    // Get total count of users for pagination
    const totalUsers = await userModel.countDocuments();

    // Fetch appointments and total cost for each user
    const usersWithAppointments = await Promise.all(
      users.map(async (user) => {
        const appointments = await appointmentModel.find({ userId: user._id });
        const totalCost = appointments.reduce(
          (acc, appointment) => acc + appointment.amount,
          0
        );
        return {
          ...user.toObject(),
          appointments,
          totalCost,
        };
      })
    );

    res.json({
      success: true,
      totalUsers,
      users: usersWithAppointments,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};


// API to update a user profile
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { phone, dob, gender, address, profilePic } = req.body; // Exclude name, email, and password from request body

    // Ensure user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update user details - Excluding name, email, and password
    user.phone = phone || user.phone;
    user.dob = dob || user.dob;
    user.gender = gender || user.gender;

    await user.save();

    res.json({
      success: true,
      message: "User profile updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

// API to delete a user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Ensure user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Delete user
    await userModel.findByIdAndDelete(userId);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

// API to view a user profile
const viewUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user details
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Fetch appointments and total cost for user
    const appointments = await appointmentModel.find({ userId: user._id });
    const totalCost = appointments.reduce(
      (acc, appointment) => acc + appointment.amount,
      0
    );

    res.json({
      success: true,
      user: {
        ...user.toObject(),
        appointments,
        totalCost,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
  allUsersWithAppointments,
  updateUserProfile,
  deleteUser,
  viewUserProfile,
  addPatient,
  listPatients,
  addReview,
  listReviews,
  createPayment,
  handlePaymentSuccess,
  refundPayment,
  updateContent,
  updateSettings,
  updateUserStatus
};
