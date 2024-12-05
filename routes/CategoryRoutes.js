const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/accessoryCategoryController');
const { jwtAuth, isAdmin } = require('../middleware/authMiddleware');

// add category
router.post('/add',jwtAuth,isAdmin,categoryController.addCategory);
router.get('/view',categoryController.getCategories)
router.patch('/update/:id',jwtAuth,isAdmin,categoryController.updateCategory)
router.delete('/delete/:id',jwtAuth,isAdmin,categoryController.deleteCategory)


// router.post('/users', userController.createUser);


module.exports = router;
