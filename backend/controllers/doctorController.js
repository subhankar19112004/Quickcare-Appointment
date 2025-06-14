import doctorModel from "../models/doctorModel.js";

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

export {changeAvailability, doctorList};