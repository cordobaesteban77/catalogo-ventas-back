const express = require("express")
const { getAllProducts, getProductById, createProduct, editProduct, deleteProduct, changeStateProduct } = require("../controllers/products.controllers")
const multerMidllewares = require("../middlewares/multer")
const router = express.Router()

router.get("/", getAllProducts)
router.get("/:id", getProductById)
router.post("/", multerMidllewares.single("image"), createProduct)
router.put("/:id", editProduct)
router.put("/changeState/:idProduct" , changeStateProduct)
router.delete("/:id", deleteProduct)

module.exports = router