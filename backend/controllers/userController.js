import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

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






 export {registerUser, loginUser, getProfile};