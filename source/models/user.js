/**
 * Created by supervlad on 12/7/16.
 */

import mongoose from 'mongoose'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const roles = ['admin', 'monitor', 'doctor']

const generateSalt = (bytes = 128) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(bytes, (err, salt) => {
      if (err) return reject(err)
      salt = new Buffer(salt).toString('hex')
      return resolve(salt)
    })
  })
}

const generateHash = (password, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 500, 128, 'sha512', (err, hash) => {
      if (err) return reject(err)
      hash = new Buffer(hash).toString('hex')
      return resolve(hash)
    })
  })
}

const signToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, 'key_secret', { expiresIn: '12h' }, (error, token) => {
      if(error) return reject(error)
      return resolve(token)
    })
  })
}

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'key_secret', (err, decoded) => {
      if (err) return reject(err)
      return resolve(decoded)
    })
  })
}

const User = new mongoose.Schema({

  phone: { type: Number, required: true },
  password: { type: String, required: true },
  name: { type: String },
  role: {
    type: String,
    validate: {
      validator: (role) => roles.includes(role),
      message: '{VALUE} is not a valid user role'
    },
    required: true
  },

  salt: String,
  token: { type: String, default: '' }

})

User.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await generateSalt()
    const hash = await generateHash(this.password, salt)
    this.salt = salt
    this.password = hash
  }
  next()
})

User.methods.validatePassword = async function validatePassword(password) {
  const hash = await generateHash(password, this.salt)
  return hash === this.password
}

User.methods.generateToken = async function generateToken() {
  const token = await signToken({ id: this._id, phone: this.phone, role: this.role })
  this.token = token
  return token
}

User.methods.validateToken = async function validateToken(token) {
  const { id, phone, role } = await verifyToken(token)
  return id == this._id && phone == this.phone && role == this.role
}

export default mongoose.model('User', User)
