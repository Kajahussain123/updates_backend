const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');
const { jwtAuth, isAdmin } = require('../middleware/authMiddleware');



// Route to get all products
router.get('/CCTV', productController.getProductsCCTV);

router.get('/AC', productController.getProductsAC);

router.post('/add', jwtAuth, isAdmin, productController.createProduct);

router.get('/products/:id', productController.getProductById);

router.put('/brands/add/:productId', jwtAuth, isAdmin, productController.addBrands);

router.put('/service/add/:productId', jwtAuth, isAdmin, productController.addServices);

router.delete('/brand/delete/:productId', jwtAuth, isAdmin, productController.deleteBrand);

router.delete('/service/delete/:productId', jwtAuth, isAdmin, productController.deleteService);









module.exports = router;
