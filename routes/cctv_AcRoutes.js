const express = require('express');
const router = express.Router();
const cctvController = require('../controllers/cctv_AcDetailController');
const { jwtAuth, isAdmin } = require('../middleware/authMiddleware');



router.get('/services', jwtAuth, isAdmin, cctvController.getAc_CctvDetails)

router.post('/users/cctv-add', cctvController.addcctvDetails)

router.post('/users/ac-add', cctvController.addACDetails)

router.patch('/service/status/:id', jwtAuth, isAdmin, cctvController.updateService)

router.delete('/delete/service/:id', jwtAuth, isAdmin, cctvController.deleteService)

module.exports = router;
