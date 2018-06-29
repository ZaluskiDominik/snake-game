//length of the one square from which the field is made
let fieldSize=20;
//number of square pieces horizontally and vertically
let h=20, w=20;
let separatorWidth=1;

//2d vector of snake's curent direction
let directionVector;
let prevDirectionVector;

//position of snake's food
let food={
	x: undefined,
	y: undefined
}

//time between each move
let notMovingPeriod;

let timer;
//whether player started the game
let gameStarted;

let score;

//handles for canvas and 2d context
let canvas, ctx;

(function initCanvas()
{
	canvas=document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	//set size of the canvas
	canvas.width=(fieldSize + separatorWidth) * w - separatorWidth;
	canvas.height=(fieldSize + separatorWidth) * h - separatorWidth;
})();

//increment the value of player's score
function updateScore()
{
	document.getElementById("score").innerHTML="Score: " + (++score);
}

//class representing one piece of the snake's body
let SnakeBody=function(x, y, color)
{
	this.x=x;
	this.y=y;
	this.color=color;
}

SnakeBody.prototype.draw=function()
{
	ctx.fillStyle=this.color;
	ctx.fillRect(this.x * (fieldSize + separatorWidth), this.y * (fieldSize + separatorWidth), fieldSize, fieldSize);
}

//array of snake's pieces of body
let snake;

//create first pieces of snake's pieces of body
function initSnake(num)
{
	snake=[];
	//head
	snake.push(new SnakeBody(Math.floor(w/2), Math.floor(h/2), "red"));
	//rest
	for (let i=1 ; i<num ; i++)
		snake[i]=new SnakeBody(Math.floor(w/2), Math.floor(h/2) + i, "green");
}

//rand food which snake can eat and score a point
function randFood()
{
	let i;
	do
	{
		food.x=Math.round(Math.random() * (w - 1));
		food.y=Math.round(Math.random() * (h - 1));
		//check if food's position isn't equal to some piece of snake's body
		for (i=0 ; i<snake.length && (snake[i].x!=food.x || snake[i].y!=food.y) ; i++);
	}
	while (i!=snake.length);
}

//set initial value to snake's current direction vector and previous direction vector
function initDirectionVectors()
{
	//snake goes up
	prevDirectionVector={
		x: 0,
		y: -1
	}
	directionVector={
		x: 0,
		y: -1
	}
}

//init game variables
function initGame()
{
	//clear timer from previous game
	clearInterval(timer);
	notMovingPeriod=100;
	gameStarted=false;
	//reset score
	score=-1;
	updateScore();

	initDirectionVectors();
	initSnake(7);
	randFood();
	drawGame();
	drawMessage("Press 'enter' to start...");
	console.log("init");
}

initGame();

//drawing functions
//************************************************************************

function clearCanvas()
{
	ctx.fillStyle="lightgray";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//draw lines that separates grid cells
function drawSeparators()
{
	ctx.lineWidth=separatorWidth;
	ctx.fillStyle="gray";
	//vericall
	for (let i=1 ; i<w ; i++)
		ctx.fillRect(i * (fieldSize + separatorWidth) - 1, 0, separatorWidth, canvas.height);

	//horizontall
	for (let i=1 ; i<h ; i++)
		ctx.fillRect(0, i * (fieldSize + separatorWidth) - 1, canvas.width, separatorWidth);
}

function drawFood()
{
	ctx.fillStyle="yellow";
	ctx.beginPath();
	ctx.arc(food.x * (fieldSize + separatorWidth) + (fieldSize/2), 
		food.y * (fieldSize + separatorWidth) + (fieldSize/2), fieldSize/2, 0, Math.PI*2);
	ctx.fill();
}

//draw text
function drawMessage(msg)
{
	ctx.save();
	ctx.font = "36px Arial";
	ctx.fillStyle="blue";
	ctx.textAlign="center";
	ctx.shadowColor="black";
	ctx.shadowBlur=8;
	ctx.globalAlpha=0.7;
	ctx.fillText(msg, canvas.width/2, canvas.height/2);
	ctx.restore();
}

//draw snake onto canvas
function drawSnake()
{
	for (let i=0 ; i<snake.length ; i++)
		snake[i].draw();
}

//call all defined drawing functions
function drawGame()
{
	clearCanvas();
	drawSeparators();
	drawSnake();
	drawFood();
}

//***********************************************************************

function checkForCollision()
{
	let headX=snake[0].x + directionVector.x, headY=snake[0].y + directionVector.y;
	//check for collision with borders
	if (headX<0 || headX>=w || headY<0 || headY>=h)
		return true;

	//check for collisions with pieces of snake's body
	for (let i=1 ; i<snake.length - 1; i++)
		if (snake[i].x==headX && snake[i].y==headY)
			return true;

	//no collisions
	return false;
}

function moveSnake()
{
	//collision checking
	if ( checkForCollision() )
	{
		//end of game
		clearInterval(timer);
		drawMessage("End of game");
		return;
	}

	//append new head
	snake.unshift( new SnakeBody(snake[0].x + directionVector.x, snake[0].y + directionVector.y, snake[0].color) );
	snake[1].color=snake[2].color;
	
	//if snake picked food the grow --> don't delete old tail
	if (snake[0].x==food.x && snake[0].y==food.y)
	{
		//snake goes faster
		notMovingPeriod=notMovingPeriod>20 ? notMovingPeriod - 1 : notMovingPeriod;
		clearInterval(timer);
		timer=setInterval(moveSnake, notMovingPeriod);
		//randomize new food's position
		randFood();
		updateScore();
	}
	else
		snake.pop();

	//update previous direction of the snake
	prevDirectionVector.x=directionVector.x;
	prevDirectionVector.y=directionVector.y;

	//redraw the canvas
	drawGame();
}

//handle player's keys(up, down, left, right)
function onKeyPressed(event)
{
	switch (event.keyCode)
	{
	//up
	case 38:
		if (prevDirectionVector.y!=1)
		{
			directionVector.x=0;
			directionVector.y=-1;
		}
		break;
	//down
	case 40:
		if (prevDirectionVector.y!=-1)
		{
			directionVector.x=0;
			directionVector.y=1;
		}
		break;
	//left
	case 37:
		if (prevDirectionVector.x!=1)
		{
			directionVector.x=-1;
			directionVector.y=0;
		}
		break;
	//right
	case 39:
		if (prevDirectionVector.x!=-1)
		{
			directionVector.x=1;
			directionVector.y=0;
		}
		break;
	}
}

function handleStartGameKeyPressed(event)
{
	//start game when player press enter
	if ( (!gameStarted) && event.keyCode==13 )
	{
		gameStarted=true;
		//start counting
		timer=setInterval(moveSnake, notMovingPeriod);
	}
}

//keyboard events
window.addEventListener("keydown", function(event)
{
	onKeyPressed(event);
	handleStartGameKeyPressed(event);
});