/**
 * Created by supervlad on 12/5/16.
 */

const port = process.env.PORT || 4000
const env = process.env.NODE_ENV || 'development'
const config = require('./config')
const src = env === 'production' ? config.BUILD_PATH : config.SRC_PATH

require('babel-polyfill')
if (env === 'development') {
  require('babel-register')
}

const app = require(src).default
app.listen(port)
