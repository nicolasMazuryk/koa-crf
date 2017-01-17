/**
 * Created by supervlad on 12/17/16.
 */

import Router from 'koa-router'
import * as controller from '../../controllers/user'
import checkAuth from '../../middleware/checkAuth'

const router = new Router()

router
  .get('/', checkAuth('read:users'),  controller.getUsers)
  .post('/', checkAuth('create:users'), controller.postUser)
  .get('/:id', checkAuth('read:users'), controller.getUser)
  .delete('/:id', checkAuth('delete:users'), controller.deleteUser)

export default router
