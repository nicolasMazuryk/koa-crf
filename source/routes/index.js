/**
 * Created by supervlad on 12/17/16.
 */

import Router from 'koa-router'
import research from './api/research'
import user from './api/users'
import auth from './auth'
import data from './data'

const isProd = process.env.NODE_ENV === 'production'

const main = new Router({
  prefix: '/api/v1'
})

main.use('/researches', research.routes())
main.use('/users', user.routes())

// works only for dev/test env without auth middleware
// Generates /superuser
!isProd && main.use('/gen', data.routes())

export default app => {
  app.use(main.routes())
  app.use(auth.routes())
  return app
}
