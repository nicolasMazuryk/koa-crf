/**
 * Created by supervlad on 1/17/17.
 */

import access from '../source/tools/access'
import { expect } from 'chai'

const rolesMock = {
  admin: {
    can: ['read', 'write']
  },
  guest: {
    can: [
      'read',
      {
        type: 'write',
        when: (params) => {
          return params.user.id === params.data.id
        }
      }
    ]
  }
}

const can = access(rolesMock)

describe('access #can', function () {

  it('should give access to read for admin', () => {
    const result = can('admin', 'read')
    expect(result).to.be.true
  })

  it('should not give access to delete for admin', () => {
    const result = can('admin', 'delete')
    expect(result).not.to.be.true
  })

  it('should give access to write for guest only when id\'s are matched', () => {
    const params = {
      user: { id: 1 },
      data: { id: 1 }
    }
    const result = can('guest', 'write', params)
    expect(result).to.be.true
  })

  it('should not give access to write for guest when id\'s are not matched', () => {
    const params = {
      user: { id: 0 },
      data: { id: false }
    }
    const result = can('guest', 'write', params)
    expect(result).not.to.be.true
  })

})