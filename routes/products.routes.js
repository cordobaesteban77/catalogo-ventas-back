const express = require("express")
const { getAllProducts, getProductById, createProduct, editProduct, deleteProduct, changeStateProduct } = require("../controllers/products.controllers")
const router = express.Router()

router.get("/", getAllProducts)
router.get("/:id", getProductById)
router.post("/", createProduct)
router.put("/:id", editProduct)
router.put("/changeState/:idProduct" , changeStateProduct)
router.delete("/:id", deleteProduct)

module.exports = router