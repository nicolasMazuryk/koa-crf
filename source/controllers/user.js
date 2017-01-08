/**
 * Created by supervlad on 12/13/16.
 */

import User from '../models/user'

export const getUsers = async (ctx) => {
  try {
    const { id } = ctx.params
    const user = await User.find(id ? {id} : {}, '-salt -password -token')
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
      await newUser.save()
      ctx.body = { payload: newUser }
    }
  }
  catch (error) {
    ctx.throw(error)
  }
}

export const deleteUser = async (ctx) => {
  try {
    const user = await User.findByIdAndRemove(ctx.params.id)
    ctx.body = { payload: user }
  }
  catch (error) {
    ctx.throw(error)
  }
}