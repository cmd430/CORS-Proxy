const express = require('express')
const cors = require('cors')
const request = require('request')
const app = express()

const config = {
  app: {
    port: 80,
    restricted: false,
    whitelist: [
      // if restricted is enabled will only
      // allow any request with a whitelisted
      // origin to use the CORS proxy.
      //
      // example: https://example.com
    ]
  },
  cors: {
    origin: '*',
    methods: [
      'GET'
    ]
  }
}

app.route('*')
.options(cors(config.cors))
.all(cors(config.cors), (req, res, next) => {
  if (config.app.restricted && !config.app.whitelist.includes(req.headers['origin'])) {
    return res.status(401).json({ error: 'unauthorized' })
  }
  let targetURL = req.url.slice(1)
  if (!targetURL || !targetURL.startsWith('http')) {
    return res.status(400).json({ error: 'missing valid url' })
  }
  request({
    url: targetURL,
    method: req.method,
    headers: {
      'Authorization': req.headers['authorization'] || 'noauth'
    }
  })
  .pipe(res)
})

app.listen(config.app.port, () => {
  console.log('CORS proxy started')
})