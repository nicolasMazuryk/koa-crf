/**
 * Created by supervlad on 12/7/16.
 */

export default () => {
  return async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log('%s %s %s - %s ms', ctx.method, ctx.url, ctx.status, ms)
  }
}