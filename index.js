require("./db/db.config")
const express = require("express")
const app = express()
const path = require("path")
const morgan = require("morgan")

//middlewares
app.use(express.json())
app.use("/public", express.static(path.join(__dirname, "public")))
app.use(morgan("dev"))

//rutas
app.use("/products", require("./routes/products.routes"))
app.use("/users", require("./routes/users.routes"))

app.listen(3001, () => {
    console.log("Server runing in port 3001");
})