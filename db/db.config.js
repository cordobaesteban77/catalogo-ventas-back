const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_CONNECT).then(() => console.log("data base connected")).catch((error) => console.log("error"))