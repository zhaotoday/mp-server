const axios = require('axios')
const WXBizDataCrypt = require('./utils/WXBizDataCrypt')

module.exports = class Auth {
  constructor ({ appid, secret } = {}) {
    this.appid = appid
    this.secret = secret
  }

  async getWXACode ({ path, width } = {}) {
    const { data } = await axios.request({
      method: 'POST',
      url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${(await this.getAccessToken())['access_token']}`,
      params: { path, width }
    })

    return data
  }

  async getAccessToken () {
    const { data } = await axios.request({
      method: 'GET',
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      params: {
        appid: this.appid,
        secret: this.secret,
        grant_type: 'client_credential'
      }
    })

    return data
  }

  async codeToSession ({ code }) {
    const { data } = await axios.request({
      method: 'GET',
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      params: {
        appid: this.appid,
        secret: this.secret,
        js_code: code,
        grant_type: 'authorization_code'
      }
    })

    return data
  }

  decryptData ({ sessionKey, encryptedData, iv }) {
    return new WXBizDataCrypt(this.appid, sessionKey)
      .decryptData(encryptedData, iv)
  }
}
