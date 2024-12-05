const express = require('express');
const connectDB = require('./config/db.js');
const mobileDetails = require('./routes/mobileDetailsRoutes.js');
const cctvDetails = require('./routes/cctv_AcRoutes.js')
const productDetails = require('./routes/ProductRoutes.js')
const accessoryDetails=require('./routes/accessoryRoutes.js')
const categoryDetails=require('./routes/CategoryRoutes.js')
const adminDetails=require('./routes/adminRoutes.js')
const testimonails=require('./routes/TestimonialRoute.js')

const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Route
// app.use('/auth', authRoutes)

//  Admin Routes 
// app.use('/users', UserRoutes);
app.use('/admin',adminDetails)
app.use('/category',categoryDetails)
app.use('/product-details', productDetails);
app.use('/testimonials', testimonails);


// // User Routes
app.use('/mobile',mobileDetails)
app.use('/CCTV-AC', cctvDetails);
app.use('/accessory',accessoryDetails)

// using upload folder that contain images
app.use('/uploads',express.static('./uploads'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
