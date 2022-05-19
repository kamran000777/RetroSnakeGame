const direction = { x: 0, y: 0 };
const foodSound = new Audio("food.mp3");
const moveSound = new Audio("move.mp3");
const gameOver = new Audio("gameover.wav");
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let inputdir = {x: 0, y: 0}; 
let score = 0;
let food = { x: 6, y: 7 };


//Game function
function main(currenttime) {
  window.requestAnimationFrame(main);
  if ((currenttime - lastPaintTime) / 1000 < 1 / speed) return;

  lastPaintTime = currenttime;
  gameEngine();
}

//collideing senarioes
function isCollide(snakeArr){
for(let i=1; i<snakeArr.length; i++){
      if(snakeArr[i].x == snakeArr[0].x && snakeArr[i].y == snakeArr[0].y){   // bump into its self
        score = 0;
            return true;
      }
}
      // bump into the walls
       if(snakeArr[0].x >= 21 || snakeArr[0].x <=0 || snakeArr[0].y >= 21 || snakeArr[0].y <=0){
        score = 0;
            return true;
        }

        return false;
}

function gameEngine() {
  //updatine the snake array and food
  if(isCollide(snakeArr)){
    gameOver.play();
      inputdir={x:0, y:0};
      snakeArr=[{x:13, y:15}];
      scoreBox.innerHTML = "Score: " + score;
}
// snake eaten the food, increment the snake and puttin food to another postion
if(snakeArr[0].y == food.y && snakeArr[0].x == food.x){
      foodSound.play();
      score++;
      if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML = "High Score: " + hiscoreval;
    }
      scoreBox.innerHTML = "Score: " + score;
      snakeArr.unshift({x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y});
      let a = 1;
      let b = 18;
      food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
}


//moving the snake
for(let i = snakeArr.length-2; i>=0; i--){
   snakeArr[i+1] = {...snakeArr[i]};
  }

  snakeArr[0].x += inputdir.x;
  snakeArr[0].y += inputdir.y;

  //display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
//main logic
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}

//adding event listner for the window object to play on each keypress
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
  inputdir = { x: 0, y: 1 };
  moveSound.play();

  switch (e.key) {
    case "ArrowUp":
      inputdir.x= 0;
      inputdir.y= -1 ;
      break;

    case "ArrowDown":
      inputdir.x= 0;
      inputdir.y= 1;
      break;

    case "ArrowLeft":
      inputdir.x= -1;
      inputdir.y= 0;
      break;

      case "ArrowRight":
      inputdir.x= 1;
      inputdir.y= 0;
      break;

      default:
      break;
  }

});
