const mobile_dts = require('../models/mobileDetails');
const user_dts = require('../models/User');
const UserMobileDetails = require('../models/service');

exports.addMobileDetails = async (req, res) => {
    try {
        const { model_name, company_name,description, name, mobileNumber, houseName, state, district, pincode } = req.body;
        const mobile_img = req.file.path;

        if (!model_name || !company_name || !mobile_img) {
            return res.status(400).json({ error: 'All fields for mobile details are required.' });
        }

        // Initialize variables to hold response objects
        let mobileResponse, userResponse, userMobileDetailsResponse;

        const newMobileDetails = new mobile_dts({
            model_name,
            company_name,
            description,
            mobile_img
        });

        try {
            await newMobileDetails.save();
            mobileResponse = newMobileDetails.toObject();
            delete mobileResponse.createdAt;
            delete mobileResponse.updatedAt;
        } catch (error) {
            console.error('Error saving mobile details:', error);
            return res.status(500).json({ error: 'Failed to save mobile details.' });
        }

        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'Name is required' });
        }

        if (!mobileNumber || mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber)) {
            return res.status(400).json({ error: 'Mobile number must be a valid 10-digit number' });
        }

        if (!houseName || houseName.trim() === '') {
            return res.status(400).json({ error: 'House name is required' });
        }

        if (!state || state.trim() === '') {
            return res.status(400).json({ error: 'State is required' });
        }

        if (!district || district.trim() === '') {
            return res.status(400).json({ error: 'District is required' });
        }

        if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
            return res.status(400).json({ error: 'Pincode must be a valid 6-digit number' });
        }

        const newUser = new user_dts({ name, mobileNumber, houseName, state, district, pincode });

        try {
            await newUser.save();
            userResponse = newUser.toObject();
            delete userResponse.createdAt;
            delete userResponse.updatedAt;
        } catch (error) {
            console.error('Error saving user:', error);
            return res.status(500).json({ error: 'Failed to create user.' });
        }

        const userMobileDetails = new UserMobileDetails({
            userId: newUser._id,
            mobileId: newMobileDetails._id
        });

        try {
            await userMobileDetails.save();
            userMobileDetailsResponse = userMobileDetails.toObject();
            delete userMobileDetailsResponse.createdAt;
            delete userMobileDetailsResponse.updatedAt;
        } catch (error) {
            console.error('Error saving user-mobile details:', error);
            return res.status(500).json({ error: 'Failed to save user-mobile relationship.' });
        }

        return res.status(201).json({
            message: 'Mobile details added successfully and user created.',
            mobileDetails: mobileResponse,
            user: userResponse,
            userMobileDetails: userMobileDetailsResponse
        });
    } catch (error) {
        console.error('Error occurred while adding mobile details:', error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};


// get mobile service details
exports.getMobileDetails = async (req, res) => {
    try {

        const allMobileDetails = await UserMobileDetails.find()
            .populate('userId', `-createdAt -updatedAt`)
            .populate('mobileId', `-createdAt -updatedAt`)
            .select(`-createdAt -updatedAt`)

        if (!allMobileDetails || allMobileDetails.length === 0) {
            return res.status(404).json({ message: 'No mobile details found' });
        }

        return res.status(200).json(allMobileDetails);
    } catch (error) {
        console.error('Error fetching mobile details:', error);
        return res.status(500).json({ message: 'An error occurred while fetching mobile details', error: error.message });
    }
};

// update service status
exports.updateMobileService = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedstatus = await UserMobileDetails.findByIdAndUpdate(
            id,
            { status: 'completed' },
            { new: true }
        )
            .populate({ path: `userId`, select: '-_id name mobileNumber houseName' })
            .populate({ path: `mobileId`, select: '-_id model_name company_name' })
            .select(`-createdAt -updatedAt -__v`)

        if (!updatedstatus) {
            return res.status(404).json({ message: "service not found" });
        }

        await updatedstatus.save();
        res.status(201).json(updatedstatus);

    } catch (error) {
        console.error('Error updating mobileservice status:', error);
        return res.status(500).json({ message: 'An error occurred while updating mobileservice status', error: error.message });
    }
}

// delete services
exports.deleteMobileService = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await UserMobileDetails.findByIdAndDelete({ _id: id })
            .populate({ path: `userId`, select: '-_id name mobileNumber houseName' })
            .populate({ path: `mobileId`, select: '-_id model_name company_name' })
            .select(`-createdAt -updatedAt -__v`)

        if (!deletedService) {
            return res.status(404).json({ message: "service not found" });
        }

        res.status(200).json(deletedService);

    } catch (error) {
        console.error('Error deleting mobileservice :', error);
        return res.status(500).json({ message: 'An error occurred while deleting mobileservice ', error: error.message });
    }
}