'use strict'

let score = {
    score : 0,

    init : function()
    {
        this.score = 0;
    },

    //adds +1 to score
    increment : function()
    {
        this.score++;
    },

    draw : function()
    {
        document.getElementById("scoreVal").innerHTML = this.score;
    }
};