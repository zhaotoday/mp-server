const { promisify } = require('util')
const xml2js = require('xml2js')

exports.getNonceString = function (length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const maxPos = chars.length
  let noceStr = ''
  for (let i = 0; i < (length || 32); i++) {
    noceStr += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return noceStr
}

exports.buildXML = json => {
  const builder = new xml2js.Builder()
  return builder.buildObject(json)
}

exports.parseXML = async xml => {
  const parser = new xml2js.Parser({
    trim: true,
    explicitArray: false,
    explicitRoot: false
  })
  return promisify(parser.parseString)(xml)
}

exports.getTimeStamp = () => Math.floor(new Date().getTime() / 1000).toString()
