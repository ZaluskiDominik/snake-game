'use strict'

let field = {    
    //number of square pieces horizontally and vertically
    numSquares : {
        h : 20,
        w : 20
    },

    //length of the one square from which the field is made
    squareLength : 20,

    //width of the lines that separates squares
    separatorWidth : 1,

    //init size of field's square
    init : function()
    {
        //field's width as min from widow height and canvasWrapper width
        let fieldLength = Math.min( $("#canvasWrapper").width(), $(window).height() )
            - 200;
        //set square's length(minimum 20px)
        this.squareLength = Math.max(20, Math.floor( fieldLength / this.numSquares.w ));
    },

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
        game.ctx.fillStyle = "#999";

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
        game.ctx.fillStyle = "#ffe4c4";
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