const Admin = require('../models/AdminModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.RegisterAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const adminUser = new Admin({
            name,
            email,
            password: hashedPassword,
            role: 'admin',
        });
        await adminUser.save();
        const { password: _, ...adminResponse } = adminUser.toObject();

        res.status(201).json({ message: 'Admin registered successfully', adminResponse });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ message: ' sfsf Server error' });
    }
};

// admin login
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials, Email not found' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid Credentials, Password Not Matched' });
        }
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};