// requiring all npm dependancies
require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");


// importing keys
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// setting user input
var command = process.argv[2];
var search = process.argv.splice(3).join(" ");

// main app
RunLiri(command, search);


function RunLiri(com, input) {
    switch(com) {
        case "concert-this":
            concertThis(input);
            break;
        case "spotify-this-song":
            spotifyThis(input);
            break;
        case "movie-this":
            movieThis(input);
            break;
        case "do-what-it-says":
            justDoIt();
            break;
    }
}

function concertThis(value) {
    // querying BandsInTown API
    var queryURL = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";


    axios.get(queryURL).then(function (response) {
        var dateTime = moment(response.data[0].datetime).format("dddd MMMM Do, YYYY");
        var artistData = [
            "________",
            "Band: " + value,
            "Venue: " + response.data[0].venue.name,
            "Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country,
            "Date: " + dateTime,
            "Line-Up: " + response.data[0].lineup,
            "________"
        ];
        console.log(artistData);
    })
}


function spotifyThis(value) {

    if (!search) {
        search = "What's my age again?";
    };
    spotify.search({ 
        type: "track",
        query: value,
    }).then(function(data) {
        var name = data.tracks.items[0].name;
        var artist = data.tracks.items[0].artists[0].name;
        var album = data.tracks.items[0].album.name;
        var preview = data.tracks.items[0].preview_url;
        var songData = [
            "________",
            "Artist: " + artist,
            "Song: " + name,
            "Album: " + album,
            "Preview Link: " + preview,
            "________"
        ];
        console.log(songData);  

    })
};

    function justDoIt() {
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            } else {
                var array = data.split(",");
                console.log(array);
                command = array[0];
                input = array[1];   
            }
            }
        );
    };

    function movieThis(value) {
        var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=full&tomatoes=true&apikey=trilogy";

        axios.get(queryUrl).then(function(response) {
            var movieData = [
                "________",
                "Title: " + response.data.Title,
                "Released: " + response.data.Year,
                "IMDB Rate: " + response.data.imdbRating,
                "Rotten Tomatoes Rating: " + response.data.Ratings[1].value,
                "Country of Production: " + response.data.Country,
                "Languages: " + response.data.Language,
                "Plot Summary: " + response.data.Plot,
                "Cast: " + response.data.Actors,
                "_________"
                ];
                console.log(movieData);
                
        })
    }