const express = require('express');
const router = express.Router();
const adminController=require('../controllers/AdminController')

router.post('/register',adminController.RegisterAdmin)
router.post('/login',adminController.loginAdmin)

module.exports = router;