<?php
namespace Validate;

//exits script with 400 html error code if player name is not valid
function playerName($name)
{
    if ( !is_string($name) || strlen($name) > 10 )
        notValid('playerName');
}

//exits script with 400 html error code if score is not valid
function score($score)
{
    if ( !is_string($score) || !ctype_digit($score) )
        notValid('score');
}

//exits script with 400 error code and message
//paramName - name of not valid parameter
function notValid(string $paramName)
{
    http_response_code(400);
    die("Not valid '" . $paramName . "' parameter!");
}