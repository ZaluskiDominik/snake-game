'use strict'

let field = {
    //length of the one square from which the field is made
    squareLength : 20,
    
    //number of square pieces horizontally and vertically
    numSquares : {
        h : 20,
        w : 20
    },

    //width of the lines that separates squares
    separatorWidth : 1,

    //draws game field
    draw : function()
    {
        this.drawBackground();
        this.drawSeparators();
    },

    //draw lines that separates grid squares
    drawSeparators : function()
    {
        game.ctx.lineWidth = this.separatorWidth;
        game.ctx.fillStyle = "gray";

        //vericall
        for (let i = 1 ; i < field.numSquares.w ; i++)
        {
            let xPos = this.mapSquarePosToPos(i, 0).x - this.separatorWidth;
            game.ctx.fillRect(xPos, 0, this.separatorWidth, game.canvas.height);
        }

        //horizontall
        for (let i = 1 ; i < field.numSquares.h ; i++)
        {
            let yPos = this.mapSquarePosToPos(0, i).y - this.separatorWidth;
            game.ctx.fillRect(0, yPos, game.canvas.width, this.separatorWidth);
        }
    },

    //draws canvas background
    drawBackground : function()
    {
        game.ctx.fillStyle = "lightgray";
        game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
    },

    //changes position in square pieces to pixel position
    mapSquarePosToPos : function(squareX, squareY)
    {
        let _self = this;

        return {
            x : ( _self.squareLength + _self.separatorWidth ) * squareX, 
            y : ( _self.squareLength + _self.separatorWidth ) * squareY, 
        };
    }
};