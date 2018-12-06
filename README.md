#### Auth
```js
const mp = require('mp-server')
const auth = new mp.Auth({ appid, secret })
const codeToSessionRes = await auth.codeToSession({ code })
const decryptData = auth.decryptData({
  sessionKey,
  encryptedData,
  iv
})
```
