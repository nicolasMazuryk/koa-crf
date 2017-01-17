/**
 * Created by supervlad on 1/16/17.
 */

const roles = {
  admin: {
    can: ['create', 'read', 'update', 'delete']
  },
  monitor: {
    can: ['read']
  },
  doctor: {
    can: ['create', 'read', 'update']
  }
}

// Role Based Access Control
export default (roles = roles) => {
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
    if (perm.can[operation]) {
      const result = perm.can[operation]
      if (typeof result === 'function') {
        return result(params)
      }
      return result
    }
  }
}

