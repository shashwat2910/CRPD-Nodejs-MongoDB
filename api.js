const express = require("express")
const validator = require('validator')
const bodyParser = require('body-parser')
const User = require('./model/user')
const app = express()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get("/users", async (request, response) => {
  const users = await User.find({})
  try {
    response.send(users)
  } catch (error) {
    response.status(500).send(error)
  }
})

app.post("/adduser", async (request, response) => {
  const user = new User(request.body)
  try {
    var email = await validator.isEmail(user.email)
    if (email) {
      await user.save()
      const token = await user.generateAuthentication()
      response.send({ user, token })
    } else {
      throw console.error("Not an Email Id");
    }
  } catch (error) {
    response.status(500).send(error)
  }
})

app.post("/users/login", async (request, response) => {
  try {
    const user = await User.findByCredentials(request.body.email, request.body.password)
  } catch (error) {
    response.status(400).send(error)
  }
})

app.patch("/user/:id", async (request, response) => {
  const updates = Object.keys(request.body)
  try {
    const id = request.params.id
    const updatedData = request.body
    const options = { new: true }
    const result = await User.findByIdAndUpdate(
      id, updatedData, options
    )
    response.send(result)
  } catch (error) {
    response.status(500).send(error)
  }
})

app.delete("/user/:id", async (request, response) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id)
    if (!user) response.status(404).send("No user found")
    response.status(200).send()
  } catch (error) {
    response.status(500).send(error)
  }
})

module.exports = app;