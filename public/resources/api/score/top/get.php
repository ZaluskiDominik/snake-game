<?php
//Returns json containing array of top 3 scores
/*Json
{
    scores : [
        { place, score, name }
    ]
}
*/

header("Content-type: application/json; charset=utf-8");

require_once($phpPaths['PHP'] . '/top-scores.php');

echo json_encode([
    'scores' => TopScores::get()
]);