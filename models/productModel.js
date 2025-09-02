const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: "url"
    },
    enabled: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
    }
})

const ProductModel = mongoose.model("products", ProductSchema)
module.exports = ProductModel