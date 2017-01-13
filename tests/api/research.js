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

  const testResearch = {
    name: 'Test Research'
  }

  let id = null

  before((done) => {
    server = app.listen(port, done)
  })

  describe('POST /researches', function () {

    it('should create research', async () => {
      const res = await request(server)
        .post('/api/v1/researches')
        .set('Content-Type', 'application/json')
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
        .expect(200)

      expect(res.body.payload[0].name).to.equal(testResearch.name)
    })

  })

  describe('DELETE /researches/:rid', function () {

    it('should delete research', async () => {
      const res = await request(server)
        .delete(`/api/v1/researches/${id}`)
        .set('Content-Type', 'application/json')
        .expect(200)

      expect(res.body.payload).to.be.true
    })

  })

  after(done => server.close(done))

})
