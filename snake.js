let speed = 7;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];  //snake head initially
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
            return true;
      }
}
      // bump into the walls
       if(snakeArr[0].x >= 21 || snakeArr[0].x <=0 || snakeArr[0].y >= 21 || snakeArr[0].y <=0){
            return true;
        }

        return false;
}

//updatine the snake array and food
function gameEngine() {
  if(isCollide(snakeArr)){
    alert(`Your score : ${score}`);
    score = 0;
      inputdir={x:0, y:0};
      snakeArr=[{x:13, y:15}];
      scoreBox.textContent = "Score: " + score;  
}

//checking for is snake eaten the food
if(snakeArr[0].y == food.y && snakeArr[0].x == food.x){
     eatingLogic();
}
    movingSnake();
    displaySnake()
    displayFood();
} 



// snake eaten the food, increment the snake and new postion for food
function eatingLogic(){
  score++;
  scoreBox.textContent = "Score: " + score;
  const highscore = JSON.parse(localStorage.getItem('hiscore'));
  if(score>highscore){
    highScoreDisplay(score);
}
  snakeArr.unshift({x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y});
  let a = 1;
  let b = 18;
  //generating new food grid
  food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
}


//moving the snake
function movingSnake(){
  for(let i = snakeArr.length-2; i>=0; i--){
    snakeArr[i+1] = {...snakeArr[i]};
   }
 
   //moving the snake head
   snakeArr[0].x += inputdir.x;
   snakeArr[0].y += inputdir.y;
}



//displaying snake
function displaySnake(){
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
}


//displaying food
function displayFood(){
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

highScoreDisplay();

function highScoreDisplay(highScore){
    if(highScore){
      localStorage.setItem("hiscore", JSON.stringify(highScore))
      hiscoreBox.textContent = "High Score: " + highScore;
    }else{
      const highScore = JSON.parse(localStorage.getItem('hiscore'));

      if(highScore){
        hiscoreBox.textContent = "High Score: " + highScore;
      }
    }
}

//main logic
//adding event listner for the window object to play on each keypress
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
  inputdir = { x: 0, y: -1 };

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

