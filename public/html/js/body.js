'use strict'

class SnakeBody
{
    constructor(squareX, squareY, color)
    {
        this.squareX = squareX;
        this.squareY = squareY;
        this.color = color;
    }

    draw()
    {
        game.ctx.fillStyle = this.color;
        let pos = field.mapSquarePosToPos(this.squareX, this.squareY);
        game.ctx.fillRect(pos.x, pos.y, field.squareLength, field.squareLength);        
    }

    setPos(pos)
    {
        this.squareX = pos.x;
        this.squareY = pos.y;
    }

    getPos()
    {
        return {
            x : this.squareX,
            y : this.squareY
        };
    }
}