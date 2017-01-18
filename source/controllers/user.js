/**
 * Created by supervlad on 12/13/16.
 */

import User from '../models/user'
import Clinic from '../models/clinic'

export const getUsers = async (ctx) => {
  try {
    const users = await User.find({}, '-salt -password -token')
    ctx.body = { payload: users }
  }
  catch (error) {
     ctx.throw(error)
  }
}

export const getUser = async (ctx) => {
  try {
    const user = await User.findById(ctx.params.id, '-salt -password -token')
    ctx.body = { payload: user }
  }
  catch (error) {
    ctx.throw(error)
  }
}

// not for production
export const getSuperUser = async (ctx) => {
  try {
    const superUser = { phone: 1, password: '1', role: 'admin', name: 'superuser' }
    const user = await User.findOne({name: 'superuser'})
    if (!user) {
      const su = new User(superUser)
      const saved = await su.save()
      return ctx.body = { payload: saved }
    }
    ctx.body = { payload: user }
  }
  catch (error) {
    ctx.throw(error)
  }
}

export const postUser = async (ctx) => {
  try {
    const { body } = ctx.request
    const user = await User.findOne({ phone: body.phone })
    if (!user) {
      const newUser = new User(body)
      const created = await newUser.save()
      if (newUser.role === 'doctor') {
        await Clinic
          .findByIdAndUpdate(body.clinicId, { $push: { doctors: created._id } }, { new: true })
      }
      ctx.body = { payload: created }
    }
  }
  catch (error) {
    ctx.throw(error)
  }
}

export const deleteUser = async (ctx) => {
  try {
    const result = await User.findByIdAndRemove(ctx.params.id)
    ctx.body = { payload: result ? true : result }
  }
  catch (error) {
    ctx.throw(error)
  }
}