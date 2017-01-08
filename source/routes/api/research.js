/**
 * Created by supervlad on 12/11/16.
 */

import Router from 'koa-router'
import * as controller from '../../controllers/research'

const router = new Router()

router
  .get('/', controller.getResearches)
  .post('/', controller.postResearch)
  .get('/:rid', controller.getResearch)
  .delete('/:rid', controller.deleteResearch)

export default router
