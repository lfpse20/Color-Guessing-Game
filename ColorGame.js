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
const clearText = "";
const defaultText = "New Colors";

var colors = [];                                                 // holds all randomly created color objects
var targetColor;                                                 // holds the color object that needs to be guessed
var h1Header = document.querySelector("#header");                // used to manipulate H1 header background color
var squares = document.querySelectorAll(".square");              // gets all color squares objects
var messageDisplay = document.querySelector("#message");         // used for notification
var resetButton = document.querySelector("#resetButton");        // reset button
var targetColorDisplay = document.querySelector("#targetColor"); // used to display what color needs to be guessed

setStartingState();
initResetButton();

/* * MAIN FUNCTIONS * */
// readys all elements for a new game
function setStartingState(){
  fillColorArray();
  setTargetColor();
  setTargetColorTextView();
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
function setTargetColor(){
  targetColor = getRandomColor();
}

// updates target color for user to know what they need to guess
function setTargetColorTextView(){
  targetColorDisplay.textContent = targetColor.toString();
}

// initializes squares by giving them a color from color array and adds a click listener
function initSquares(){
  squares.forEach(function(square, i){
    setSquareColor(square, getColorAt(i));

    // add click listeners to squares
    square.addEventListener("click", function(){
      var colorClicked = this.style.backgroundColor;
      checkChoice(colorClicked, this);
    });
  });
}

// initializes reset button with click listener
function initResetButton(){
  resetButton.addEventListener("click", resetGame);
}


/* * EVENT HANDLING * */
// called when a square is clicked
function checkChoice(colorClicked, currentSquare){
  if(isCorrect(colorClicked)){
    setMessageDisplay("Correct!");
    setResetButtonText("Play Again?");
    setAllSquaresColor(targetColor.toRGB());
    setHeaderBackgroundColor(targetColor.toRGB());
  }
  else{
    setMessageDisplay("Try Again");
    setSquareColor(currentSquare, defaultColor);
  }
}

//sets game to starting state
function resetGame(){
  resetColorsArray();
  setMessageDisplay(clearText);
  setHeaderBackgroundColor(defaultColor);
  setResetButtonText(defaultText);
  setStartingState();
}


/* * HELPER FUNCTIONS * */
// updates all color squares with passed color argument
function setAllSquaresColor(color){
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

// sets the color of a square with the passed color argument
function setSquareColor(square, color){
  square.style.backgroundColor = color;
}

//returns the color stored at index "i" from colors array
function getColorAt(i){
  return colors[i].toRGB();
}

//returns true if the colorClicked is equal to the target color
function isCorrect(colorClicked){
  return targetColor.equals(colorClicked);
}

//sets the text of message element to the passed message argument
function setMessageDisplay(message){
  messageDisplay.textContent = message;
}

//sets the color of H1 header element to the passed color argument
function setHeaderBackgroundColor(color){
  h1Header.style.backgroundColor = color;
}

//sets the text of the reset button to the passed text argument
function setResetButtonText(text){
  resetButton.textContent = text;
}
