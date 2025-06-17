import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// Api to register user
 const registerUser = async ( req, res) => {
    try {
        const  {name, email, password}  = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        if(!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Email is not valid",
                success: false
            })
        }

        if(!validator.isStrongPassword(password)) {
            return res.status(400).json({
                message: "Password is not strong enough",
                success: false
            })
        }

        //hashing user password
        const salt = await bcrypt.genSalt( 10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }
        const newUser = new userModel(userData);
        const user = await newUser.save();
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);

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
 }

 //Api for login
 const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: "cannot login without email or password, be sure you have passed them both",
                success: false
            })
        }

        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            })
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
        res.status(200).json({
            message: "User logged in successfully",
            loggedInUserName: user.name,
            loggedInUserEmail: user.email,
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
 }

 //Api to get user profile data
const getProfile = async (req, res) => {
    try {
        const userId = req.userId;  // ✅ take from middleware

        const userData = await userModel.findById(userId).select("-password");

        res.status(200).json({
            message: "User profile fetched successfully",
            userData,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            error,
            success: false
        });
    }
}

//API for updating the user profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const userId = req.userId;
    const imageFile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Defensive address parsing
    let parsedAddress = address;
    try {
      if (typeof address === "string") {
        parsedAddress = JSON.parse(address);
      }
    } catch (err) {
      return res.status(400).json({
        message: "Invalid address format",
        success: false,
      });
    }

    const updateData = {
      name,
      phone,
      address: parsedAddress,
      dob,
      gender,
    };

    // Image upload (optional)
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    await userModel.findByIdAndUpdate(userId, updateData, { runValidators: true });

    res.status(200).json({
      message: "User profile updated successfully",
      success: true,
      updatedUser: await userModel.findById(userId).select("-password"),
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

//API for booking appointment
// const bookAppointment = async (req, res) => {
//   try {
//     const { userId, docId, slotDate, slotTime } = req.body;
//     const docData = await doctorModel.findById(docId).select("-password");

//     if (!docData.available) {
//       return res.status(404).json({
//         message: "No appointments available for this doctor",
//         success: false,
//       });
//     }

//     let slots_booked = docData.slots_booked;
//     // checking for slots availability
//     if(slots_booked[slotDate]) {
//       if(slots_booked[slotDate].includes(slotTime)) {
//         return res.status(400).json({
//           message: "Slot already booked for this time",
//           success: false,
//         });
//       } else{
//         slots_booked[slotDate].push(slotTime);
//       }
//     } else{
//       slots_booked[slotDate] = [];
//       slots_booked[slotDate].push(slotTime);
//     }

//     const userData = await userModel.findById(userId).select("-password");
//     delete docData.slots_booked;

//     const appointmentData = {
//       userId,
//       docId,
//       slotDate,
//       slotTime,
//       userData,
//       docData,
//       amount: docData.fees,
//       date:Date.now()
//     };

//     const newAppointment = new appointmentModel(appointmentData);
    

//     await newAppointment.save();
//     //save new slots data in docdata
//     await doctorModel.findByIdAndUpdate(docId, {
//       slots_booked,
//     });

//     res.status(200).json({
//       message: "Appointment booked successfully",
//       success: true,
//       newAppointment,
//     });


//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Something went wrong",
//       error,
//       success: false,
//     });
//   }
// }

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.status(404).json({
        message: "No appointments available for this doctor",
        success: false
      });
    }

    let slots_booked = docData.slots_booked;
    // checking for slots availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.status(400).json({
          message: "Slot already booked for this time",
          success: false
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount: docData.fees,
      date: Date.now()
    };

    const newAppointment = new appointmentModel(appointmentData);

    await newAppointment.save();
    // save new slots data in docdata
    await doctorModel.findByIdAndUpdate(docId, {
      slots_booked
    });

    res.status(200).json({
      message: "Appointment booked successfully",
      success: true,
      newAppointment
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
      success: false
    });
  }
};

export {registerUser, loginUser, getProfile, updateProfile, bookAppointment};