'use strict'

let clock = {
    seconds : 0,
    //interval firing off every second
    timer : null,

    //starts counting seconds
    start : function()
    {
        this.timer = setInterval(this.increase.bind(this), 1000);
    },

    //stops timer
    stop : function()
    {
        clearInterval(this.timer);
        this.seconds = 0;
    },

    //resets time to 00:00
    reset : function()
    {
        this.seconds = 0;
        this.updateValue();
    },

    //increase time by 1 second
    increase : function()
    {
        this.seconds = ( this.seconds + 1 ) % 3600;
        this.updateValue();
    },

    //sets value to gameDurationVal based on this.seconds
    updateValue : function()
    {
        let seconds = this.addLeadingZero( this.seconds % 60 );
        let minutes = this.addLeadingZero( Math.floor(this.seconds / 60) );

        $("#gameDurationVal").html(minutes + ":" + seconds);        
    },

    addLeadingZero(number)
    {
        return ( number.toString().length == 1 ) ? "0" + number : number;
    }
};