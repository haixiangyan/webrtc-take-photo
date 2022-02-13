let width = 320;    // We will scale the photo width to this
let height = 0;     // This will be computed based on the input stream

let streaming = false;

let video = null;
let canvas = null;
let photo = null;
let startButton = null;

const clearPhoto = () => {
  const context = canvas.getContext('2d')
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

const takePhoto = () => {
  const context = canvas.getContext('2d')
  if (width && height) {
    canvas.width = width;
    canvas.height = height;

    context.drawImage(video, 0, 0, width, height);

    const data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  } else {
    clearPhoto()
  }
}

const startUp = async () => {
  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  photo = document.getElementById('photo');
  startButton = document.getElementById('startButton');

  try {
    video.srcObject = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
    video.play()
  } catch (e) {
    console.error(e)
  }

  video.addEventListener('canplay', (event) => {
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);

      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false)

  startButton.addEventListener('click', (event) => {
    takePhoto()
    event.preventDefault()
  }, false)

  clearPhoto();
}

startUp().then()
