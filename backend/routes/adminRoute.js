// import express from 'express';
// import { addDoctor, adminDashboard, allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin } from '../controllers/adminController.js';
// import  upload  from '../middlewares/multer.js';
// import authAdmin from '../middlewares/authAdmin.js';
// import { changeAvailability } from '../controllers/doctorController.js';

// const adminRouter = express.Router();


// adminRouter.post('/add-doctor', authAdmin ,upload.single('image') ,addDoctor);
// adminRouter.post('/login', loginAdmin);
// adminRouter.post('/all-doctors', authAdmin, allDoctors);
// adminRouter.post('/change-availability', authAdmin, changeAvailability);
// adminRouter.get('/all-appointments', authAdmin, appointmentsAdmin);
// adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel);
// adminRouter.get('/dashboard', authAdmin, adminDashboard);

// export default adminRouter;

import express from 'express';
import { addDoctor, adminDashboard, allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin, allUsersWithAppointments, updateUserProfile, deleteUser, viewUserProfile } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);
adminRouter.get('/all-appointments', authAdmin, appointmentsAdmin);
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel);
adminRouter.get('/dashboard', authAdmin, adminDashboard);

// New routes for managing users
adminRouter.get('/all-users', authAdmin, allUsersWithAppointments);  // Fetch all users with pagination
adminRouter.put('/update-user/:userId', authAdmin, updateUserProfile);  // Update user profile
adminRouter.delete('/delete-user/:userId', authAdmin, deleteUser);  // Delete user
adminRouter.get('/view-user/:userId', authAdmin, viewUserProfile);  // View user profile with appointments and total cost

export default adminRouter;
