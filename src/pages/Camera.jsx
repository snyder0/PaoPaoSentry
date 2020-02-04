import React from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000/')

function Camera() {
  return (
    <div>
      <img id="image" alt=""></img>
    </div>
  );
}

socket.on('image', (image) => {
  const imageElm = document.getElementById('image')
  imageElm.src = `data:image/jpeg;base64,${image}`
})

export default Camera
