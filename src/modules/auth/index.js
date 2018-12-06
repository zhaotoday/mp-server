const axios = require('axios')
const WXBizDataCrypt = require('./utils/WXBizDataCrypt')

module.exports = class Auth {
  constructor ({ appid, secret } = {}) {
    this.appid = appid
    this.secret = secret
  }

  async codeToSession ({ code }) {
    const requestRes = await axios.request({
      method: 'GET',
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      params: {
        appid: this.appid,
        secret: this.secret,
        js_code: code,
        grant_type: 'authorization_code'
      }
    })

    return requestRes.data
  }

  decryptData ({ sessionKey, encryptedData, iv }) {
    return new WXBizDataCrypt(this.appid, sessionKey)
      .decryptData(encryptedData, iv)
  }
}
