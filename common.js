const {
    cv,
    grabFrames,
    drawGreenRect
  } = require('./utils');
  
  exports.runVideoFaceDetection = (src, detectFaces, io) => grabFrames(src, 1, (frame) => {
    console.time('detection time');
    const frameResized = frame.resizeToMax(1500)
  
    const faceRects = detectFaces(frameResized);
    if (faceRects.length) {
      
      faceRects.forEach(faceRect => drawGreenRect(frameResized, faceRect));
    }

    const image = cv.imencode('.jpg', frameResized).toString('base64')
    io.emit('image', image)
  
    //cv.imshow('face detection', frameResized);
    console.timeEnd('detection time');
  });