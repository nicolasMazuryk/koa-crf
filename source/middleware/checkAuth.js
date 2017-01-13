/**
 * Created by supervlad on 1/13/17.
 */

import error from 'tools/error'

export default () => {
  return (ctx, next) => {
    const user = ctx.state.user
    if (!user) {
      return ctx.throw(new error.Forbidden('Permission denied'))
    }
    next()
  }
}