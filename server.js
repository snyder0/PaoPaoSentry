const path = require('path')
const cv = require('opencv4nodejs')
const express = require('express')

console.log("Starting Server...")

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const { setDegree, setSweep, setStop } = require("./servo")
const { runVideoFaceDetection } = require('./faceDetection');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

io.sockets.on('connection', (socket) => {
    console.log(`${socket.id} is connected`)

    socket.on('sweep', (sweep) => {
        setSweep(sweep)
    })

    socket.on('stop', (stop) => {
        setStop(stop)
    })
})


const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2)

function detectFaces(img) {
    
    const options = {
        minSize: new cv.Size(100, 100),
        scaleFactor: 1.2,
        minNeighbors: 10
    }

    return classifier.detectMultiScaleGpu(img.bgrToGray(), options).objects
}

//runVideoFaceDetection(0, detectFaces, io, servoControl)

console.log('Running on ➡  http://localhost:5000/')
server.listen(5000)