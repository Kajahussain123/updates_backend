const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
   
    Category_Names: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const categoryModel = mongoose.model('categoryModel', categorySchema);

module.exports = categoryModel;
