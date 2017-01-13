/**
 * Created by supervlad on 12/23/16.
 */

import { expect } from 'chai'
import { app } from '../../source/server'
import config from '../../config'
import request from 'supertest'

const port = config.test.PORT

let server = null

describe('Authorization', function () {

  const validUser = { phone: 1, password: 'test' }
  const invalidUser = { phone: 123456, password: 'invalid' }

  before((done) => {
    server = app.listen(port, done)
  })

  describe('POST /login', function () {

    xit('should return 200 status with valid user', async () => {
      await request(server)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(validUser)
        .expect(200)
    })

    xit('should return 400 status with invalid user', async () => {
      await request(server)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(invalidUser)
        .expect(400)
    })

  })

  after(done => server.close(done))

})
