// const User = require("../models/User");

// exports.serviceCreation = async (req, res) => {
//   const { name, mobileNumber, houseName, state, district, pincode } = req.body;

//   if (!serviceType || !brandName || !issueDetails) {
//     return res.status(400).json({ error: 'All details are required..!' });
//   }


//   const newMobileDetails = new mobile_dts({
//     model_name,
//     company_name,
//     mobile_img
//   });

//   try {
//     await newMobileDetails.save();
//   } catch (error) {
//     console.error('Error saving mobile details:', error);
//     return res.status(500).json({ error: 'Failed to save mobile details.' });
//   }


//   // Validate user inputs
//   if (!name || name.trim() === '') {
//     return res.status(400).json({ error: 'Name is required' });
//   }

//   if (!mobileNumber || mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber)) {
//     return res.status(400).json({ error: 'Mobile number must be a valid 10-digit number' });
//   }

//   if (!houseName || houseName.trim() === '') {
//     return res.status(400).json({ error: 'House name is required' });
//   }

//   if (!state || state.trim() === '') {
//     return res.status(400).json({ error: 'State is required' });
//   }

//   if (!district || district.trim() === '') {
//     return res.status(400).json({ error: 'District is required' });
//   }

//   if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
//     return res.status(400).json({ error: 'Pincode must be a valid 6-digit number' });
//   }

//   try {
//     // Create the user without checking mobile number uniqueness
//     const newUser = new User({ name, mobileNumber, houseName, state, district, pincode });
//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully', user: newUser });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// exports.addMobileDetails = async (req, res) => {
//   try {
//     const { model_name, company_name, name, mobileNumber, houseName, state, district, pincode } = req.body;
//     const mobile_img = req.file.path;


//     if (!name || name.trim() === '') {
//       return res.status(400).json({ error: 'Name is required' });
//     }

//     if (!mobileNumber || mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber)) {
//       return res.status(400).json({ error: 'Mobile number must be a valid 10-digit number' });
//     }

//     if (!houseName || houseName.trim() === '') {
//       return res.status(400).json({ error: 'House name is required' });
//     }

//     if (!state || state.trim() === '') {
//       return res.status(400).json({ error: 'State is required' });
//     }

//     if (!district || district.trim() === '') {
//       return res.status(400).json({ error: 'District is required' });
//     }

//     if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
//       return res.status(400).json({ error: 'Pincode must be a valid 6-digit number' });
//     }


//     const newUser = new user_dts({ name, mobileNumber, houseName, state, district, pincode });


//     try {
//       await newUser.save();
//     } catch (error) {
//       console.error('Error saving user:', error);
//       return res.status(500).json({ error: 'Failed to create user.' });
//     }


//     return res.status(201).json({
//       message: 'Mobile details added successfully and user created.',
//       mobileDetails: newMobileDetails,
//       user: newUser
//     });
//   } catch (error) {
//     console.error('Error occurred while adding mobile details:', error);
//     res.status(500).json({ error: `An error occurred: ${error.message}` });
//   }
// };
