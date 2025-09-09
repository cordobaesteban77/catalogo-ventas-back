require("./db/db.config")
const express = require("express")
const app = express()
const path = require("path")

//middlewares
app.use(express.json())
app.use("/public", express.static(path.join(__dirname, "public")))

//rutas
app.use("/products", require("./routes/products.routes"))

app.listen(3001, () => {
    console.log("Server runing in port 3001");
})