const category_model = require('../models/accessoryCategoryModel');

exports.addCategory = async (req, res) => {
    try {
        const { Category_Names } = req.body;

        const newCategory = new category_model({
            Category_Names
        });
        // Save to the database
        await newCategory.save();
        const categoryResponse = newCategory.toObject();
        delete categoryResponse.createdAt;
        delete categoryResponse.updatedAt;
        res.status(201).json({ message: 'category added successfully', category: categoryResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get all category
exports.getCategories = async (req, res) => {
    try {
        const allCategories = await category_model.find()
            .select(`-createdAt -updatedAt`);
        res.status(200).json(allCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { Category_Names } = req.body;
        const updatedCategory = await category_model.findByIdAndUpdate(
            id,
            { Category_Names },
            { new: true }
        )


        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        await updatedCategory.save();
        const categoryResponse = updatedCategory.toObject();
        delete categoryResponse.createdAt;
        delete categoryResponse.updatedAt;
        res.status(201).json(categoryResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// delete category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        const deletedCategory = await category_model.findByIdAndDelete({ _id: id })
            .select(`-createdAt -updatedAt`)
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(deletedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}