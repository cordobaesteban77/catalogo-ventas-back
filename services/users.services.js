const UserModel = require("../models/userModel")
const argon = require("argon2")
const jwt = require("jsonwebtoken")

const getAllUsersServices = async () => {
    const users = await UserModel.find()
    return {
        users,
        statusCode: 200
    }
}

const getUserByIdServices = async (idUser) => {
    const user = await UserModel.findOne({_id: idUser})
    return {
        user,
        statusCode: 200
    }
}

const createUserServices = async (body) => { //FALTA AGREGAR NODEMAILER
    try {
        const newUser = new UserModel(body)
        newUser.password = await argon.hash(newUser.password)
        await newUser.save()
        return {
            msg: "Usuario creado con éxito",
            statusCode: 201
        }
    } catch {
        return {
            error,
            statusCode: 500
        }
    }
}

const loginServices = async (body) => {
    const userExist = await UserModel.findOne({userName: body.userName})
    if (!userExist) {
        return {
            msg: "usuario y/o contraseña incorrecto",
            statusCode: 400
        }
    }
    const passCheck = await argon.verify(userExist.password, body.password)
    if (!passCheck) {
        return {
            msg: "usuario y/o contraseña incorrecto",
            statusCode: 400
        }
    }

    const payload = {
        idUser: userExist._id,
        rollUser: userExist.roll
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"})

    return {
        msg: "Inicio de sesion exitoso",
        token,
        roll: userExist.roll,
        statusCode: 200
    }
}

module.exports = {getAllUsersServices, getUserByIdServices, createUserServices, loginServices}