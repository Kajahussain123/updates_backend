const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');
const { jwtAuth, isAdmin } = require('../middleware/authMiddleware');



// Route to get all products
router.get('/CCTV', productController.getProductsCCTV);

router.get('/AC', productController.getProductsAC);

router.post('/add', jwtAuth, isAdmin, productController.createProduct);

router.get('/products/:id', productController.getProductById);

router.patch('/brands/add/:productId', jwtAuth, isAdmin, productController.addBrands);

router.patch('/brands/edit/:productId', jwtAuth, isAdmin, productController.editBrands);

router.patch('/service/add/:productId', jwtAuth, isAdmin, productController.addServices);

router.patch('/service/edit/:productId', jwtAuth, isAdmin, productController.editServices);

router.delete('/brand/delete/:productId', jwtAuth, isAdmin, productController.deleteBrand);

router.delete('/service/delete/:productId', jwtAuth, isAdmin, productController.deleteService);



module.exports = router;