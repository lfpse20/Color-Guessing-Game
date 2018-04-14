class RGB{
  constructor(red, green, blue){
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  // returns true if equal
  equals(color){
    var stringColor = this.getRGB();
    return stringColor === color;
  }

  //return rgb function of colors
  getRGB(){
    return "rgb(" + this.red +", " + this.green + ", " + this.blue + ")";
  }

  toString(){
    return "RGB(" + this.red +", " + this.green + ", " + this.blue + ")";
  }
}

// main logic
const max_val = 256;                                             // max value for random color

var colors = [];                                                 // holds all randomly created color objects
var h1Header = document.querySelector("#header");                // used to manipulate H1 header background color
var squares = document.querySelectorAll(".square");              // gets all color squares objects
var messageDisplay = document.querySelector("#message");         // used for notification
var targetColorDisplay = document.querySelector("#targetColor"); // used to display what color needs to be guessed

fillColorArray();
var targetColor = getRandomColor();  // gets color that needs to be guessed from created colors

updateTargetColorText()
initSquares();

/* * FUNCTIONS * */

// fill array with random RGB colors Objects
function fillColorArray(){
  for(var i = 0; i < squares.length; ++i){
    var red = getRandomInt(max_val);
    var green = getRandomInt(max_val);
    var blue = getRandomInt(max_val);
    colors.push(new RGB(red, green, blue));
  }
}

// custom function to get range of random numbers [0, max)
function getRandomInt(max){
  return Math.floor(Math.random() * max);
}

// returns random color from colors array
function getRandomColor(){
  return colors[getRandomInt(squares.length)];
}

// updates target color for user to know what they need to guess
function updateTargetColorText(){
  targetColorDisplay.textContent = targetColor.toString();
}

// initializes squares by giving them a color from color array and adding a click listener
function initSquares(){
  squares.forEach(function(box, i){
    // add color to squares
    box.style.backgroundColor = colors[i].getRGB();

    // add click listeners to squares
    box.addEventListener("click", function(){
      checkChoice(this.style.backgroundColor, this);
    });
  });
}

/* * Event Handling * */

// called when a square is clicked
function checkChoice(colorPicked, currentSquare){
  var correctChoice = targetColor.equals(colorPicked);
  if(correctChoice){
    messageDisplay.textContent = "Correct!";
    updateAllColors(targetColor.getRGB());
    h1Header.style.backgroundColor = targetColor.getRGB();
  }
  else{
    messageDisplay.textContent = "Try Again";
    currentSquare.style.backgroundColor = "#232323";
  }
}

// updates all color squares with passed color argument
function updateAllColors(color){
  squares.forEach(function(square){
    square.style.backgroundColor = color;
  });
}
