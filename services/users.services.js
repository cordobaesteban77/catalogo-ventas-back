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

module.exports = {getAllUsersServices, getUserByIdServices, createUserServices}