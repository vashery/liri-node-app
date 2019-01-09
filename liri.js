var keys = require("./keys");
var request = require('request');
var Spotify = require('node-spotify-api');
var moment = require('moment');

function concertThis(artist) {
    var inputartist = artist

    var options = {
        method: 'GET',
        url: 'https://rest.bandsintown.com/artists/' + inputartist + '/events',
        qs: { app_id: 'codingbootcamp' },

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log('Name of the venue: ' + JSON.parse(body)[0].venue.name);
        console.log('Venue location: ' + JSON.parse(body)[0].venue.city + ', ' + JSON.parse(body)[0].venue.region);
        console.log('Date of event: ' + moment(JSON.parse(body)[0].datetime).format('MM/DD/YYYY'));

    });

}

switch (process.argv[2]) {
    case 'concert-this':
        concertThis(process.argv[3])
        break;
    case 'spotify-this-song':
        break;
    case 'movie-this':
        break;
    case 'do-what-it-says':
        break;
    default:

}



//console.log(process.argv[2]);
//console.log(keys.spotify);