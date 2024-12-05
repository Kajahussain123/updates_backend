const express = require('express');
const router = express.Router();
const TestimonialsController = require('../controllers/Testimonial');
const { jwtAuth, isAdmin } = require('../middleware/authMiddleware');

// create testimonial
router.post('/create',jwtAuth,isAdmin,TestimonialsController.createTestimonials)
router.get('/get',TestimonialsController.getallTestimonials)
router.patch('/update/:id',jwtAuth,isAdmin,TestimonialsController.updateTestimonials)
router.delete('/delete/:id',jwtAuth,isAdmin,TestimonialsController.deleteTestimonials)

module.exports=router