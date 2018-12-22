const express = require('express')()
const request = require('request')
const config = {
  port: 5000
}
express.all('*', (req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': res.get('access-control-request-headers') || 'Authorization'
  })
  if (req.method === 'OPTIONS') { // CORS Preflight
    return res.send()
  } else {
    let targetURL = req.url.slice(1)
    if (!targetURL) {
      return res.status(400).json({ 
        error: 'missing url' 
      })
    }
    request({ 
      url: targetURL, 
      method: req.method, 
      json: req.body, 
      headers: {
        'Authorization': req.get('authorization') || 'noauth'
      } 
    }, (err, response, body) => {}).pipe(res)
  }
})
express.listen(config.port, () => {
  console.log(`CORS Proxy listening on port ${config.port}`)
})
