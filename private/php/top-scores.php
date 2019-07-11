<?php

require_once($phpPaths['PHP'] . '/db-connect.php');

class TopScores
{
    public function __construct(string $playerName, int $score)
    {
        $this->playerName = $playerName;
        $this->score = $score;
    }

    //returns array of top 3 scores
    //array of [ 'place', 'name', 'score' ]
    static public function get()
    {
        $db = \Db\connect();
        $stmt = $db->query("SELECT player_name AS playerName, score, place
            FROM top_scores ORDER BY place");
       
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    //if score is good enough to be in top 3 score, it will be added
    public function addNew()
    {
        $place = $this->getPlaceBasedOnScore();

        //if score qualifies to be in top 3 scores
        if ($place !== false)
        {
            $scores = static::get();
            $db = \Db\connect();

            //get array with inserted this player's place and score
            $updatedScores = $this->getUpdatedScoresArray($scores, $place);
            
            //update all previous places
            $stmt = $db->prepare("UPDATE top_scores
                SET player_name = ?, score = ?
                WHERE place = ?");
            $i = 0;
            for ( ; $i < count($scores) ; $i++)
            {
                $score = $updatedScores[$i];
                $stmt->execute([ $score['playerName'], $score['score'], $score['place'] ]);
            }

            //if new place was inserted that wasn't already in db table
            //insert it to db
            if ( count($updatedScores) > count($scores) )
            {
                $stmt = $db->prepare("INSERT INTO top_scores
                    VALUES(?, ?, ?)");
                $score = $updatedScores[count($scores)];
                $stmt->execute([ $score['place'], $score['playerName'], $score['score'] ]);
            }
        }
    }

    //PRIVATE SECTION

    private $playerName;
    private $score;

    //returns place for score in top scores if score qualifies to top3
    //else returns false
    private function getPlaceBasedOnScore()
    {
        $scores = static::get();
        $i = 0;
        for ($i = 0 ; $i < count($scores) && $this->score <= $scores[$i]['score'] ; $i++);
        
        return ( $i < 3 ) ? $i + 1 : false;
    }

    //returns updated array $scores with added to it this player's score and place
    private function getUpdatedScoresArray(array $scores, int $place)
    {
        //if not all 3 places are in db then add a new one
        if (count($scores) < 3)
            $scores[] = [];

        //shift to right all places greater that $place 
        for ($i = count($scores) - 1 ; $i >= $place ; $i--)
        {
            $scores[$i] = $scores[$i - 1];
            $scores[$i]['place']++;
        }

        //modify place for score of this player
        $scores[$place - 1] = [
            'playerName' => $this->playerName,
            'score' => $this->score,
            'place' => $place
        ];

        return $scores;
    }
}