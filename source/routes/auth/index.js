/**
 * Created by supervlad on 12/22/16.
 */

import Router from 'koa-router'
import * as controller from '../../controllers/auth'

const auth = new Router()

auth
  .post('/login', controller.login)
  .get('/logout', controller.logout)

export default auth