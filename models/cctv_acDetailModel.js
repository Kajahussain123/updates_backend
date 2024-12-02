const mongoose = require('mongoose');

const Ac_cctvDetailsSchema = new mongoose.Schema({
    service_type: {
        type: String,
        required: true, 
    }, 
    product_type: {
        type: String,
        required: true, 
    }, 
    brand:{
        type: String,
        required: true, 
    },  
    description: {
        type: String,
        required:true
    } 
}, {
    timestamps: true 
});


const cctvDetails = mongoose.model("ac_cctv_Details", Ac_cctvDetailsSchema);

module.exports = cctvDetails;
