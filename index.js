/**
 * Created by supervlad on 12/5/16.
 */

const env = process.env.NODE_ENV || 'development'
const config = require('./config')
const src = env === 'production' ? config.BUILD_PATH : config.SRC_PATH

require('babel-polyfill')
if (env === 'development') {
  require('babel-register')
}

const run = require(src).run

run() // connect to database and start server
