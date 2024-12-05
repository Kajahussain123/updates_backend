const productCollection = require("../models/productModel");


// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { productName, brands, services } = req.body;

        // Create a new product document
        const newProduct = new productCollection({
            productName,
            brands,
            services
        });

        // Save to the database
        await newProduct.save();
        const { createdAt, updatedAt, ...responseProduct } = newProduct.toObject();

        res.status(201).json({ message: 'Product created successfully', product: responseProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all products
exports.getProductsAC = async (req, res) => {
    try {
        const products = await productCollection.find({ productName: 'AC' })
            .select(`-createdAt -updatedAt`); // Fetch all products
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all products
exports.getProductsCCTV = async (req, res) => {
    try {
        const products = await productCollection.find({ productName: 'CCTV' })
            .select(`-createdAt -updatedAt`); // Fetch all products
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await productCollection.findById(req.params.id)
            .select(`-createdAt -updatedAt `);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// add brands
exports.addBrands = async (req, res) => {
    const { productId } = req.params;
    const { brands } = req.body;

    try {
        const product = await productCollection.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const newBrands = brands.filter(
            brand => !product.brands.some(existingBrand => existingBrand.brandName === brand.brandName)
        );

        if (newBrands.length === 0) {
            return res.status(400).json({ message: "All brands already exist" });
        }
        const updateBrand = await productCollection.findByIdAndUpdate(
            productId,
            { $push: { brands: { $each: newBrands } } },
            { new: true }
        ).select('-createdAt -updatedAt');

        res.status(201).json({ message: "Brands added successfully", updateBrand });
    } catch (error) {
        res.status(500).json({ message: `Error occurred due to: ${error.message}` });
    }
};

// edit brands
exports.editBrands = async (req, res) => {
    const { productId } = req.params;
    const { oldBrandName, newBrand } = req.body;

    try {
        // Find the product
        const product = await productCollection.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Locate the index of the brand to be updated
        const brandIndex = product.brands.findIndex(
            brand => brand.brandName === oldBrandName
        );

        if (brandIndex === -1) {
            return res.status(400).json({ message: "Brand not found" });
        }

        // Update the specific brand
        product.brands[brandIndex].brandName = newBrand.brandName;

        // Save the updated product
        const updatedProduct = await product.save();

        res.status(200).json({
            message: "Brand updated successfully",
            updatedProduct
        });
    } catch (error) {
        console.error("Error updating brand:", error);
        res.status(500).json({
            message: `Error occurred while updating brand: ${error.message}`
        });
    }
};




// add services

exports.addServices = async (req, res) => {
    const { productId } = req.params;
    const { services } = req.body;
    try {
        const product = await productCollection.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const newServices = services.filter(
            service => !product.services.some(existingService => existingService.serviceName === service.serviceName)
        );
        if (newServices.length === 0) {
            return res.status(400).json({ message: "All services already exist" });
        }
        const updatedProduct = await productCollection.findByIdAndUpdate(
            productId,
            { $push: { services: { $each: newServices } } },
            { new: true }
        ).select('-createdAt -updatedAt');
        res.status(201).json({ message: "Services added successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: `Error occurred due to: ${error.message}` });
    }
};

// edit service
exports.editServices = async (req, res) => {
    const { productId } = req.params;
    const { oldServiceName, newService } = req.body;

    try {
        // Find the product
        const product = await productCollection.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Locate the index of the brand to be updated
        const serviceIndex = product.services.findIndex(
            brand => brand.serviceName === oldServiceName
        );

        if (serviceIndex === -1) {
            return res.status(400).json({ message: "service not found" });
        }

        // Update the specific brand
        product.services[serviceIndex].serviceName = newService.serviceName;

        // Save the updated product
        const updatedService = await product.save();

        res.status(200).json({
            message: "Service updated successfully",
            updatedService
        });
    } catch (error) {
        console.error("Error updating service:", error);
        res.status(500).json({
            message: `Error occurred while updating service: ${error.message}`
        });
    }
};

// delete brand 
exports.deleteBrand = async (req, res) => {
    const { productId } = req.params;
    const { brandName } = req.body;

    try {
        const product = await productCollection.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const brandToDelete = product.brands.find(brand => brand.brandName === brandName);
        if (!brandToDelete) {
            return res.status(404).json({ message: "Brand not found" });
        }

        const updatedProduct = await productCollection.findByIdAndUpdate(
            productId,
            { $pull: { brands: { _id: brandToDelete._id } } },
            { new: true }
        ).select('-createdAt -updatedAt');

        res.status(200).json({ message: "Brand deleted successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: `Error occurred due to: ${error.message}` });
    }
};


// deleting service
exports.deleteService = async (req, res) => {
    const { productId } = req.params;
    const { serviceName } = req.body;

    try {

        const product = await productCollection.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const serviceToDelete = product.services.find(service => service.serviceName === serviceName);
        if (!serviceToDelete) {
            return res.status(404).json({ message: "Service not found" });
        }

        const updatedProduct = await productCollection.findByIdAndUpdate(
            productId,
            { $pull: { services: { _id: serviceToDelete._id } } },
            { new: true }
        ).select('-createdAt -updatedAt');

        res.status(200).json({ message: "Service deleted successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: `Error occurred due to: ${error.message}` });
    }
};
