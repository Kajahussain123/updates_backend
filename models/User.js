const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true, match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'] },
    houseName: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true, match: [/^\d{6}$/, 'Please enter a valid 6-digit pincode'] }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
    