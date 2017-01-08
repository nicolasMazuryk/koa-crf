/**
 * Created by supervlad on 12/17/16.
 */

import Router from 'koa-router'
import research from './api/research'
import users from './api/users'
import auth from './auth'

const main = new Router({
  prefix: '/api/v1'
})

main.use('/research', research.routes())
main.use('/users', users.routes())

export default app => {
  app.use(main.routes())
  app.use(auth.routes())
  return app
}
