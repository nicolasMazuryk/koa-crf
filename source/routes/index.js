/**
 * Created by supervlad on 12/17/16.
 */

import Router from 'koa-router'
import research from './api/research'
import user from './api/users'
import auth from './auth'

const main = new Router({
  prefix: '/api/v1'
})

main.use('/researches', research.routes())
main.use('/users', user.routes())

export default app => {
  app.use(main.routes())
  app.use(auth.routes())
  return app
}
