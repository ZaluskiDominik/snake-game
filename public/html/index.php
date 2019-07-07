<!DOCTYPE html>
<html lang="pl">
	<head>
		<title>Snake</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta charset="utf-8"/>

        <!-- fontawesome -->
        <link rel="stylesheet" href=<?php 
        echo '"' . $htmlPaths['FONTS'] . '/fontawesome/css/all.min.css' . '"'; ?> >

        <!-- jquery -->
        <script src=<?php echo '"' . 
        $htmlPaths['LIB'] . '/jquery/jquery-3.3.1.min.js' . '"';?>></script>

		<link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/canvas.css">
        <link rel="stylesheet" href="css/menu.css">


        <!-- <script src="js/snake.js"></script> -->
        <script src="js/menu.js"></script>
	</head>

	<body>
        <div id="row">
            <nav>
                <div>
                    <button id="menuBtn"></button>
                </div>

                <div id="gameInfo">
                    <div id="score">
                        <span>Score</span>
                        <span id="scoreVal"></span>
                    </div>
                    <div id="gameDuration">
                        <span>Time</span>
                        <span id="gameDurationVal"></span>
                    </div>
                </div>
                <button id="restartGameBtn">
                    <i class="fas fa-redo"></i>Play again
                </button>

                <div id="topScores">
                    <h2>Top scores</h2>
                </div>
            </nav>

            <div id="canvasWrapper">
                <canvas id="canvas"></canvas>
            </div>
        </div>
	</body>

</html>