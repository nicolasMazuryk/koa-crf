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

  const invalidUser = { phone: 123456, password: 'invalid' }
  const superuser = { phone: 1, password: '1' }

  let token = null

  before((done) => {
    server = app.listen(port, done)
  })

  describe('POST /login', function () {

    before(async () => {
      await request(server)
        .get('/api/v1/gen/superuser')
        .expect(200)
    })

    it('should return 200 status with valid user', async () => {
      const res = await request(server)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(superuser)
        .expect(200)

      token = res.body.payload.token
      expect(token).to.be.ok
    })

    it('should return 400 status with invalid user', async () => {
      await request(server)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(invalidUser)
        .expect(400)
    })

    it('should logout user with valid token', async () => {
      await request(server)
        .get('/logout')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })

  })

  after(done => server.close(done))

})
