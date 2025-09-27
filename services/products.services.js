const ProductModel = require("../models/productModel")
const fs = require("fs")
const path = require("path")

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

const editProductServices = async (idProduct, body, file) => {
    try {
        if (file) {
            const currentProduct = await ProductModel.findById(idProduct)
            if (currentProduct && currentProduct.image) {
                const oldImagePath = path.join(__dirname, "../public", currentProduct.image)
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath)
                }
            }
            body.image = file.filename
        }
        await ProductModel.findByIdAndUpdate({_id: idProduct}, body)
        return {
            msg: "Producto editado con éxito",
            statusCode: 200
        }
    } catch (error) {
        return {
            msg: "Error al editar producto",
            statusCode: 500
        }
    }
}

const deleteProductServices = async (idProduct) => {
    const product = await ProductModel.findById(idProduct)
    if (product && product.image) {
        const imagePath = path.join(__dirname, "../public", product.image)
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath)
        }
    }
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