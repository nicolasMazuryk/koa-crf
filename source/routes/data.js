/**
 * Created by supervlad on 1/18/17.
 */

import Router from 'koa-router'
import { getSuperUser } from '../controllers/user'

const router = new Router()

router.get('/superuser', getSuperUser)

export default router
