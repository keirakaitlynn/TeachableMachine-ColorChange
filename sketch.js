// Classifier Variable
let classifier;
// Hand Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/mjRI7NlQJ/';
// Emotions Model URL

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";


// ----------------------------------
let pX, pY;
let mX = 1;
let mY = 1;
// ----------------------------------

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the video
  video = createCapture(VIDEO);
  video.size(windowHeight, windowHeight);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();


  
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
  
  // --------------------------
  if (mX < -36 && mY < -36) {
    mX += 8;
    mY += 8;
  }
  if (label === 'right') {
    mX += 8;
    mY += 8;
  }
  else if (label === 'left') {
    mX -= 8;
    mY -= 8;
  }
  
  // map the values from the sensors to match the sketch size
  let cX = map(mX, 0, windowWidth, 0, windowWidth);
  let cY = map(mY, 0, windowHeight, 0, windowHeight);
  console.log(mX)

  for(var i = 0; i <= windowWidth; i+=20){
    for(var j = 0; j <= windowHeight; j+=20){
      stroke(i, j, cX, cY);
      strokeWeight(5);
      line(i, j, cX, cY);
      
  
    }
  }
  // ---------------------------
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}