/**
 * Created by supervlad on 12/11/16.
 */

import Router from 'koa-router'
import clinics from './clinic'
import * as controller from '../../controllers/research'
import checkAuth from '../../middleware/checkAuth'

const router = new Router()

router.use('/:rid/clinics', clinics.routes())

router
  .get('/', checkAuth('read:researches'), controller.getResearches)
  .post('/', checkAuth('create:researches'), controller.postResearch)
  .get('/:rid', checkAuth('read:researches'), controller.getResearch)
  .delete('/:rid', checkAuth('delete:researches'), controller.deleteResearch)

export default router
