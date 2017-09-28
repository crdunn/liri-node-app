//var twitterKeys = require("./keys.js");
var Twitter = require('twitter');
var request = require('request');

var client = new Twitter ({
  consumer_key: 'EDNFG71IeX6kJdIbY7NbWNCfu',
  consumer_secret: 'Xn5iehsQsfrJ8RDLfE9PEDI7PFimu0dFaWSMzZLRDJzYW8Z9FX',
  access_token_key: '913178168101662720-0hjIB2HGysLsY5Qlu5YW3HRnxvigbBR',
  access_token_secret: 'MlRL1imsmLh8jF6HA4g7mAcF7hdSWEZsPEKb17Yy6UEtz',
});

var params = {screen_name: 'SpaceGrey42'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});