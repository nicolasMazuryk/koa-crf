/**
 * Created by supervlad on 1/13/17.
 */

import { expect } from 'chai'
import { app } from '../../source/server'
import config from '../../config'
import request from 'supertest'

const port = config.test.PORT

let server = null

describe('research API', () => {

  const testResearch = { name: 'Test Research' }
  const superuser = { phone: 1, password: '1' }

  let id = null
  let token = null

  before((done) => {
    server = app.listen(port, done)
  })

  describe('POST /researches', function () {

    before(async () => {
      const login = await request(server)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(superuser)
        .expect(200)

      token = login.body.payload.token
    })

    it('should create research', async () => {
      const res = await request(server)
        .post('/api/v1/researches')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(testResearch)
        .expect(200)

      id = res.body.payload._id
      expect(id).to.be.ok
      expect(res.body.payload.name).to.equal(testResearch.name)
      expect(res.body.payload.clinics).to.be.empty

    })

  })

  describe('GET /researches', function () {

    it('should return a list of researches', async () => {
      const res = await request(server)
        .get('/api/v1/researches')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(res.body.payload[0].name).to.equal(testResearch.name)
    })

  })

  describe('DELETE /researches/:rid', function () {

    it('should delete research', async () => {
      const res = await request(server)
        .delete(`/api/v1/researches/${id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(res.body.payload).to.be.true
    })

  })

  after(done => server.close(done))

})
