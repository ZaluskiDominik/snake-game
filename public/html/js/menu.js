'use strict'

let menu = {
    opened : true,
    //time of slideIn and slideOut animation in miliseconds
    msSlideDuration : 700,

    //inits event handler for menu btn
    init : function()
    {
        $("#menuBtn").click(menu.menuBtnClicked.bind(menu));
    },

    //slides in menu
    open : function()
    {
        //fade out menu btn, after it slide in menu
        $("#menuBtn").fadeOut(500, () => {
            this.setMenuBtnOpened();
            this.triggerSlideAnimation();
            //forwar animation
            $("nav").css("animation-direction", "normal");
        });
    },

    //slides out menu
    close : function()
    {
        this.triggerSlideAnimation();
        //play slideIn in reverse order so it becomes slideOut
        $("nav").css("animation-direction", "reverse");

        //after animation ends display menu btn with fixed positioning
        //so it will be displayed within viewport 
        setTimeout(this.setMenuBtnClosed.bind(this), this.msSlideDuration);
    },

    //inserts menu btn next to snake logo in nav
    setMenuBtnOpened : function()
    {
        $("#menuBtn").css("position", "static")
            .show()
            .appendTo($("nav > div:first-child"));
    },

    //inserts menu btn to body with fixed positioning
    setMenuBtnClosed : function()
    {
        $("#menuBtn").css("position", "fixed")
            .appendTo(document.body)
            .hide().fadeIn(1000);
    },

    //helper function called by open and close methods
    //sets name of an animation to nav element
    triggerSlideAnimation : function()
    {
        $("nav").css("animation-name", "none");
        //trigger reflow
        $("nav")[0].offsetHeight;
        $("nav").css("animation-name", "slideIn");
    },

    //callback to menu button click, opens or closes menu
    menuBtnClicked : function()
    {
        //if menu is opened close it, else open it
        if (this.opened)
            this.close();
        else
            this.open();

        //change state of opened to opposite
        this.opened = !this.opened;
    }
};

$(document).ready( () =>
{
    menu.init();
});