/**
 * Created by supervlad on 1/13/17.
 */

import error from '../tools/error'
import access from '../tools/access'

export default (operation) => {
  const can = access()
  return (ctx, next) => {
    const user = ctx.state.user
    const params = { user, params: ctx.params, body: ctx.request.body || {} }
    if (user && can(user.role, operation, params)) {
      return next()
    }
    return ctx.throw(new error.Forbidden('Permission denied'))
  }
}
