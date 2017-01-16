/**
 * Created by supervlad on 12/17/16.
 */

import Router from 'koa-router'
import * as controller from '../../controllers/user'

const router = new Router()

router
  .get('/', controller.getUsers)
  .post('/', controller.postUser)
  .get('/:id', controller.getUser)
  .delete('/:id', controller.deleteUser)

export default router