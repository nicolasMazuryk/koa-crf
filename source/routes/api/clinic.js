/**
 * Created by supervlad on 1/12/17.
 */

import Router from 'koa-router'
import * as controller from '../../controllers/clinic'
import patient from './patient'
import checkAuth from '../../middleware/checkAuth'

const router = new Router()

router.use('/:cid/patients', patient.routes())

router
  .get('/', checkAuth('read:clinics'), controller.getClinics)
  .post('/', checkAuth('create:clinics'), controller.postClinic)
  .get('/:cid', checkAuth('read:clinics'), controller.getClinic)
  .delete('/:cid', checkAuth('delete:clinics'), controller.deleteClinic)

export default router
