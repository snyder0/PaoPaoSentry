const path =  require('path')
const cv = require('opencv4nodejs')
const express = require('express')
const { drawRectAroundBlobs } = require('./utils');

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

    const frameHLS = frame.cvtColor(cv.COLOR_BGR2HLS);

    const brownUpper = new cv.Vec(10, 60, 165);
    const brownLower = new cv.Vec(5, 20, 100);
    const rangeMask = frameHLS.inRange(brownLower, brownUpper);

    const blurred = rangeMask.blur(new cv.Size(10, 10));
    const thresholded = blurred.threshold(100, 255, cv.THRESH_BINARY);

    const minPxSize = 400;
    const fixedRectWidth = 100;
    drawRectAroundBlobs(thresholded, frame, minPxSize, fixedRectWidth);

    const image = cv.imencode('.jpg', frame).toString('base64')
    io.emit('image', image)
}, 1000 / FPS)

console.log('running on ➡  http://localhost:5000/')
server.listen(5000)