const {
  cv,
  grabFrames,
  drawGreenRect
} = require('./utils');

exports.runVideoFaceDetection = (src, detectFaces, io, servoControl) => grabFrames(src, 1, (frame) => {
  //console.time('detection time');
  const frameResized = frame.resizeToMax(1500)

  let height = frameResized.sizes[0]
  let width = frameResized.sizes[1]

  const faceRects = detectFaces(frameResized);

  let degree = faceRects[0] ? ((faceRects[0].x / width) * 180) : ''
  // console.log(Math.round(degree) + " degrees")

  servoControl(Math.round(degree))

  if (faceRects.length) {

    faceRects.forEach(faceRect => drawGreenRect(frameResized, faceRect));
  }

  const image = cv.imencode('.jpg', frameResized).toString('base64')
  io.emit('image', image)

  //cv.imshow('face detection', frameResized);
  //console.timeEnd('detection time');
});