/**
 * Created by supervlad on 1/13/17.
 */

import User from '../models/user'

export default () => {
  return async (ctx, next) => {
    try {
      const header = ctx.headers['authorization']
      if (header) {
        const [, token] = header.split(' ')
        const user = await User.findOne({ token })
        await user.validateToken(token)
        ctx.state.user = user
        return next()
      }
      ctx.state.user = null
      return next()
    }
    catch (error) {
      ctx.throw(error)
    }
  }
}