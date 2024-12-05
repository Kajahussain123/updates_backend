const Testimonials=require('../models/Testimonials')

exports.createTestimonials=async(req,res)=>{
    const {description,Rating,Name,service}=req.body 
    try {
        const newTestimonial = new Testimonials({
            Name,
            service,
            Rating,
            description
        });
        await newTestimonial.save();
        

        res.status(201).json({ message: 'Product created successfully', Testimonials: newTestimonial }); 
    } catch (error) {
        res.status(500).json({message:"Internal Server",error})
        console.log(error)
    }
}

exports.getallTestimonials=async(req,res)=>{
    try {
        const allTestimonial=await Testimonials.find()
        res.status(200).json({message:"all testimonials",allTestimonial})
    } catch (error) {
        res.status(500).json({message:'Internal server error',error})
    }
}

exports.updateTestimonials=async(req,res)=>{
    const Body=req.body 
    const {id}=req.params
try {
    const updatedtestimonial=await Testimonials.findByIdAndUpdate(id,Body,{new:true})
    if (!updatedtestimonial) {
        return res.status(404).json({ message: 'Tesimonial not found' });
    }
    res.status(200).json({ message: 'SubCategory updated successfully', updatedtestimonial });
 
} catch (error) {
    res.status(500).json({message:'internal server error',error})
    console.log(error)
}
}

exports.deleteTestimonials = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTestimonial = await Testimonials.findByIdAndDelete(id);
        if (!deletedTestimonial) {
            return res.status(400).json({ message: 'Testimonial doesn\'t exist' });
        }
        res.status(200).json({ message: 'Testimonial Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};


