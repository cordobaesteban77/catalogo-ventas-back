require("./db/db.config")
const express = require("express")
const app = express()

//middlewares
app.use(express.json())

//rutas
app.use("/products", require("./routes/products.routes"))

app.listen(3001, () => {
    console.log("Server runing in port 3001");
})