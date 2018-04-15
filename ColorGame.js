class RGB{
  constructor(red, green, blue){
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  // returns true if equal
  equals(color){
    var stringColor = this.toRGB();
    return stringColor === color;
  }

  //return rgb function of colors
  toRGB(){
    return "rgb(" + this.red +", " + this.green + ", " + this.blue + ")";
  }

  toString(){
    return "RGB(" + this.red +", " + this.green + ", " + this.blue + ")";
  }
}

// main logic
const max_val = 256;                                             // max value for random color
const defaultColor = "#232323";                                  // default color equal to background
var colors = [];                                                 // holds all randomly created color objects
var targetColor;                                                 // holds the color object that needs to be guessed
var h1Header = document.querySelector("#header");                // used to manipulate H1 header background color
var squares = document.querySelectorAll(".square");              // gets all color squares objects
var messageDisplay = document.querySelector("#message");         // used for notification
var resetButton = document.querySelector("#resetButton");        // reset button
var targetColorDisplay = document.querySelector("#targetColor"); // used to display what color needs to be guessed

setStartingState();
initResetButton();

/* * FUNCTIONS * */

function setStartingState(){
  fillColorArray();
  updateTargetColor();
  updateTargetColorTextView();
  initSquares();
}

// fill array with random RGB colors Objects
function fillColorArray(){
  for(var i = 0; i < squares.length; ++i){
    var newColor;

    do{
      newColor = generateRandomColor();
    }while(colorExist(newColor));

    colors.push(newColor);
  }
}

// updates targetColor object so it can be used for comparison
function updateTargetColor(){
  targetColor = getRandomColor();
}

// updates target color for user to know what they need to guess
function updateTargetColorTextView(){
  targetColorDisplay.textContent = targetColor.toString();
}

// initializes squares by giving them a color from color array and adds a click listener
function initSquares(){
  squares.forEach(function(square, i){
    // add color to squares
    square.style.backgroundColor = colors[i].toRGB();

    // add click listeners to squares
    square.addEventListener("click", function(){
      checkChoice(this.style.backgroundColor, this);
    });
  });
}

// initializes reset button with click listener
function initResetButton(){
  resetButton.addEventListener("click", resetGame);
}

/* * EVENT HANDLING * */

// called when a square is clicked
function checkChoice(colorPicked, currentSquare){
  var correctChoice = targetColor.equals(colorPicked);
  if(correctChoice){
    messageDisplay.textContent = "Correct!";
    updateAllColors(targetColor.toRGB());
    h1Header.style.backgroundColor = targetColor.toRGB();
  }
  else{
    messageDisplay.textContent = "Try Again";
    currentSquare.style.backgroundColor = defaultColor;
  }
}

//sets game to starting state
function resetGame(){
  resetColorsArray();
  resetMessageDisplay();
  resetH1Header();
  setStartingState();
}

/* * HELPER FUNCTIONS * */

// updates all color squares with passed color argument
function updateAllColors(color){
  squares.forEach(function(square){
    square.style.backgroundColor = color;
  });
}

// clears the colors array from any previous colors stored
function resetColorsArray(){
  colors.length = 0;
}

// returns a random color decided with random R,G and B values
function generateRandomColor(){
  var r = getRandomInt(max_val);
  var g = getRandomInt(max_val);
  var b = getRandomInt(max_val);
  return new RGB(r, g, b);
}

// iterates through current colors and checks if it's already stored
function colorExist(newColor){
  for(var i = 0; i < colors.length; ++i){
    if(colors[i].equals(newColor.toRGB()))
      return true;
  }
  return false;
}

// custom function to get range of random numbers [0, max)
function getRandomInt(max){
  return Math.floor(Math.random() * max);
}

// returns random color from colors array
function getRandomColor(){
  return colors[getRandomInt(squares.length)];
}

function resetMessageDisplay(){
  messageDisplay.textContent = "";
}

function resetH1Header(){
  h1Header.style.backgroundColor = defaultColor;
}
