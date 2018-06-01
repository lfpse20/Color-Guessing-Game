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
const MAX_VAL = 256;                                              // max value for random color
const DEFAULT_BACKGROUND_COLOR = "steelblue";
const DEFAULT_COLOR = "#232323";                                  // default color equal to background
const CLEAR_TEXT = "";
const DEFAULT_TEXT = "New Colors";
const EASY_MODE = 3;
const HARD_MODE = 6;

var isEasyMode = false;
var colors = [];                                                 // holds all randomly created color objects
var targetColor;                                                 // holds the color object that needs to be guessed
var h1Header = document.querySelector("#header");                // used to manipulate H1 header background color
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var squares = document.querySelectorAll(".square");              // gets all color squares objects
var messageDisplay = document.querySelector("#message");         // used for notification
var resetBtn = document.querySelector("#resetBtn");              // reset button
var targetColorDisplay = document.querySelector("#targetColor"); // used to display what color needs to be guessed

setStartingState(HARD_MODE);
initButtons();

/**********************/
/* * MAIN FUNCTIONS * */
/**********************/

// readys all elements for a new game
function setStartingState(SquareNum){
  fillColorArray(SquareNum);
  setTargetColor();
  setTargetColorTextView();
  initSquares();
}

// fill array with random RGB colors Objects
function fillColorArray(squareNum){
  for(var i = 0; i < squareNum; ++i){
    var newColor;
    // check color has already been generated
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

// updates target color text for user to know what they need to guess
function setTargetColorTextView(){
  targetColorDisplay.textContent = targetColor.toString();
}

// initializes squares by giving them a color from color array and adds a click listener
function initSquares(){
  colors.forEach(function(color, i){
    var square = getSquareAt(i);
    setSquareColor(square, color);
    addEventListenerTo(square);
  });
}

// initializes reset button with click listener
function initButtons(){
  resetBtn.addEventListener("click", resetGame);
  easyBtn.addEventListener("click", easyMode);
  hardBtn.addEventListener("click", hardMode);
}

/**********************/
/* * EVENT HANDLING * */
/**********************/

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
    setSquareColor(currentSquare, DEFAULT_COLOR);
  }
}

//sets game to starting state
function resetGame(){
  resetColorsArray();
  setMessageDisplay(CLEAR_TEXT);
  setHeaderBackgroundColor(DEFAULT_BACKGROUND_COLOR);
  setResetButtonText(DEFAULT_TEXT);

  if(isEasyMode){
    setStartingState(EASY_MODE);
  }else{
    setStartingState(HARD_MODE);
  }
}

function easyMode(){
  isEasyMode = true;
  hightlightEasy();
  resetGame();
  hideBottomSquares();
}

function hardMode(){
  isEasyMode = false;
  highlightHard();
  resetGame();
  showBottomSquares();
}

function hightlightEasy(){
  easyBtn.classList.add("selected")
  hardBtn.classList.remove("selected");
}

function highlightHard(){
  hardBtn.classList.add("selected");
  easyBtn.classList.remove("selected");
}

/************************/
/* * HELPER FUNCTIONS * */
/************************/

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
  var r = getRandomInt(MAX_VAL);
  var g = getRandomInt(MAX_VAL);
  var b = getRandomInt(MAX_VAL);
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
  return colors[getRandomInt(colors.length)];
}

// sets the color of a square with the passed color argument
function setSquareColor(square, color){
  square.style.backgroundColor = color;
}

//returns the color stored at index "i" from colors array
function getColorAt(i){
  return colors[i].toRGB();
}

function getSquareAt(i){
  return squares[i];
}

function addEventListenerTo(square){
  square.addEventListener("click", function(){
    var colorClicked = this.style.backgroundColor;
    checkChoice(colorClicked, this);
  });
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
  resetBtn.textContent = text;
}

function hideBottomSquares(){
  for(var i = 3; i < squares.length; ++i){
    squares[i].style.display = "none";
  }
}

function showBottomSquares(){
  for(var i = 3; i < squares.length; ++i){
    squares[i].style.display = "block";
  }
}
