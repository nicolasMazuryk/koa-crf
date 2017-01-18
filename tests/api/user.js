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
    role: 'doctor',
    password: 'test',
    phone: 123456789
  }
  const superuser = { phone: 1, password: '1' }

  let id = null
  let rid = null
  let cid = null
  let token = null

  before((done) => {
    server = app.listen(port, done)
  })

  describe('POST /users', function () {

    before(async () => {
      const login = await request(server)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(superuser)
        .expect(200)

      token = login.body.payload.token

      const research = await request(server)
        .post('/api/v1/researches')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'user-research' })
        .expect(200)

      rid = research.body.payload._id

      const clinic = await request(server)
        .post(`/api/v1/researches/${rid}/clinics`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'user-clinic' })
        .expect(200)

      cid = clinic.body.payload._id
    })

    it('should create user', async () => {
      const res = await request(server)
        .post('/api/v1/users')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(Object.assign(testUser, { clinicId: cid }))
        .expect(200)

      id = res.body.payload._id
      expect(id).to.be.ok
      expect(res.body.payload.name).to.equal(testUser.name)
      expect(res.body.payload.password).not.to.equal(testUser.password)

    })
    it('should save doctor id to clinic', async () => {
      const res = await request(server)
        .get(`/api/v1/researches/${rid}/clinics/${cid}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .expect(200)

      expect(res.body.payload.doctors).to.include(id)
    })

  })

  describe('GET /users', function () {

    it('should return a list of users', async () => {
      const res = await request(server)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .expect(200)

      expect(res.body.payload[res.body.payload.length - 1].name).to.equal(testUser.name)
    })

  })

  describe('DELETE /users', function () {

    it('should delete user', async () => {
      const res = await request(server)
        .delete(`/api/v1/users/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .expect(200)

      expect(res.body.payload).to.be.true
    })

    after(async () => {
      await request(server)
        .delete(`/api/v1/researches/${rid}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .expect(200)
    })

  })

  after(done => server.close(done))

})
