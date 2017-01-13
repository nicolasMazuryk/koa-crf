/**
 * Created by supervlad on 12/18/16.
 */

const handleError = (err) => {
  switch (err.name) {
    case 'ValidationError':
    case 'CastError':
      return new BadRequest(`${err.message}.`)
    case 'TokenExpiredError':
      return new Unauthorized(`${err.message}. Expired at ${err.expiredAt}`)
    default:
      return err
  }
}

function NotFound (message) {
  this.name = 'Not Found'
  this.status = 404
  this.message = message
  Error.call(this, message)
  Error.captureStackTrace(this, NotFound)
}

NotFound.prototype = Object.create(Error.prototype)

function BadRequest (message) {
  this.name = 'Bad Request'
  this.status = 400
  this.message = message
  Error.call(this, message)
  Error.captureStackTrace(this, BadRequest)
}

BadRequest.prototype = Object.create(Error.prototype)

function Unauthorized (message) {
  this.name = 'Unauthorized'
  this.status = 401
  this.message = message
  Error.call(this, message)
  Error.captureStackTrace(this, Unauthorized)
}

Unauthorized.prototype = Object.create(Error.prototype)

function Forbidden (message) {
  this.name = 'Forbidden'
  this.status = 403
  this.message = message
  Error.call(this, message)
  Error.captureStackTrace(this, Unauthorized)
}

Forbidden.prototype = Object.create(Error.prototype)

export default { Unauthorized, NotFound, BadRequest, Forbidden, handleError }
