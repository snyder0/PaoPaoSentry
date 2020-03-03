const {
  cv,
  grabFrames,
  drawGreenRect
} = require('./utils');

exports.runVideoFaceDetection = (camSrc, detectFaces, setPanDegree, setTiltDegree, io) => {
  grabFrames(camSrc, 1, (frame) => {
    const frameResized = frame.resizeToMax(750)

    let height = frameResized.sizes[0]
    let width = frameResized.sizes[1]

    const faceRects = detectFaces(frameResized);

    let degreePan = faceRects[0] ? ((faceRects[0].x / width) * 180) : ''
    let degreeTilt = faceRects[0] ? ((faceRects[0].y / height) * 180) : ''

    // setPanDegree(Math.round(degreePan))
    // setTiltDegree(Math.round(degreeTilt))

    // if (faceRects.length) {

    //   faceRects.forEach(faceRect => drawGreenRect(frameResized, faceRect));
    // }

    const image = cv.imencode('.jpg', frameResized).toString('base64')
    io.emit('image', image)
  })
};