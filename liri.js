// requiring all npm dependancies
require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");


// importing keys
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);

// setting user input
var command = process.argv[2];
var search = process.argv[3].splice(3).join(" ");

// main app
RunLiri(command, search);


function RunLiri(com, input) {
    switch(com) {
        
    }
}