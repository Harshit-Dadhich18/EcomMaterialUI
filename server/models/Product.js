const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,  // Ensures price can't be negative
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,  // Ensures quantity can't be negative
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,  // URL of the uploaded image
        required: false,  // Not necessarily required at the time of creation, can be added later after upload
    }
}, { timestamps: true }); // This will automatically add 'createdAt' and 'updatedAt' fields

module.exports = mongoose.model('EcomProducts', ProductSchema);
