const express = require('express')
const http = require('http')
const path = require('path')
const compression = require('compression')

const app = express()

app.use(compression({ filter: shouldCompress }))

app.use(express.static(path.join(__dirname, 'build')))

const reqOptions ={
    hostname: 'blinkt.kube-system.svc.cluster.local',
    port: '80',
    method: 'GET',
    path: '/',
}

app.get('*', (req, res) => {
    const blinktReq = http.request(reqOptions, res => {
        console.log(`respose code from blinkt: ${res.statusCode}`)
    })
    blinktReq.end()

    res.sendFile(path.join(__dirname + '/build/index.html'))
})

const port = process.env.PORT || 8081
app.listen(port)

console.log('Application is listening on port ' + port)

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        return false
    }

    return compression.filter(req, res)
}