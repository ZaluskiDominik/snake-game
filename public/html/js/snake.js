'use strict'

let snake = {
	//2d vector of snake's curent direction
	directionVector : null,
	//2d vector of snake's previous direction
	prevDirectionVector : null,
	//array of snake's pieces of body
	snakeParts : null,
	//time in miliseconds between previous and next snake move
	timeBetweenMoves : null,

	init : function()
	{
		this.initDirectionVectors();
		this.createSnake(7);

		this.timeBetweenMoves = 100;
	},

	//create snake made of given number of body's pieces
	createSnake : function(num)
	{
		this.snakeParts = [];
		
		//head
		let headPos = {
			x : Math.floor(field.numSquares.w / 2),
			y : Math.floor(field.numSquares.h / 2)
		};
		this.snakeParts.push( new SnakeBody(headPos.x, headPos.y, "red") );
		
		//rest of the snake
		for (let i = 1 ; i < num ; i++)
			this.snakeParts.push( new SnakeBody(headPos.x, headPos.y + i, "green") );
	},

	//sets direction and previous direction vector so that snake initially goes up  
	initDirectionVectors : function()
	{
		this.prevDirectionVector = {
			x: 0,
			y: -1
		}

		this.directionVector = {
			x: 0,
			y: -1
		}
	},

	//draws snake
	draw : function()
	{
		for (let i = 0 ; i < this.snakeParts.length ; i++)
			this.snakeParts[i].draw();
	},

	//called from main loop, moves snake, checks collisions if food was picked
	//grows snake's tail
	update : function()
	{
		//check for snake collisions with wall and its own parts of body
		//if collision occured exit function
		if (this.handleCollisions())
			return;

		//remember tail position
		let tailPos = this.snakeParts[this.snakeParts.length - 1].getPos();

		//move snake
		this.move();

		//if food was picked grow and increase movement speed
		this.handleFood(tailPos);
	},

	//moves snake according to directionVector
	move : function()
	{
		//for each body piece(excluding head) indexed as 'i' set
		//position of body piece with index 'i - 1' 
		for (let i = this.snakeParts.length - 1 ; i ; i--)
			this.snakeParts[i].setPos( this.snakeParts[i - 1].getPos() );

		//move head according to directionVector
		let headPos = this.snakeParts[0].getPos();
		this.snakeParts[0].setPos({
			x : headPos.x + this.directionVector.x, 
			y : headPos.y + this.directionVector.y
		});		

		//after move update previous direction vector
		this.prevDirectionVector.x = this.directionVector.x;
		this.prevDirectionVector.y = this.directionVector.y;
	},

	//calls end game function and returns true if head snake collide with
	//its body or walls
	handleCollisions : function()
	{
		//calculate new position of head when snake will make move
		let headPos = this.snakeParts[0].getPos();
		headPos.x += this.directionVector.x;
		headPos.y += this.directionVector.y;

		//if head will collide with snake's body or wall, game over
		if ( this.isCollidingWithBody(headPos) || this.isCollidingWithWalls(headPos) )
		{
			game.end();
			return true;
		}

		return false;
	},

	//returns true if headPos collide with snake's body
	isCollidingWithBody : function(headPos)
	{
		//don't check collision with tail, it will move from that position
		for (let i = 1 ; i < this.snakeParts.length - 1 ; i++)
		{
			if ( this.snakeParts[i].squareX == headPos.x && 
				this.snakeParts[i].squareY == headPos.y )
					return true;
		}

		return false;
	},

	//returns true if headPos collid with walls
	isCollidingWithWalls : function(headPos)
	{
		if ( headPos.x < 0 || headPos.x >= field.numSquares.w 
			|| headPos.y < 0 || headPos.y >= field.numSquares.h )
				return true;
		
		return false;
	},

	//if head collides with food pick it up, grow and increase movement speed
	handleFood : function(prevTailPos)
	{
		let headPos = this.snakeParts[0].getPos();
		if ( headPos.x == food.pos.squareX && headPos.y == food.pos.squareY )
		{
			//grow and increase move speed
			this.grow(prevTailPos);
			//increase speed if timeBetweenMoves is greater than 20ms
			snake.timeBetweenMoves -= ( snake.timeBetweenMoves > 20 ) * 2;
			//rand new position of food
			food.randPos();
			//increase score
			score.increment();
			score.draw();
		}
	},

	//increses length of snake's body
	grow : function(prevTailPos)
	{
		this.snakeParts.push( new SnakeBody(prevTailPos.x, prevTailPos.y, "green") );
	},

	//handle player's keys(up, down, left, right)
	keyPressed(key)
	{
		switch (key)
		{
		//up
		case 38:
			this.setDirectionIfNotOppositeToPrev(0, -1);
			break;
		//down
		case 40:
			this.setDirectionIfNotOppositeToPrev(0, 1);
			break;
		//left
		case 37:
			this.setDirectionIfNotOppositeToPrev(-1, 0);
			break;
		//right
		case 39:
			this.setDirectionIfNotOppositeToPrev(1, 0);
			break;
		}
	},

	//sets new direction vector value if previous direction is different that
	//opposite of the given vector in parameter
	setDirectionIfNotOppositeToPrev(dirVecX, dirVecY)
	{
		if ( this.prevDirectionVector.x !== -dirVecX
			&& this.prevDirectionVector.y !== -dirVecY )
		{
			this.directionVector.x = dirVecX;
			this.directionVector.y = dirVecY;
		}
	}
};