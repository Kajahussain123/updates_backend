const express = require('express');
const router = express.Router();
const { jwtAuth, isAdmin } = require('../middleware/authMiddleware');
const multerconfigure = require('../middleware/multerConfig')
const accessoryController = require('../controllers/accessoryController');


router.post('/admin/save', jwtAuth, isAdmin, multerconfigure.array('image', 5), accessoryController.addAccessory);
router.get('/user/get', accessoryController.getAccessory)
router.get('/user/get/:id', accessoryController.getViewAccessory);
router.patch('/admin/update/:id', jwtAuth, isAdmin, multerconfigure.array('image', 5), accessoryController.updateAccessory)
router.delete('/admin/delete/image/:id', jwtAuth, isAdmin, accessoryController.deleteAccessoryImage)
router.delete('/admin/delete/:id', jwtAuth, isAdmin, accessoryController.deleteAccessory)
router.post('/user/order/:id', accessoryController.addorderDetails)
router.get('/admin/view/order', jwtAuth, isAdmin, accessoryController.getOrderDetails)
router.patch('/admin/update/status/:id', jwtAuth, isAdmin, accessoryController.updateOrderStatus)
router.get('/user/view/counts', accessoryController.getCounts)



// router.post('/users', userController.createUser);


module.exports = router;
