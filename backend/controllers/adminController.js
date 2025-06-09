import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
// API for adding doctors
const addDoctor = async (req, res) => {
    try {

        const { name, email, password, degree, speciality, experience, about, fees, address } = req.body;

        const imageFile = req.file;

        // checking for all data to add doctor
        if (!name || !email || !password || !degree || !speciality || !experience || !about || !fees || !address || !imageFile) {
            return res.status(400).json({
                "message": "All fields are required",
                "success": false
            })
        } 

        // validating email format
        if (validator.isEmail(email) === false) {
            return res.status(400).json({
                "message": "Email is not valid"
            })
        }

        //password validator
        if (validator.isStrongPassword(password) === false) {
            return res.status(400).json({
                "message": "Password is not strong enough"
            })
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
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
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        

        console.log({name, email, password, degree, speciality, experience, about, fees, address}, imageFile);
        res.status(200).json({
            message: "Doctor Added successfully",
            data: newDoctor
        })
         
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}

//API for the admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({
                success: true,
                token
            })

        } else {
            res.status(400).json({
                message: "Invalid credentials",
                success: false
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
} 

export { addDoctor, loginAdmin  };