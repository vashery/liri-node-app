var keys = require("./keys");
var axios = require('axios');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require('fs');
var artistlist = [];

function concertThis(artist) {

    axios.get('https://rest.bandsintown.com/artists/' + artist + '/events', {
        params: {
            app_id: 'codingbootcamp'
        }
    })
        .then(function (response) {
            console.log('Name of the venue: ' + response.data[0].venue.name);
            console.log('Venue location: ' + response.data[0].venue.city + ', ' + response.data[0].venue.region);
            console.log('Date of event: ' + moment(response.data[0].datetime).format('MM/DD/YYYY'));
        })
        .catch(function (error) {
            console.log(error);
        });
}

function spotifyThisSong(songname) {

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({ type: 'track', query: songname, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
            artistlist.push(data.tracks.items[0].artists[i].name)

        }

        console.log('Artists: ' + artistlist.join(', '))
        console.log('Name: ' + data.tracks.items[0].name)
        console.log('Preview Link: ' + data.tracks.items[0].external_urls.spotify)
        console.log('Album: ' + data.tracks.items[0].album.name)

    });
}

function movieThis(movie) {
    axios.get('https://www.omdbapi.com', {
        params: {
            apikey: keys.omdb.key,
            t: movie,
            type: 'movie'
        }
    })
        .then(function (response) {
            if (response.data.Response === 'False') {
                console.log('movie not found!')
            }
            else {
                console.log(response.data.Response);
                console.log('Title: ' + response.data.Title);
                console.log('Year: ' + response.data.Year);
                console.log('IMDB Rating: ' + response.data.Ratings[0].Value);
                console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value);
                console.log('Country: ' + response.data.Country);
                console.log('Language(s): ' + response.data.Language);
                console.log('Plot: ' + response.data.Plot);
                console.log('Actors: ' + response.data.Actors);
            }
        })
        .catch(function (error) {
            console.log(error);
        });

}
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        if (dataArr[0] === 'spotify-this-song') {
            spotifyThisSong(dataArr[1]);
        }
        else if (dataArr[0] === 'movie-this') {
            movieThis(dataArr[1])
        }
        else if (dataArr[0] === 'concert-this') {
            concertThis(dataArr[1])
        }
        else {
            console.log("invalid text file input")
        }
        

    });
}

switch (process.argv[2]) {
    case 'concert-this':
        concertThis(process.argv[3])
        break;
    case 'spotify-this-song':
        if (process.argv[3]) {
            spotifyThisSong(process.argv[3])
        }
        else {
            spotifyThisSong('track:The Sign artist:Ace of Base')
        }
        break;
    case 'movie-this':
        if (process.argv[3]) {
            movieThis(process.argv[3])
        }
        else {
            movieThis('Mr. Nobody')
        }

        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
    default:
        console.log("not a valid argument")

}