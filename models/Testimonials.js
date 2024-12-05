const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    Name: {type: String, required: true },
    service: {type: String, required: true },
    Rating: {type: Number },
    description:{type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Testimonials', testimonialSchema);