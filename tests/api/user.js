/**
 * Created by supervlad on 1/12/17.
 */

import { expect } from 'chai'
import { app } from '../../source/server'
import config from '../../config'
import request from 'supertest'

const port = config.test.PORT

let server = null

describe('user API', () => {

  const testUser = {
    name: 'TestUserName',
    role: 'admin',
    password: 'test',
    phone: 123456789
  }

  let id = null

  before((done) => {
    server = app.listen(port, done)
  })

  describe('POST /users', function () {

    it('should create user', async () => {
      const res = await request(server)
        .post('/api/v1/users')
        .set('Content-Type', 'application/json')
        .send(testUser)
        .expect(200)

      id = res.body.payload._id
      expect(id).to.be.ok
      expect(res.body.payload.name).to.equal(testUser.name)
      expect(res.body.payload.password).not.to.equal(testUser.password)

    })

  })

  describe('GET /users', function () {

    it('should return a list of users', async () => {
      const res = await request(server)
        .get('/api/v1/users')
        .set('Content-Type', 'application/json')
        .expect(200)

      expect(res.body.payload[0].name).to.equal(testUser.name)
    })

  })

  describe('DELETE /users', function () {

    it('should delete user', async () => {
      const res = await request(server)
        .delete(`/api/v1/users?id=${id}`)
        .set('Content-Type', 'application/json')
        .expect(200)

      expect(res.body.payload).to.be.true
    })

  })

  after(done => server.close(done))

})
