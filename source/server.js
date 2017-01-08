/**
 * Created by supervlad on 12/5/16.
 */

import Koa from 'koa'
import mongoose from 'mongoose'
import config from '../config'
import bodyParser from 'koa-bodyparser'
import logger from './middleware/logger'
import error from './middleware/error'
import router from './routes'

mongoose.Promise = global.Promise

const app = new Koa()
const isDev = process.env.NODE_ENV === 'development'

mongoose.connect(
  config.development.DB_URL,
  () => console.log('> connected to DB')
)

isDev && app.use(logger)
app.use(error)
app.use(bodyParser())

// app use main router
router(app)

export default app
