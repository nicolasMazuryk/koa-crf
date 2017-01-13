/**
 * Created by supervlad on 12/5/16.
 */

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from './middleware/logger'
import error from './middleware/error'
import session from './middleware/session'
import router from './routes'
import config from '../config'
import mongoose from 'mongoose'

const app = new Koa()
const env = process.env.NODE_ENV
const isDev = env === 'development'

isDev && app.use(logger())
app.use(session())
app.use(error())
app.use(bodyParser())

// app use main router
router(app)

const run = () => {
  const dbUrl = config[env].DB_URL
  const port = config[env].PORT
  console.log(`> run at NODE_ENV=${env}`)
  mongoose.Promise = global.Promise
  mongoose.connect(dbUrl, (err) => {
    console.log(err || `> connected to ${dbUrl}`)
    app.listen(port, (err) => console.log(err || `> listening at ${port} port`))
  })
  return app
}

export { app, run }

