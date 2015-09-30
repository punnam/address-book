require('colors');
var path = require('path');
var express = require('express');

var peopleBlob = require(path.join(__dirname, 'data/people.json'));
var people = peopleBlob['people'];

var app = express();
app.get('/api/people/:id', getPersonById);
app.get('/api/people', getAllPeople);

var HTTP_PORT = 8080;
app.listen(HTTP_PORT, function(err) {
    if (err) {
        throw err;
    }

    console.log(('HTTP server listening on port ' + HTTP_PORT).green);
    console.log('People data:'.bold + ' http://localhost:' + HTTP_PORT + '/api/people');
});

function getPersonById(req, res) {
    var id = parseInt(req.params.id, 10);
    var filtered = people.filter(function (person) {
        return person.id === id;
    });

    if (filtered.length === 0) {
        res.sendStatus(404);
    }
    else {
        res.json({
            person: filtered[0]
        });
    }
}

function getAllPeople(req, res) {
    res.json(peopleBlob);
}
