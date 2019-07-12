<h1> Description </h1>
Snake game made with js, backend used for storing best scores.
<h1> How to play? </h1>
Move snake with arrow keys. Your goal is to collect yellow circles in order to earn points. After each point snake's speed increases. Game ends when you crash into wall or if you collide with snake's body.

<h1>How to run?</h1>
Clone repository and move it to your apache root server directory.

<h3>1.Apache configuration</h3>
Below is an configuration file of vhost for this web app that needs to be put inside one of apache's configuration files. You need to edit it with appropriate absolute paths of your system(Directives where path should be edited are marked by <b>*</b> and have bold font).
<br><br>

<pre>
&lt;VirtualHost 127.0.0.3:80&gt;
	ServerName play-snake.pl
	ServerAlias www.play-snake.pl

	#root directory of web application - should point to public directory(<b>*</b>)
	DocumentRoot <b>/var/www/html/snake-game/public</b>
	#turn on errors displaying
	Php_flag display_errors On
	#prepend config file to all scripts - absolute path to web app's main config file(<b>*</b>)
	Php_value auto_prepend_file <b>/var/www/html/snake-game/private/config/config.php</b>
	
	#set default charset to utf8
	Php_value default_charset UTF-8
	AddDefaultCharset urf-8

	#path to public directory of web app(<b>*</b>)
	&lt;Directory <b>/var/www/html/snake-game/public</b>&gt;
		#disable index of
		Options Includes FollowSymlinks
		#redirect root url to index page
		RedirectMatch ^/$ /html
	&lt;/Directory&gt;
&lt;/VirtualHost&gt;
</pre>

Website will be accessible by 127.0.0.3 IP address.

<h3>2.Database configuration</h3>
First import snake.sql file to your mysql server.
Next edit database.php file in private/config folder. You have to specify hostname where your mysql server run, login, password and name under which snake.sql file was imported by you.
