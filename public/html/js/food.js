'use strict'

let food = {
    //position of snake's food
    pos : {
        squareX: null,
        squareY: null
    },

    //sets random position to food in one of the squares
    randPos : function()
    {
        let i;
        do
        {
            this.pos.squareX = Math.round(Math.random() * ( field.numSquares.w - 1 ));
            this.pos.squareY = Math.round(Math.random() * ( field.numSquares.h - 1 ));
            //check if food's position isn't equal to some piece of snake's body
            for (i = 0 ; i < snake.snakeParts.length && 
                ( snake.snakeParts[i].squareX != this.pos.squareX || 
                snake.snakeParts[i].squareY != this.pos.squareY )
                ; i++);
        }
        //rerandom in next loop iteration if position of some piece of snake body
        //was equal to food's position
        while (i != snake.snakeParts.length);
    },

    draw : function()
    {
        game.ctx.fillStyle = "yellow";
        let topLeft = field.mapSquarePosToPos(this.pos.squareX, this.pos.squareY);
        
        game.ctx.beginPath();
        //draw yellow circle as a food
        game.ctx.arc(field.squareLength / 2 + topLeft.x, 
            field.squareLength / 2 + topLeft.y, field.squareLength / 2,
            0, Math.PI * 2);
        game.ctx.fill();
    }
};