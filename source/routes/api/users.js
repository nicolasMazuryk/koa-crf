/**
 * Created by supervlad on 12/17/16.
 */

import Router from 'koa-router'
import * as controller from '../../controllers/user'

const users = new Router()

users
  .get('/', controller.getUsers)
  .post('/', controller.postUser)
  .delete('/', controller.deleteUser)

export default users