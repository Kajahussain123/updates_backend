const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    color:[ {
        type: String,
        required: true,
    }],
    image: [{
        type: String,
        required: true,
        validate: {
            validator: function(images) {
                return images.length > 5;
            },
            message: 'You can only have a maximum of 5 images.'
        }
    }],
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    }
}, { timestamps: true }); 

const accessoryModel = mongoose.model('accessoryModel', accessorySchema); 

module.exports = accessoryModel;
