
// Grab elements, create settings, etc.
var constraints = {
  video: {
    width: 1000,
    height: 1000,
    facingMode: { ideal: 'environment' }
  } 
}
// var xhr = new XMLHttpRequest()
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var video = document.getElementById('video')
var nineData = []
var freezeFrame = false
// const serverURL = 'https://anna.local'

// camera access
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  video.srcObject = stream;
  video.play()
})
.catch(function(err) {
  console.log(err)
})

function toggleFreeze() {
  if (freezeFrame === true) {
    freezeFrame = false
    video.play()
  } else {
    freezeFrame = true
    video.pause()
  }
}

function getColors () {
  // loop canvas, and get rgb values for each pixel
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      var pixelData = context.getImageData(x, y, 1, 1).data
      pixelData = {
        r: pixelData[0],
        g: pixelData[1],
        b: pixelData[2]
      }
      // set background color of corresponding grid element
      nineData.push(pixelData)
      document.getElementById(x.toString() + y.toString()).style.backgroundColor = `rgb(${pixelData.r}, ${pixelData.g}, ${pixelData.b})`
    }
  }
}

function takePhoto() {
  // draw current frame from video feed to canvas, in 3x3 resolution
  context.drawImage(video, 0, 0, 3, 3)
  nineData = []
}

function update() {
  if (freezeFrame === false) {
    takePhoto()
    getColors()
  }
}

setInterval(update, 100)
