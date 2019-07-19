// all code for accessing api keys is stored here

console.log("I'VE GOT THE KEYS!!");

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};
