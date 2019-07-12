'use strict'

let game = {
    //handles for canvas and 2d context
    canvas : null,
    ctx : null,
    //timer counting time between each snake move and calling updateSnake() function
    timer : null,
    //true if game has ended
    ended : false,

    //called on page load
    init : function()
    {
        topScores.fetch();
        this.initConstantScoreFetching();
        field.init();
        this.initCanvas();
        this.initKeyEvents();
        this.restart();
    },

    //current top scores will be fetched from server every 10 seconds
    initConstantScoreFetching : function()
    {
        setInterval(topScores.fetch.bind(topScores), 10000);
    },

    //gets handles for canvas and 2d context
    //sets initials size to canvas
    initCanvas : function()
    {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        //set size of the canvas
        this.canvas.height = field.mapSquarePosToPos(0, field.numSquares.h).y - 1;
        this.canvas.width = field.mapSquarePosToPos(field.numSquares.w, 0).x - 1;
    },

    //inits key press events
    initKeyEvents : function()
    {
        $(window).on("keydown", (event) => {
            //if game has ended do nothing
            if (this.ended)
                return;

            //if game wasn't yet started wait for user to press enter
            if (this.timer === null)
                this.handleGameNotStartedKeyPress(event.keyCode);
            //else forward all pressed keys to snake object
            else
                snake.keyPressed(event.keyCode);
        });
    },

    //if enter was pressed starts the game(runs timer firing callbacks every 
    //time a timeBetweenMoves elapses)
    handleGameNotStartedKeyPress : function(key)
    {
        if (key == 13)
            this.start();
    },

    clearTimer : function()
    {
        clearTimeout(this.timer);
        this.timer = null;
    },

    //starts the game
    start : function()
    {
        this.gameLoop();
        clock.start();
    },

    //"main loop of the game"
    //while game not ended calls update
    gameLoop : function()
    {
        this.timer = setTimeout(() => {
            this.update();
            //recursively invoke start of next timer
            if ( !this.ended )
                this.gameLoop();
        }, snake.timeBetweenMoves);
    },

    //restarts game
    restart : function()
    {
        this.ended = false;
        //reset score to 0
        score.init();
        score.draw();
        //clear timer from previous game
        this.clearTimer();
        //stop clock from previous game
        clock.stop();
        clock.reset();
        snake.init();

        food.randPos();
        this.draw();
        this.drawMessage("Press ENTER to start");
    },

    //draws all elements in the game
    draw : function()
    {
        field.draw();
        food.draw();
        snake.draw();
    },

    drawMessage : function(msg)
    {
        this.ctx.save();
        this.ctx.font = "36px Arial";
        this.ctx.fillStyle = "blue";
        this.ctx.textAlign = "center";
        this.ctx.shadowColor = "black";
        this.ctx.shadowBlur = 8;
        this.ctx.globalAlpha = 0.7;
        this.ctx.fillText(msg, this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.restore();
    },

    //function called every time main timer fires
    update : function()
    {
        //move with snake
        snake.update();
        //redraw scene
        if ( !this.ended )
            this.draw();
    },

    //ends games
    end : function()
    {
        clock.stop();
        this.ended = true;
        this.drawMessage("Game over");

        //get place to which qualifies player's score
        let score = parseInt( $("#scoreVal").html() );
        let place = topScores.getPlaceBasedOnScore(score);
        //if it's good enough to be in top 3 scores open dialog where user
        //will be able to enter his/her name
        if (place !== false)
            topScores.openSaveNewDialog(place, score);
    }
};


$(document).ready( () => {
    game.init();
});