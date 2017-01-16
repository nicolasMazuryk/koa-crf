/**
 * Created by supervlad on 12/11/16.
 */

import User from '../../source/models/user'
import db from '../helpers/mongo'
import { expect } from 'chai'

describe('User model #save',function () {

  this.timeout(10000)

  const data = {
    phone: 12345678,
    password: 'test-pass',
    name: 'Test',
    role: 'admin'
  }

  before(done => {
    db.drop(done)
  })

  it('should save valid user', async () => {
    const user = new User(data)
    const newUser = await user.save()
    expect(newUser.phone).to.equal(data.phone)
    expect(newUser.name).to.equal(data.name)
    expect(newUser.role).to.equal(data.role)
  })

  it('should hash password', async () => {
    const user = new User(data)
    const newUser = await user.save()
    const passIsValid = await user.validatePassword(data.password)
    expect(newUser.password).to.not.equal(data.password)
    expect(passIsValid).to.be.true
  })

  it('should not save if role is invalid', () => {
    const user = new User({...data, role: 'invalid-role'})
    const error = user.validateSync('role')
    expect(error.errors['role'].path).to.equal('role')
  })

  after(done => {
    db.after(done)
  })

})