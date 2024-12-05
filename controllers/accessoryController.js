const accessoryDetails = require('../models/accessoryModel');
const order_Model=require('../models/accessoryOrderModel')
const user_dts = require('../models/User');
const mobileServiceModel = require('../models/mobileDetails');
const Ac_CctvService = require('../models/Ac_CctvService');
const Ac_CctvDetailsSchema = require('../models/Ac_CctvService'); 



// add a new accessory
exports.addAccessory = async (req, res) => {
    try {
        const { title, brand, category, color, description, price } = req.body;
        const images = req.files.map(file => file.path);

        const newAccessory = new accessoryDetails({
            title,
            brand,
            category,
            color,
            image: images,  
            description,
            price
        });

        await newAccessory.save();
        res.status(201).json({ message: 'Product created successfully', accessory: newAccessory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// get all accessory
exports.getAccessory = async (req, res) => {
    try {
        const allAccessory = await accessoryDetails.find()
        .select(`-createdAt -updatedAt`);
        res.status(200).json(allAccessory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get accessory by id
exports.getViewAccessory = async (req, res) => {
    try {
        const { id } = req.params
        const viewAccessory = await accessoryDetails.findById(id)
            .select(`-createdAt -updatedAt`);
        res.status(200).json(viewAccessory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update accessory
exports.updateAccessory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, brand, category, color, description, price } = req.body;

        // Retrieve the current accessory to get existing images
        const accessory = await accessoryDetails.findById(id);
        if (!accessory) {
            return res.status(404).json({ message: "Accessory not found" });
        }

        // Existing images in the database
        const existingImages = accessory.image || [];

        // New images from the request, if any
        const newImages = req.files ? req.files.map(file => file.path) : [];

        // Combine existing and new images
        const allImages = [...existingImages, ...newImages];
        if (existingImages.length + newImages.length > 5) {
            return res.status(400).json({ message: `You can only have a maximum of 5 images.${existingImages.length } images already exists in the database.so delete them to add more` });
        }

        // Create an update object including only fields that were provided
        const updateData = { title, brand, category, color, description, price, image: allImages };

        for (let key in updateData) {
            if (updateData[key] === undefined) delete updateData[key]; // Remove undefined fields
        }
        

        // Update the accessory with the combined images array
        const updatedAccessory = await accessoryDetails.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.status(201).json({ message: "Accessory updated successfully", accessory: updatedAccessory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete images from accessory
exports.deleteAccessoryImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { image } = req.body;  // single image path to delete

        // Check if accessory exists
        const accessory = await accessoryDetails.findById(id);
        if (!accessory) {
            return res.status(404).json({ message: "Accessory not found" });
        }

        // Ensure the image exists in the accessory
        if (!accessory.image.includes(image)) {
            return res.status(404).json({ message: "Image not found in accessory" });
        }

        // Remove the specified image from the image array
        const updatedAccessory = await accessoryDetails.findByIdAndUpdate(
            id,
            { $pull: { image: image } },  // removes only the specified image
            { new: true }
        ).select('-createdAt -updatedAt');

        res.status(200).json({
            message: "Image deleted successfully",
            accessory: updatedAccessory,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// delete accessory
exports.deleteAccessory = async (req, res) => {
    try {
        const { id } = req.params
        const deletedAccessory = await accessoryDetails.findByIdAndUpdate({_id:id})
            .select(`-createdAt -updatedAt`);
        res.status(200).json(deletedAccessory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/* exports.addorderAccesory=async(req,res)=>{

} */

// validating user
const validateUserDetails = (userData) => {
    const { phone_number, customerName } = userData;
    
    if (!customerName || customerName.trim() === '') {
        return 'Name is required.';
    }
    if (!phone_number || !/^\d{10}$/.test(phone_number)) {
        return 'Mobile number must be a valid 10-digit number.';
    }
    // if (!houseName || houseName.trim() === '') {
    //     return 'House name is required.';
    // }
    // if (!state || state.trim() === '') {
    //     return 'State is required.';
    // }
    // if (!district || district.trim() === '') {
    //     return 'District is required.';
    // }
    // if (!pincode || !/^\d{6}$/.test(pincode)) {
    //     return 'Pincode must be a valid 6-digit number.';
    // }
    return null;
};


exports.addorderDetails = async (req, res) => {
    const { id } = req.params;
    const { phone_number, customerName } = req.body;
    const userError = validateUserDetails({ customerName, phone_number });
    if (userError) {
        return res.status(400).json({ error: userError });
    }
    /* const newUser = new user_dts({ customerName, phone_number });

    try {
        await newUser.save(); 
    } catch (error) {
        console.error('Error saving user:', error);
        return res.status(500).json({ error: 'Failed to create user.' });
    } */

    // Create order details
    const orderDetails = new order_Model({
        customerName,
        phone_number,
        accessoryId: id,
        
    });

    try {
        await orderDetails.save(); 
    } catch (error) {
        console.error('Error adding order:', error);
        return res.status(500).json({ error: 'Failed to add order.' });
    }

   
    return res.status(201).json({  
        /* user: newUser, */
        orderSummary: orderDetails
    });
};

// get order details
exports.getOrderDetails = async (req, res) => {
    try {
      
        const allorderDetails = await order_Model.find().populate('accessoryId')    

        if (!allorderDetails || allorderDetails.length === 0) {
            return res.status(404).json({ message: 'No service details found' });
        }

        return res.status(200).json(allorderDetails);
    } catch (error) {
        console.error('Error fetching order details:', error);
        return res.status(500).json({ message: 'An error occurred while fetching error details', error: error.message });
    }
};

// update order status
exports.updateOrderStatus=async(req,res)=>{
    try {
        const { id } = req.params;
        const updatedstatus = await order_Model.findByIdAndUpdate(
            id, 
            { status:'completed' },
            { new: true } 
        )
        if (!updatedstatus) {
            return res.status(404).json({ message: "order not found" });
        }
        
        await updatedstatus.save();
        res.status(201).json(updatedstatus);
  
    } catch (error) {
        console.error('Error updating order status:', error);
        return res.status(500).json({ message: 'An error occurred while updating order status', error: error.message });     
    }
}

exports.getCounts = async (req, res) => {
    try {
      
        const allserviceDetails = await Ac_CctvDetailsSchema.find()
            .populate('userId')       
            .populate('Ac_cctvId');

      
        if (!allserviceDetails || allserviceDetails.length === 0) {
            return res.status(404).json({ message: 'No service details found' });
        }

        const mobileServiceCount = await mobileServiceModel.countDocuments();
        const accessoryOrderCount = await order_Model.countDocuments();

   
        return res.status(200).json({
            allserviceDetails,
            mobileServiceCount,
            accessoryOrderCount
        });
    } catch (error) {
        console.error('Error fetching counts:', error);
        return res.status(500).json({ message: 'An error occurred while fetching counts', error: error.message });
    }
};




