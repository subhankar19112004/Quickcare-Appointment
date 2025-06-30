import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

//API for controlling doctors
const changeAvailability = async (req, res) => {
    try {
        
        const {docId} = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {
            available: !docData.available
        });
        res.json({
            success: true,
            message: "Availability changed successfully"  
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}

const doctorList = async (req, res) => {
    const doctors = await doctorModel.find({}).select(["-password",, "-email"]);
    res.json({
        success: true,
        doctors
    });
}

// API for doctor login
const loginDoctor = async ( req, res ) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });
        if (doctor) {
            const isMatch = await bcrypt.compare(password, doctor.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: "check the credentials😖",
                    success: false,
                });
            }
            const token = jwt.sign({ userId: doctor._id }, process.env.JWT_SECRET);
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
            success: false
        })
    }
}

//API to get doctor appointments for doctor panel
const getDoctorAppointments = async (req, res) => {
    try {
        console.log("Decoded User ID:", req.docId);  // Log the userId from the token

    const appointments = await appointmentModel.findOne({ docId: req.docId });

        res.json({
            success: true,  
            appointments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong while fetching appointments",
            success: false,
        });
    }
};

export {changeAvailability, doctorList, loginDoctor, getDoctorAppointments};