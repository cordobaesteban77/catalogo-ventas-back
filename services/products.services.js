const ProductModel = require("../models/productModel")

const getAllProductsServices = async () => {
    const products = await ProductModel.find()
    return {
        products,
        statusCode: 200
    }
}

const getProductByIdServices = async (idProduct) => {
    const product = await ProductModel.findOne({_id: idProduct})
    return {
        product,
        statusCode: 200
    }
}

const createProductServices = async (body, file) => {
    const newProduct = new ProductModel(body)
    await newProduct.save()
    return {
        msg: "Producto creado con éxito",
        statusCode: 201
    }
}

const editProductServices = async (idProduct, body) => {
    await ProductModel.findByIdAndUpdate({_id: idProduct}, body)
    return {
        msg: "Producto editado con éxito",
        statusCode: 201
    }
}

const deleteProductServices = async (idProduct) => {
    await ProductModel.findByIdAndDelete({_id: idProduct})
    return {
        msg: "Producto eliminado con éxito",
        statusCode: 200
    }
}

module.exports = {getAllProductsServices, getProductByIdServices, createProductServices, editProductServices, deleteProductServices}