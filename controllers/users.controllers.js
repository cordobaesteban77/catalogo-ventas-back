const {getAllUsersServices, getUserByIdServices, createUserServices, loginServices} = require("../services/users.services")
const { validationResult } = require("express-validator")

const getAllUsers = async (req, res) => {
    const {statusCode, users} = await getAllUsersServices()
    res.status(statusCode).json({users})
}

const getUserById = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).json({msg: "Se encontraron errores en el servidor", errors: errors.array()})
    }
    const {statusCode, user} = await getUserByIdServices(req.params.id)
    res.status(statusCode).json({user})
}

const createUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).json({msg: "Se encontraron errores en el servidor", errors: errors.array()})
    }
    const {statusCode, msg} = await createUserServices(req.body)
    try {
        res.status(statusCode).json({msg})
    } catch (error) {
        res.status(statusCode).json({error})
    }
}

const login = async (req, res) => {
    const {statusCode, msg, token, roll} = await (req.body)
    res.status(statusCode).json({msg,token,roll})
}

module.exports = {getAllUsers, getUserById, createUser, login}