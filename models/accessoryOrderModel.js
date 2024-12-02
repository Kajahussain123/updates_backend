const mongoose = require('mongoose');

const accessoryOrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    accessoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'accessoryModel', required: true },
    status:{
        type:String,
        default:'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('accessoryOrders', accessoryOrderSchema);