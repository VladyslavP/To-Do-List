"use strict";

const express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    bodyParser = require('body-parser');

const app = express();
let db;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/build'));


MongoClient.connect("mongodb://localhost:27017/notes-app", (err, database) => {

    if(err) throw err;

    db = database;

    app.listen(7070, () => {

        console.log('Running on port 7070');

    });

});


app.get('/notes', (request, response) => {

    db.collection('notes').find({}).toArray((err, result) => {

        if(err) response.json({success: false, message: 'Cannnot find the data'});

        response.json({success: true, tasks: result});

    });

});

app.post('/notes', (request, response) => {

    let note = request.body;

    db.collection('notes').save(note, (err, result) => {

        if(err) response.json({success:false, message: "Cannot add to database"});
        console.log('Added successfully' + JSON.stringify(result));
        response.json({success: true, message: 'Note was successfully added'});

    });

});

app.delete('/notes/:id', (request, response) => {

    let id = request.params.id;

    db.collection('notes').removeOne({_id: id}, (err, result) => {

        if(err) response.json({success: false, message: "Cannot delete from database"});
        console.log('Deleted!' + JSON.stringify(result));
        response.json({success: true, message: 'Deleted!'});

    })

});
