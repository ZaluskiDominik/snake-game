'use strict'

let topScores = {    
    init : function()
    {
        this.initSaveNewDialog();
    },

    //fetches 3 top scores from server and inserts them to top scores board
    fetch : function()
    {
        $.get(API_PATH + '/score/top/get.php')
        .done( (json) => {
            //remove all scores from scores board
            $("#topScores tbody > tr:not(:first-child)").remove();
        
            //insert fetched scores to scores board
            json.scores.forEach( (score) => {
                this.appendScoreToBoard(score);
            });
        })
        .fail( request.fail.bind(request) );
    },

    //appends new score to scores board
    appendScoreToBoard : function(scoreObj)
    {
        $("<tr></tr>").append(
                $("<td></td>")
                .attr("cup", this.getCupAttrBasedOnPlace(scoreObj.place))
            )
            .append( $("<td></td>").html(scoreObj.playerName) )
            .append( $("<td></td>").html(scoreObj.score) )
            .appendTo( $("#topScores tbody") );
    },

    //returns 'gold' for firts place, 'silver' for second, 'bronze' for third
    getCupAttrBasedOnPlace : function(place)
    {
        switch (place)
        {
        case 1:
            return "gold";
        case 2:
            return "silver";
        case 3:
            return "bronze";
        }

        return undefined;
    },

    //opens dialog for saving score that qualifies to top 3 scores
    openSaveNewDialog : function(place, score)
    {
        //display background and dialog
        $("#saveNewScoreDialogBcg").fadeIn(500);
        $("#saveNewScoreDialog").fadeIn(500)
            .find("input").val("Player");

        //sets place in title
        $("#place").html(this.changeNumericPlaceToStr(place));

        //save btn oclick event
        $("#saveScoreBtn").click( () => {
            //if name isn't empty and has max 10 characters
            if ($("input")[0].checkValidity())
                //save new score in top scores
                this.saveNewBest($("input").val(), score);
        });
    },

    closeSaveNewDialog : function()
    {
        $("#saveNewScoreDialogBcg").fadeOut(500);
        $("#saveNewScoreDialog").fadeOut(500);
    },

    //returns string representation of numerical place
    changeNumericPlaceToStr : function(place)
    {
        switch (place)
        {
        case 1:
            return "first";
        case 2:
            return "second";
        case 3:
            return "third";
        };

        return undefined;
    },

    //inits close dialog on btn click event
    initSaveNewDialog : function()
    {
        //close btn
        $("#scoreDialogCloseBtn").click(this.closeSaveNewDialog.bind(this));
    },

    //if score qialifies to top 3 scores place will be returned(1, 2, 3)
    //else false is returned
    getPlaceBasedOnScore : function(score)
    {
        let places = this.getPlacesWithScores();

        for (var i = 0 ; i < places.length && places[i].score >= score ; i++);
                
        return ( i <= 2 ) ? i + 1 : false;
    },

    //returns array of { place, score }
    getPlacesWithScores : function()
    {
        let places = [];
        //for each table's row
        $("#topScores > table").find("tr").each(function(index) {
            //if it's not header row
            if (index != 0)
            {
                places.push({
                    place: index,
                    score : parseInt( $(this).children().eq(2).html() )
                });
            }
        });

        return places;
    },

    //saves score on server side
    saveNewBest : function(name, score)
    {
        //disable save btn for duratation of request
        $("#saveScoreBtn").prop("disabled", true);

        $.post(API_PATH + '/score/top/save.php', {
            playerName : name,
            score : score
        })
        .done( this.fetch.bind(this) )
        .fail( request.fail.bind(request) )
        .always( () => {
            //enable save btn again
            $("#saveScoreBtn").prop("disabled", false);
        });

        //close dialog
        this.closeSaveNewDialog();
    }
};

$(document).ready( () => {
    topScores.init();
});