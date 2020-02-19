const {
  cv,
  grabFrames,
  drawGreenRect
} = require('./utils');

exports.runVideoFaceDetection = (camSrc, detectFaces, setTiltDegree, io, setDegree) => {
  grabFrames(camSrc, 1, (frame) => {
    //console.time('detection time');
    const frameResized = frame.resizeToMax(1500)

    let height = frameResized.sizes[0]
    let width = frameResized.sizes[1]

    const faceRects = detectFaces(frameResized);

    let degreePan = faceRects[0] ? ((faceRects[0].x / width) * 180) : ''
    let degreeTilt = faceRects[0] ? ((faceRects[0].y / height) * 180) : ''

    setDegree(Math.round(degreePan))
    setTiltDegree(Math.round(degreeTilt))

    if (faceRects.length) {

      faceRects.forEach(faceRect => drawGreenRect(frameResized, faceRect));
    }

    const image = cv.imencode('.jpg', frameResized).toString('base64')
    io.emit('image', image)

    //cv.imshow('face detection', frameResized);
    //console.timeEnd('detection time');
  })
};