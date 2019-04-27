module.exports = {
  Auth: require('./modules/auth'),
  Payment: require('./modules/payment'),
  corporation: {
    Auth: require('./modules/corporation/auth')
  }
}
