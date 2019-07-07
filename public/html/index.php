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


        <script src="js/snake.js"></script>
        <script src="js/menu.js"></script>
	</head>

	<body>
        <div id="row">
            <nav>
                <div>
                    <button id="menuBtn"></button>
                </div>
            </nav>

            <div id="canvasWrapper">
                <canvas id="canvas"></canvas>
            </div>
        </div>
	</body>
    <!-- <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->

</html>