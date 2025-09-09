const { getAllProductsServices, getProductByIdServices, createProductServices, editProductServices, deleteProductServices, changeStateProductServices } = require("../services/products.services")

const getAllProducts = async (req, res) => {
    const {products, statusCode} = await getAllProductsServices()
    res.status(statusCode).json({products})
}

const getProductById = async (req, res) => {
    const {product, statusCode} = await getProductByIdServices(req.params.id)
    res.status(statusCode).json({product})
}

const createProduct = async (req, res) => {
    const {msg, statusCode} = await createProductServices(req.body, req.file)
    res.status(statusCode).json({msg})
}

const editProduct = async (req, res) => {
    const {msg, statusCode} = await editProductServices(req.params.id, req.body)
    res.status(statusCode).json({msg})
}

const deleteProduct = async (req, res) => {
    const {msg, statusCode} = await deleteProductServices(req.params.id)
    res.status(statusCode).json({msg})
}

const changeStateProduct = async (req, res) => {
    const { msg, statusCode, error } = await changeStateProductServices(req.params.idProduct)
    try {
        res.status(statusCode).json({msg})
    } catch {
        res.status(statusCode).json({error})
    }
}

module.exports = { getAllProducts, getProductById, createProduct, editProduct, deleteProduct, changeStateProduct }