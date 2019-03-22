const axios = require('axios')
const helpers = require('./utils/helpers')

module.exports = class Pay {
  constructor ({ appid, secret, mch_id } = {}) {
    this.appid = appid
    this.mch_id = mch_id
  }

  async createUnifiedOrder (options = {}) {
    const { appid, mch_id } = this
    const nonce_str = helpers.getNonceString(32)
    const trade_type = 'JSAPI'
    const postData = { appid, mch_id, nonce_str, trade_type, ...options }
    const sign = helpers.sign(postData)

    const { data } = await axios.request({
      method: 'POST',
      url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
      data: helpers.buildXML({ sign, ...postData })
    })

    return helpers.parseXML(data)
  }
}
