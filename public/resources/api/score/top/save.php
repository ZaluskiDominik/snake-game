<?php
//Saves new score in top 3 scores if that score is good enough to be there

require_once($phpPaths['PHP'] . '/validate.php');
require_once($phpPaths['PHP'] . '/top-scores.php');

//check if POST parameters are not empty
if ( empty($_POST['score']) || empty($_POST['playerName']) )
{
    http_response_code(400);
    die("Not all POST parameters were specified! There has to be 'score'
        and 'playerName' parameters");
}

//validate POST parameters
\Validate\playerName($_POST['playerName']);
\Validate\score($_POST['score']);

//extract sanitized POST parameters
$score = htmlspecialchars($_POST['score']);
$playerName = htmlspecialchars($_POST['playerName']);

//add new score to top scores if it qualifies
$topScores = new TopScores($playerName, $score);
$topScores->addNew();