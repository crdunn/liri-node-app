var twitterKeys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


var client = new Twitter (twitterKeys);

var spotify = new Spotify({
  id: '13fe18c2e3ea4bdaadae282063cc1d96',
  secret: '9e094bc5589b4f7989a6398f2728f57b'
});

var command = process.argv[2];
var inquery = process.argv[3];
var searchType;

function lineCommands(){
	if (command === "my-tweets"){

		findTweets();
		searchType = "Twitter"
		logQuery1();

	} else if (command === "spotify-this-song") {

		findSong();
		searchType = "Song";
		logQuery2();

	} else if (command === "movie-this") {

		findMovie();
		searchType = "Movie"
		logQuery2();

	} else if (command === "do-what-it-says") {

		whatItSays();
		searchType = "text load";
		logQuery1();

	}else {
		console.log("I don't recognize that command");
	};
};


function findTweets(){
	var params = {screen_name: 'SpaceGrey42'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
		  for (var i = 0; i<tweets.length; i++){
		    console.log(tweets[i].text+"\nTweeted at: "+ tweets[i].created_at+"\n-----------------");
		  };
	  };
	});
};


function findSong (){
	spotify.search({ type: 'track', query: inquery}, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  };
		console.log("Artists: "+data.tracks.items[0].artists[0].name+"\nSong Name: "+data.tracks.items[0].name+"\nAlbum: "
			+data.tracks.items[0].album.name+"\nPreview Link: "+data.tracks.items[0].preview_url);
	});
};

function findMovie () {
	request('http://www.omdbapi.com/?apikey=40e9cece&t='+inquery, function (error, response, body) {
		if (error){
	  		console.log('error:', error); // Print the error if one occurred
	  	};
	  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  	var parsed = JSON.parse(body)
	  	console.log("Name: "+parsed.Title+"\nYear: "+parsed.Year+"\nImdb Rating: "+parsed.imdbRating+"\nRotten Tomatoes Rating: "
	  		+parsed.Metascore+"\nCountry: "+parsed.Country+"\nLanguage: "+parsed.Language+"\nPlot: "+parsed.Plot+"\nActors: "+parsed.Actors);
	});
};

function whatItSays () {
	fs.readFile('random.txt', 'utf8', function(err, data) {
	 	if (err) throw err;
		var array = fs.readFileSync('random.txt').toString().split(",");
		command = array[0];
		inquery = array[1];
		lineCommands ();
	});
};

function logQuery1 (){
	time = Date.now();
	var logTxt = "\nDate: " + time + " ----- Search Type: " + searchType;
    fs.appendFile("log.txt", logTxt);
};

function logQuery2 (){
	time = Date.now();
	var logTxt = "\nDate: " + time + " ----- Search Type: " + searchType + " ----- Search Term: " + inquery;
    fs.appendFile("log.txt", logTxt);
};

lineCommands ();







