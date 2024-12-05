const express = require('express')
const multerconfigure = require('../middleware/multerConfig')
const router = new express.Router()
const mobileDetailController = require('../controllers/mobileDetailController')
const { jwtAuth, isAdmin } = require('../middleware/authMiddleware');


router.post('/service/add', multerconfigure.single('mobile_img'), mobileDetailController.addMobileDetails)

router.get('/service/get', jwtAuth, isAdmin, mobileDetailController.getMobileDetails)

router.patch('/update/status/:id', jwtAuth, isAdmin, mobileDetailController.updateMobileService)

router.delete('/delete/service/:id', jwtAuth, isAdmin, mobileDetailController.deleteMobileService)


module.exports = router;
