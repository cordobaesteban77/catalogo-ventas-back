const {Router} = require("express")
const {getAllUsers, getUserById, createUser, login, recoverPassUser} = require("../controllers/users.controllers")
const router = Router()
const {check} = require("express-validator")

router.get("/", getAllUsers)
router.get("/:id", [
    check("id", "ERROR. El formato de ID no corresponde a MongoDB").isMongoId()
], getUserById)
router.post("/", [
    check("userName", "Campo NOMBRE DE USUARIO vacio").notEmpty(),
    check("userName", "El nombre de usuario debe tener un mínimo de 5 caractres").isLength({min:5}, {max:10}),
    check("email", "Formato incorrecto").isEmail(),
    check("password", "ERROR, la contraseña debe tener un minimo de 8 caracteres").isLength({min:8})
], createUser)
router.post("/login", login)
router.post("/recoverPass", recoverPassUser)

module.exports = router