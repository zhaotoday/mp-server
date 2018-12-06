## 使用

安装

```bash
$ npm install --save mp-server
```

初始化

```js
const mp = require('mp-server')
const auth = new mp.Auth({ appid, secret })
```

## 模块

Auth

```js
const codeToSessionRes = await auth.codeToSession({ code })
const decryptData = auth.decryptData({
  sessionKey,
  encryptedData,
  iv
})
```
