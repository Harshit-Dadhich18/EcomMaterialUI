const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EcomUser = require("./user");
const EcomProducts = require("./Product");

const orderSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "EcomUser", // Link to the User model
      required: true,
    },
    orderDetails: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "EcomProducts", required: true },
        name: {type: String,required: true}, // Product reference
        orderQuantity: { type: Number, required: true },
        price: { type: Number, required: true },
        status: { type: String, default: "pending" }, // Individual product status
        image: { type: String, required: true }, // Product image URL
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model("EcomOrder", orderSchema);