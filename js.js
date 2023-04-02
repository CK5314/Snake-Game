//game constants and variabke 
let inputDir = {x: 0 , y:0};
const foodSound = new Audio('/sound/eating.wav');
const gameover= new Audio('/sound/gameover.wav');
const moveSound = new Audio('/sound/start.wav');
const startSound =new Audio('/sound/3-egg-shaker-rolls-32718.mp3');
var musicSound = new Audio('/sound/bgmusic.mp3');

let speed=5;
let lastPaintTime=0;
let score=0;
let  snakeArr=[
    {x: 12 , y: 12}
];
let food = {x: 6,y: 7};
let highscoreval=0;
//front page function

function onupdatespeed()
{
    speed=document.getElementById("speed-bar").value;
}
function onupdatevolume()
{
    moveSound.volume=document.getElementById("move-volume").value;
    musicSound.volume=document.getElementById("bg-volume").value;
    startSound.volume=document.getElementById("bg-volume").value;
    foodSound.volume=document.getElementById("eat-volume").value;

}
//game functions

function main(ctime){
   musicSound.play;
    let highscore=localStorage.getItem("highscore");
    
    if(highscore===null)
    {
        highScore.innerHTML="";
        localStorage.setItem("highscore",JSON.stringify(highscoreval));
    }
    else {
        highscoreval=JSON.parse(highscore);
        highScore.innerHTML=`HighScore:${highscore}`;
    }
    window.requestAnimationFrame(main);
    if((ctime- lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake)
{
    //if you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
        {
            return true;
        }
}
function gameEngine()
{
    musicSound.play();
    // Part 1: Updating the Snake array & Food
    if(isCollide(snakeArr)){
        gameover.play();
        musicSound.pause();
        inputDir={x:0, y:0};
        alert('Press any key to play again');
        snakeArr = [{x:13,y:15}];
        musicSound.play();
        score=0;
    }
    // if you have eaten the food
    if(snakeArr[0].y === food.y && snakeArr[0].x===food.x)
    {
        if(score>highscoreval)
        {
            highscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            highScore.innerHTML="HighScore:"+highscoreval;
        }
        score+=1;
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food ={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //Moving the Snake
    for (let i =snakeArr.length -2; i >= 0 ; i--) {
        snakeArr[i+1]= {...snakeArr[i]};
        
    }
    // console.log(inputDir);
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // Part 2:Display the snake and food
    //display the snake
    // var board=document.getElementById("board");
    board.innerHTML="";
    snakeArr.forEach((e , index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart= e.x;
        if(index == 0)
        {
        snakeElement.classList.add('head');
        }
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);

    })
    //display the food
    
  
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart= food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);    
}
//logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
inputDir = {x:0,y:1} //Start the Game
foodSound.play();
switch(e.key){
    case "ArrowUp":
        // console.log ("ArrowUp")
        inputDir.x =0;
        inputDir.y= -1;
        break;
    case "ArrowDown":
        // console.log ("ArrowDown")
        inputDir.x =0;
        inputDir.y= 1;
        break;
    case "ArrowLeft":
        // console.log ("ArrowLeft")
        inputDir.x =-1;
        inputDir.y= 0;
        break;
    case "ArrowRight":
        // console.log ("ArrowRight")
        inputDir.x =1;
        inputDir.y= 0;
        break;
}
});
