/**
 * Created by supervlad on 1/12/17.
 */

import Router from 'koa-router'
import * as controller from '../../controllers/patient'
import checkAuth from '../../middleware/checkAuth'

const router = new Router()

router
  .get('/', checkAuth('read:patients'), controller.getPatients)
  .post('/', checkAuth('create:patients'), controller.postPatient)
  .get('/:pid', checkAuth('read:patients'), controller.getPatient)
  .put('/:pid', checkAuth('update:patients'), controller.putPatient)
  .delete('/:pid', checkAuth('delete:patients'), controller.deletePatient)

export default router
