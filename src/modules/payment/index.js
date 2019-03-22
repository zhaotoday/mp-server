const md5 = require('MD5')
const axios = require('axios')
const helpers = require('./utils/helpers')

module.exports = class Pay {
  constructor ({ appid, mch_id, key } = {}) {
    this.appid = appid
    this.mch_id = mch_id
    this.key = key
  }

  sign (params) {
    const querystring = Object.keys(params)
      .filter(key => !!params[key] && key !== 'key')
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&') + '&key=' + params.key
    return md5(querystring).toUpperCase()
  }

  async requestPayment (options = {}) {
    const { appid, mch_id, key } = this
    const nonce_str = helpers.getNonceString(32)
    const trade_type = 'JSAPI'
    const sign_type = 'MD5'
    const postData = { appid, mch_id, nonce_str, trade_type, sign_type, ...options }
    const sign = this.sign({ key, ...postData })
    const { data } = await axios.request({
      method: 'POST',
      url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
      data: helpers.buildXML({ sign, ...postData })
    })
    const unifiedOrder = await helpers.parseXML(data)
    const paymentParams = {
      timeStamp: helpers.getTimeStamp(),
      nonceStr: nonce_str,
      package: `prepay_id=${unifiedOrder.prepay_id}`,
      signType: 'MD5'
    }

    return {
      paySign: this.sign({ key, appId: this.appid, ...paymentParams }),
      ...paymentParams,
      unifiedOrder
    }
  }
}
