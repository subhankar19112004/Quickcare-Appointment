import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if(!token) {
            return res.status(400).json({
                message: "Not Authorized, you will not welcome here",
                success: false
            });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("token_decode = " , token_decode);
        req.userId = token_decode?.userId;  // ✅ safer place to store it
        
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};

export default authUser;
