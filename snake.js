//length of the one square from which the field is made
let fieldSize=30;
//number of square pieces horizontally and vertically
let h=15, w=15;
let separatorWidth=1;

let directionVector;

let prevDirectionVector;

let food={
	x: undefined,
	y: undefined
}

let timer;
let gameStarted;

//canvas handle and 2d context
let canvas, ctx;

function initCanvas()
{
	canvas=document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	//set size of the canvas
	canvas.width=(fieldSize + separatorWidth) * w - separatorWidth;
	canvas.height=(fieldSize + separatorWidth) * h - separatorWidth;
}

//class representing one piece of the snake's body
let SnakeBody=function(x, y, color)
{
	this.x=x;
	this.y=y;
	this.color=color;

	this.draw=function()
	{
		ctx.fillStyle=this.color;
		ctx.fillRect(this.x * (fieldSize + separatorWidth), this.y * (fieldSize + separatorWidth), fieldSize, fieldSize);
	}
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

function randFood()
{
	let i;
	do
	{
		food.x=Math.round(Math.random() * (w - 1));
		food.y=Math.round(Math.random() * (h - 1));
		for (i=0 ; i<snake.length && (snake[i]!=food.x || snake[i].y!=food.y) ; i++);
	}
	while (i!=snake.length);
}

function drawFood()
{
	ctx.fillStyle="yellow";
	ctx.beginPath();
	ctx.arc(food.x * (fieldSize + separatorWidth) + (fieldSize/2), food.y * (fieldSize + separatorWidth) + (fieldSize/2), fieldSize/2, 0, Math.PI*2);
	ctx.fill();
}

function drawMessage(msg)
{
	ctx.font = "36px Arial";
	ctx.fillStyle="blue";
	ctx.textAlign="center";
	ctx.fillText(msg, canvas.width/2, canvas.height/2);
}

function initGame()
{
	gameStarted=false;
	initSnake(7);
	randFood();
	drawGame();
	drawMessage("Press any key to start...");

	prevDirectionVector={
		x: 0,
		y: -1
	}
	directionVector={
		x: 0,
		y: -1
	}
}

function clearCanvas()
{
	ctx.fillStyle="lightgray";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSeparators()
{
	ctx.lineWidth=separatorWidth;
	ctx.fillStyle="gray";
	//vericall
	for (let i=1 ; i<w ; i++)
		ctx.fillRect(i * (fieldSize + separatorWidth), 0, separatorWidth, canvas.height);

	//horizontall
	for (let i=1 ; i<h ; i++)
		ctx.fillRect(0, i * (fieldSize + separatorWidth), canvas.width, separatorWidth);
}

function drawSnake()
{
	for (let i=0 ; i<snake.length ; i++)
		snake[i].draw();
}

function drawGame()
{
	clearCanvas();
	drawSeparators();
	drawSnake();
	drawFood();
}

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
	return false;
}

//if snake ate food then it will grow
function eatingFood(oldTail)
{
	if (snake[0].x==food.x && snake[0].y==food.y)
	{
		//grow
		snake.push(new SnakeBody(oldTail.x, oldTail.y, oldTail.color));
		randFood();
	}
}

function moveSnake()
{
	//collision checking
	if ( checkForCollision() )
	{
		//end game
		clearInterval(timer);
		drawMessage("End of game");
		return;
	}

	//make a move
	//new head
	snake.unshift( new SnakeBody(snake[0].x + directionVector.x, snake[0].y + directionVector.y, snake[0].color) );
	snake[1].color=snake[2].color;
	
	//if snake picked food the grow --> don't delete old tail
	if (snake[0].x==food.x && snake[0].y==food.y)
	{
		randFood();
		console.log(food.x, "  ", food.y);
	}
	else
		snake.pop();

	//update previous direction of the snake
	prevDirectionVector.x=directionVector.x;
	prevDirectionVector.y=directionVector.y;

	//redraw the canvas
	drawGame();
}

//keyboard events
window.addEventListener("keydown", function(event)
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

	//start game on pressing any key
	if (!gameStarted)
	{
		gameStarted=true;
		//start counting
		timer=setInterval(moveSnake, 300);
	}
}
)

//invoke startup functions
initCanvas();
initGame();