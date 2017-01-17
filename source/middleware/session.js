/**
 * Created by supervlad on 1/13/17.
 */

import error from '../tools/error'

export default () => {
  return async (ctx, next) => {
    try {
      const header = ctx.headers['authorization']
      if (header) {
        const [, token] = header.split(' ')
        const [isValid, user] = await user.validateToken(token)
        if (!isValid) {
          return ctx.throw(new error.BadRequest('Invalid token'))
        }
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