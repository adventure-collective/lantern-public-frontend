const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const bodyParser = require('body-parser')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

app.use(express.static('public'))

app.post('/', bodyParser.urlencoded({ extended: false }), (req, res) => {

  res.send('two hundred')

  const x = parseFloat(req.body.x)
  const y = parseFloat(req.body.y)
  const z = parseFloat(req.body.z)
  const c = String(req.body.c).slice(0, 20) // lightgoldenrodyellow

  const payload = JSON.stringify({x,y,z,c})

  // broadcast
  wss
    .clients
    .forEach(c => {
      if(c.readyState === WebSocket.OPEN) c.send(payload)
    })

})

server.listen(process.env.PORT || 5000, () =>
  console.log('Listening on %d', server.address().port)
)
