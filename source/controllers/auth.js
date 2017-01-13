/**
 * Created by supervlad on 12/22/16.
 */

import User from '../models/user'
import error from '../tools/error'

export const login = async (ctx) => {
  try {
    const { phone, password } = ctx.request.body
    const user = await User.findOne({ phone })
    if (user) {
      await user.validatePassword(password)
      await user.generateToken()
      await user.save()
      const { phone, name, role, token } = user
      return ctx.body = { payload: { token, user: {phone, name, role} } }
    }
    ctx.throw(new error.BadRequest('Wrong phone or password'))
  }
  catch (err) {
    ctx.throw(err)
  }
}

export const logout = async (ctx) => {
  try {
    const user = ctx.state.user
    user.token = ''
    await user.save()
    return ctx.body = { payload: true }
  }
  catch (error) {
    ctx.throw(error)
  }
}