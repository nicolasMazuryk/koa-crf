/**
 * Created by supervlad on 12/6/16.
 */

module.exports = {
  BUILD_PATH: './build/server',
  SRC_PATH: './source/server',
  production: {
    DB_URL: 'mongodb://localhost/crf',
    PORT: 4000
  },
  development: {
    DB_URL: 'mongodb://localhost/dev-crf',
    PORT: 4001
  },
  test: {
    DB_URL: 'mongodb://localhost/test-crf',
    PORT: 4002
  }
}