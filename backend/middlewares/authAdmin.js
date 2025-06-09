import jwt from "jsonwebtoken";

//admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;
        if(!atoken) {
            return res.status(400).json({
                message: "Not Authorized, you will not welcome here",
                success: false
            })
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(400).json({
                message: "verification failed, try again later or contact admin"
            })
        }
        
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}

export default authAdmin;