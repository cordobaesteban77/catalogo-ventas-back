const {Schema, model} = require("mongoose")
const UserSchema = new Schema({
    userName: {
        type: String,
        required: [true, "Campo userName obligatorio"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    roll: {
        type: String,
        enum: ["user", "admin"],
        default: "admin"
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

const UserModel = model("users", UserSchema)
module.exports = UserModel