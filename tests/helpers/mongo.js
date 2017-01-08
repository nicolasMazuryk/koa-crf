/**
 * Created by supervlad on 12/11/16.
 */

import mongoose from 'mongoose'
import config from '../../config'

mongoose.Promise = global.Promise

const url = config.development.DB_URL

mongoose.connect(url)

const conn = mongoose.connection

export default {
  before: (done) => conn.on('open', () => conn.db.dropDatabase(done)),
  after: (done) => conn.close(done),
  drop: (done) => conn.db.dropDatabase(done)
}
