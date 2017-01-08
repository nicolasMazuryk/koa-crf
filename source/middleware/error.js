/**
 * Created by supervlad on 12/11/16.
 */

import error from '../tools/error'

export default async (ctx, next) => {
  try {
    await next()
  }
  catch (err) {
    const handled = error.handleError(err)
    ctx.status = handled.status || 500
    ctx.body = { error: handled.message || 'Internal server error' }
  }
}