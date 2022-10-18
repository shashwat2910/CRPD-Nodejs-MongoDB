# CRUD-Nodejs-MongoDB
CRPD operation through API in Nodejs connected to MongoDB Atlas <br>
C - Create <br>
R - Read <br>
P - Patch <br>
D - Delete <br>

## Overview Of the API we are coding

|Methods   	|Urls   	|Actions   	|
|---	|---	|---	|
|POST   	|   /adduser  	| Create new User  	|
| GET  	| 	/users	|  	Get all Users Data 	|
|   PATCH	|  /user/:id 	| 	Update a User by id  	|
|   DELETE	| /user/:id  	| 	Delete a User by :id 	 	|
<br>

## How to run the Project ?
- Git Clone the Project
- In the main directory run this command
```
nodemon server.js
```

## Packages to download
```
npm i mongoose
npm i nodemon
```

## Connection to MongoDB Atlas
- Create a file named server.js
- Paste this code given below
```
const mongoose = require("mongoose")

mongoose.connect(
  "mongodb+srv://<username>:<password>@cluster0.04hy5.mongodb.net/<database>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
```
## Model for the document
- Create a file named user.js
- Paste this code given below
```
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  }
})

const User = mongoose.model("User", UserSchema)

module.exports = User
```
# API's <br>![CodingGIF](https://user-images.githubusercontent.com/63808681/179554280-398eb402-c77c-4dc9-bac7-68b0dd24ff58.gif) <br>

## POST Request 
```
app.post("/adduser", async (request, response) => {
  const user = new User(request.body)
  try {
     await user.save()
  } catch (error) {
    response.status(500).send(error)
  }
 })
```
## GET Request
```
app.get("/users", async (request, response) => {
  const users = await User.find({})
  try {
    response.send(users)
  } catch (error) {
    response.status(500).send(error)
  }
})
```

## PATCH Request
```
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
```
## DELETE Request
```
app.delete("/user/:id", async (request, response) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id)
    if (!user) response.status(404).send("No user found")
    response.status(200).send()
  } catch (error) {
    response.status(500).send(error)
  }
})
```
 If you have any doubts or errors please feel free to connect me on [Linkedin](https://www.linkedin.com/in/shashwat-sharma-79221218a/) [Email](shashwat2910@gmail.com)
