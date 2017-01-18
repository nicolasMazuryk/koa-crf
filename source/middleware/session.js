/**
 * Created by supervlad on 1/13/17.
 */

import error from '../tools/error'
import User from '../models/user'

export default () => {
  return async (ctx, next) => {
    try {
      const header = ctx.headers['authorization']
      if (header) {
        const [, token] = header.split(' ')
        const user = await User.verifyToken(token)
        if (!user) {
          return ctx.throw(new error.BadRequest('Invalid token'))
        }
        ctx.state.user = user
        await next()
      }
      else {
        ctx.state.user = null
        await next()
      }
    }
    catch (error) {
      ctx.throw(error)
    }
  }
}