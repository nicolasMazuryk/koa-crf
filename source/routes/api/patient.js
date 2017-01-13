/**
 * Created by supervlad on 1/12/17.
 */

import Router from 'koa-router'
import * as controller from '../../controllers/patient'

const router = new Router()

router
  .get('/', controller.getPatients)
  .post('/', controller.postPatient)
  .put('/:cid', controller.putPatient)
  .delete('/:cid', controller.deletePatient)

export default router
