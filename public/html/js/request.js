'use strict'

let request = {
    //function to call when ajax requests returns error html code
    fail : function(xhr)
    {
        console.log("AJAX ERROR");
        //output stack trace
        console.trace();
        //output error msg
        console.log(xhr.responseText);
    }
};