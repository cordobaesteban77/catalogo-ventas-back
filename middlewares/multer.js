const multer = require("multer")
const path = require("path")

module.exports = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public")
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            const finalNameImage = `${file.fieldname}-${Date.now()}-${ext}`
            cb(null, finalNameImage)
        },
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            if (ext !== ".jpg" && ext !== "png") {
                cb(new Error("Formato de imagen no permitido"), false)
            }
            cb(null, true)
        }
    })
})