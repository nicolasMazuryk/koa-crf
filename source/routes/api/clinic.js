/**
 * Created by supervlad on 1/12/17.
 */

import Router from 'koa-router'
import * as controller from '../../controllers/clinic'
import patient from './patient'

const router = new Router()

router.use('/:cid/patients', patient.routes())

router
  .get('/', controller.getClinics)
  .post('/', controller.postClinic)
  .delete('/:cid', controller.deleteClinic)

export default router
