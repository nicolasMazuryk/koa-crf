/**
 * Created by supervlad on 1/16/17.
 */

import { expect } from 'chai'
import { app } from '../../source/server'
import config from '../../config'
import request from 'supertest'

const port = config.test.PORT

let server = null

describe('patient API', () => {

  const testResearch = { name: 'Test Research' }
  const testClinic = { name: 'Test Clinic' }
  const testPatient = { name: 'Test Patient' }

  let cid = null
  let rid = null
  let pid = null

  before((done) => {
    server = app.listen(port, done)
  })

  describe('POST researches/:rid/clinics/:cid/patients', function () {

    before(async () => {
      const research = await request(server)
        .post('/api/v1/researches')
        .set('Content-Type', 'application/json')
        .send(testResearch)
        .expect(200)

      rid = research.body.payload._id

      const clinic = await request(server)
        .post(`/api/v1/researches/${rid}/clinics`)
        .set('Content-Type', 'application/json')
        .send(testClinic)
        .expect(200)

      cid = clinic.body.payload._id
    })

    it('should create patient', async () => {
      const res = await request(server)
        .post(`/api/v1/researches/${rid}/clinics/${cid}/patients`)
        .set('Content-Type', 'application/json')
        .send(testPatient)
        .expect(200)

      pid = res.body.payload._id
      expect(pid).to.be.ok
      expect(res.body.payload.name).to.equal(testPatient.name)

    })

  })

  describe('GET /researches/:rid/clinics/:cid/patients', function () {

    it('should return a list of patients', async () => {
      const res = await request(server)
        .get(`/api/v1/researches/${rid}/clinics/${cid}/patients`)
        .set('Content-Type', 'application/json')
        .expect(200)

      expect(res.body.payload[res.body.payload.length - 1].name).to.equal(testPatient.name)
    })

  })

  describe('DELETE researches/:rid/clinics/:cid/patients/:pid', function () {

    it('should delete clinic', async () => {
      const res = await request(server)
        .delete(`/api/v1/researches/${rid}/clinics/${cid}/patients/${pid}`)
        .set('Content-Type', 'application/json')
        .expect(200)

      expect(res.body.payload).to.be.true
    })

    after(async () => {
      await request(server)
        .delete(`/api/v1/researches/${rid}`)
        .set('Content-Type', 'application/json')
        .expect(200)
    })

  })

  after(done => server.close(done))

})
