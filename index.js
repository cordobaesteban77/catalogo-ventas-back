require("./db/db.config")
const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const morgan = require("morgan")

//middlewares
app.use(express.json())
app.use("/public", express.static(path.join(__dirname, "public")))
app.use(morgan("dev"))
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

//rutas
app.use("/products", require("./routes/products.routes"))
app.use("/users", require("./routes/users.routes"))

app.listen(3001, () => {
    console.log("Server runing in port 3001");
})