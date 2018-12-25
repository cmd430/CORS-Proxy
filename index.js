const express = require('express')
const cors = require('cors')
const request = require('request')
const app = express()
const config = {
  app: {
    port: 80
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
  let targetURL = req.url.slice(1)
  if (!targetURL) {
    return res.status(400).json({ error: 'missing url' })
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
  console.log(`CORS proxy started`)
})