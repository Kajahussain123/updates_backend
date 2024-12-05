const mongoose = require('mongoose');

const mobileDetailsSchema = new mongoose.Schema({
    model_name: {
        type: String,
        required: true, 
    },
    company_name: {
        type: String,
        required: true, 
    },
    description:{type:String},
    mobile_img: {
        type: String,
    },
}, {
    timestamps: true 
});


const MobileDetail = mongoose.model("MobileDetail", mobileDetailsSchema);

module.exports = MobileDetail;
