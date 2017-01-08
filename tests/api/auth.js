/**
 * Created by supervlad on 12/23/16.
 */

import mochaAsync from '../helpers/async'
import { expect } from 'chai'
import app from '../../source/server'
import config from '../../config'
import request from 'supertest'

const port = config.development.TEST_PORT

let server = null

describe('Authorization', () => {

  const validUser = { phone: 12345, password: 'test' }
  const invalidUser = { phone: 123456, password: 'invalid' }

  before((done) => {
    server = app.listen(port, done)
  })

  describe('POST /login', function () {

    it('should return 200 status with valid user', mochaAsync(async () => {
      const res = await request(server)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(validUser)
        .expect(200)
    }))

  })


  after(done => server.close(done))

})
