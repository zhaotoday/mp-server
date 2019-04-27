module.exports = {
  Auth: require('./modules/auth'),
  Payment: require('./modules/payment'),
  corp: {
    Auth: require('./modules/corp/auth')
  }
}
