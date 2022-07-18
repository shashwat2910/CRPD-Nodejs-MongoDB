const mongoose = require("mongoose")
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
  },
  tokens : [
    {
      token: {
        type: String,
        require: true
      }
    }
  ]
})

UserSchema.methods.generateAuthentication = async function() {
  const user = this
  const token = jwt.sign({_id: user._id.toString()}, 'node js')
  user.tokens = user.tokens.concat({ token })
  user.save()
  return token
}

UserSchema.statics.findByCredentials = async (email , password) => {
  const user = await User.findOne({ email: email })
  if(!user) {
    throw new Error("Unable to find a user")
  }
  const isMatchedPassword = await bycrypt.compare(password, user.password)
  if(!isMatchedPassword) {
    throw new Error("Wrong Password")
  }
  return user
}

UserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bycrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model("User", UserSchema)

module.exports = User

