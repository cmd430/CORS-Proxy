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
      // example: 'https://example.com'
    ],
    passthrough: [
      // Any headers you want to allow
      // too be passed through to the
      // proxied request
      //
      // example: 'Authorization'
    ]
  },
  cors: {
    // Any property/value accepted by
    // https://www.npmjs.com/package/cors
    origin: '*',
    methods: [
      'GET'
    ]
  }
}

function passthrough (headers) {
  let result = {}
  config.app.passthrough.forEach(passthrough => {
    let header = headers[passthrough.toLowerCase()]
    if (header) {
      result[passthrough] = header
    }
  })
  return result
}

app.route('*')
.options(cors(config.cors))
.all(cors(config.cors), (req, res, next) => {
  let targetURL = req.url.slice(1)
  if (config.app.restricted && !config.app.whitelist.includes(req.headers['origin'])) {
    return res.status(401).json({ error: 'unauthorized' })
  } else if (!config.cors.methods.includes(req.method)) {
    return res.status(400).json({ error: 'invalid request type' })
  } else if (!targetURL || !targetURL.startsWith('http')) {
    return res.status(400).json({ error: 'missing valid url' })
  }
  return request({
    url: targetURL,
    method: req.method,
    headers: passthrough(req.headers)
  })
  .pipe(res)
})

app.listen(config.app.port, () => {
  console.log('CORS proxy started')
})