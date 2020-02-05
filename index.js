const path =  require('path')
const cv = require('opencv4nodejs')
const express = require('express')

console.log("starting server...")

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

console.log("acessing webcam ...")

const FPS = 20
const wCap = new cv.VideoCapture(0)
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300)
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300)


setInterval(() => {
    const frame = wCap.read()
    const image = cv.imencode('.jpg', frame).toString('base64')
    io.emit('image', image)
}, 1000 / FPS)

console.log('running on ➡  http://localhost:5000/')
server.listen(5000)