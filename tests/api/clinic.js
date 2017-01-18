/**
 * Created by supervlad on 1/13/17.
 */

import { expect } from 'chai'
import { app } from '../../source/server'
import config from '../../config'
import request from 'supertest'

const port = config.test.PORT

let server = null

describe('clinic API', () => {

  const testResearch = { name: 'Test Research' }
  const testClinic = { name: 'Test Clinic' }
  const superuser = { phone: 1, password: '1' }

  let token = null
  let cid = null
  let rid = null

  before((done) => {
    server = app.listen(port, done)
  })

  describe('POST /clinics', function () {

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
        .send(testResearch)
        .expect(200)

      rid = research.body.payload._id
    })

    it('should create clinic', async () => {
      const res = await request(server)
        .post(`/api/v1/researches/${rid}/clinics`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(testClinic)
        .expect(200)

      cid = res.body.payload._id
      expect(cid).to.be.ok
      expect(res.body.payload.name).to.equal(testClinic.name)
      expect(res.body.payload.doctors).to.be.empty

    })

  })

  describe('GET /researches/:rid/clinics', function () {

    it('should return a list of clinics', async () => {
      const res = await request(server)
        .get(`/api/v1/researches/${rid}/clinics`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(res.body.payload[0].name).to.equal(testClinic.name)
    })

  })

  describe('DELETE researches/:rid/clinics/:cid', function () {

    it('should delete clinic', async () => {
      const res = await request(server)
        .delete(`/api/v1/researches/${rid}/clinics/${cid}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(res.body.payload).to.be.true
    })

    after(async () => {
      await request(server)
        .delete(`/api/v1/researches/${rid}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })

  })

  after(done => server.close(done))

})
