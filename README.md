# liri-node-app

Liri-node-app is a nodeJS application that lets users search for movies, songs, or their tweets.  It uses Twitter’s API, Spotify’s API, and the OMDB api and displays the results in the command line.  The corresponding node packages for Twitter and Spotify are used for their searches.

If the user types ‘node liri.js movie-this’ followed by a movie name, the OMDB api is searched and the movie’s information is displayed:

![movie-this](/images/movie-this.png)

If the user types ‘node liri.js spotify-this-song’ followed by a song title, Spotify’s api is searched and the song’s information is displayed.  

![spotify-this-song](/images/spotify-this-song.png)

If the user types ‘node lire.js my-tweets’ the Twitter API is called and the last tweets sent by the user.  Here, I have it set up to call the tweets from a test account I created:

![my-tweets](/images/my-tweets.png)

If the user types ‘node lire.js do-what-it-says’, the app reads the line in the ‘random.txt’ file in the root directory.  In this case, it does a Spotify search for ‘I Want It That Way” by the Backstreet Boys:

![do-what-it-says](/images/do-what-it-says.png)

Any unrecognized command will be declared as such to the user:

![anything-else](/images/anything-else.png)