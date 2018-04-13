var colors = [];
var max_val = 256;
var boxNum = 6;

class RGB{
  constructor(red, green, blue){
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
}

for(var i = 0; i < boxNum; ++i){
  var red = getRandomInt(max_val);
  var green = getRandomInt(max_val);
  var blue = getRandomInt(max_val);
  colors.push(new RGB(red, green, blue));
}

function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}
