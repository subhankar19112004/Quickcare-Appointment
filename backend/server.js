import express from 'express';
import cors from 'cors';
import  'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';


//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middleware
app.use(cors());
app.use(express.json());

// api endpoints

app.use('/api/admin', adminRouter); // https://localhost:4000/api/admin/add-doctor
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello from backend',
        "data": "this is Quickcare backend",
        "frontend": "https://localhost:5173"
    });
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});