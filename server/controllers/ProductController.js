const express = require('express');
const router = express.Router();
const EcomProducts = require('../models/Product');
const EcomUser = require('../models/user')
const multer = require('multer');
const cloudinary = require('cloudinary').v2;


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Cloudinary configuration
cloudinary.config({
    cloud_name: "dvl3owmkt",
    api_key: 325813199625248,
    api_secret: "6nRMWyGr_fQ0h1dpznX31PM6tgk",
});

// Function to upload image to Cloudinary and return a Promise
const uploadImageToCloudinary = (image) => {
    return new Promise((resolve, reject) => {
        // Upload directly from the buffer
        cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',  // Automatically detect the resource type
                folder: 'your-folder-name', // Optionally set a folder for organization in Cloudinary
            },
            (error, result) => {
                if (error) {
                    return reject(error); // Reject the promise if upload fails
                }
                resolve(result); // Resolve with the result if upload is successful
            }
        ).end(image.buffer); // Pass the image buffer to Cloudinary
    });
};

router.post('/products', upload.single('image'), async (req, res) => {
    try {
        // Log the received file
        // console.log('Received file:', req.file);

        const { name, price, quantity, description } = req.body;
        const image = req.file;

        if (!image) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        // Upload image to Cloudinary
        const result = await uploadImageToCloudinary(image); // Use the Promise-based function

        // Create the product object without sku
        const product = new EcomProducts({
            name,
            price,
            quantity,
            description,
            image: result.secure_url, // Cloudinary image URL
        });

        // Save product to MongoDB
        await product.save();

        // Send the response after everything is done
        res.status(200).json({
            success: true,
            product,
            message: "EcomProducts uploaded and saved successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// GET route to fetch all products
router.get('/products', async (req, res) => {
    try {
        // Query all products from the database
        const products = await EcomProducts.find();

        // Send the products as a JSON response
        res.json({ success: true, products });
    } catch (error) {
        console.error("Error fetching the products", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.get('/customers', async (req, res) => {
    try {
        // Query all products from the database
        const user = await EcomUser.find();

        // Send the products as a JSON response
        res.json({ success: true, user });
    } catch (error) {
        console.error("Error fetching the products", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.put('/products/:id', upload.single('image'), (req, res) => {
    const productId = req.params.id;
    const { name, price, quantity, description } = req.body;

    // Initialize a variable for image
    let image = req.file ? req.file.path : null;

    // If no image is uploaded, find the product first to get the existing image
    if (!image) {
        EcomProducts.findById(productId)
            .then(product => {
                if (!product) {
                    return res.status(404).json({ success: false, message: "EcomProducts not found" });
                }
                // Proceed with the update after retrieving the existing image
                return EcomProducts.findByIdAndUpdate(productId, {
                    name,
                    price,
                    quantity,
                    description,
                    image: product.imageURL // Use the existing image if no new image is uploaded
                }, { new: true });
            })
            .then(updatedProduct => { // if the first promised return than it will be run
                if (!updatedProduct) {
                    return res.status(404).json({ success: false, message: "EcomProducts update failed" });
                }
                res.json({ success: true, product: updatedProduct });
            })
            .catch(err => res.status(500).json({ success: false, message: err.message }));
    } else {
        // If there is a new image, proceed with the update
        EcomProducts.findByIdAndUpdate(productId, {
            name,
            price,
            quantity,
            description,
            image // Use the new image
        }, { new: true })
            .then(updatedProduct => {
                if (!updatedProduct) {
                    return res.status(404).json({ success: false, message: "EcomProducts update failed" });
                }
                res.json({ success: true, product: updatedProduct });
            })
            .catch(err => res.status(500).json({ success: false, message: err.message }));
    }
});


router.delete('/products/:id', async (req, res) => {
    const productID = req.params.id
    // console.log("productID",productID);
    try {
        const product = await EcomProducts.findById(productID);

        if (!product) {
            return res.status(404).json({ success: false, message: 'EcomProducts not found' });
        }
        if (product.imageURL) {
            const publicId = product.imageURL.split('/').pop().split('.')[0]; // Extract the public ID from the URL
            await cloudinary.uploader.destroy(publicId); // Delete the image from Cloudinary
        }
        const deleteProduct = await EcomProducts.findByIdAndDelete(productID);
        console.log("deleteProduct", deleteProduct);
        if (!deleteProduct) {
            return res.status(404).json({ success: false, message: "EcomProducts not found" })
        }
        res.json({ success: true, message: 'EcomProducts deleted successfully' });
    } catch (error) {
        console.error("Error deleting Products", error);
        res.status(500).json({ success: false, message: 'Error deleting Prdoucts' });
    }
});

module.exports = router;
