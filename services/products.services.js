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
    newProduct.image = file.filename
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

const changeStateProductServices = async (idProduct) => {
    try {
        const product = await ProductModel.findById(idProduct)
        if (product.enabled) {
            product.enabled = false
        }
        else {
            product.enabled = true
        }
        await product.save()
        return {
            msg: `Producto ${product.enabled ? "habilitado" : "deshabilitado"}`,
            statusCode: 200
        }
    } catch (error) {
        return {
            error,
            statusCode: 500
        }
    }
}

module.exports = {getAllProductsServices, getProductByIdServices, createProductServices, editProductServices, deleteProductServices, changeStateProductServices}