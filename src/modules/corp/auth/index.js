const axios = require('axios')
const WXBizDataCrypt = require('../../auth/utils/WXBizDataCrypt')

module.exports = class Auth {
  constructor ({ corpid, corpsecret, appid } = {}) {
    this.corpid = corpid
    this.corpsecret = corpsecret
    this.appid = appid
  }

  async getAccessToken () {
    const { data } = await axios.request({
      method: 'GET',
      url: 'https://qyapi.weixin.qq.com/cgi-bin/gettoken',
      params: {
        corpid: this.corpid,
        corpsecret: this.corpsecret
      }
    })

    return data
  }

  async codeToSession ({ code }) {
    const { access_token } = await this.getAccessToken()

    const { data } = await axios.request({
      method: 'GET',
      url: 'https://qyapi.weixin.qq.com/cgi-bin/miniprogram/jscode2session',
      params: {
        access_token,
        js_code: code,
        grant_type: 'authorization_code'
      }
    })

    return data
  }

  getDecryptedData ({ sessionKey, encryptedData, iv }) {
    return new WXBizDataCrypt(this.appid, sessionKey)
      .decryptData(encryptedData, iv)
  }
}
