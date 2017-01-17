/**
 * Created by supervlad on 1/16/17.
 */

const defaultRoles = {
  admin: {
    can: [
      'create:researches', 'create:users', 'create:clinics', 'create:patients',
      'update:researches', 'update:users', 'update:clinics', 'update:patients',
      'read:researches', 'read:users', 'read:clinics', 'read:patients',
      'delete:researches', 'delete:users', 'delete:clinics', 'delete:patients'
    ]
  },
  monitor: {
    can: [
      'read:researches', 'read:users', 'read:clinics', 'read:patients'
    ]
  },
  doctor: {
    can: [
      {
        type: 'create:patients',
        when: ({ user, params, body }) => params.cid === user.clinicId
      },
      {
        type: 'update:patients',
        when: ({ user, params, body }) => body.doctorId === user.id
      },
      {
        type: 'read:researches',
        when: ({ user, params }) => params.rid === user.researchId
      },
      {
        type: 'read:patients',
        when: ({ user, params }) => params.cid === user.clinicId
      }
    ]
  }
}

// Role Based Access Control
export default (roles = defaultRoles) => {
  const map = {}

  Object.keys(roles).forEach(role => {
    map[role] = {
      can: {}
    }
    roles[role].can.forEach(operation => {
      if (typeof operation === 'string') {
        map[role].can[operation] = true
      }
      if (typeof operation.type === 'string' && typeof operation.when === 'function') {
        map[role].can[operation.type] = operation.when
      }
    })
  })

  return (role, operation, params) => {
    const perm = map[role]
    if (!perm) {
      return false
    }
    const result = perm.can[operation]
    if (result) {
      if (typeof result === 'function') {
        return result(params)
      }
      return result
    }
  }
}

