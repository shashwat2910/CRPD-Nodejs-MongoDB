const express = require("express")
const mongoose = require("mongoose")
const route = require('./api')

const app = express()

app.use(express.json())

mongoose.connect(
  "mongodb+srv://shashwat2910:123@cluster0.04hy5.mongodb.net/db01?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

app.use(route)

app.listen(3000, () => {
  console.log("Server is running...")
})