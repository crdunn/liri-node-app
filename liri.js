var twitterKeys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


var client = new Twitter ({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret,
});

var spotify = new Spotify({
  id: '13fe18c2e3ea4bdaadae282063cc1d96',
  secret: '9e094bc5589b4f7989a6398f2728f57b'
});

var command = process.argv[2];
var inquery = process.argv[3]


if (command === "my-tweets"){
	var params = {screen_name: 'SpaceGrey42'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	  }
	});
} else if (command === "spotify-this-song") {
	spotify.search({ type: 'track', query: inquery}, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  };
		console.log(data); 
	});

} else if (command === "movie-this") {

	request('http://www.omdbapi.com/?apikey=40e9cece&t='+inquery, function (error, response, body) {
		if (error){
	  		console.log('error:', error); // Print the error if one occurred
	  	};
	  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  	var parsed = JSON.parse(body)
	  	console.log("Name: "+parsed.Title+"\nYear: "+parsed.Year+"\nImdb Rating: "+parsed.imdbRating+"\nRotten Tomatoes Rating: "
	  		+parsed.Metascore+"\nCountry: "+parsed.Country+"\nLanguage: "+parsed.Language+"\nPlot: "+parsed.Plot+"\nActors: "+parsed.Actors);
	});

} else if (command === "do-what-it-says") {

	fs.readFile('random.txt', 'utf8', function(err, data) {
	  if (err) throw err;
	  console.log(data);
	});

}else {
	console.log("I don't recognize that command");
}